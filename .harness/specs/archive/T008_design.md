# T008 Technical Design

## Scope
Implement the `[CORE STACK & SYSTEMS]` section directly in the home page so it extends the current landing page composition without introducing unnecessary client state or new shared components. The section should remain compatible with the current static App Router approach and existing visual language.

## Files To Modify
- `src/app/page.tsx`

## Files To Create
- None.

## Design Decisions
- Keep the implementation inside `src/app/page.tsx` because the task adds one page-specific section and the current page already contains adjacent section-level content for the same landing experience.
- Model the three system blocks as local data or inline JSX, choosing the smaller implementation that keeps the copy easy to maintain and avoids premature abstraction.
- Reuse the existing section layout patterns already used for the hero and products section: centered content container, monospace headings, restrained orange accent states, and structural borders.
- Use a semantic `section` element with `id="systems"` so future navigation can link directly to the architecture content.

## Implementation Outline
1. Extend the page structure in `src/app/page.tsx` by appending a new section after the existing `#projects` block.
2. Add a section heading `[CORE STACK & SYSTEMS]` and only minimal supporting copy if spacing or readability requires it.
3. Render three architecture blocks for `.01 / AI ARCH`, `.02 / SDD MENTALITY`, and `.03 / EDGE RUNTIME`.
4. Style the container as a responsive grid that stacks on small screens and becomes three columns on large screens.
5. Apply dashed borders with `#1F242C`, dark panel backgrounds, monospace labels, and accessible body text aligned with the blueprint palette and typography rules.
6. Ensure the section integrates without disturbing the existing particle overlay, hero composition, or products section spacing.

## Technical Constraints
- Keep server-rendered behavior by avoiding new client components for this task.
- Do not introduce `any` or unnecessary abstractions.
- Preserve existing imports unless new framework imports are strictly necessary.
- Maintain accessible contrast, semantic structure, and responsive behavior per the blueprint.

## Required Agent Profiles
- `builder`

## Validation
- `pnpm lint && pnpm typecheck`
