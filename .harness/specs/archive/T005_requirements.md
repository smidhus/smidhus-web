# T005 Requirements

## 1. Overview & Context
- **Task ID**: T005
- **Objective**: Define the homepage enhancements required to add the forge glow treatment and the two primary navigation actions while preserving the existing Smidhus hero composition, typography, and dark industrial theme.
- **Active Task Summary**: Update `src/app/page.tsx` to add a radial forge glow behind the hero character and render two symmetric action buttons labeled `SERVICES` and `PORTFOLIO` below the headline content.

## 2. Functional Requirements
- The system shall keep the existing homepage hero structure centered within `src/app/page.tsx`.
- The system shall add a decorative glow layer directly behind the hero character image.
- The system shall implement the glow using a radial gradient equivalent to `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)`.
- The system shall ensure the glow remains visually behind the character artwork and does not obscure the image or text content.
- The system shall render exactly two homepage action controls below the headline and subtitle content.
- The system shall label the controls exactly `SERVICES` and `PORTFOLIO`.
- The system shall present the two controls side by side on wider viewports.
- The system shall allow the controls to stack or wrap on narrow viewports without overlap or clipping.
- The system shall style the controls with monospace typography consistent with the established technical UI language.
- The system shall style the controls with centered text alignment.
- The system shall style the controls with subtle dashed borders.
- The system shall expose smooth `ease-in-out` lighting transitions when the user hovers over or focuses either control.

## 3. Acceptance Criteria (EARS)
- When the homepage renders, the system shall display the hero character image with a radial orange glow layer positioned immediately behind it.
- When the decorative glow is rendered, the system shall use a gradient visually matching `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)` and shall keep surrounding content readable against the `#0A0D10` background.
- When the homepage renders below the existing text block, the system shall display exactly two action controls labeled `SERVICES` and `PORTFOLIO`.
- While the homepage is displayed on a medium or larger viewport, the system shall place the two action controls in a symmetric horizontal arrangement.
- While the homepage is displayed on a narrow viewport, the system shall allow the controls to wrap or stack while preserving centered alignment and readable spacing.
- When the user inspects either action control, the system shall show monospace text, centered content, and a dashed border treatment.
- When the user hovers over or tabs to either action control, the system shall apply a smooth `ease-in-out` visual illumination transition.
- When the homepage enhancements are implemented, the system shall preserve the existing headline text, `READY SOON!` accent color, subtitle copy, and centered composition introduced by prior tasks.

## 4. Non-Functional Constraints
- The implementation shall modify `src/app/page.tsx` within the existing Next.js App Router structure.
- The implementation shall remain a server component unless a concrete browser-only behavior requires otherwise.
- The implementation shall use Tailwind utility classes consistent with the current codebase patterns.
- The implementation shall preserve accessible contrast and visible focus states in line with the blueprint requirements.
- The implementation shall avoid unnecessary new abstractions or component extraction for this single-page change.
- The implementation shall pass the blueprint validation pipeline: `pnpm lint && pnpm typecheck`, and should not introduce warnings attributable to the homepage update.

## 5. Out of Scope
- Implementing destination routes or content pages for `SERVICES` or `PORTFOLIO`.
- Changing the navbar, footer, fonts, or global layout structure.
- Adding client-side animation libraries or JavaScript-driven motion for the glow or button hover states.
