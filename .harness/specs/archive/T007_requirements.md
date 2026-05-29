# T007 Requirements

## Overview
- Task ID: `T007`
- Objective: add the `[THE FORGE OUTPUT]` products section to the landing page in `src/app/page.tsx` as a responsive two-column dashboard-style grid linked by the `#projects` anchor.

## Acceptance Criteria (EARS)
- When the home page renders, the system shall include a section with the HTML `id` set to `projects` so in-page navigation can target `#projects`.
- When the products section renders, the system shall display the heading text `[THE FORGE OUTPUT]` using the established industrial visual language of the page.
- When the viewport is below the desktop breakpoint, the system shall render the product cards in a single-column layout with readable spacing and no horizontal overflow.
- When the viewport reaches the desktop breakpoint, the system shall render exactly two product cards in a two-column grid.
- Where a product card is rendered, the system shall use thin borders, monospace technical labels, and dashboard-like spacing consistent with the blueprint theme colors `#0A0D10`, `#1F242C`, and `#FF6B00`.
- When the `REPHORA` card renders, the system shall display the product name `REPHORA`, the badge text `STATUS: STABLE // BETA ACCESS`, and the description `Cognitive Flashcard Engine powered by LLM Feedbacks`.
- When the `SMIDHUS-HARNESS` card renders, the system shall display the product name `SMIDHUS-HARNESS`, the badge text `STATUS: IN DEVELOPMENT // OPEN SOURCE`, and the description `SDD (Spec-Driven Development) Framework for AI-Assisted Workflows`.
- Where a product card is rendered, the system shall include a centered call-to-action labeled `VIEW TECHNICAL SPECS`.
- When a user focuses or hovers a product card call-to-action, the system shall present a visible interactive state that preserves keyboard accessibility and the existing forge glow style.
- While implementing this task, the system shall preserve the existing hero content, particle layer behavior, and page-level semantics already present in `src/app/page.tsx`.

## Validation
- Run `pnpm lint && pnpm typecheck`.
