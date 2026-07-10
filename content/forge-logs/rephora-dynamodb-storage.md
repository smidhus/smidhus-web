---
title: "Relational Storage on NoSQL: Mapped DynamoDB Tables and GSIs"
subtitle: "Modeling relational user flashcards, game statistics, and scheduled notification tasks using a multi-table DynamoDB layout and global secondary indexes."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "7 MIN READ"
difficulty: "DIFFICULTY: INTERMEDIATE"
isSubLog: true
architecture:
  - "DynamoDB Multi-Table topology mapping distinct domain aggregates."
  - "Global Secondary Indexes (GSIs) resolving sorted chronological listings and leaderboard rankings."
  - "AWS Java SDK v2 DynamoDB Enhanced Client bean mapper annotations."
---

Relational databases make it simple to perform joins, sort records, and run complex filters. However, in high-scale mobile platforms, they introduce performance bottlenecks and scaling limits. Non-relational databases (NoSQL) like **Amazon DynamoDB** offer single-digit millisecond latency at any scale, but they require a different approach to data modeling.

In Rephora, instead of using a single-table design which is difficult to map and maintain in standard object-oriented architectures, we designed a **Multi-Table DynamoDB schema** coupled with **Global Secondary Indexes (GSIs)** to resolve relational queries efficiently.

This log details our database topology, the cost-performance architectural tradeoffs of multi-table designs, how we map domain entities using the AWS Java SDK v2 Enhanced Client, and the index strategies used for leaderboards and reminders.

---

## Why DynamoDB? The Cost and Performance Rationale

Choosing a NoSQL engine like Amazon DynamoDB instead of an AWS RDS relational database is primarily driven by **pricing** and **scaling characteristics**. A relational database requires running a provisioning instance (RDS) 24/7, which incurs high baseline costs even during periods of low activity. DynamoDB, with its serverless, pay-per-request pricing model, scales down to zero baseline cost and charges only for the actual Read and Write Capacity Units (RCUs and WCUs) consumed.

However, choosing NoSQL requires a shift in how we model data. In document-based stores, it is common to default to deeply nested structures—such as a single `Book` entity containing an array of `Quizzes`, which in turn contains an array of `Questions`. While this nested document layout looks simple and intuitive on the surface, overlooking the data access patterns in DynamoDB can quickly lead to severe performance bottlenecks and unplanned operational costs:
* **Heavy Latency:** Querying specific questions or listing quizzes independently becomes a computational bottleneck. The database must load the entire nested document into memory just to filter a few items, causing slow response times.
* **Skyrocketing Costs:** DynamoDB charges are based on the total size of the document returned. Loading a massive nested `Book` document consumes large quantities of RCUs on every read.
* **GSI Index Limitations:** Global Secondary Indexes (GSIs) cannot directly index attributes nested inside dynamic arrays or lists. This forces the application to perform full table scans to search or sort nested records, which is extremely expensive in DynamoDB and quickly drives up operational costs.

To solve this, we decoupled the domain aggregates into separate physical tables (`rephora-books`, `rephora-quizzes`, `rephora-questions`) and linked them via GSIs, maintaining the cost benefits of NoSQL while matching relational query performance.

---

## Database Topology: The Multi-Table Schema

Rather than packing all entities (Users, Quizzes, Questions) into a single physical table with generic keys, Rephora separates distinct domain aggregates into individual DynamoDB tables. This maintains a clean boundary between business layers while optimizing indexing and read/write capacity units (RCUs/WCUs) for each entity type.

The tables are configured per environment, using names such as `rephora-users-dev` and `rephora-users-prod`. The logical topology is:

| Table Name | Hash Key (PK) | GSI Name | GSI Partition Key (GSI PK) | GSI Sort Key (GSI SK) | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`rephora-users-*`** | `id` (Cognito `sub`) | `gsi_email`<br>`gsi_username`<br>`gsi_deleted_at` | `email`<br>`username`<br>`deletedAt` | - | Account profiles, preferences, and deletion lifecycle markers. |
| **`rephora-books-*`** | `id` | `gsi_user_created_at`<br>`gsi_deleted_at` | `userId`<br>`deletedAt` | `createdAt`<br>- | User uploaded study source books. |
| **`rephora-quizzes-*`** | `id` | `gsi_user_created_at`<br>`gsi_book_created`<br>`gsi_deleted_at` | `userId`<br>`bookId`<br>`deletedAt` | `createdAt`<br>`createdAt`<br>- | Quizzes generated or managed for a book. |
| **`rephora-questions-*`** | `userQuiz` | `gsi_by_id`<br>`gsi_user_created_at`<br>`gsi_deleted_at` | `id`<br>`userId`<br>`deletedAt` | -<br>`createdAt`<br>- | Individual flashcards/questions scoped by `userId#quizId`, with `id` as the table sort key. |
| **`rephora-study-sessions-*`**| `userId` | table sort key: `createdAt` | - | - | Study session history keyed by user and creation time. |
| **`rephora-jobs-*`** | `id` | `gsi_user_created_at`<br>`gsi_entity_created_at` | `userId`<br>`entityId` | `createdAt`<br>`createdAt` | Asynchronous AI generation job states. |
| **`rephora-user-stats-*`** | `userId` | `gsi_leaderboard_xp`<br>`gsi_leaderboard_streak`<br>`gsi_leaderboard_efficiency`<br>`gsi_leaderboard_accuracy`<br>`gsi_user_stats_reminders` | `leaderboardPartition`<br>`leaderboardPartition`<br>`leaderboardPartition`<br>`leaderboardPartition`<br>`nextReminderBucket` | `totalXp`<br>`currentStreak`<br>`efficiencyTimeScore`<br>`globalAccuracy`<br>`nextReminderAt` | Gamification metrics, leaderboards, efficiency/accuracy rankings, and reminders. |

[DIAGRAM:rephora-dynamodb]

---

## Mapping Entities: The Enhanced Client Bean Mapper

To bridge our hexagonal clean architecture domains with DynamoDB without writing manual attribute maps, the Spring Boot backend (`rephora_api`) utilizes the **AWS Java SDK v2 DynamoDB Enhanced Client**.

The mapper uses annotations on standard Java classes to map properties to DynamoDB tables automatically:
* **`@DynamoDbBean`:** Marks a class as a DynamoDB mapped entity.
* **`@DynamoDbPartitionKey`:** Placed on the getter of the partition key attribute (e.g., `id` or `userId`).
* **`@DynamoDbSortKey`:** Used when a composite primary key is needed.
* **`@DynamoDbSecondaryPartitionKey`** and **`@DynamoDbSecondarySortKey`:** Placed on getters to define which attributes project into Global Secondary Indexes.

This allows the repository layer to query DynamoDB collections using standard Java objects, while the SDK translates the calls into efficient low-level queries under the hood.

---

## Resolving Queries: GSI Indexing Strategies

To load most records relationally without using expensive table-wide scans, we rely on Global Secondary Indexes (GSIs) designed around specific query access patterns. One important exception is the Gardener Lambda, which scans the sparse `gsi_deleted_at` index on users to find records marked for deletion.

### 1. Chronological Listings
When a user opens the mobile app, they need to see their books, quizzes, and recent study history sorted by creation date. 
To resolve this:
* We configure a GSI named `gsi_user_created_at` on tables like `rephora-quizzes-*` and `rephora-books-*`.
* The **GSI PK** is `userId` and the **GSI SK** is `createdAt`.
* Querying this index with `userId = :userId` returns all items for that user, sorted chronologically in $O(\log N)$ time.

### 2. Global Leaderboards
Rephora features competitive leaderboards based on total XP, current study streaks, efficiency, and global accuracy. In a relational database, this requires running `ORDER BY` on the entire table. In DynamoDB, we model this as follows:
* The `rephora-user-stats-*` table contains a string attribute called `leaderboardPartition` which is always set to the constant `"ALL"`.
* We define GSIs such as `gsi_leaderboard_xp`, `gsi_leaderboard_streak`, `gsi_leaderboard_efficiency`, and `gsi_leaderboard_accuracy`, all partitioned by `leaderboardPartition` and sorted by the ranking metric.
* Because all users share the same partition key value `"ALL"`, DynamoDB automatically stores all users in a single partition sorted by their XP score.
* Querying the selected GSI with `leaderboardPartition = "ALL"` returns the chosen global ranking without scanning the whole table.

### 3. Scheduled Notification Reminders
To notify users when they need to review their vocabulary, an EventBridge schedule sends a message to the study reminders evaluator queue. The backend worker can then find who has reminder tasks scheduled for the current bucket.
To avoid scanning the entire database:
* The `rephora-user-stats-*` table defines a GSI named `gsi_user_stats_reminders`.
* The GSI PK is `nextReminderBucket` (a string representing the scheduled hour bucket, e.g. `2026-07-07-10`) and the GSI SK is `nextReminderAt` (the precise timestamp).
* The worker queries this GSI using the current hour bucket key. DynamoDB returns only the subset of users whose study reminders have matured for this specific hour slot, keeping execution costs minimal.
