---
title: "The Spaced Repetition Loop: Probabilistic Selection and Event-Driven Stats"
subtitle: "Prioritizing user weaknesses using a custom exponential race selection algorithm and distributing session updates asynchronously."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "8 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "Decoupled selection engine executing in-memory exponential race algorithms."
  - "Inverted gacha drop-rate logic prioritizing user weaknesses dynamically."
  - "SNS-to-SQS aggregation worker updating question, quiz, and book progress outside the progress-sync request."
---

In the design of learning platforms, spaced repetition is the standard mechanism used to optimize memory retention. However, rigid schedules and predictable card orderings can lead to user fatigue. Rephora also has two different update loops: lightweight progress syncs that can publish aggregate updates asynchronously, and the final `endSession` mutation that computes the user's XP, streak, level, and study habit snapshot synchronously.

To solve the selection problem, Rephora employs a unique approach: **a probabilistic question selection algorithm inspired by gacha game item drop rates**, combined with a focused event-driven aggregation worker for per-question, per-quiz, and per-book score updates.

This log details the mathematical formulation of our selection model and the decoupled event architecture that powers Rephora's learning loops.

---

## The Concept: Inverted Gacha Drop Rates

In role-playing and gacha video games, item drop rates are heavily skewed: common items drop frequently, while legendary items have a tiny, fractional probability of appearing. 

In Rephora, we inverted this concept to target user weaknesses. We treat questions the user has mastered (high average scores) as "legendary items"—they have a very low probability of being dropped. Conversely, questions the user struggles with (low scores or failures) are treated as "common items"—they drop frequently.

This probabilistic model guarantees that the study queue is always fresh and never follows a rigid, repetitive loop, while mathematically focusing the user's time on their core weaknesses.

---

## The Mathematics of the Selection Engine

When the mobile app requests the next question via GraphQL, the backend fetches up to 100 active candidate questions for the `(userId, quizId)` scope. It then runs an **in-memory Exponential Race (Gumbel-Max-like selection)** to decide which single question is returned. The current DynamoDB adapter does not rely on a materialized pick-index GSI; the selection key is calculated in application memory for the loaded candidate set.

For each candidate question, the engine calculates its selection key based on the user's historical performance.

### 1. Mastery Score (M)
First, we compute the user's average mastery score for the question, mapping it to a normalized scale between `0.0` (no knowledge) and `1.0` (full mastery):

```text
Mastery = clamp( scoreSum / (totalAttempts * 10.0), 0.0, 1.0 )
```

where `scoreSum` is the cumulative score sum the user obtained on previous attempts, and `totalAttempts` is the number of times they reviewed the question. If the question has never been attempted, `Mastery = 0.0`.

### 2. Probabilistic Weight (w)
Next, we calculate the question's selection weight. We want the weight to increase exponentially as mastery decreases. This is defined by a power-law formula:

```text
Weight = clamp( 0.05 + (1.0 - Mastery)^1.5, 0.1, 1000.0 )
```

Here, `0.05` acts as a baseline constant (so mastered questions still have a small chance of appearing) and `1.5` is the exponential growth factor. 
* A fully mastered question (`Mastery = 1.0`) yields a tiny weight of `0.05` (clamped to `0.1`).
* A failed or new question (`Mastery = 0.0`) yields a high weight of `1.05`.

### 3. The Exponential Race Selection
To perform a weighted random selection without sorting lists or creating complex probability buckets, we sample an independent random variable `R` from an exponential distribution with parameter `lambda = 1`. This is calculated using the inverse transform method:

```text
R = -ln(U)
```

where `U` is a uniform random number sampled in the interval `(0, 1)`.

Finally, we compute the selection key `PickKey` for each question:

```text
PickKey = R / Weight
```

The engine evaluates all candidates and selects the question that minimizes the selection key:

```text
Selected Question = Question with minimum PickKey
```

### Why this works:
Minimizing the ratio of an exponential variable to a weight guarantees that the probability of selecting a question from the candidates is exactly proportional to its weight:

```text
P(Select Question) = Weight / Sum(All Weights)
```

This elegant formula provides a robust, fast selection that runs in $O(N)$ time in memory, ensuring that weak areas appear with high frequency while keeping the review experience dynamic.

[DIAGRAM:rephora-picker]

---

## Progress Sync and Final Session Closure

Rephora separates in-session progress updates from final session closure.

### 1. `syncSessionProgress`: Async Aggregate Updates
While the user studies, the app periodically sends `syncSessionProgress`. The Spring Boot backend appends the new attempts to the `StudySession`, then publishes an `EndStudySessionMessage` to the `rephora-sns-update-aggregations-*` SNS topic.

SNS forwards the raw payload to a single `rephora-sqs-update-aggregations-*` queue. A scheduled SQS consumer inside the monolith reads that queue and updates:

* Each answered `Question`, incrementing attempts, score sum, and correct count.
* The parent `Quiz`, incrementing aggregate attempts and score.
* The parent `Book`, incrementing aggregate attempts and score when the session belongs to a book.

This is the part of the learning loop that is asynchronous. It keeps incremental progress syncs from doing every aggregate write inline, while preserving the monolith as the deployment unit.

[DIAGRAM:rephora-fanout]

### 2. `endSession`: Synchronous User Stats and Study Habit Snapshot
When the user finishes the study session, the app sends `endSession`. This final mutation is intentionally synchronous because the client needs the result payload for the completion screen:

* It loads the `StudySession` and authenticated `User`.
* It calculates duration, score, accuracy, XP, level, daily study seconds, streaks, and `StudyHabit`.
* It persists `rephora-user-stats-*` so leaderboard GSIs reflect the latest totals.
* It marks the `StudySession` as `COMPLETED` and returns the final completion payload to the app.

By limiting the event-driven worker to aggregate progress updates and keeping final gamification output synchronous, Rephora preserves a responsive study flow without promising asynchronous behavior where the current implementation does not use it.

[DIAGRAM:rephora-session-end]
