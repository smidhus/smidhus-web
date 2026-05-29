# T001 Requirements

## 1. Overview & Context
- **Task ID**: T001
- **Objective**: Initialize a clean Next.js project using TypeScript and the App Router, configure the base Smidhus visual tokens, preload the required Google fonts with `next/font/google`, and enforce the requested HTTP security headers.
- **Blueprint Alignment**: The implementation must follow the blueprint stack and rules: Next.js App Router, React, TypeScript, Tailwind CSS, `pnpm`, strict typing, and validation through linting, type-checking, tests, and build.

## 2. Functional Requirements

### FR-1 Project Bootstrap
- The project must be scaffolded as a Next.js application using TypeScript, the App Router, and Tailwind CSS.
- The generated structure must support page-level routes under `src/app`.
- The dependency manager must be `pnpm`.

### FR-2 Base Theme Tokens
- Tailwind configuration must expose the Smidhus base color tokens:
  - `#0A0D10` as the primary background color.
  - `#FF6B00` as the forge orange accent color.
  - `#00FF66` as the terminal green accent color.
  - `#1F242C` as the structural border color.
- These tokens must be available for use from application source files through Tailwind utility classes or theme extensions.

### FR-3 Typography Setup
- The application must preload Google fonts using `next/font/google`.
- `Fira Code` must be configured for headings, navigation, and technical UI elements.
- `Inter` must be configured for general descriptive text.
- Font setup must be applied from the root layout so downstream pages and shared components can inherit the correct typography primitives.

### FR-4 HTTP Security Headers
- `next.config.js` must enforce the following headers for application responses:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- The header configuration must use supported Next.js configuration APIs.

### FR-5 Clean Validation State
- The initialized project must complete the blueprint validation pipeline without warnings introduced by the implementation.
- The codebase must remain compatible with strict TypeScript settings and standard Next.js linting.

## 3. Acceptance Criteria (EARS)
- **Ubiquitous**: The repository SHALL contain a runnable Next.js App Router project configured with TypeScript, Tailwind CSS, and `pnpm` metadata.
- **Ubiquitous**: The Tailwind theme SHALL expose color tokens representing the blueprint background, forge orange, terminal green, and structural border values.
- **Ubiquitous**: The root layout SHALL load `Fira Code` and `Inter` using `next/font/google` and make them available to the application shell.
- **Ubiquitous**: The Next.js runtime SHALL emit `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin` through framework configuration.
- **When** the maintainer runs `pnpm lint && pnpm typecheck`, **the system shall** complete successfully with zero warnings attributable to the implementation.
- **When** the maintainer runs `pnpm build`, **the system shall** complete successfully.
- **When** the maintainer runs `pnpm test`, **the system shall** complete successfully, even if the initial suite is minimal.

## 4. Non-Functional Constraints
- Keep the implementation minimal and aligned with a clean greenfield setup.
- Prefer server-rendered defaults and avoid adding client components unless required.
- Follow blueprint code-style rules, including concise English comments only when needed.
- Do not add unnecessary libraries beyond what is needed for the requested stack bootstrap.
