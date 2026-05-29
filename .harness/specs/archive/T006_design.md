# T006 Technical Design

## 1. Overview & Context
- **Task ID**: `T006`
- **Goal**: Introduce a performant client-side canvas particle layer for the landing page while keeping the rest of the route server-rendered and preserving the current forge-themed hero composition.
- **Required Agents**: `["builder"]`

## 2. Proposed Implementation
- Create `src/app/components/ForgeParticles.tsx` as a `'use client'` component.
- Implement the particle system inside a single React component using `useEffect`, `useRef`, and the Canvas 2D API.
- Maintain mutable particle state in refs instead of React state so animation updates do not trigger React re-renders every frame.
- Separate particles into two logical groups within the same animation loop:
- Ambient particles: small, persistent particles with low velocity and low opacity that drift continuously.
- Spark particles: short-lived particles created on click/tap with high randomized radial velocity, friction decay, alpha fade, and color interpolation from yellow to orange.
- Register global listeners for pointer movement, click or pointerdown, and resize within the effect lifecycle because the overlay itself will use `pointer-events: none`.
- Resize the backing canvas according to the viewport and device pixel ratio so the effect remains sharp on high-density displays.
- Draw the canvas with transparent background so the underlying page content remains visible.
- Clean up the animation frame and all listeners in the effect cleanup.

## 3. Files to Create or Modify
- **Create**: `src/app/components/ForgeParticles.tsx`
- **Modify**: `src/app/page.tsx`

## 4. File-Level Design Details

### `src/app/components/ForgeParticles.tsx`
- Export a default `ForgeParticles` component.
- Render a single `<canvas aria-hidden="true" />` element.
- Apply classes equivalent to `pointer-events-none fixed inset-0 z-10` on the canvas element so it spans the viewport and never captures user interaction.
- Use refs for:
- The canvas element.
- The current animation frame id.
- The current pointer position.
- Arrays of ambient particles and spark particles.
- Define lightweight TypeScript shapes for ambient and spark particle records within the file.
- On mount:
- Measure viewport width and height.
- Configure canvas width and height using device pixel ratio.
- Seed the initial ambient particle collection.
- Start the animation loop.
- Event handling:
- `pointermove`: update the latest pointer coordinates used by the animation loop.
- `click` or `pointerdown`: push a burst of spark particles at the interaction coordinates.
- `resize`: recompute canvas dimensions and, if needed, clamp or redistribute ambient particles into the visible area.
- Animation loop responsibilities:
- Clear the canvas each frame.
- Update ambient particle drift and cursor attraction.
- Update spark velocities with friction and fade alpha.
- Remove expired sparks.
- Draw both particle groups in a painter-friendly order that does not overpower the hero content.

### `src/app/page.tsx`
- Import `ForgeParticles`.
- Mount `<ForgeParticles />` inside the page section so the effect is present on the landing page.
- Keep the hero content in a higher stacking context than the particle canvas if needed to preserve legibility and CTA prominence.
- Preserve the existing hero layout, radial glow, copy, and CTA links.

## 5. Constraints and Non-Goals
- Do not convert the whole page into a client component; only the particle layer should require client execution.
- Do not introduce external animation or canvas dependencies for this feature.
- Do not block keyboard or pointer access to existing navigation and CTA elements.
- Do not persist particle state outside the mounted page session.

## 6. Verification Strategy
- Static validation: `pnpm lint && pnpm typecheck`
- Build validation: `pnpm build`
- Functional verification:
- Confirm ambient particles are visible on initial load.
- Confirm cursor motion attracts nearby particles.
- Confirm click or tap emits a spark burst from the interaction point.
- Confirm sparks decelerate, shift from yellow toward orange, and fade out.
- Confirm the CTA links remain clickable and visually readable.
- Confirm no canvas sizing gaps appear after resizing the viewport.
