---
title: "High-Performance Media: Referer Signature and Mobile Asset Caching"
subtitle: "Serving avatar assets from S3 with referer-restricted requests, manifest caching, and CachedNetworkImage in Flutter."
date: "JULY 2026"
status: "STATUS: OFFICIALLY_PUBLISHED"
module: "REPHORA"
readingTime: "6 MIN READ"
difficulty: "DIFFICULTY: INTERMEDIATE"
isSubLog: true
architecture:
  - "Public Amazon S3 assets bucket protected by a custom Referer condition in the bucket policy."
  - "Direct-to-client S3 downloads using the secret signature header to reduce hotlinking."
  - "Flutter caching through `AssetManager`, `SharedPreferences`, ETag checks, and `CachedNetworkImage`."
---

Delivering rich media assets, such as custom profile avatars, is key to maintaining a polished and personalized study environment. However, exposing these assets publicly via open endpoints makes them vulnerable to scraping and hotlinking.

At the same time, funneling raw file bytes through a backend API monolithic container to protect them creates severe memory bottlenecks, limits scaling, and increases latency.

This log details how we designed a direct-to-client media pipeline using **Amazon S3 Referer Signature policies** and implemented a client-side asset manifest plus avatar cache in Flutter.

---

## Securing the Source: Public Assets with Referer Policy

Profile avatars and the asset manifest are stored in the **public assets S3 bucket** (`rephora-public-assets-*`). This bucket intentionally allows public object reads through a bucket policy, but the policy requires a specific **`Referer` header signature**.

This is an anti-hotlinking control, not a private-data security boundary. Sensitive artifacts belong in the separate private assets bucket, where public access is blocked and access is designed around pre-signed URLs.

---

## Direct-to-Client Delivery: Bypassing the Backend proxy

To prevent backend memory pressure and keep API latency low, the Spring Boot Monolith is decoupled from the avatar file transfer pipeline. The backend stores user profile/avatar metadata, while the static bytes are fetched directly by the Flutter client.

The actual asset download is performed directly by the **Flutter Mobile Client** (`rephora_app`):
1. The Flutter client resolves the static S3 asset URL (e.g. `https://rephora-assets.s3.amazonaws.com/avatars/avatar_01.png`).
2. When making the HTTP GET request to download the file directly from S3, the client injects the custom security header:
   ```text
   Referer: AppConfig.s3SecretSignature
   ```
3. Amazon S3 validates the header signature and streams the file bytes directly to the mobile device.

By using this direct-to-client model, we eliminate monolithic proxy bottlenecks for static assets, keeping file delivery fast and lightweight.

[DIAGRAM:rephora-media]

---

## Eliminating Overhead: Manifest and Avatar Caching

Fetching the same manifest and avatar images repeatedly wastes mobile data and drives up S3 reads. To optimize performance, the Flutter client implements two concrete caching paths:

### 1. Asset Manifest Caching via AssetManager
The `AssetManager` downloads the configured `assets_manifest.json` from S3 with the same `Referer` signature header.
* It stores the manifest JSON in `SharedPreferences` under an app-local cache key.
* It stores the response `ETag` and sends it back as `If-None-Match` on later syncs.
* If S3 returns `304 Not Modified`, the client keeps using the local manifest instead of downloading the JSON again.
* The parsed manifest drives avatar discovery and ordering in the app.

### 2. Avatar Caching via CachedNetworkImage
For user avatars, the Flutter UI uses the **`CachedNetworkImage`** package:
* It intercepts the network load call and injects the required custom `Referer` headers to authenticate the request against S3.
* Once S3 streams the avatar, `CachedNetworkImage` stores and reuses the image through its normal Flutter image cache behavior.
* Subsequent profile or leaderboard views can render the avatar from cache instead of repeating the same S3 request.

This manifest-plus-image-cache strategy reduces repeated downloads while keeping the backend out of the static asset path. Soundtrack playback and local audio-file persistence are not part of the current visible Flutter implementation, so they are intentionally excluded from this log.
