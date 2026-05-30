## T001

- Scaffolded a new Next.js App Router project with TypeScript, Tailwind, and pnpm metadata in the project root.
- Added baseline quality scripts in `package.json` for `lint`, `typecheck`, `test`, and existing `build`.
- Implemented security headers in `next.config.js` for `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
- Added `tailwind.config.ts` with Smidhus color tokens (`smidhusBackground`, `smidhusForgeOrange`, `smidhusTerminalGreen`, `smidhusBorder`).
- Replaced default font setup in `src/app/layout.tsx` with `Inter` and `Fira Code` via `next/font/google` and wired them globally in `src/app/globals.css`.
- Added tests in `tests/bootstrap-config.test.ts` to validate Tailwind token exposure and required security headers.
- Validation completed: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build` all pass.

## T002

- Added `src/app/components/Navbar.tsx` as a reusable server component with semantic navigation markup (`<header><nav>`) and required Dark Forge styling (`backdrop-blur-md`, `bg-[#0A0D10]/80`, `border-b border-[#1F242C]`).
- Implemented the brand row contract with `next/image` using `src='/smidhus_logo.svg'`, `width={32}`, `height={32}`, `alt='Smidhus Logo'`, plus `SMIDHUS` text in uppercase, bold, and `tracking-wider` with monospace presentation.
- Updated `src/app/layout.tsx` to mount `Navbar` above route content and wrapped children in a `main` container so all root routes inherit global navigation.
- Added tests in `tests/navbar-layout.test.tsx` first to validate nav landmark semantics, required brand/image contract, styling class presence, and root layout ordering (navbar before main content).
- Validation completed: `pnpm test`, `pnpm lint`, and `pnpm typecheck` all pass with no warnings.

## T004

- Added test-first coverage in `tests/home-hero.test.tsx` to validate the hero image source, centered composition intent, exact uppercase headline text contract, forge-orange emphasis on `READY SOON!`, and required subtitle copy.
- Replaced the default starter content in `src/app/page.tsx` with the Smidhus hero presentation centered on `/smidhus_character_logo.svg` and the specified messaging.
- Styled the headline with monospace uppercase treatment and explicit `text-[#FF6B00]` emphasis for `READY SOON!`, then placed the subtitle directly beneath using descriptive body styling.
- Validation completed: `pnpm test`, `pnpm lint`, and `pnpm typecheck` all pass.

## T003 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.
- `pnpm lint && pnpm typecheck` passed.
- `pnpm build` passed, but emitted a Node experimental warning during `next build`.
- `pnpm test` passed all assertions, but the run was not clean: `tests/home-hero.test.tsx` emitted a React warning on stderr: `Received true for a non-boolean attribute priority.`
- Broken audit criterion: the validation output is not fully green, so the task cannot be approved under the gatekeeper protocol.
- Likely follow-up for the builder: remove or adjust the `priority` prop usage that is leaking to the rendered DOM in the hero image path tested by `tests/home-hero.test.tsx`, then rerun the full validation suite until stdout/stderr is clean.

## T004 Follow-up

- Strengthened `tests/home-hero.test.tsx` first to assert meaningful hero image alt text (`Smidhus character artwork`), full headline contract with inline forge-orange `READY SOON!`, and sans-serif subtitle styling.
- Updated `src/app/page.tsx` to use the required meaningful image alt text and added `font-sans` to the subtitle so typography expectations are explicit at component level.
- Validation completed from project root: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build` all pass.

## T005

- Added tests first in `tests/home-hero.test.tsx` to validate the new radial forge glow contract and the two homepage action controls (`SERVICES`, `PORTFOLIO`) including dashed styling, wrap behavior class intent, and smooth `ease-in-out` transition usage.
- Updated `src/app/page.tsx` by wrapping the hero image in a relative container and inserting a non-interactive decorative glow layer using `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)` behind the artwork.
- Added two semantic action links (`#services`, `#portfolio`) below the subtitle with centered monospace labels, dashed borders, responsive wrapping, hover lighting, and visible focus states compatible with the dark theme.
- Validation completed from project root: `pnpm test`, `pnpm lint && pnpm typecheck`.

## T005 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
- `pnpm lint`, `pnpm typecheck`, the full test suite, and `pnpm build` all completed successfully, but the run was not clean.
- `pnpm test` emitted a React warning on stderr from `tests/home-hero.test.tsx`: `Received true for a non-boolean attribute priority.`
- The warning is consistent with the homepage hero render path in `src/app/page.tsx`, where the `next/image` hero still uses the `priority` prop. Under the gatekeeper protocol, this means the validation output is not fully green.
- `pnpm build` also emitted a Node experimental warning during `next build`: `ExperimentalWarning: Type Stripping is an experimental feature and might change at any time`.
- Broken audit criterion: T005 cannot be approved or archived until the validation output is clean and warning-free.
- Builder follow-up: eliminate the `priority` warning in the tested homepage render path, confirm whether the Node experimental warning is expected in this environment, and rerun the full blueprint pipeline until stdout and stderr are clean.

## T006

- Added tests first in `tests/forge-particles.test.tsx` to validate the particle canvas overlay contract (`pointer-events-none fixed inset-0 z-10`), spark burst generation with radial velocity and `0.95` friction, and yellow-to-orange color interpolation behavior.
- Extended `tests/home-hero.test.tsx` with a page-level integration assertion to ensure the fixed particle overlay mounts and hero content remains in a higher stacking context (`relative z-20`) for readability.
- Created `src/app/components/ForgeParticles.tsx` as a client component using Canvas 2D + `requestAnimationFrame`, with ambient particle drift, inverse-distance cursor attraction on `pointermove`, spark burst spawning on `pointerdown`, per-frame friction and alpha decay, and cleanup for animation/listeners on unmount.
- Updated `src/app/page.tsx` to mount `<ForgeParticles />` while preserving existing hero layout, radial glow, headline, subtitle, and CTA links.
- Validation completed from project root: targeted tests (`pnpm test tests/forge-particles.test.tsx tests/home-hero.test.tsx`), `pnpm lint && pnpm typecheck`, and `pnpm build` all pass.

## T006 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.
- `pnpm lint && pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm test` failed in `tests/navbar-layout.test.tsx` on `global navbar > renders a semantic navigation landmark with brand image and text`.
- Failure details: the rendered navbar markup does not include the required classes `backdrop-blur-md`, `bg-[#0A0D10]/80`, `border-b`, and `border-[#1F242C]`. The current component renders `<nav class="bg-header">`, which breaks the previously specified T002 styling contract.
- Additional regression details in `src/app/components/Navbar.tsx`: the brand image currently renders at `width={31}` and `height={31}` instead of the required `32x32`, and the mocked test render emits `Received true for a non-boolean attribute priority.` because `priority` is being forwarded to the DOM in the test environment.
- Broken audit criterion: the required validation suite is not fully green, so T006 cannot be approved or archived.
- Builder follow-up: restore the exact navbar visual contract expected by `tests/navbar-layout.test.tsx`, correct the image dimensions to `32x32`, address the `priority` warning in the mocked render path if a clean run is required, and rerun the full blueprint pipeline until all checks pass.

## T007

- Added tests first in `tests/projects-section.test.tsx` to verify the new `#projects` anchor section, `[THE FORGE OUTPUT]` heading, responsive `grid-cols-1` to `lg:grid-cols-2` layout, exact product copy, and CTA interaction classes (`hover` and `focus-visible` states).
- Updated `src/app/page.tsx` to keep the existing hero block intact while extending the page flow with a dedicated `section id="projects"` rendered below it.
- Implemented two dashboard-style product cards (`REPHORA`, `SMIDHUS-HARNESS`) with thin structural borders, monospace technical labels, exact required status/description text, and centered `VIEW TECHNICAL SPECS` actions.
- Validation completed for the task gate: `pnpm lint && pnpm typecheck` passed.

## T007 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.
- The run stopped at `pnpm test` because the suite failed before lint, typecheck, or build could execute.
- `tests/home-hero.test.tsx` failed on the exact headline markup assertion. The rendered `READY SOON!` span now includes an extra `drop-shadow-[0_0_15px_rgba(255,107,0,0.35)]` class, so the output no longer matches the literal contract expected by the existing test.
- `tests/home-hero.test.tsx` also failed on the forge glow assertion. The required radial gradient `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)` was changed to a different multi-stop gradient, which regresses the previously specified T005 presentation contract.
- `tests/navbar-layout.test.tsx` failed because the rendered navbar markup no longer contains the required styling classes `backdrop-blur-md`, `bg-[#0A0D10]/80`, `border-b`, and `border-[#1F242C]`; it currently renders `class="bg-header"` instead.
- `pnpm test` also emitted a React warning on stderr: `Received true for a non-boolean attribute priority.` The navbar render path still leaks a `priority` prop into the mocked DOM output, so the validation output is not clean.
- Broken audit criteria: the validation suite is not fully green, and the task cannot be approved or archived while these regressions remain.
- Builder follow-up: restore the exact hero and navbar contracts required by the existing tests, eliminate the `priority` warning in the tested render path, and rerun the full blueprint pipeline until tests, lint, typecheck, and build all pass cleanly.

## T008

- Added tests first in `tests/systems-section.test.tsx` to validate the `#systems` anchor, `[CORE STACK & SYSTEMS]` heading, responsive `grid-cols-1` to `lg:grid-cols-3` behavior, required `.01/.02/.03` labels and technical copy, plus dashed structural styling tokens.
- Updated `src/app/page.tsx` by introducing a local `SYSTEM_BLOCKS` data array and appending a semantic `section id="systems"` after `#projects` to preserve existing hero/particle/products flow.
- Implemented three technical architecture cards (`.01 / AI ARCH`, `.02 / SDD MENTALITY`, `.03 / EDGE RUNTIME`) with dashed `#1F242C` borders, dark panel background, monospace headings, and readable descriptive body text for mobile and desktop.
- Validation completed for task scope: `pnpm test tests/systems-section.test.tsx` and `pnpm lint && pnpm typecheck` pass.
- Note: full `pnpm test` currently remains red due to pre-existing regressions in `tests/home-hero.test.tsx` and `tests/navbar-layout.test.tsx`, unrelated to T008 changes.

## T009

- Added tests first in `tests/technical-drawer.test.tsx` to validate dialog semantics, close control visibility, loading/fallback rendering, and asynchronous spec lookup behavior for `REPHORA`, `SMIDHUS-HARNESS`, and unknown product IDs.
- Created `src/app/components/TechnicalDrawer.tsx` as a reusable client drawer panel (`fixed right-0 top-0 h-full w-full max-w-2xl`) with `role="dialog"`, `aria-modal`, `aria-labelledby`, internal `overflow-y-auto` scrolling, structured sections (summary/architecture/prompt strategy/code), and safe `<pre><code>` rendering.
- Created `src/app/components/TechnicalSpecsExperience.tsx` as the interactive client wrapper that keeps page composition intact, manages shared drawer state, applies page isolation (`opacity-30 blur-sm pointer-events-none`), and resolves specs through async `loadTechnicalSpec(productId)`.
- Refactored `src/app/page.tsx` into a thin server component that renders `TechnicalSpecsExperience`, preserving App Router server composition while isolating interaction state in a client boundary.
- Replaced project card `VIEW TECHNICAL SPECS` links with semantic buttons that open the shared drawer with product-specific payloads.
- Restored regressions required by existing suite contracts: navbar classes and 32x32 logo sizing in `src/app/components/Navbar.tsx`, plus hero span/gradient literals in `src/app/components/TechnicalSpecsExperience.tsx`.
- Validation completed from project root: `pnpm test` and `pnpm lint && pnpm typecheck` pass.

## T010

- Added tests first to enforce the visual-refinement contract: updated `tests/projects-section.test.tsx`, `tests/systems-section.test.tsx`, and `tests/technical-drawer.test.tsx` to assert shared `bg-[#0A0D10]/40` surfaces, `#1F242C` borders, restrained idle glow `shadow-[0_0_30px_rgba(255,107,0,0.03)]`, stronger hover glow `hover:shadow-[0_0_30px_rgba(255,107,0,0.12)]`, and forge-orange monospace identifier styling.
- Updated `src/app/components/TechnicalSpecsExperience.tsx` with a local shared framed-surface class token for cards, switched project/system card surfaces from `/70` to `/40`, added idle+hover glow treatment to interactive framed elements, and introduced explicit orange monospace section identifiers (`01 //`, `02 //`) while preserving existing copy, structure, and behavior.
- Restyled system card identifiers (`.01 /`, `.02 /`, `.03 /`) to consistently use forge-orange monospace accent treatment.
- Updated `src/app/components/TechnicalDrawer.tsx` to align drawer-framed areas and controls with the same surface language: semi-opaque dark background, structural borders, restrained idle glow, stronger hover glow on the close control, and refined framed code block treatment.
- Validation completed from project root: `pnpm test` and `pnpm lint && pnpm typecheck` pass.

## T011

- Added tests first in `tests/footer-layout.test.tsx` to validate semantic footer markup, exact legal/profile labels, required typography utility contract, hover/focus opacity transitions, exact copyright text output, and root layout ordering (footer after `main`).
- Created `src/app/components/Footer.tsx` as a reusable server component using semantic `<footer>` markup, link metadata arrays for legal and creator shortcuts, responsive wrapping layout for mobile/desktop distribution, and subtle interactive link states.
- Implemented dynamic ownership text assembly in component code (`\u00A9`, year, and owner segments) so rendered output is exactly `© Copyright 2026, all smidhus dev`.
- Updated `src/app/layout.tsx` to mount `<Footer />` after `<main>` while preserving the existing global flex-column layout structure.
- Validation completed for task scope: `pnpm test -- tests/footer-layout.test.tsx tests/navbar-layout.test.tsx` (new footer tests pass; suite still includes a pre-existing failure in `tests/systems-section.test.tsx`) and `pnpm lint && pnpm typecheck` pass.

## T011 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.
- `pnpm lint && pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm test` failed in `tests/systems-section.test.tsx` on `core stack and systems section > renders all architecture blocks with required labels and technical content`.
- Failure details: the rendered home markup no longer contains the exact required section identifiers `.01 / AI ARCH`, `.02 / SDD MENTALITY`, and `.03 / EDGE RUNTIME`; it currently renders the headings without the numeric monospace prefixes, which breaks the T008/T010 contract still covered by the active suite.
- `pnpm test` also emitted a React warning on stderr from `tests/navbar-layout.test.tsx`: `Received true for a non-boolean attribute priority.` This means the validation output is not fully clean even where assertions pass.
- Broken audit criteria: the required validation suite is not fully green, so T011 cannot be approved or archived.
- Builder follow-up: restore the exact systems-section identifier text expected by `tests/systems-section.test.tsx`, eliminate the leaking `priority` prop warning in the navbar test render path, and rerun the full blueprint pipeline until tests, lint, typecheck, and build all pass cleanly.

## T012

- Added tests first in `tests/navbar-layout.test.tsx` to cover the new mobile navbar contract: trigger button semantics (`type`, `aria-label`, `aria-expanded`), mobile visibility intent (`md:hidden`), visible focus treatment, and closed-by-default state without mobile panel entries rendered.
- Refactored `src/app/components/Navbar.tsx` into a client component (`"use client"`) with local `isOpen` state and a typed `mobileNavItems` configuration for `01 // PROJECTS`, `02 // SYSTEMS`, and `03 // SOURCE`.
- Implemented a mobile-only hamburger trigger that renders a three-line icon in closed state and transitions to an `X` shape in open state using class-based transforms, while preserving the existing brand block and desktop-safe layout.
- Implemented the mobile dropdown panel with the required forge styling (`absolute top-16 left-0 w-full bg-[#0A0D10]/95 backdrop-blur-lg border-b border-[#1F242C] z-50 flex flex-col p-6 gap-5`) and wired all entries to close the panel on activation.
- Enforced external-link safety for `SOURCE` via `target="_blank"` and `rel="noopener noreferrer"`; preserved keyboard accessibility with focus-visible outlines on the trigger and all menu entries.
- Validation completed from project root: `pnpm test tests/navbar-layout.test.tsx` and `pnpm lint && pnpm typecheck` pass.

## T012 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.
- The run stopped at `pnpm test` because the suite failed before lint, typecheck, or build could execute.
- `tests/systems-section.test.tsx:34` failed on `core stack and systems section > renders all architecture blocks with required labels and technical content`.
- Failure details: the rendered systems cards no longer include the exact required labels `.01 / AI ARCH`, `.02 / SDD MENTALITY`, and `.03 / EDGE RUNTIME`. The current markup renders `AI ARCH`, `SDD MENTALITY`, and `EDGE RUNTIME` without the numeric monospace prefixes, which breaks the still-active T008/T010 contract.
- `pnpm test` also emitted a React warning on stderr from `tests/navbar-layout.test.tsx`: `Received true for a non-boolean attribute priority.` This means the validation output is not fully clean even where assertions pass.
- Broken audit criteria: the required validation suite is not fully green, so T012 cannot be approved or archived.
- Builder follow-up: restore the exact systems-section identifier text expected by `tests/systems-section.test.tsx`, eliminate the leaking `priority` prop warning in the navbar test render path, and rerun the full blueprint pipeline until tests, lint, typecheck, and build all pass cleanly.

## T013

- Added tests first in `tests/legal-routing.test.tsx` to validate filesystem-backed slug discovery, frontmatter parsing (`title`, `subtitle`, `lastUpdated`), static params generation from markdown filenames, successful legal route rendering, and `notFound()` behavior for unknown slugs.
- Added `src/lib/legal.ts` as a server utility using `node:fs/promises` and `node:path` to load legal markdown files from `content/legal`, parse frontmatter with `gray-matter`, and return typed `LegalDocument` payloads.
- Created `src/app/legal/[slug]/page.tsx` as a Server Component route that loads content by slug, calls `notFound()` when absent, renders markdown via `react-markdown`, and exports `generateStaticParams()` for SSG.
- Updated `src/app/components/Footer.tsx` legal links to target the new route shape: `/legal/privacy-policy` and `/legal/legal-notice`.
- Added runtime dependencies `gray-matter` and `react-markdown` in `package.json` and updated the pnpm lockfile.
- Validation completed from project root: `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build` all pass.

## T014

- Added tests first in `tests/legal-routing.test.tsx` with a new presentation-focused assertion that validates the legal-page industrial shell contract (`max-w-3xl`, translucent background, dashed `#1F242C` border, subtle forge glow), status badge, breadcrumb label/hover state, and markdown heading typography hook (`prose-headings:font-mono`).
- Refined `src/app/legal/[slug]/page.tsx` layout while preserving server rendering and existing route behavior from T013: breadcrumb remains above the article, article shell keeps the required industrial framing, and the metadata block is reorganized into a cohesive header section.
- Strengthened legal markdown typography via route-local prose utilities so body copy remains Inter-oriented while headings use monospace technical treatment aligned with Smidhus visual identity.
- Validation completed from project root: `pnpm test -- tests/legal-routing.test.tsx` and `pnpm lint && pnpm typecheck` pass.

## T014 Audit

- Validation executed from the project root using the blueprint pipeline: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
- `pnpm lint`, `pnpm typecheck`, the full test suite, and `pnpm build` all completed successfully, but the run was not fully clean.
- `pnpm test` emitted a React warning on stderr from `tests/navbar-layout.test.tsx`: `Received true for a non-boolean attribute priority.` Under the gatekeeper protocol, this means the validation output is not fully green.
- The warning source is still present in the codebase in at least two render paths: `src/app/components/Navbar.tsx:41` and `src/app/components/TechnicalSpecsExperience.tsx:161`, where `priority` is being passed through a mocked DOM render path.
- `pnpm build` also emitted a Node runtime warning during `next build`: `ExperimentalWarning: Type Stripping is an experimental feature and might change at any time`.
- Broken audit criterion: T014 cannot be approved or archived until the validation output is clean and warning-free.
- Builder follow-up: eliminate the leaking `priority` warning in the tested image render paths, confirm whether the Node experimental warning is expected/acceptable in this environment, and rerun the full blueprint pipeline until stdout and stderr are clean.
