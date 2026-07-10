---
title: "Asynchronous Quiz Generation: DeepSeek, SQS, and FCM"
subtitle: "Decoupling slow LLM grading and content generation from synchronous client request loops using message queues and background notifications."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "7 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "Decoupled job processing via Amazon SNS fan-in to Amazon SQS queues."
  - "DeepSeek LLM prompt contracts using structured JSON responses and defensive parsing."
  - "Firebase Cloud Messaging (FCM) dispatching completion alerts back to mobile client."
---

Integrating Large Language Models (LLMs) to generate flashcards or grade open-ended study answers introduces a major systems engineering challenge: **network latency**. 

While a typical database query executes in single-digit milliseconds, calling generative AI APIs (such as DeepSeek or OpenAI) is inherently slow. The model takes anywhere from 3 to 10 seconds to generate a response. In a standard synchronous HTTP request loop, holding a connection open for 10 seconds is a anti-pattern that leads to timed-out client sockets, exhausted backend threads, and a laggy user experience.

This log details how we decoupled Rephora's quiz generation and grading into an asynchronous producer-consumer architecture using **Amazon SNS**, **Amazon SQS**, **DynamoDB**, and **Firebase Cloud Messaging (FCM)**.

---

## The Problem: The High Latency of Generative AI

When a user in `rephora_app` wants to generate a customized quiz based on a book chapter, the application must perform several tasks:
1. Parse the text source and construct a highly tailored prompt.
2. Call the LLM to write multiple-choice questions matching specific difficulty levels.
3. Validate that the LLM response is structured correctly.
4. Save the new questions, options, and explanations into DynamoDB.

If we performed these steps synchronously during the client's GraphQL request, the mobile app would show a spinner, block user actions, and eventually fail if the user's internet connection experienced a momentary drop. 

Furthermore, if fifty users requested a quiz at the exact same moment, the backend Spring Boot container would exhaust its thread pool, causing all other lightweight queries (like loading a leaderboard or profile page) to hang.

---

## The Producer-Consumer Queue Architecture

To resolve this bottleneck, we decoupled the execution loop. Instead of expecting immediate results, the mobile client requests a "Job" and receives a response instantly. The actual work happens in the background:

### 1. The Producer (Spring Boot Backend API)
When a user clicks "Generate Quiz", the mobile app sends a GraphQL mutation. 
* The backend API immediately creates a record in the `rephora-jobs` DynamoDB table, generating a unique `jobId` with a state of `PENDING`.
* The backend constructs a message payload containing the user's parameters (quiz id, requested count, prompt hint, and authenticated user id) and publishes it to the **Amazon SNS** topic for AI question generation.
* SNS fans the raw payload into the subscribed **Amazon SQS** generation queue, which gives the worker durable retry semantics and dead-letter handling.
* The API returns the `jobId` to the client while the job remains `PENDING`. The mobile app knows the task is accepted and can show background progress while letting the user navigate elsewhere in the app.

### 2. The Consumer (Background SQS Listener inside the Monolith)
Although decoupled as a message consumer, this background listener runs as a dedicated service thread inside the **same Spring Boot Monolith backend container** (`rephora_api`). This keeps our infrastructure footprint simple while preserving logical process isolation:
* **Message Consumption:** A scheduled SQS consumer polls the queue and changes the DynamoDB Job status in `rephora-jobs-*` from `PENDING` to `RUNNING`.
* **Canonical Exclusion Query:** Before invoking the generative model, the worker queries existing questions for the same user and quiz, canonicalizes their text, and passes that set as an exclusion list. This avoids duplicating questions inside the quiz, but it does not skip LLM generation or associate a previous result as a cache hit.
* **LLM Invocation:** The listener builds a hierarchical prompt from the quiz topic, book context, user profile, AI config, and optional prompt hint, then calls the **DeepSeek API** to generate the content.
* **Database Persist:** It parses the returned JSON questions, saves them into the DynamoDB tables (`rephora-questions` and `rephora-quizzes`), and updates the Job status in `rephora-jobs` to `COMPLETED` (or `FAILED` if errors occur).

---

## Prompt Contracts: Structured JSON and Defensive Parsing

One of the common points of failure in LLM pipelines is receiving unstructured text (like *"Here is the JSON you requested:"*) or broken brackets that fail parsing. To make the asynchronous pipeline reliable, we enforced strict prompt engineering contracts:

* **Structured Response Format:** The DeepSeek adapter sends a chat completion request with a configured `response_format`, asking the model to return machine-readable JSON.
* **Prompt Isolation:** The prompt contract separates generation rules from contextual inputs. The system side defines the expected question/answer shape while the request side supplies user profile, quiz focus, book context, language, difficulty, and personality.
* **Deterministic Fallbacks:** If the SQS worker receives an empty response, duplicate-only batch, or parsing/runtime failure, it marks the job as `FAILED` with an error code instead of leaving the user's job stuck in `RUNNING`.

---

## Closing the Loop: Firebase Push Notifications

Once the background worker saves the generated flashcards and marks the job as `COMPLETED`, it needs to inform the user. Because the mobile client is not holding a connection open, we use an event-driven notification bridge.

The SQS worker calls the `NotifyFlashcardsReadyUseCase`, which delegates to the **Firebase Admin SDK** adapter and sends a data message to the user's registered push target. 

The mobile application (`rephora_app`) can then react to the FCM completion payload containing the `jobId` and `quizId`, refresh the relevant view, and tell the user that the generated flashcards are ready. The entire lifecycle is fully decoupled, resilient to network drops, and maintains a fluid mobile experience.

[DIAGRAM:rephora-generation]
