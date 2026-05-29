# T003 Technical Design

## 1. Overview
- **Task ID**: T003
- **Implementation Goal**: Add a global footer component that matches the Smidhus industrial theme and wire it into the root application layout so it is consistently rendered across pages.

## 2. Files To Create Or Modify
- **Create**: `src/app/components/Footer.tsx`
- **Modify**: `src/app/layout.tsx`

## 3. Design Decisions
- The footer should be implemented as a standalone presentational server component because the required behavior is limited to static markup and CSS hover/focus transitions.
- The root layout should own footer composition because the blueprint defines navbar and footer as shared global layout primitives.
- The layout should continue using `body` as a `min-h-full flex flex-col` container and `main` as `flex-1` so the footer naturally sits after page content and remains at the bottom of short pages.
- Tailwind utility classes should be used directly in the component for visual consistency with the existing navbar implementation and to avoid unnecessary abstraction.

## 4. Component Structure
- `Footer.tsx` should export a default `Footer` function component.
- The component should render a semantic `<footer>` element containing a centered inner container with width constraints aligned to the navbar’s `max-w-6xl` pattern.
- The inner container should use a responsive flex layout:
- On small screens: vertical stacking or wrapping with readable spacing.
- On medium and larger screens: one row with left/right alignment.
- The left group should contain two inline links separated by horizontal spacing.
- The right group should contain the required copyright text as plain text.

## 5. Styling Plan
- Use muted text color `#6B7280` for all footer text.
- Use small text sizing such as `text-xs` or `text-sm`, selecting the smallest size that remains legible and consistent with the mockup intent.
- Apply subtle hover and focus transitions to the links using opacity changes and a transition utility such as `transition-opacity`.
- Preserve the site’s dark industrial appearance by using the existing page background and optionally a thin top border in the structural border color if needed for separation, provided it does not conflict with the task wording.
- Use spacing utilities that keep the footer balanced on both desktop and mobile.

## 6. Layout Integration Plan
- Import `Footer` into `src/app/layout.tsx` alongside `Navbar`.
- Render `<Footer />` after the `<main>` element inside `<body>`.
- Keep the current `main` element as `flex-1` so the footer placement remains stable across routes.

## 7. Validation Plan
- Verify that `src/app/layout.tsx` includes `Navbar`, `main`, and `Footer` in that order.
- Verify that the footer text strings exactly match the task description.
- Verify responsive behavior visually or through class inspection for stacked mobile and split desktop layouts.
- Run `pnpm lint && pnpm typecheck` to confirm no new issues are introduced.

## 8. Required Agent Profiles
- `builder`

## 9. Delivery Notes
- No additional agent profile is required because the task is limited to a single presentational component and root layout composition within the existing design system.
