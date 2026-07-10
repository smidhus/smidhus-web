---
title: "Stateless Identity: Bridging Cognito and Spring Security"
subtitle: "Securing GraphQL endpoints in a distributed system via decoupled JWT authentication and custom token claims enforcement."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "7 MIN READ"
difficulty: "DIFFICULTY: ADVANCED"
isSubLog: true
architecture:
  - "Decoupled auth delegation using AWS Cognito user pools."
  - "Spring Security filter chain validating RSA signatures locally via JWKS."
  - "Custom filters enforcing OAuth2 Access Tokens over standard ID tokens."
---

In distributed architectures, managing user authentication presents a clear tradeoff between latency, security, and systems isolation. During the initial design of Rephora, we wanted to ensure user sessions could be verified across hundreds of concurrent GraphQL queries without hitting a centralized user database or a shared Redis session store. 

This log details how we built a stateless identity bridge between a native mobile app (`rephora_app`), **AWS Cognito**, and a custom **Spring Security** validation pipeline in Java.

---

## The Problem: Stateless Security Without DB Latency

A naive approach to session validation is the classic session token. The client receives an opaque string on login, and for every subsequent request, the API must query a database to check if the session is active and find the associated user ID. Under load, this introduces:
* Substantial read traffic on the database.
* Latency overhead on every query.
* A tight coupling between authentication tables and the core business endpoints.

To avoid this, we chose a stateless JWT architecture. Authentication is delegated to **AWS Cognito**. Users register, log in, and perform password resets directly against AWS Cognito User Pools. The client receives a set of cryptographically signed JSON Web Tokens (JWTs). The backend API then validates these tokens completely offline, utilizing local cryptographic checks.

---

## The Token Lifecycle: Login, Dispatch, and Refresh

To understand the security perimeter, we map the user transaction lifecycle across two distinct loops: the **Authentication Loop** and the **Session Refresh Loop**.

[DIAGRAM:rephora-cognito]

1. **Authentication Loop:**
   * **Login Request:** The mobile app (`rephora_app`) gathers user credentials. Instead of routing credentials to our backend server, the client sends them directly to the AWS Cognito authentication endpoints over TLS.
   * **Token Dispatch:** Cognito evaluates the credentials. Upon successful authentication, it returns a token payload to the client. This payload includes a short-lived `access_token` (expires in 24 hours) and a long-lived `refresh_token` (valid for 30 days / 1 month).
   * **Backend Authorization:** The mobile client caches these tokens securely. When making GraphQL queries, the client attaches the `access_token` to the HTTP `Authorization` header. The Spring Boot backend (`rephora_api`) intercepts this request, parses the token, and performs offline signature validation.

2. **Session Refresh Loop:**
   * **Cache Check & Expiry:** Before dispatching an API request, the mobile client checks its local cache. If the cached `access_token` is expired (or nearing expiry), the client enters the refresh sequence.
   * **Cognito Refresher:** The mobile client sends the cached `refresh_token` directly to AWS Cognito. Cognito verifies the refresh token's signature and expiration state (confirming it is within the 1-month allowed window).
   * **Credential Update:** Cognito issues a fresh `access_token` back to the mobile client. The client updates its local secure cache and continues with the API query, entirely transparent to the user.

---

## Local Signature Verification via JWKS

When a client sends a request to the backend with an `Authorization: Bearer <JWT>` header, the API must verify that:
1. The token was genuinely issued by our AWS Cognito User Pool.
2. The token has not expired.
3. The token has not been tampered with.

Instead of calling a Cognito API endpoint on every request (which would negate all stateless performance gains), the Spring Security filter chain performs local validation. On application startup, the backend downloads Cognito's public key set (JWKS) via a secure HTTP endpoint:

`https://cognito-idp.{aws-region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`

Using these public keys, Spring Boot's JWT decoder validates the token's RSA signature locally. The overhead drops from a network round-trip to a fraction of a millisecond for cryptographic signature checking.

---

## The Security Trap: ID Tokens vs. Access Tokens

While implementing Cognito, we hit a subtle security vulnerability common in modern JWT integrations: token misuse. Cognito issues two types of tokens containing user info:
* **ID Tokens:** Intended for the client application to read profile info (name, email).
* **Access Tokens:** Intended for the backend API to authorize resource requests.

Because both tokens are cryptographically signed by the same Cognito user pool, a standard, out-of-the-box Spring Security JWT decoder will accept *both* as valid authentication. 

However, accepting an ID token on the backend is dangerous. An attacker who intercepts an ID token (which often has a longer lifespan or is exposed to client-side analytics) could replay it to invoke restricted API actions. Furthermore, ID tokens do not contain target-specific OAuth scopes.

### The Fix: Custom Claim Validation

To close this loophole, we implemented a custom token validator inside the Spring Security filter chain. The `TokenUseValidator` checks the standard `token_use` claim embedded in Cognito tokens. 

If a client attempts to access our GraphQL API with an ID token, the `token_use` claim will be `"id"`. The validator inspects this claim and rejects the token, enforcing that only tokens with `"access"` values are authorized.

---

## Injecting the Identity Context

Once a token passes cryptographic checks and is validated as a true access token, Spring Security wraps it inside an `Authentication` context. 

To bridge this security layer with our business domains, we designed a `CognitoJwtExtractor` utility. Cognito assigns a permanent, immutable UUID to every user (the `sub` claim). 

When a GraphQL mutation or query is resolved, the application domain extracts the user's UUID directly from the active security context's principal, reading the stable `sub` claim.

This UUID acts as the aggregate root partition key for all user statistics, study sessions, and flashcard tables. The database layer never needs to look up session tables; it reads the authenticated `sub` key and runs queries with single-digit millisecond latency.
