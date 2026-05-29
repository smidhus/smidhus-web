# T003 Requirements

## 1. Overview & Context
- **Task ID**: T003
- **Objective**: Define the footer component and root layout integration required to add a global semantic footer consistent with the Smidhus visual system and blueprint constraints.
- **Active Task Summary**: Create `src/app/components/Footer.tsx` and inject it into `src/app/layout.tsx`. The footer must render muted small text, two inline policy links on the left, and the copyright string on the right.

## 2. Functional Requirements
- The system shall provide a reusable global footer component at `src/app/components/Footer.tsx`.
- The system shall render the footer from `src/app/layout.tsx` so it appears on every route below the main content area.
- The footer shall use semantic HTML for site-wide footer content.
- The footer shall present its content in a two-zone horizontal layout on medium and larger screens, with the policy links on the left and the copyright text on the right.
- The footer shall stack or wrap its content on smaller screens without truncating or overlapping text.
- The footer shall render the link labels exactly as `PRIVACY POLICY` and `LEGAL NOTICE`.
- The footer shall render the ownership text exactly as `© Copyright 2026, all smidhus.dev`.
- The footer shall style the text using a muted gray matching `#6B7280`.
- The footer shall use a small, clean font size aligned with the project’s understated industrial theme.
- The footer links shall expose a subtle opacity transition on hover and keyboard focus.

## 3. Acceptance Criteria (EARS)
- When the application root layout renders any page, the system shall include the global footer after the main content in the page structure.
- When the footer is rendered, the system shall expose a semantic `<footer>` landmark containing the policy links and copyright text.
- While the footer is displayed on a viewport at or above the project desktop breakpoint, the system shall align the policy links to the left side and the copyright text to the right side within the same row.
- While the footer is displayed on a narrow viewport, the system shall allow the content to stack or wrap while preserving readability and spacing.
- When the user reads the left footer actions, the system shall display exactly `PRIVACY POLICY` and `LEGAL NOTICE` in uppercase.
- When the user reads the right footer text, the system shall display exactly `© Copyright 2026, all smidhus.dev`.
- When the user hovers over or tabs to either footer link, the system shall apply a subtle opacity-based visual transition without changing the required wording.
- When the footer is rendered, the system shall display the footer text in muted gray `#6B7280` and maintain accessible contrast against the blueprint background `#0A0D10`.

## 4. Non-Functional Constraints
- The implementation shall follow the Next.js App Router component structure already present in `src/app`.
- The implementation shall prefer static server-rendered markup and shall not introduce a client component unless interactivity requires it.
- The implementation shall use existing Tailwind utility styling conventions already used by the navbar and layout.
- The implementation shall preserve the root layout flex-column structure so the footer remains a global layout primitive.
- The implementation shall pass the blueprint validation pipeline: `pnpm lint && pnpm typecheck`, and should not introduce warnings attributable to the footer change.

## 5. Out of Scope
- Routing destinations or page implementations for the legal links.
- Any homepage hero or footer animation beyond the required subtle opacity transition.
- Changes to the navbar, typography configuration, or security headers.
