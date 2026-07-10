---
title: "AWS System Topology: Decoupled Cloud Architecture"
subtitle: "A detailed breakdown of Rephora’s production topology, covering serverless compute, asynchronous messaging, and secure config storage."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "8 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "Single EC2 monolithic computation server running Docker and Nginx reverse proxy with SSL."
  - "Stateless authentication fully offloaded to AWS Cognito User Pools."
  - "Configuration and environment secret parameters managed via SSM Parameter Store."
  - "Decoupled asynchronous operations utilizing SQS queues and SNS topics."
---

Building a cost-effective, scalable startup application requires a pragmatically designed cloud topology. For a system like Rephora, combining serverless utilities with a central monolithic computation engine allows us to keep hosting bills low while maintaining the capacity to handle burst traffic during heavy study hours.

To keep operational complexity minimal, we avoid bloated setups like Kubernetes clusters or large Application Load Balancers. Instead, we utilize a single **AWS EC2** instance running Docker, wrapping it in a highly decoupled network of serverless AWS components that handle authentication, media storage, messaging, and database operations.

This log details the global architectural topology of Rephora, describing the responsibility and communication pathway of each cloud service in our production stack.

---

## The Global Topology Map

The diagram below represents the complete communication and data flow of Rephora, illustrating how the Flutter mobile client interacts with both the monolithic application host and the surrounding serverless services.

[DIAGRAM:rephora-infrastructure]

---

## AWS Component Breakdown

Every AWS resource in the Rephora ecosystem has a single, well-defined responsibility:

### 1. Compute Host: Amazon EC2 (t2.micro)
The core business logic runs on a single, lightweight **Amazon EC2** instance running Amazon Linux 2023. To maximize efficiency and security, it hosts two layers:
* **Nginx Reverse Proxy:** Nginx binds directly to public HTTP/HTTPS ports (80/443), terminating SSL traffic using a free, automatically renewing **Let's Encrypt** certificate managed by Certbot.
* **Spring Boot Container:** Nginx proxies incoming traffic internally to port 8080, where our Spring Boot Monolith (`rephora_api`) runs inside a Docker container.

### 2. Stateless Security: AWS Cognito
User identity verification is completely outsourced to **AWS Cognito**. 
* The Flutter client authenticates directly against Cognito, receiving a cryptographically signed JSON Web Token (JWT).
* When making GraphQL API requests, the client attaches this JWT to the authorization header.
* The Spring Boot backend validates the JWT signature locally through Spring Security's resource server support, extracting the user's unique Cognito ID (`sub`) without needing to call Cognito on every request.

### 3. Asynchronous Messaging: Amazon SQS & Amazon SNS
For heavy operations, like calling LLM models to generate quizzes or running background jobs, we decouple computation using messaging queues:
* **Amazon SNS (Simple Notification Service):** Spring Boot publishes AI generation and progress aggregation events to SNS topics. This keeps the application port generic and leaves routing to AWS.
* **Amazon SQS (Simple Queue Service):** SNS delivers raw payloads into SQS queues. Scheduled consumers inside the monolith poll these queues for AI generation jobs and score aggregation updates, while DLQs quarantine messages that fail repeatedly.

### 4. Configuration and Secrets: AWS Systems Manager (SSM)
Storing sensitive database credentials, API keys, or private certificates inside code repositories is a security vulnerability. 
* All environment-specific variables are saved inside the **SSM Parameter Store** (under paths like `/rephora/dev/*` and `/rephora/prod/*`).
* The EC2 host uses an attached IAM Instance Profile to fetch these parameters dynamically on startup, keeping our environment variables safe.
* Additionally, **SSM Documents** are used to push system updates and configure systemd runtimes directly onto the host, eliminating the need to expose raw SSH ports to the public web.

### 5. Media Assets: Amazon S3
Rephora uses two S3 buckets with different security postures:
* **Public assets bucket:** Stores app assets such as avatars and the asset manifest. Public access is intentionally allowed through a bucket policy, but reads must include the expected `aws:Referer` signature, reducing casual hotlinking while still allowing direct mobile downloads.
* **Private assets bucket:** Stores sensitive files such as future user reports. Public access is fully blocked and direct access is designed around pre-signed URLs.

### 6. Relational NoSQL Storage: Amazon DynamoDB
The primary database is **Amazon DynamoDB**. Because DynamoDB scales on-demand and charges based on read/write capacity units rather than hourly compute, it keeps database costs low compared to relational RDS instances. Rephora uses a multi-table layout with targeted GSIs for profiles, books, quizzes, questions, jobs, study sessions, reminders, and leaderboard metrics.

### 7. Email Foundation: Amazon SES
**Amazon SES (Simple Email Service)** is provisioned as part of the AWS footprint and integrated with the identity/email foundation. The current account deletion flow stores `requestDataExport` as a future-ready flag; the user data export email worker is not active yet.

### 8. Serverless Operations: Gardener and Monitoring
The surrounding serverless layer handles operational tasks that should not run in request handlers:
* **Gardener Lambda:** EventBridge invokes a Python 3.12 Lambda every 10 minutes. It scans users marked with `deletedAt`, waits for the 10-day grace period, and cascades physical deletes through DynamoDB.
* **Monitoring Lambda and alarms:** CloudWatch resources and SNS alerts provide availability checks and operational visibility around the EC2 host.
