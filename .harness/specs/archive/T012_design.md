# T012 Technical Design

## 1. Overview
- **Task ID**: T012
- **Goal**: Extend the existing navbar with a mobile-only interactive menu for sub-`md` screens while keeping the current desktop branding and top-level layout intact.

## 2. Proposed Implementation
- Convert `src/app/components/Navbar.tsx` into a client component so it can own the `isOpen` state required by the mobile menu interaction.
- Keep the existing left-side logo and `SMIDHUS` wordmark as the stable brand anchor.
- Add a right-aligned mobile-only toggle button, hidden at `md` and above.
- Render the toggle icon using lightweight inline spans or divs so the closed state shows three horizontal bars and the open state visually resolves into an `X`.
- Render a conditional dropdown panel directly below the navbar inside the same component tree using the task-prescribed classes: `absolute top-16 left-0 w-full bg-[#0A0D10]/95 backdrop-blur-lg border-b border-[#1F242C] z-50 flex flex-col p-6 gap-5`.
- Populate the panel with three entries mapped from a small local configuration array to avoid repeated markup and to keep labels and hrefs consistent.
- Use anchor links for `#projects` and `#systems`, and an external absolute GitHub URL for `SOURCE` with `target="_blank"` and `rel="noopener noreferrer"`.
- Close the menu from each mobile item click handler to avoid leaving the overlay open after navigation.
- Preserve semantic navigation by keeping the links inside the existing `<nav>` structure and using a real `<button>` for the toggle control.

## 3. Files To Modify
- `src/app/components/Navbar.tsx`

## 4. Files To Create
- None.

## 5. Component-Level Design Details
- **State**: `const [isOpen, setIsOpen] = useState(false)` inside `Navbar`.
- **Navigation model**: A local typed array such as `{ label, href, external }[]` for the three mobile entries.
- **Responsive behavior**: Branding remains visible at all sizes; the trigger is visible only below `md`; the dropdown panel is mobile-only and should not render on desktop.
- **Accessibility**: Use `aria-expanded` on the toggle button, provide an accessible label such as `aria-label="Toggle navigation menu"`, and keep focus-visible styles aligned with the orange accent palette.

## 6. Risks & Mitigations
- **Risk**: Converting the navbar to a client component could unnecessarily broaden client rendering.
- **Mitigation**: Limit the client boundary to `Navbar.tsx` only and keep the component logic small.
- **Risk**: In-page links may appear broken if anchor IDs change later.
- **Mitigation**: Keep the design coupled to the currently implemented `#projects` and `#systems` IDs already present in the page experience.
- **Risk**: Placeholder GitHub URLs already exist elsewhere in the project.
- **Mitigation**: The implementation should either reuse the existing public GitHub destination if a canonical URL exists, or keep a single explicit placeholder until a real repository URL is provided.

## 7. Validation Plan
- Verify the menu trigger appears below `md` and is hidden at `md` and above.
- Verify toggle open and close behavior by click and keyboard activation.
- Verify each mobile entry closes the panel after activation.
- Verify `SOURCE` opens in a new tab with `rel="noopener noreferrer"`.
- Run `pnpm lint && pnpm typecheck`.

## 8. Required Technical Profiles
- `builder`
