---
title: "REPHORA: THE TECHNICAL FOUNDRY PORTAL"
subtitle: "An architectural entrypoint to Rephora's multi-platform client, backend API, serverless operations, and declarative cloud footprint."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA_PORTAL"
readingTime: "5 MIN READ"
difficulty: "DIFFICULTY: BEGINNER"
architecture:
  - "Monolith-decoupled frontend running on Flutter mobile engine."
  - "Hexagonal backend API designed in Java 21 & Spring Boot."
  - "Declarative resources deployed via OpenTofu IaC pipelines."
codeSample: |
  // Rephora Repository Blueprint
  const REPHORA_STACK = {
    frontend: "Flutter (Dart) - Clean Architecture",
    backend:  "Java 21 (Spring Boot) - Hexagonal Design",
    infra:    "OpenTofu (Terraform) - AWS Serverless"
  };
---

Welcome to the technical engineering portal for **Rephora**, an adaptive learning and spaced-repetition platform. 

This portal acts as the master directory for our engineering logs. It intentionally focuses on implementation details, architectural tradeoffs, infrastructure boundaries, data modeling, security, and delivery automation.

If you want the user-facing product story, availability, screenshots, and feature overview, visit **[rephora.app](https://rephora.app)**. If you want to understand how the product is engineered, continue through this Smidhus technical path.

Below is the project blueprint and the official index of technical deep-dives detailing how Rephora was designed, built, and automated.

---

## Product Site vs. Engineering Logs

Rephora has two complementary documentation surfaces:

* **[rephora.app](https://rephora.app):** The product-facing site. It should explain what Rephora is, who it helps, what the learning experience feels like, and how users can access it.
* **Smidhus Forge Logs:** The engineering record. These logs explain how the mobile app, backend API, AI generation pipeline, DynamoDB model, AWS infrastructure, and delivery workflows are implemented.

That separation keeps the product narrative clean while letting these logs stay technical, concrete, and implementation-oriented.

---

## The Three-Pillar Project Structure

The Rephora ecosystem is isolated across three distinct project directories, separating client presentation, domain business rules, and cloud infrastructure:

```text
rephora/
├── rephora_app/       # Flutter (Dart) mobile application
├── rephora_api/       # Java 21 & Spring Boot Hexagonal backend API
└── rephora_infra/     # OpenTofu (Terraform) AWS declarative configuration
```

1. **`rephora_app` (Frontend):** Focuses entirely on presentation state, offline usability, user metrics display, and local database caching. Written in Flutter to target Android and iOS natively with a single, shared Canvas rendering engine.
2. **`rephora_api` (Backend):** Built using Java 21 and Spring Boot, it exposes a GraphQL schema. It employs **Hexagonal Architecture** (Ports & Adapters) to separate core study rules from AWS DynamoDB tables and external notification gateways.
3. **`rephora_infra` (Infrastructure):** Declares and provisions all AWS dependencies (Cognito, databases, queues, S3 storage, and Lambdas) in code, ensuring developer environments match production exactly.

---

## The Engineering Logs Glossary

Below is the structured reading path for Rephora's engineering implementation. It starts with request identity and data modeling, then moves into AI workflows, adaptive study behavior, runtime operations, infrastructure, and delivery:

* **[Stateless Identity](/forge-logs/rephora-cognito-security)**
  * *Challenge:* Validating token-based sessions securely without database hits.
  * *Core stack:* `AWS Cognito`, `Spring Security`, `JWT Filters`
* **[Relational Storage on NoSQL](/forge-logs/rephora-dynamodb-storage)**
  * *Challenge:* Modeling relational quiz and metrics records in DynamoDB.
  * *Core stack:* `DynamoDB Multi-Table`, `GSI Design`
* **[Asynchronous Quiz Generation](/forge-logs/rephora-async-generation)**
  * *Challenge:* Decoupling slow LLM APIs from frontend response loops.
  * *Core stack:* `DeepSeek AI`, `AWS SNS`, `AWS SQS`, `Firebase Admin (FCM)`
* **[The Spaced Repetition Loop](/forge-logs/rephora-spaced-repetition)**
  * *Challenge:* Prioritizing user weaknesses with probabilistic selection and processing progress aggregates asynchronously.
  * *Core stack:* `Spring Boot`, `AWS DynamoDB`, `AWS SNS`, `AWS SQS`
* **[High-Performance Media](/forge-logs/rephora-media-caching)**
  * *Challenge:* Loading study assets quickly and securely on mobile devices.
  * *Core stack:* `Referer-restricted S3 public assets`, `Private S3 presigned bucket`, `CachedNetworkImage`
* **[Serverless Housekeeping](/forge-logs/rephora-serverless-lambdas)**
  * *Challenge:* Automating 10-day account data purging outside request handlers.
  * *Core stack:* `Python`, `AWS Lambda`, `EventBridge`, `DynamoDB`
* **[AWS System Topology](/forge-logs/rephora-infrastructure)**
  * *Challenge:* Connecting compute, storage, identity, messaging, media, and operations into one coherent AWS runtime.
  * *Core stack:* `EC2`, `Docker`, `Cognito`, `DynamoDB`, `SNS`, `SQS`, `S3`, `Lambda`
* **[Declarative Environments](/forge-logs/rephora-opentofu-iac)**
  * *Challenge:* Maintaining identical dev/prod environments with zero committed secrets.
  * *Core stack:* `OpenTofu`, `SSM Parameter Store`, `AWS IAM`
* **[Continuous Delivery](/forge-logs/rephora-github-delivery)**
  * *Challenge:* Compiling, linting, scanning, and deploying Spring Boot containers to EC2.
  * *Core stack:* `GitHub Actions`, `Trivy Security`, `AWS SSM`, `'Repha' PR Agent`

---

*Use the navigation footer below to begin exploring Rephora's engineering path starting with the secure authentication bridge.*
