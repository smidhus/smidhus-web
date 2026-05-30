# T013 Requirements

## 1. Overview & Context
- **Task ID**: T013
- **Objective**: Add a legal content routing and persistence layer in the Next.js App Router so legal markdown documents stored in `content/legal/` are rendered from `src/app/legal/[slug]/page.tsx` as server-side content.

## 2. Functional Requirements
- [ ] The application SHALL expose legal pages through the route pattern `/legal/[slug]`.
- [ ] The application SHALL resolve the active `[slug]` to a markdown file located at `content/legal/[slug].md`.
- [ ] The application SHALL read legal markdown files on the server using Node.js filesystem APIs.
- [ ] The application SHALL parse frontmatter metadata from each legal markdown file using `gray-matter`.
- [ ] The application SHALL render the markdown body using a parser compatible with React Server Components.
- [ ] The application SHALL reject non-existent legal slugs by calling Next.js `notFound()`.
- [ ] The application SHALL preserve the existing legal document metadata fields `title`, `subtitle`, and `lastUpdated` when present.

## 3. EARS Acceptance Criteria
- [ ] **Ubiquitous**: When the application builds or renders a legal route, the page shall be implemented as a Server Component under `src/app/legal/[slug]/page.tsx` and shall not declare `'use client'`.
- [ ] **Ubiquitous**: When a markdown file exists at `content/legal/[slug].md`, the system shall load it asynchronously with Node.js `fs` and `path` APIs from the server runtime.
- [ ] **Ubiquitous**: When a legal markdown file is loaded, the system shall extract `title`, `subtitle`, and `lastUpdated` from frontmatter through `gray-matter` and separately render the markdown body content.
- [ ] **Event-driven**: When a user requests `/legal/privacy-policy`, the system shall render the content from `content/legal/privacy-policy.md`.
- [ ] **Event-driven**: When a user requests `/legal/legal-notice`, the system shall render the content from `content/legal/legal-notice.md`.
- [ ] **Unwanted behavior**: When a user requests a legal slug whose markdown file does not exist, the system shall call `notFound()` and return the framework 404 response instead of rendering partial or fallback content.
- [ ] **State-driven**: While the legal content source is the local repository filesystem, the route generation shall use the available markdown filenames as the source of truth for valid slugs.
- [ ] **Ubiquitous**: When navigation elements link to legal documents, they shall target the `/legal/[slug]` route shape rather than obsolete top-level slug paths.

## 4. Constraints
- **Framework**: Use Next.js App Router conventions and prefer static generation for known filesystem-backed slugs.
- **Security**: Do not use `dangerouslySetInnerHTML`; use a safe markdown rendering approach compatible with the blueprint.
- **Type Safety**: Avoid `any`; define explicit metadata and loader types.
- **Validation**: The implementation must pass `pnpm lint && pnpm typecheck`, and `pnpm build`.
