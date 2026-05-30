# T014 Requirements

## 1. Overview & Context
- **Task ID**: `T014`
- **Objective**: Refine the legal document route UI in `src/app/legal/[slug]/page.tsx` so it matches the Smidhus industrial visual language defined in the blueprint while preserving the existing server-rendered markdown flow introduced in `T013`.
- **Scope**: Visual structure, typography, semantic layout, metadata presentation, and navigation affordances for legal pages.

## 2. Functional Requirements
- The legal page route at `/legal/[slug]` must remain a server-rendered App Router page that renders content returned by the existing legal content loader.
- The page must preserve the existing `notFound()` behavior when the requested legal document does not exist.
- The page must render a top breadcrumb-style return action that links to `/` with the exact visible label `RETURN // CORE_NODE`.
- The page must render a centered content wrapper with a maximum readable width suitable for long-form legal text.
- The page must render a document header area containing the legal publication status, the document title, and document metadata.
- The page must render the markdown body in a readable long-form layout with paragraph typography based on Inter and technical headings based on Fira Code.

## 3. Acceptance Criteria (EARS)
- **When** a user opens an existing legal route, **the system shall** render a centered legal document layout constrained to `max-w-3xl` width.
- **When** the legal page content wrapper is rendered, **the system shall** apply a translucent dark background, a dashed border using `#1F242C`, and a subtle forge-orange box glow consistent with the Smidhus theme.
- **When** the header area is rendered, **the system shall** display the badge text `STATUS: OFFICIALLY_PUBLISHED //` in monospace styling with terminal green emphasis.
- **When** the current legal document includes `title` metadata, **the system shall** render that title prominently in the header.
- **When** the current legal document includes `lastUpdated` metadata, **the system shall** render the last-updated value alongside the header metadata.
- **When** the current legal document includes `subtitle` metadata, **the system shall** render it as supporting descriptive copy beneath the title area.
- **When** a user views the breadcrumb link, **the system shall** present it above the legal article and apply a smooth hover transition toward forge orange.
- **When** markdown body content is rendered, **the system shall** style paragraph copy for comfortable reading with Inter-derived body typography.
- **When** markdown body content includes headings, **the system shall** style those headings with Fira Code-derived monospace typography to preserve the Smidhus technical identity.
- **If** the requested legal slug does not resolve to a file-backed document, **the system shall** invoke Next.js `notFound()` instead of rendering an incomplete page.
- **When** the page is validated, **the system shall** pass `pnpm lint && pnpm typecheck` without introducing new warnings or type errors.

## 4. Constraints
- Use the existing Next.js App Router structure and do not convert the route into a client component.
- Prefer minimal changes localized to the legal route unless a shared style gap makes another file necessary.
- Keep all comments, if any are needed, in concise idiomatic English.
