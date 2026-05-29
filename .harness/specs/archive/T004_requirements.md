# T004 Requirements

## Task Summary
Implement the landing hero in `src/app/page.tsx` so the homepage presents the centered Smidhus character artwork, the required uppercase headline, and the supporting subtitle defined in the active task.

## Scope
- Update the homepage hero content in `src/app/page.tsx`.
- Reuse the existing public asset `/smidhus_character_logo.svg`.
- Preserve alignment with the project blueprint for Next.js App Router, TypeScript, Tailwind CSS, typography, accessibility, and responsive behavior.

## Out Of Scope
- Adding new navigation actions or CTA buttons.
- Adding glow layers or advanced visual effects beyond the core hero composition.
- Changing global layout, navbar, footer, fonts configuration, or security headers.

## Acceptance Criteria

### AC1. Hero Artwork
When the homepage is rendered, the system shall display the image `/smidhus_character_logo.svg` as the main hero graphic centered within the primary page content.

### AC2. Image Semantics
When the hero artwork is rendered, the system shall use a semantic accessible image implementation with meaningful alternative text for the Smidhus character artwork.

### AC3. Required Headline Copy
When the homepage is rendered, the system shall display the exact headline text `WE ARE BUSY FORGING, DO NOT DISTURB... READY SOON!` in uppercase with no wording changes.

### AC4. Headline Accent
Where the substring `READY SOON!` appears inside the homepage headline, the system shall render that substring using the forge orange color `#FF6B00` while preserving the rest of the headline as a separate contrasting style.

### AC5. Supporting Subtitle Copy
When the homepage is rendered, the system shall display the exact subtitle `Rephora and other Smidhus projects in development.` immediately below the headline.

### AC6. Typography Application
When the homepage headline is rendered, the system shall style it with the project monospace presentation intended for technical and heading elements; when the subtitle is rendered, the system shall style it with the project sans-serif presentation intended for descriptive copy.

### AC7. Centered Composition
When the homepage is rendered on desktop or mobile widths, the system shall keep the hero artwork, headline, and subtitle center-aligned inside the main content area with spacing that preserves a clear visual hierarchy.

### AC8. Responsive Fit
When the homepage is viewed on narrow screens, the system shall keep the hero content readable without horizontal overflow and shall scale spacing and typography to remain usable.

### AC9. Blueprint Compliance
While implementing the homepage hero, the system shall remain compatible with the blueprint constraints for App Router structure, TypeScript, Tailwind CSS styling, and accessible semantic markup.

## Validation
- `pnpm lint && pnpm typecheck`
- `pnpm build`
