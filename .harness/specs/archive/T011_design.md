# T011 Technical Design

## 1. Overview
- **Task ID**: T011
- **Implementation Goal**: Add a reusable global footer component and mount it in the root layout using the existing server-rendered layout structure and Smidhus industrial visual system.

## 2. Files To Create Or Modify
- **Create**: `src/app/components/Footer.tsx`
- **Modify**: `src/app/layout.tsx`

## 3. Design Decisions
- The footer should be implemented as a standalone server component because the task only requires static markup, standard links, and CSS-based hover/focus transitions.
- The root layout should own footer composition because the blueprint treats navbar and footer as shared layout primitives.
- The existing `body` and `main` flex-column structure in `src/app/layout.tsx` should remain intact so the footer continues to sit below content on both short and long pages.
- Link metadata for legal actions and creator profiles should be declared in small in-file arrays inside `Footer.tsx` to keep the component concise and make labels and destinations explicit.
- The copyright line should be assembled from component values such as year and suffix text so the rendered output stays exact while satisfying the dynamic text requirement.

## 4. Component Structure
- `Footer.tsx` should export a default `Footer` function.
- The component should render a semantic `<footer>` containing a centered inner wrapper aligned with the site width conventions already used by the navbar.
- The inner wrapper should contain three content groups:
- A legal links group for `PRIVACY POLICY` and `LEGAL NOTICE`.
- A creator profile links group for `X_TWITTER`, `GITHUB`, and `LINKEDIN`.
- A copyright text group rendering `© Copyright 2026, all smidhus dev`.
- The responsive layout should allow wrapping on small screens and a single-row arrangement on medium and larger screens.

## 5. Styling Plan
- Apply the required footer typography using `text-[11px] tracking-wider text-zinc-500 font-mono` on the wrapper or shared content containers.
- Use spacing and flex utilities that preserve readability on mobile and clean distribution on desktop.
- Apply subtle link transitions with opacity changes for hover and focus while preserving visible focus outlines or focus rings.
- Use the existing dark page background and structural border language; a thin top border in `#1F242C` is acceptable for separation if implemented without conflicting with the task intent.

## 6. Layout Integration Plan
- Import `Footer` into `src/app/layout.tsx`.
- Render `<Footer />` after the `<main>` element inside `<body>`.
- Preserve `main` as `flex-1` to maintain footer placement at the bottom of short pages.

## 7. Validation Plan
- Verify that `src/app/layout.tsx` renders `Navbar`, `main`, and `Footer` in that order.
- Verify that the footer exposes a semantic `<footer>` element.
- Verify that the legal and creator link labels exactly match the required strings.
- Verify that the copyright line renders exactly `© Copyright 2026, all smidhus dev`.
- Verify that the responsive class structure supports wrap/stack behavior on small screens and row distribution on wider screens.
- Run `pnpm lint && pnpm typecheck` after implementation.

## 8. Required Agent Profiles
- `builder`

## 9. Delivery Notes
- No additional design, cloud, or data profile is required because the work is limited to a presentational component and root layout integration inside the existing Next.js app.
