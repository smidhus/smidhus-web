# T007 Technical Design

## Scope
Implement the active products section directly in the home page without introducing new shared components or client-side state. The section should extend the existing landing page composition and remain compatible with the current static App Router setup.

## Files To Modify
- `src/app/page.tsx`

## Files To Create
- None.

## Design Decisions
- Keep the implementation inside `src/app/page.tsx` because the task adds a single page-specific section and does not yet justify extraction into reusable components.
- Reuse the existing page styling conventions: dark background, thin structural borders, monospace headings and technical labels, orange hover emphasis, and accessible focus rings.
- Use semantic sectioning with a dedicated `section` element and `id="projects"` to support in-page navigation and future links from the hero actions or navbar.
- Represent the two products as local data within the page component or as inline JSX blocks, choosing the smaller implementation that keeps the content easy to maintain.

## Implementation Outline
1. Restructure the top-level page wrapper so the existing hero remains intact and a second section can be appended below it in the same page flow.
2. Add a new `section` with `id="projects"` after the hero content.
3. Add a section heading `[THE FORGE OUTPUT]` and optional short supporting copy only if needed to balance spacing; avoid adding unrequested marketing content.
4. Render two product cards for `REPHORA` and `SMIDHUS-HARNESS`.
5. Style the cards as a responsive grid: one column on small screens, two columns on large screens.
6. Within each card, include:
   - product name
   - status badge line
   - product description
   - centered `VIEW TECHNICAL SPECS` action
7. Use anchor or button styling for the action, but keep the implementation non-destructive and accessible even if the destination is a placeholder for now.

## Technical Constraints
- Keep server-rendered behavior by avoiding new client components.
- Do not introduce `any` or unnecessary abstraction.
- Preserve current imports unless new framework imports are strictly necessary.
- Maintain accessible contrast and focus-visible treatment per the blueprint.

## Required Agent Profiles
- `builder`

## Validation
- `pnpm lint && pnpm typecheck`
