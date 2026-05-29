# T006 Requirements

## 1. Overview & Context
- **Task ID**: `T006`
- **Objective**: Add a client-side forge particle canvas that enhances the landing page with ambient motion, cursor-responsive attraction, and click-triggered spark bursts without blocking the existing UI.
- **Relevant Blueprint Constraints**:
- Use Next.js App Router with React, TypeScript, and Tailwind CSS.
- Prefer server-rendered routes by default and isolate browser-dependent logic inside a client component.
- Preserve the Dark Forge Industrial theme, accessible interaction behavior, and strong desktop/mobile rendering.
- Validate changes with `pnpm test`, `pnpm lint && pnpm typecheck`, and `pnpm build`.

## 2. Functional Requirements
- The system shall provide a client component at `src/app/components/ForgeParticles.tsx` because the particle animation depends on browser-only APIs such as `canvas`, pointer events, and `requestAnimationFrame`.
- The system shall render a full-viewport canvas overlay when the home page loads so that particles can appear across the complete screen area.
- The system shall initialize a persistent set of ambient particles when the canvas effect starts.
- While the pointer moves, the system shall calculate the distance from the pointer to nearby particles and shall apply an inverse-distance attraction force so that ambient particles are subtly pulled toward the pointer.
- When the user clicks or taps on the viewport, the system shall spawn a burst of spark particles at the interaction coordinates.
- When spark particles are spawned, the system shall assign each spark a randomized outward velocity so that the burst expands radially from the interaction point.
- While spark particles remain active, the system shall reduce each spark velocity by a friction factor of approximately `0.95` per frame so that spark motion decelerates over time.
- While spark particles remain active, the system shall decay each spark opacity over time and transition its visible color from incandescent yellow `#FFD800` toward forge orange `#FF6B00` before removal.
- The system shall remove spark particles after they become fully transparent or otherwise inactive so that the render array does not grow indefinitely.
- The system shall mount the particle overlay in `src/app/page.tsx` using fixed positioning, full-screen bounds, `z-index: 10`, and `pointer-events: none` so that the existing CTA buttons remain visually above or operational through the effect layer.
- The system shall preserve the readability of the hero artwork, headline, subtitle, and CTA controls while the particle effect is visible.
- If the component unmounts, the system shall cancel the active animation frame and remove any registered window or document event listeners.
- Where the viewport size changes, the system shall resize the canvas to match the latest visible area so the particle field continues to cover the screen correctly.

## 3. Acceptance Criteria (EARS)
- **Ubiquitous**: The home page shall render the existing hero content and a particle canvas overlay together without console errors.
- **Ubiquitous**: The particle overlay shall cover the full viewport using fixed positioning and shall not prevent interaction with the underlying CTA links.
- **Event-driven**: When the page first becomes interactive, the system shall start an animation loop and display ambient floating particles.
- **Event-driven**: When the pointer moves across the page, the system shall update nearby ambient particles with a cursor-attraction response based on pointer distance.
- **Event-driven**: When the user clicks or taps, the system shall emit a visible spark burst from the interaction coordinates.
- **State-driven**: While a spark particle is active, the system shall apply friction-based deceleration and opacity decay on every animation frame.
- **State-driven**: While a spark particle is fading, the system shall render it with a color progression between `#FFD800` and `#FF6B00` until it is removed.
- **Unwanted behavior**: If the component is unmounted, the system shall not leave active animation frames or event listeners behind.
- **Unwanted behavior**: If the viewport is resized, the system shall not leave the canvas at stale dimensions that expose uncovered regions.

## 4. Validation Notes
- Verify animation behavior manually in the browser on desktop and mobile-sized viewports.
- Run `pnpm lint && pnpm typecheck` to confirm the new client component satisfies static analysis and TypeScript requirements.
- Run `pnpm build` to confirm the App Router page still builds successfully with the client canvas integration.
