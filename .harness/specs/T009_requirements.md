# T009 Requirements

## 1. Overview & Context
- **Task ID**: T009
- **Objective**: Add an IDE-style technical documentation drawer that opens from the existing product cards, keeps the landing page visually isolated while active, and presents asynchronous project-specific technical content in a performant, accessible way.
- **Project Constraints**: Follow the Next.js App Router architecture from `.harness/blueprint.md`, preserve the Dark Forge Industrial theme, prefer server-rendered page composition with client components only where interaction requires state, and keep the implementation type-safe without `any`.

## 2. Functional Requirements

### 2.1 Drawer Activation
- **WHEN** a user activates the `VIEW TECHNICAL SPECS` control for a product card, **THE SYSTEM SHALL** open a shared technical drawer anchored to the right side of the viewport.
- **WHEN** the drawer opens from a product card, **THE SYSTEM SHALL** load and display content specific to the selected product rather than generic placeholder text.
- **WHEN** the drawer is open, **THE SYSTEM SHALL** keep the underlying page visible behind it so the drawer feels like an overlay panel instead of a route change.

### 2.2 Drawer Presentation
- **WHILE** the drawer is open, **THE SYSTEM SHALL** render it as a fixed panel aligned to the top-right edge of the viewport with full height, full width on small screens, and a maximum width equivalent to the requested `max-w-2xl` desktop behavior.
- **WHILE** the drawer is open, **THE SYSTEM SHALL** style the panel with the dark technical surface `#0D1116`, a left border using `#1F242C`, and monospace-forward visual treatment consistent with the existing Smidhus theme.
- **WHILE** the drawer is open, **THE SYSTEM SHALL** provide an internal scroll container so long technical content can be navigated independently from the page behind it.

### 2.3 Page Isolation
- **WHILE** the drawer is open, **THE SYSTEM SHALL** visually isolate the landing page content by applying reduced opacity, blur, and disabled pointer interaction to the main landing page surface.
- **WHEN** the drawer closes, **THE SYSTEM SHALL** restore the landing page to its normal opacity, clarity, and interactivity state.

### 2.4 Technical Content
- **WHEN** a drawer is opened for a product, **THE SYSTEM SHALL** display a project title, descriptive sections, architecture-oriented markdown-like content blocks, prompt-engineering strategy content, and simulated TypeScript code snippets for that specific product.
- **WHILE** rendering technical content, **THE SYSTEM SHALL** preserve semantic structure using headings, paragraphs, lists, and code/preformatted regions instead of injecting unsafe HTML.
- **IF** the selected product has no mapped documentation payload, **THE SYSTEM SHALL** fall back to a safe empty-state message instead of failing or rendering broken content.

### 2.5 Async Interaction Model
- **WHEN** a user requests a drawer for a product, **THE SYSTEM SHALL** resolve the drawer payload through an asynchronous interaction path so the component contract supports deferred content loading.
- **IF** asynchronous content resolution is in progress, **THE SYSTEM SHALL** expose a visible loading state inside the drawer.

### 2.6 Accessibility & Interaction
- **WHEN** the drawer opens, **THE SYSTEM SHALL** expose a clear close control within the drawer header.
- **WHEN** the close control is activated, **THE SYSTEM SHALL** close the drawer without causing navigation.
- **WHILE** the drawer is open, **THE SYSTEM SHALL** expose dialog-like semantics that identify the panel and its title to assistive technology.
- **WHEN** keyboard users navigate to drawer triggers or controls, **THE SYSTEM SHALL** preserve visible focus styling aligned with the project theme.

## 3. Acceptance Criteria
- [ ] Activating `VIEW TECHNICAL SPECS` from `REPHORA` opens the drawer with `REPHORA`-specific technical content.
- [ ] Activating `VIEW TECHNICAL SPECS` from `SMIDHUS-HARNESS` opens the drawer with `SMIDHUS-HARNESS`-specific technical content.
- [ ] While the drawer is open, the landing page content area is visually dimmed/blurred and cannot be clicked.
- [ ] The drawer remains independently scrollable when its content exceeds the viewport height.
- [ ] The implementation does not use `dangerouslySetInnerHTML`.
- [ ] The implementation passes `pnpm lint && pnpm typecheck` under the project validation pipeline.
