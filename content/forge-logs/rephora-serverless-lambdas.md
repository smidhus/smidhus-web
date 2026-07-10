---
title: "Serverless Housekeeping: The Gardener Lambda and Cascade Purging"
subtitle: "Implementing account deletion grace periods and serverless cascade purging in DynamoDB, with a future-ready data export flag."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "7 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "AWS Lambda running a Python execution environment for lightweight batch operations."
  - "EventBridge Scheduler triggering recurring purge jobs every 10 minutes."
  - "A persisted `requestDataExport` flag reserving the contract for a future GDPR export worker."
  - "Decoupled cascade delete algorithm cleaning up multi-table NoSQL references."
---

Enforcing user privacy and compliance with international data regulations (such as GDPR Article 17 "Right to Erasure" and Article 20 "Data Portability") is a critical requirement for modern mobile platforms. When a user requests to delete their account, a system must ensure that all personal files, records, and statistics are completely purged.

However, executing heavy database deletes synchronously inside backend API endpoints is risky. Deleting hundreds of nested quizzes, flashcards, and history records can block threads, exhaust connection pools, and exceed request timeouts.

This log details how we built an asynchronous serverless housekeeping workflow in Rephora using **AWS Lambda** and **Amazon EventBridge** to handle deletion grace periods and clean cascade deletes. Amazon SES is provisioned elsewhere in the platform, but the account data export email worker is not active yet; the backend currently stores the user's export preference through `requestDataExport` for that future workflow.

---

## The Deletion Lifecycle and Data Portability

To protect user accounts from accidental deletion and comply with data portability mandates, Rephora implements a structured, multi-stage account termination workflow:

### 1. The Soft Delete & Export Preference
When a user initiates account deletion from the mobile client (`rephora_app`), they call the `requestDeletion` mutation. The mutation accepts an optional boolean flag called `requestDataExport`.
* **State Transition:** The `rephora-users-*` record is patched with a `deletedAt` timestamp. Rephora does not store a separate pending-deletion status field; `deletedAt != null` is the deletion marker.
* **Grace Period:** The user enters a strict 10-day grace period. If they decide to keep the account, the app calls the `requestReactivation` mutation, which clears `deletedAt` and resets `requestDataExport` to `false`.
* **Data Portability Preference:** If `requestDataExport` is enabled, the backend persists that preference on the user record. The GraphQL contract explicitly treats the export email as future-ready; no active worker currently compiles or sends the report.

This keeps the deletion lifecycle explicit without blocking the current purge mechanism on a feature that has not shipped yet. Once the 10-day grace period expires and the hard delete is executed, the Gardener removes the user's application data from the DynamoDB tables it owns.

---

## Asynchronous Purging: The Gardener Lambda

Once the 10-day grace period passes, the data must be physically purged from our DynamoDB tables. Rather than utilizing main backend server resources, we delegate this task to a serverless helper function named **`rephora-gardener`**.

The Gardener is configured as follows:
* **Infrastructure:** A lightweight Python 3.12 function running on **AWS Lambda**, keeping operational costs to a fraction of a cent per run.
* **Trigger:** An **Amazon EventBridge Event Rule** configured as a cron trigger, waking up the Lambda function every 10 minutes.
* **Access Control:** The Lambda role is locked down via IAM policies to only allow read/write operations within the current environment's database tables.

[DIAGRAM:rephora-gardener]

---

## Resolving NoSQL Relational Integrity: Cascade Deletions

Because DynamoDB is a non-relational database, it does not support foreign keys or cascade delete constraints. If you delete a user record, the associated records in other tables (quizzes, questions, books) remain as orphaned data.

To resolve this, the Gardener Lambda executes a programmatic cascade delete algorithm:

1. **Scan Pending Deletions:** The Lambda scans the `gsi_deleted_at` index on `rephora-users-*` to retrieve users whose `deletedAt` marker is present.
2. **Evaluate Grace Expiry:** For each record, the Lambda compares the current UTC time against the `deletedAt` timestamp.
3. **Cascade Purge Execution:** If the elapsed time is 10 days or more, the Lambda executes a clean-up transaction across all DynamoDB tables:
   * Queries and deletes all session logs in `rephora-study-sessions-*` associated with the `userId`.
   * Queries and deletes all questions in `rephora-questions-*` generated for the user.
   * Queries and deletes all quizzes in `rephora-quizzes-*` owned by the user.
   * Queries and deletes all uploaded books in `rephora-books-*`.
   * Deletes the user's stats in `rephora-user-stats-*` and finally deletes the primary profile record in `rephora-users-*`.

By moving this cascade logic to a decoupled serverless cron environment, Rephora handles account deletions reliably, keeps the production database clean, and avoids performance bottlenecks on the primary API backend.
