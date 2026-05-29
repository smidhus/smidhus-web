# T005 Technical Design

## 1. Overview
- **Task ID**: T005
- **Implementation Goal**: Enhance the homepage hero in `src/app/page.tsx` with a forge-style radial glow behind the character artwork and add two primary action buttons beneath the text content while keeping the layout static, responsive, and visually aligned with the existing Smidhus theme.

## 2. Files To Create Or Modify
- **Modify**: `src/app/page.tsx`

## 3. Design Decisions
- The change should remain localized to `src/app/page.tsx` because the requested effects are specific to the homepage hero and do not justify new shared components.
- The page should remain a server component because the required visual behavior can be fully implemented with static markup and CSS transitions.
- The glow should be implemented as an absolutely positioned decorative element within a relatively positioned image wrapper so layering is explicit and easy to control.
- The action controls should be implemented with semantic links when possible, using placeholder `href` targets such as `#services` and `#portfolio` until real destination routes exist, because the task describes navigation actions rather than inert buttons.
- Responsive flex wrapping should be preferred over separate mobile and desktop structures to keep the implementation minimal.

## 4. Page Structure Plan
- Keep the outer section as the page-level centered hero container.
- Wrap the existing `Image` in a relatively positioned container.
- Insert a decorative glow element inside that container before the `Image` so it sits behind the artwork.
- Keep the existing headline and subtitle block unchanged except for spacing adjustments needed to fit the new actions.
- Add a new actions row below the text block containing exactly two controls: `SERVICES` and `PORTFOLIO`.

## 5. Styling Plan
- Use an absolutely positioned circular element sized larger than the character image to render the forge glow.
- Apply an inline `backgroundImage` style or equivalent Tailwind arbitrary value that matches `radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)`.
- Use `pointer-events-none` on the glow layer so it remains purely decorative.
- Keep the image above the glow using relative positioning and z-index ordering.
- Style the action controls with monospace typography, uppercase labels, dashed borders, centered content, and balanced horizontal padding.
- Use hover and focus-visible states that increase border brightness, text brightness, and add a restrained orange glow through shadow or background tint.
- Use `transition-all` or targeted transition utilities with `ease-in-out` for the required smooth lighting effect.
- Allow the actions container to use `flex-wrap` with centered justification so the layout remains stable across viewport sizes.

## 6. Accessibility And Semantics
- Preserve the existing `h1` and paragraph semantics.
- Ensure the action controls are keyboard focusable and expose visible focus styling against the dark background.
- Keep the decorative glow non-semantic and non-interactive.

## 7. Validation Plan
- Verify that `src/app/page.tsx` still renders the existing hero image, headline, and subtitle.
- Verify that the glow layer is visually behind the character image rather than above the text or controls.
- Verify that exactly two action controls are present and labeled `SERVICES` and `PORTFOLIO`.
- Verify that the controls align horizontally on wider screens and wrap or stack cleanly on smaller screens.
- Run `pnpm lint && pnpm typecheck` to confirm no new issues are introduced.

## 8. Required Agent Profiles
- `builder`

## 9. Delivery Notes
- No additional agent profile is required because the task is confined to a single existing page component and uses the established project stack, styling system, and layout patterns.
