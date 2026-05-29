# T009 Technical Design

## 1. Overview
- **Task ID**: T009
- **Goal**: Introduce a reusable client-side drawer system for product technical documentation while keeping `src/app/page.tsx` as the primary composition layer for the landing page sections.
- **Required Agents**: `["builder"]`

## 2. Architecture Decision
- The interaction requires browser state, asynchronous loading transitions, and event-driven open/close behavior, so the drawer must be implemented as a client component.
- The existing landing page is currently a server component. To keep the change minimal, introduce a small client wrapper component that owns drawer state and renders the existing page sections plus the drawer. This avoids converting unrelated layout primitives into client components.
- Technical content should be stored as typed in-memory data in the same client boundary or in a nearby module. This satisfies the asynchronous requirement via a Promise-based loader without introducing unnecessary fetch infrastructure.

## 3. Files To Create Or Modify

### Create
- `src/app/components/TechnicalDrawer.tsx`
  - Client component.
  - Receives `open`, `loading`, `titleId`, `content`, and `onClose` props.
  - Renders the fixed right-side panel, header, close button, independent scroll region, loading state, fallback state, and structured technical sections.
  - Uses semantic dialog-like attributes such as `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.

- `src/app/components/TechnicalSpecsExperience.tsx`
  - Client component.
  - Owns the selected product id, drawer open state, and async loading lifecycle.
  - Exposes handlers used by the product CTA buttons.
  - Applies the page isolation classes to the landing content container when the drawer is open.
  - Contains or imports a typed product-spec map and resolves it through an async helper such as `loadTechnicalSpec(productId): Promise<TechnicalSpec | null>`.

### Modify
- `src/app/page.tsx`
  - Reduce the current page component to a thin server component that renders the new `TechnicalSpecsExperience` component.
  - Move the existing `PRODUCTS`, `SYSTEM_BLOCKS`, and landing page markup into the new client wrapper unless a small shared presentational extraction proves cleaner.
  - Replace the current `href="#"` CTA anchors with buttons that call the drawer open handler for the corresponding product.

## 4. Data Model
- Define a narrow typed shape for drawer content, for example:
  - `productId`: string
  - `name`: string
  - `summary`: string
  - `architecture`: string[]
  - `promptStrategy`: string[]
  - `codeSample`: string
- Seed the map with two entries matching current product names:
  - `REPHORA`
  - `SMIDHUS-HARNESS`
- Keep content inline and static for now; the async loader should wrap the lookup in `Promise.resolve(...)` or a small awaited microtask so the UI contract remains asynchronous without external I/O.

## 5. Interaction Flow
1. User clicks a `VIEW TECHNICAL SPECS` button on a product card.
2. `TechnicalSpecsExperience` stores the selected product id, sets drawer visibility, and starts async resolution of that product's technical payload.
3. Drawer opens immediately with a loading state.
4. After async resolution completes, the drawer swaps the loading state for the selected product content.
5. While open, the landing page wrapper receives the visual isolation classes equivalent to `opacity-30 blur-sm pointer-events-none`.
6. User closes the drawer via the header close control, and the wrapper clears selected state and restores page interactivity.

## 6. UI Notes
- Preserve the current industrial dashboard styling already used in product cards and section headings.
- Use `font-mono` for technical headings, labels, code samples, and control chrome; use `font-sans` for descriptive body copy.
- Keep mobile behavior simple: drawer spans full width on small screens and transitions to a constrained right rail on larger viewports.
- Internal code samples should be rendered with `<pre><code>` and escaped plain strings, not HTML injection.

## 7. Validation
- Run `pnpm lint && pnpm typecheck` as required validation.
- Optionally run `pnpm build` if the builder wants an additional integration check after implementation.
