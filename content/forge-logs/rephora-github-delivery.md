---
title: "Continuous Delivery: Unified CI/CD Pipelines"
subtitle: "Automating multi-project deployments: from declarative OpenTofu GitOps to Spring Boot Dockerization and Flutter application releases."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "9 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "OIDC-based cloud access for infrastructure and mobile release pipelines."
  - "GitOps OpenTofu workflows with Gemini-powered AI code architects."
  - "ECR docker builds coupled with SSM agentless push deployments to EC2."
  - "Signed Android App Bundles streamed directly to the Google Play Store."
---

Modern software systems are composed of multiple moving parts. For Rephora, our production ecosystem depends on three distinct project directories: the cloud infrastructure config (`rephora_infra`), the Spring Boot backend (`rephora_api`), and the Flutter mobile client (`rephora_app`).

Managing updates to these three systems manually would slow down development and introduce configuration errors. To solve this, we built a unified **Continuous Integration and Continuous Delivery (CI/CD)** pipeline using **GitHub Actions**.

This log breaks down the deployment workflows for our infrastructure, backend, and mobile applications, explaining how we enforce security gates, utilize serverless configurations, and automate releases.

---

## The Delivery Ecosystem

The diagram below maps our unified deployment pipeline, illustrating how code changes in the three Rephora projects trigger automated compilation, testing, and deployment to AWS and the Google Play Store.

[DIAGRAM:rephora-github]

---

## 1. Infrastructure Pipeline: OpenTofu GitOps

To manage our cloud topology, the `rephora_infra` workflow automates code linting, planning, and deployment.

### Pull Request Quality Gates
When a pull request (PR) is opened against the `main` branch:
* **Validation:** The pipeline runs format checks (`tofu fmt -check`) and validates syntax.
* **AWS OIDC Connection:** The runner connects to AWS using **OpenID Connect (OIDC)** via `aws-actions/configure-aws-credentials`, assuming a temporary role. This completely eliminates the need to store long-lived static AWS access keys inside GitHub Secrets.
* **AI Solutions Architect (Repha Cloud):** The pipeline triggers a **Gemini** review script. Gemini audits the code changes and the output of the `tofu plan` for security vulnerabilities (like open ports or unencrypted databases) and comments directly on the PR.
* **Plan Generation:** The final plan file is generated to show exactly what resources will be created, modified, or destroyed.

### Automated Staging and Production gates
* **Staging Apply (DEV):** When the PR is merged to `main`, the pipeline automatically runs `tofu apply`. To prevent accidental outages, a script parses the plan with `jq` and blocks the deployment if it detects any resource deletions.
* **Production Apply (PROD):** Production deployments are kept secure. They are triggered manually via `workflow_dispatch` and are restricted to execute code only from the audited `main` branch.

---

## 2. Backend Pipeline: Spring Boot and Docker to EC2

For our Spring Boot monolith (`rephora_api`), the CI/CD pipeline compiles code, runs tests, builds a Docker image, and triggers an agentless deployment to EC2.

### Quality and Security Scans
* **Gradle Build:** Code is compiled using JDK 21 / Gradle, running formatting checks and unit tests.
* **Vulnerability Scanning:** The built JAR is analyzed using the **Trivy Scanner** to identify vulnerable dependencies or library leaks before shipping.
* **Repha Tech Lead (AI Reviewer):** An automated **Gemini** reviewer evaluates the code changes for bad practices (like hardcoded secrets or resource leaks) and comments directly on the specific lines of the pull request.

### Agentless Deployment to EC2
When code is pushed to the `develop` branch:
1. The runner builds a Docker image tagged with the Git SHA.
2. The image is pushed to **Amazon ECR (Elastic Container Registry)**.
3. The workflow authenticates to AWS with GitHub Secrets containing AWS access keys, then queries the running EC2 instance ID and issues a command via **AWS Systems Manager (SSM) Send-Command** (`AWS-RunShellScript`).
4. This command executes a deployment script (`deploy-rephora-api`) directly on the EC2 instance, which pulls the new image from ECR, replaces the active container, and restarts the systemd process.
5. Finally, the runner runs a health check to verify that the readiness probe returns HTTP 200.

Production backend deployment follows a promotion model rather than rebuilding from source. A SemVer tag or manual workflow resolves a target version, pulls the tested `rephora-api-dev:latest` image, retags it into the production ECR repository, deploys it to the production EC2 host through SSM, and verifies the production readiness endpoint.

---

## 3. Mobile Pipeline: Flutter App Releases

Deploying a mobile client requires compiling binaries, signing them with keystores, injecting variables, and uploading them to app stores.

### Dynamic Environment Ingestion
Before compiling the Flutter app, the runner uses **AWS OIDC** to fetch configuration variables from the **SSM Parameter Store** (under `/rephora/prod/mobile/`).
It processes these values into a JSON file (`assets/env/prod.json`), which is injected into the Flutter build process using `--dart-define-from-file`. This keeps API keys and environment constants outside the committed source tree.

### Google Play Store Deployment (Android)
* **Code Generation and Signing:** The runner executes code generation (`build_runner`), runs static analysis (`dart analyze`), and decodes the Android release signing keystore from a secure base64 GitHub Secret.
* **App Bundle Compilation:** The runner compiles a signed Android App Bundle (AAB), injecting the GitHub Run Number as the unique build number.
* **Workload Identity Federation (GCP OIDC):** Instead of storing a static service account JSON key in GitHub, the runner authenticates to Google Cloud using **GCP Workload Identity Federation (OIDC)**.
* **Google Play Console Release:** The signed bundle is automatically uploaded to the **Google Play Store Internal track**, allowing team members to test updates instantly.

An iOS App Store pipeline is not part of the visible GitHub Actions implementation yet, so the current mobile CD log is intentionally scoped to Android internal testing.

By automating these three pipelines, Rephora ensures that infrastructure updates, backend services, and Android mobile releases deploy through repeatable checks instead of manual console work.
