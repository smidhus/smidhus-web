---
title: "Declarative Environments: Multi-Environment IaC with OpenTofu"
subtitle: "Modularizing cloud resources and ensuring state synchronization, environment namespace suffixing, and execution locks using S3 and DynamoDB."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "7 MIN READ"
difficulty: "DIFFICULTY: INTERMEDIATE"
isSubLog: true
architecture:
  - "OpenTofu infrastructure engine ensuring open-source compliance."
  - "Centralized cloud state storage stored in an encrypted Amazon S3 bucket."
  - "DynamoDB tables serving as atomic state-locking targets for safe deployments."
  - "Strict environment namespace suffixing preventing resource collision across staging and production."
---

Provisioning cloud resources manually through web consoles is slow, error-prone, and impossible to track. A professional software lifecycle demands that infrastructure be declared as code, allowing development and production environments to be created, updated, and destroyed deterministically.

For Rephora’s cloud architecture, we selected **OpenTofu**—the community-driven, open-source fork of Terraform—to declare our resources. By writing declarative infrastructure-as-code configuration files, we ensure that our environment topology is tracked in git alongside our application codebase.

This log details how we structured our multi-environment infrastructure with OpenTofu, highlighting our modular design, resource namespace segregation, and locking strategies.

---

## Why OpenTofu?

OpenTofu provides a drop-in replacement for Terraform while adhering strictly to open-source governance. Beginning with OpenTofu version 1.6, the engine operates independently under the Linux Foundation:
* **Vendor Neutrality:** Guarantees that our infrastructure configuration remains free from sudden licensing changes or restrictive licensing tiers.
* **Community-Led Features:** Implements direct improvements to state handling, plan validation, and provider registry lookups.

By leveraging OpenTofu, Rephora is built on a stable, open-source foundation that guarantees long-term operational freedom.

---

## Modular Architecture and Directory Structure

To prevent code duplication, the infrastructure repository (`rephora_infra`) separates the logical components into highly focused, reusable modules. The `modules/` directory contains ten dedicated infrastructure subdirectories:

* `auth`: Configures Amazon Cognito User Pools, client integrations, and stateless claims validation.
* `compute`: Provisions the EC2 instance, configures Security Groups (ports 22, 80, 443), registers elastic IPs, and defines base systemd supervisions (systemd timers, certificates, Nginx configs).
* `database`: Declares DynamoDB tables (quizzes, questions, user profiles, jobs) and global secondary indexes (GSI) for performance.
* `ecr`: Manages the Amazon Elastic Container Registry (ECR) repositories for Spring Boot backend Docker images.
* `lambda`: Packages and provisions Python Lambdas, timeouts, and EventBridge schedulers for housekeeping cron tasks.
* `messaging`: Provisions SQS queues and SNS topics for asynchronous LLM generation and session notification triggers.
* `monitoring`: Configures CloudWatch log groups and CPU/Memory alert alarms.
* `ses`: Configures domain-level Amazon Simple Email Service (SES) identities and outputs for email-capable AWS flows.
* `ssm`: Manages AWS Systems Manager Parameter Store parameter namespaces for securing secrets and credentials.
* `storage`: Creates the public referer-restricted assets bucket and the fully private assets bucket used for sensitive objects and future pre-signed URL flows.

---

## Environment Isolation: Namespace Suffixing

Because development (`dev`) and production (`prod`) environments are provisioned within the same cloud provider scope, keeping resources segregated is critical. To avoid resource collision and state bleeding, Rephora implements a strict **Environment Namespace Suffixing** convention:

The environments are declared under `environments/dev/` and `environments/prod/`. Each environment directory imports the same ten shared modules from `modules/` but passes a unique environment identifier parameter (`var.environment` value as `dev` or `prod`).

Inside the modules, every physical AWS resource uses this variable to dynamically compute its name:
* **Compute Host Name:** Resolves to `rephora-api-dev` in development and `rephora-api-prod` in production.
* **Firewalls (Security Groups):** Dynamically suffix as `rephora-api-sg-dev` or `rephora-api-sg-prod`.
* **Database Tables:** Separated at the table name level (e.g., `rephora-users-dev` and `rephora-users-prod`).
* **Secrets Hierarchy (SSM Parameter Store):** Variables are isolated inside directory-like namespaces: `/rephora/dev/*` and `/rephora/prod/*`.
* **Application Resource Names:** Runtime resources are suffixed with `-${environment}`, for example `rephora-users-dev`, `rephora-users-prod`, `rephora-gardener-dev`, and `rephora-gardener-prod`.
* **State Bucket Storage:** The bootstrap layer creates separate state backends such as `rephora-infra-tfstate-dev` and `rephora-infra-tfstate-prod`.

This strict suffix isolation guarantees that running a deployment or plan in staging will never touch, rename, or destroy a production resource, avoiding state bleeding and configuration cross-contamination.

---

## State Synchronization: S3 Backend and DynamoDB Locks

In Infrastructure as Code, the **State File** is the engine’s brain. It maps your declarative code to the actual resources running in AWS. If the state file is lost, corrupted, or falls out of sync, the engine cannot track what resources it owns, leading to duplicate resource errors or accidental deletions.

To guarantee safety and allow reproducible deployments from CI/CD pipelines and authorized local tooling, we implement a cloud-managed state backend. The state backend itself is created by the `/bootstrap/dev` and `/bootstrap/prod` directories before the application environments are applied.

[DIAGRAM:rephora-opentofu]

### 1. Centralized S3 State Storage
Instead of saving the state file on a local computer, OpenTofu is configured with an **Amazon S3 backend**. 
* Whenever a CI/CD runner or authorized operator executes a deployment, OpenTofu downloads the state from a secure S3 bucket (`rephora-infra-tfstate-dev` or `rephora-infra-tfstate-prod`).
* The backend enforces server-side encryption and versioning on the S3 bucket, allowing us to restore previous infrastructure states in case of accidental corruption.

### 2. Atomic Locks via DynamoDB
If two developers run a deployment at the same time, they could overwrite each other's changes or trigger race conditions in AWS.
To prevent this, the S3 backend integrates with **Amazon DynamoDB** for state locking:
* Before executing any plan or apply command, OpenTofu requests a lock by writing an atomic record to a DynamoDB lock table (`rephora-infra-tflocks-dev` or `rephora-infra-tflocks-prod`).
* **Lock Active:** If another execution is in progress, OpenTofu blocks the second request and exits with a lock error.
* **Lock Released:** Once the first deployment finishes successfully, OpenTofu writes the updated state to S3 and automatically deletes the lock record from DynamoDB.

This state synchronization and locking pipeline makes Rephora’s deployment workflow concurrent-safe, reliable, and production-ready.
