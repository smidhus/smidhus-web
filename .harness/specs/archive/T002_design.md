# T002 Technical Design

## 1. Scope
Implement the global Navbar component requested by `T002` and integrate it into the root App Router layout without changing unrelated page content.

## 2. Architecture Notes
- Keep the implementation aligned with the blueprint's component-driven structure by introducing a dedicated component under `src/app/components/`.
- Prefer a server component for `Navbar` because the task only requires static rendering and no client-side state or browser APIs.
- Reuse the font variables already registered in `src/app/layout.tsx` and exposed through `src/app/globals.css`.

## 3. Files to Create or Modify
- **Create** `src/app/components/Navbar.tsx`
  - Export a `Navbar` component.
  - Use semantic structure such as a wrapping `header` and/or `nav` landmark.
  - Render a horizontal brand row containing:
    - `next/image`
    - `src='/smidhus_logo.svg'`
    - `width={32}`
    - `height={32}`
    - `alt='Smidhus Logo'`
    - Brand text `SMIDHUS`
  - Apply Tailwind classes that satisfy the task styling requirements:
    - `backdrop-blur-md`
    - `bg-[#0A0D10]/80`
    - bottom border using `#1F242C`
    - horizontal alignment between icon and text
    - Fira Code presentation for the brand text, with bold uppercase and `tracking-wider`
- **Modify** `src/app/layout.tsx`
  - Import `Navbar`.
  - Wrap `children` in a main content container if needed so the Navbar is clearly above the route content.
  - Preserve existing metadata and font setup.
- **No change planned** for `src/app/page.tsx` in this task.

## 4. Dependency and Risk Notes
- The requested asset path `/smidhus_logo.svg` is currently absent from `public/` in the repository state reviewed for this design.
- Implementation depends on that asset being added before validation can fully pass at runtime.
- The builder should not invent a replacement asset unless product direction explicitly approves it.

## 5. Verification Plan
- Run `pnpm lint && pnpm typecheck` after the code change.
- Manually verify that the Navbar renders above page content and that the brand row remains horizontally aligned on desktop and mobile widths.

## 6. Required Technical Profiles
- `builder`
