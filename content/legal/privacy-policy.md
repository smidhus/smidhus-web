---

title: "PRIVACY POLICY"
subtitle: "SMIDHUS SOFTWARE FOUNDRY"
lastUpdated: "MAY 2026"
-----------------------

### 1. WHO WE ARE

Smidhus is an independent software foundry focused on building software products, developer tools, backend systems, automation workflows, and digital platforms.

This Privacy Policy explains how Smidhus handles data across its current products, including Rephora and Smidhus-SDD-Harness.

We design our systems with a minimal-data mindset: collect only what is needed, use it for clear product purposes, and remove it when it is no longer required.

### 2. PRODUCTS COVERED BY THIS POLICY

This policy applies to:

* **Rephora**: a learning platform for structured study sessions, concept memorization, quizzes, flashcards, progress tracking, and AI-assisted feedback.
* **Smidhus-SDD-Harness**: an open-source DevTool CLI for Spec-Driven Development workflows that integrates with opencode and the user's own AI providers.

If Smidhus releases additional products, this policy may be updated to describe how those products handle data.

### 3. DATA WE COLLECT IN REPHORA

Rephora collects the minimum account information required to create and maintain a user session.

The primary account identifier is:

* Email address, used through AWS Cognito for authentication, JWT generation, and session management.

Rephora may also store application-specific profile data, such as:

* Nickname or display name.
* Age range.
* Study area or learning interests.
* Daily study goal, such as planned study minutes.

Rephora also stores learning data created through product usage, including:

* Books, decks, quizzes, flashcards, and study materials.
* Study sessions and learning activity.
* Questions answered by the user.
* Scores, progress indicators, experience gained, and similar learning metrics.
* AI-assisted feedback generated during study flows.

This data exists to operate the product, personalize the study experience, track progress, and help users improve their learning process.

### 4. DATA HANDLING IN SMIDHUS-SDD-HARNESS

Smidhus-SDD-Harness is an open-source CLI DevTool.

Smidhus-SDD-Harness does not require a Smidhus user account to operate and does not directly manage Smidhus-hosted user profiles.

The tool is designed to work locally with opencode and the AI providers configured by the user. Any interaction with external AI providers depends on the user's own configuration, subscriptions, credentials, and provider settings.

Users are responsible for reviewing the privacy terms, data handling practices, and retention policies of the AI providers they connect through opencode.

### 5. HOW WE USE DATA

Smidhus uses collected data to:

* Authenticate users and manage secure sessions.
* Provide Rephora's learning features.
* Store user-created study content.
* Track learning progress and study history.
* Generate and display AI-assisted feedback.
* Maintain product reliability, security, and operational integrity.
* Process account deletion and data removal workflows.
* Improve the product experience based on usage patterns and technical behavior.

We do not sell user data to data brokers.

We do not use private user study content as a standalone product for sale.

### 6. AI-ASSISTED FEEDBACK

Some Rephora features may use AI-assisted evaluation to provide feedback on user answers.

The data processed for this purpose may include:

* The question or flashcard being answered.
* The user's answer.
* The expected answer or learning target.
* Context required to generate useful feedback.

AI-assisted feedback is intended to support learning and should not be treated as professional, academic, medical, legal, or financial advice.

### 7. DATA STORAGE AND INFRASTRUCTURE

Smidhus currently uses AWS services to operate its products.

Depending on the product feature, data may be processed or stored using services such as:

* AWS Cognito for authentication and session management.
* Amazon DynamoDB for application data.
* Amazon SNS and Amazon SQS for event-driven processing and background workflows.

Data handled by Smidhus products is processed between the application and AWS-based infrastructure according to the technical architecture of each product.

### 8. SECURITY PRACTICES

Smidhus applies reasonable technical and organizational measures to protect user data.

These measures may include:

* Authentication through AWS Cognito.
* Encrypted communication over HTTPS/TLS.
* Access controls for application services.
* Separation of authentication data and application data where appropriate.
* Event-driven processing through managed AWS services.
* Data deletion workflows for account closure.

No digital system can be guaranteed to be completely secure. However, Smidhus works to reduce unnecessary data exposure and maintain responsible operational practices.

### 9. ACCOUNT DELETION AND DATA REMOVAL

When a Rephora user requests account deletion, Smidhus may first apply a soft-delete period.

During this period:

* The account is marked for deletion.
* The user is given a grace period of 10 days to restore the account.
* The user may be asked whether they want to receive a report of their data before final deletion.

After the 10-day grace period expires, Smidhus may trigger a deletion workflow to remove the user's records from application databases and authentication systems, including DynamoDB and AWS Cognito, unless retention is required by law, security needs, dispute resolution, or operational obligations.

### 10. USER RIGHTS

Depending on applicable law, users may have the right to:

* Request access to their personal data.
* Request correction or update of inaccurate data.
* Request deletion of their account and related data.
* Ask questions about how their data is processed.
* Withdraw consent where processing is based on consent.

Requests can be sent to:

**[hello@smidhus.com](mailto:hello@smidhus.com)**

### 11. DATA RETENTION

Smidhus keeps user data only for as long as needed to provide the product, comply with legal obligations, resolve disputes, maintain security, or complete deletion workflows.

Learning data may remain available while the account is active because it is part of the user's product experience.

When an account deletion workflow is completed, Smidhus aims to remove the user's application records and authentication records from active systems, subject to reasonable technical limitations and lawful retention requirements.

### 12. THIRD-PARTY SERVICES

Smidhus may rely on third-party infrastructure and service providers to operate its products.

For Rephora, this currently includes AWS-based infrastructure.

For Smidhus-SDD-Harness, external AI provider interaction depends on the user's own opencode and provider configuration.

Smidhus is not responsible for the independent privacy practices of third-party services selected, configured, or authorized by the user.

### 13. CHANGES TO THIS POLICY

Smidhus may update this Privacy Policy as products, infrastructure, or legal requirements evolve.

When material changes are made, the `lastUpdated` date will be updated. Continued use of Smidhus products after changes means the user accepts the updated policy.

### 14. CONTACT

For privacy questions, account deletion requests, or data-related inquiries, contact:

**[hello@smidhus.com](mailto:hello@smidhus.com)**
