# T014 Technical Design

## 1. Objective
Adjust the legal document page so the existing markdown-driven legal route matches the blueprint's Dark Forge Industrial theme and the task's specific visual requirements, without changing the persistence model or routing behavior established in `T013`.

## 2. Current State
- `src/app/legal/[slug]/page.tsx` already exists as an async server component.
- The route already loads legal markdown content through `getLegalDocument`, generates static params, and calls `notFound()` for missing documents.
- The page already contains a first-pass breadcrumb, container, metadata block, and markdown rendering, but the structure should be tightened around the exact `T014` presentation requirements.

## 3. Proposed Changes
- Refine `src/app/legal/[slug]/page.tsx` layout classes to ensure the page wrapper, breadcrumb spacing, article shell, and header composition align with the required industrial mockup.
- Keep the breadcrumb as a `Link` to `/` with the exact text `RETURN // CORE_NODE`, positioned above the article and styled with smooth forge-orange hover transitions.
- Keep the main article container centered at `max-w-3xl` and reinforce the visual shell with:
  - translucent dark background
  - dashed `#1F242C` border
  - subtle orange glow
- Reorganize the article header so the status badge, title, subtitle, and last-updated metadata read as a cohesive header block.
- Strengthen markdown typography by applying route-local prose overrides so:
  - long-form paragraph content reads with Inter-based body styling
  - section headings render with monospace/Fira Code styling
  - spacing and contrast remain consistent with the Smidhus theme

## 4. Files To Modify
- `src/app/legal/[slug]/page.tsx`

## 5. Files Not Expected To Change
- `src/lib/legal.ts` or equivalent legal data loader files, because `T014` is a presentation refinement task rather than a content-loading task.
- `src/app/layout.tsx`, unless implementation reveals an unavoidable shared layout issue.
- `src/app/globals.css`, unless route-local markdown styling cannot be expressed cleanly with existing utility classes.

## 6. Implementation Notes
- Preserve the server component signature and existing `generateStaticParams()` behavior.
- Preserve the existing markdown renderer unless a formatting gap blocks the required typography.
- Favor utility-class refinements over introducing new abstraction layers for a single route.
- Keep the design accessible by maintaining strong contrast and visible interactive states, per the blueprint.

## 7. Validation
- Run `pnpm lint && pnpm typecheck`.
- Confirm the legal page still renders existing markdown documents and still returns `notFound()` for an invalid slug.

## 8. Required Agent Profiles
- `builder`

Rationale: The task is a bounded implementation and refinement of an existing Next.js route with explicit visual and structural requirements. No separate cloud or design exploration profile is strictly required to execute this design.
