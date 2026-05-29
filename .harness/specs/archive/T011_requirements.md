# T011 Requirements

## 1. Overview & Context
- **Task ID**: T011
- **Objective**: Define the global footer requirements needed to add a semantically correct, responsive footer aligned with the Smidhus blueprint and current root layout structure.
- **Active Task Summary**: Create `src/app/components/Footer.tsx`, inject it into `src/app/layout.tsx`, render the legal links and creator profile shortcuts, and show the required dynamic copyright text using the prescribed monospaced muted styling.

## 2. Functional Requirements
- The system shall provide a reusable global footer component at `src/app/components/Footer.tsx`.
- The system shall render the footer from `src/app/layout.tsx` so it appears on every route after the main content.
- The footer shall use semantic HTML for site-wide footer content.
- The footer shall style its text with the exact utility intent `text-[11px] tracking-wider text-zinc-500 font-mono` or an equivalent output that preserves the same visual result.
- The footer shall render two functional and independent legal links labeled exactly `PRIVACY POLICY` and `LEGAL NOTICE`.
- The footer shall render three functional and independent creator profile shortcuts labeled exactly `X_TWITTER`, `GITHUB`, and `LINKEDIN`.
- The footer shall render the ownership text using the exact wording `© Copyright 2026, all smidhus dev`.
- The ownership text shall be generated dynamically rather than hard-coded as one single static text node so the copyright symbol and year/value composition can be derived in component code.
- The footer shall support responsive layout behavior that preserves readability on small screens and horizontal distribution on wider screens.
- The footer links shall expose subtle opacity transitions for hover and keyboard focus states.

## 3. Acceptance Criteria (EARS)
- When the application root layout renders any page, the system shall include the global footer after the main content in the page structure.
- When the footer is rendered, the system shall expose a semantic `<footer>` landmark containing legal links, creator profile shortcuts, and copyright text.
- While the footer is displayed on a narrow viewport, the system shall allow the content groups to wrap or stack without truncating labels or causing overlap.
- While the footer is displayed on a medium or larger viewport, the system shall distribute the legal links, creator shortcuts, and copyright text across the footer row with clear separation.
- When the user reads the legal actions, the system shall display exactly `PRIVACY POLICY` and `LEGAL NOTICE`.
- When the user reads the creator shortcuts, the system shall display exactly `X_TWITTER`, `GITHUB`, and `LINKEDIN`.
- When the user hovers over or tabs to any footer link, the system shall apply a subtle opacity transition while preserving accessible focus visibility.
- When the footer is rendered, the system shall display its text in a muted gray presentation consistent with `text-zinc-500` against the blueprint background `#0A0D10`.
- When the footer renders the ownership text, the system shall display exactly `© Copyright 2026, all smidhus dev`.
- If the footer component computes the ownership text from variables or expressions, the system shall still render the exact required final string with no punctuation or domain suffix changes.

## 4. Non-Functional Constraints
- The implementation shall follow the Next.js App Router structure already present in `src/app`.
- The implementation shall prefer a server component and shall not introduce client-side state or effects because the required interactions can be satisfied with standard links and CSS transitions.
- The implementation shall preserve the root layout flex-column structure so the footer remains a global layout primitive beneath route content.
- The implementation shall use Tailwind utilities consistent with the existing codebase styling approach.
- The implementation shall avoid `any`, manual DOM manipulation, and unnecessary abstractions.
- The implementation shall pass the blueprint validation pipeline relevant to source changes: `pnpm lint && pnpm typecheck`.

## 5. Out of Scope
- Creating full destination pages for privacy policy or legal notice content.
- Introducing analytics, tracking, or external embed behavior in the footer links.
- Modifying the homepage content, navbar behavior, or global typography configuration beyond footer integration.
