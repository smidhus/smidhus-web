# Project Manifest (Blueprint)

## 1. Base Technology Stack
- **Name**: smidhus-web
- **Language/Framework**: Next.js App Router with React, TypeScript, and Tailwind CSS
- **Dependency Manager**: pnpm

## 2. Architecture & Directory Structure
Component-driven architecture using Next.js App Router and Static Site Generation. The codebase should keep a strict separation between atomic UI components, shared global layout primitives such as Navbar and Footer, and page-level views under `src/app`. Server-rendered and statically generated routes should be preferred by default, with client components used only when interactivity requires browser APIs or React state.

<!-- dir_tree_start -->
- .DS_Store
<!-- dir_tree_end -->

## 3. UI/UX & Design System
- Dark Forge Industrial Theme.
- Primary background: `#0A0D10`.
- Accent colors: Forge Orange `#FF6B00` and Terminal Green `#00FF66`.
- Borders and structural lines: `#1F242C`.
- Typography: Fira Code for monospace and technical UI elements; Inter for general sans-serif content.
- Use restrained glowing drop-shadows for hover and focus effects, especially around interactive elements and highlighted accents.
- Preserve strong contrast, clear spacing, and accessible focus states across desktop and mobile layouts.

## 4. Security & Best Practices
- Configure strict HTTP security headers in `next.config.js`, including `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY`.
- Use strict TypeScript settings and avoid `any` unless there is a documented integration boundary that requires it.
- Validate and sanitize all external input before rendering or using it in application logic.
- Avoid `dangerouslySetInnerHTML`; if rich content is unavoidable, sanitize it with a trusted allowlist-based sanitizer.
- Keep secrets out of source control and expose only public client-side values through `NEXT_PUBLIC_` variables when intentionally safe.
- Prefer framework-supported routing, metadata, image optimization, and script loading APIs instead of manual DOM manipulation.
- Apply dependency hygiene with regular updates and vulnerability checks through the package manager and CI.
- Use a Content Security Policy when the production integration surface is known, keeping script and asset sources as restrictive as practical.
- **Code Style:** ALL comments must be in idiomatic English. NEVER use ASCII art or box-drawing characters (like `───`). Write comments to explain the *WHY*, not the *WHAT*. Keep them concise and human-like.

## 5. Testing Strategy
- Use TypeScript type-checking as a required validation layer for all source changes.
- Use ESLint for static analysis and framework-specific Next.js quality rules.
- Use unit and component tests for reusable UI primitives, layout behavior, and utility functions.
- Use end-to-end tests for critical routes, navigation, responsive rendering, and accessibility-sensitive flows.
- Include accessibility checks for keyboard navigation, focus visibility, semantic structure, and color contrast.

## 6. Local Validation Pipeline (Commands)
- Test command: `pnpm test`
- Linter/analysis command: `pnpm lint && pnpm typecheck`
- Build command: `pnpm build`

---
