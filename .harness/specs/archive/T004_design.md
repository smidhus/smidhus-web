# T004 Technical Design

## Objective
Implement the homepage hero in `src/app/page.tsx` to match the active task and blueprint: centered character artwork, exact uppercase headline, orange emphasis on `READY SOON!`, and the supporting subtitle using the established typography system.

## Implementation Approach
- Keep the implementation server-rendered in `src/app/page.tsx` because the feature is static content and does not require client-side state or browser APIs.
- Continue using `next/image` for the hero asset to stay aligned with framework-supported image handling.
- Preserve the existing page-level centered layout pattern and refine sizing, spacing, and semantic structure only as needed to satisfy the task.
- Use Tailwind utility classes already consistent with the codebase and blueprint color palette.

## Files To Modify

### `src/app/page.tsx`
- Keep `Image` imported from `next/image`.
- Ensure the main section remains the primary hero container for the homepage.
- Render `/smidhus_character_logo.svg` as the centered main visual using `Image` with meaningful `alt` text.
- Render the exact required headline text in uppercase.
- Wrap `READY SOON!` in a dedicated inline element so it can receive the forge orange accent color `#FF6B00`.
- Render the subtitle directly below the headline using the descriptive text style.
- Tune responsive spacing and text sizing so the composition remains centered and readable across mobile and desktop widths.

## Files Not Expected To Change
- `src/app/layout.tsx`
- `src/app/components/Navbar.tsx`
- `src/app/components/Footer.tsx`
- `next.config.js`
- Tailwind or font configuration files

## Technical Notes
- No new components are required because the task scope is limited to a single static homepage section.
- No client component boundary should be introduced.
- No new assets are required because the specified SVG already exists in `public/`.
- Semantic structure should keep the headline as the primary `h1` for the page and the subtitle as supporting body copy.

## Required Agent Profiles
- `builder`

## Validation Plan
- Run `pnpm lint && pnpm typecheck` to verify static correctness.
- Run `pnpm build` to confirm the page compiles cleanly in production mode.
