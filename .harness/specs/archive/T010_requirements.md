# T010 Requirements

## 1. Overview & Context
- **Task ID**: T010
- **Objective**: Refine the visual fidelity of the landing page cards and framed content blocks so they consistently match the industrial dark-forge system defined in the project blueprint and the reference mockup `T010_mockup_smidhus_footer.png`.
- **Scope**: The work applies to card-like containers, badges, action controls, and section identifiers rendered by the landing experience and the technical drawer, without changing existing copy, navigation targets, or interaction semantics.

## 2. Functional Requirements
- [ ] All secondary content containers in the landing experience use a consistent semi-opaque surface treatment based on `bg-[#0A0D10]/40` and clean structural borders using `#1F242C`.
- [ ] Hover-capable cards and framed controls expose a subtle idle forge glow and a stronger hover glow that remain visually restrained and readable on the dark background.
- [ ] All section identifiers and technical numeric labels use the monospace heading treatment and the forge orange accent color consistently.
- [ ] The existing responsive layout, drawer behavior, and button interactions remain intact after the styling refinement.

## 3. Acceptance Criteria (EARS)
- **AC-01**: When the home page renders the product cards, system cards, and other framed secondary blocks, the system shall apply a shared surface style that includes a semi-opaque `#0A0D10` background at approximately 40% opacity and visible structural borders in `#1F242C`.
- **AC-02**: When a user views any interactive card or framed action element in its default state, the system shall render a subtle forge glow equivalent to `shadow-[0_0_30px_rgba(255,107,0,0.03)]` or a visually equivalent restrained value.
- **AC-03**: When a user hovers an interactive card or framed action element, the system shall intensify the forge glow to approximately `rgba(255,107,0,0.12)` without reducing text contrast or obscuring borders.
- **AC-04**: When the home page renders section identifiers such as `01 //`, `02 //`, or `.01 /`, the system shall display them using the Fira Code-driven monospace treatment and the forge orange accent color `#FF6B00`.
- **AC-05**: When the styling refinement is applied, the system shall preserve the current semantic structure, existing content strings, responsive grid behavior, and technical drawer open/close flow.
- **AC-06**: If the implementation introduces reusable style tokens or helpers for the refined container treatment, the system shall keep them scoped to the current landing-page experience and aligned with the existing TypeScript and Tailwind conventions.

## 4. Validation Requirements
- [ ] `pnpm lint && pnpm typecheck`
- [ ] Visual verification of the home page at mobile and desktop widths against the reference mockup emphasis on surfaces, glow behavior, and monospace orange identifiers.
