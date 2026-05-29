# T012 Requirements

## 1. Overview & Context
- **Task ID**: T012
- **Objective**: Add a responsive mobile navigation variant to `src/app/components/Navbar.tsx` for viewports below the `md` breakpoint, preserving the existing forge-themed visual language and semantic navigation structure defined in the project blueprint.

## 2. Functional Requirements
- [ ] FR-1: The navbar SHALL provide a mobile-only menu trigger when the viewport is below the `md` breakpoint.
- [ ] FR-2: The desktop navbar branding area SHALL remain visible and usable across all viewport sizes.
- [ ] FR-3: The mobile menu trigger SHALL toggle navigation visibility using React component state managed inside `src/app/components/Navbar.tsx`.
- [ ] FR-4: The mobile navigation panel SHALL render the tactical entries `01 // PROJECTS`, `02 // SYSTEMS`, and `03 // SOURCE` in a vertical stack using the monospace brand typography.
- [ ] FR-5: The `01 // PROJECTS` entry SHALL navigate to the in-page anchor `#projects`.
- [ ] FR-6: The `02 // SYSTEMS` entry SHALL navigate to the in-page anchor `#systems`.
- [ ] FR-7: The `03 // SOURCE` entry SHALL navigate to an external GitHub destination and SHALL use `target="_blank"` with `rel="noopener noreferrer"`.
- [ ] FR-8: The mobile menu panel SHALL visually match the task definition with a dark translucent surface, backdrop blur, bottom border, and stacked spacing appropriate to the existing industrial theme.
- [ ] FR-9: The menu trigger icon SHALL render as a minimal three-line control in the closed state and SHALL transition to an `X`-like active state when the menu is open.
- [ ] FR-10: Activating any mobile navigation entry SHALL close the mobile menu so the destination content becomes immediately visible.
- [ ] FR-11: The navbar SHALL preserve keyboard accessibility with visible focus states for the trigger and all mobile menu links.

## 3. EARS Acceptance Criteria
- [ ] WHEN the page is rendered below the `md` breakpoint THEN the system SHALL display a mobile menu trigger inside the navbar.
- [ ] WHEN the page is rendered at or above the `md` breakpoint THEN the system SHALL hide the mobile menu trigger and SHALL NOT render the mobile dropdown panel.
- [ ] WHEN the user activates the mobile menu trigger while the menu is closed THEN the system SHALL set the open state to true and SHALL display the dropdown panel.
- [ ] WHEN the user activates the mobile menu trigger while the menu is open THEN the system SHALL set the open state to false and SHALL hide the dropdown panel.
- [ ] WHEN the mobile dropdown panel is open THEN the system SHALL render exactly three menu entries labeled `01 // PROJECTS`, `02 // SYSTEMS`, and `03 // SOURCE`.
- [ ] WHEN the user activates `01 // PROJECTS` THEN the system SHALL navigate to `#projects` and SHALL close the mobile menu.
- [ ] WHEN the user activates `02 // SYSTEMS` THEN the system SHALL navigate to `#systems` and SHALL close the mobile menu.
- [ ] WHEN the user activates `03 // SOURCE` THEN the system SHALL open the configured GitHub URL in a new tab using `rel="noopener noreferrer"` and SHALL close the mobile menu.
- [ ] WHEN the mobile menu is open THEN the trigger icon SHALL present its active `X` state using the forge accent palette.
- [ ] IF a user tabs through the navbar controls THEN the system SHALL provide visible focus treatment consistent with the blueprint accessibility requirements.

## 4. Constraints & Validation
- **Blueprint alignment**: Use Next.js App Router patterns, React state only where interactivity is required, Tailwind utility classes, and the existing dark forge industrial theme.
- **Implementation scope**: Prefer modifying only `src/app/components/Navbar.tsx` unless a small supporting change is required by the current component structure.
- **Security**: External navigation must use safe link attributes for a new-tab destination.
- **Validation target**: The resulting implementation should satisfy `pnpm lint && pnpm typecheck` and remain compatible with `pnpm build`.
