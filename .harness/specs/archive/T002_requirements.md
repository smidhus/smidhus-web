# T002 Requirements

## 1. Overview & Context
- **Task ID**: `T002`
- **Objective**: Add a reusable global navigation component for the Smidhus site and mount it in the root App Router layout so it appears above the main page content.
- **Blueprint Alignment**: The implementation must follow the component-driven architecture, preserve semantic HTML, and respect the Dark Forge Industrial theme defined in `.harness/blueprint.md`.

## 2. Functional Requirements
- The solution must introduce a dedicated navigation component at `src/app/components/Navbar.tsx` instead of embedding navigation markup directly in `src/app/layout.tsx`.
- The navigation must use semantic navigation markup so the global header is identifiable to assistive technologies.
- The navigation visual container must apply a blurred translucent background using `backdrop-blur-md bg-[#0A0D10]/80`.
- The navigation visual container must render a thin bottom border using the structural border color `#1F242C`.
- The left section of the navigation must render the brand isotipo with the exact element contract `Image src='/smidhus_logo.svg' width={32} height={32} alt='Smidhus Logo'`.
- The left section of the navigation must render the label `SMIDHUS` horizontally aligned with the isotipo.
- The `SMIDHUS` label must appear in uppercase, bold, with wide letter spacing, and use the Fira Code font already configured in the application.
- The root layout at `src/app/layout.tsx` must render the Navbar above the main content tree so all routes inherit it.

## 3. Acceptance Criteria (EARS)
- **WHEN** the application root layout renders, **THEN** it **SHALL** include the `Navbar` component before the page content.
- **WHEN** a user opens any route that uses the root layout, **THEN** the interface **SHALL** display a top navigation bar with a translucent dark background blur and a thin bottom border in `#1F242C`.
- **WHEN** the navigation bar renders, **THEN** it **SHALL** show the `/smidhus_logo.svg` brand image at `32x32` with the alt text `Smidhus Logo`.
- **WHEN** the navigation bar renders, **THEN** it **SHALL** show the text `SMIDHUS` to the right of the isotipo in uppercase, bold, tracking-wider styling, and Fira Code typography.
- **WHEN** assistive technologies inspect the page structure, **THEN** they **SHALL** detect a semantic navigation landmark for the global navigation.
- **IF** the `/smidhus_logo.svg` asset is not present in `public/`, **THEN** the implementation **SHALL** be treated as blocked until the asset is added or explicitly substituted by a validated product decision.

## 4. Validation Requirements
- Run `pnpm lint && pnpm typecheck`.
- Confirm the root layout compiles without TypeScript or ESLint warnings introduced by the navigation integration.
