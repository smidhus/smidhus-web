# T010 Technical Design

## 1. Overview
T010 is a visual-refinement task focused on unifying the landing page's card and framed-panel styling with the established forge theme. The implementation should prefer small, local Tailwind class adjustments over broader architectural changes. The goal is to normalize surface opacity, border treatment, glow behavior, and monospace orange identifier styling across the main landing sections and the technical drawer.

## 2. Files To Modify
- `src/app/components/TechnicalSpecsExperience.tsx`
- `src/app/components/TechnicalDrawer.tsx`

## 3. Implementation Design
1. In `src/app/components/TechnicalSpecsExperience.tsx`, identify every card-like or framed UI block used by the hero actions, product cards, status badges, system cards, and section headings.
2. Normalize secondary container surfaces to the blueprint-aligned semi-opaque treatment using `bg-[#0A0D10]/40` with `#1F242C` borders.
3. Add restrained idle forge glows to interactive cards and controls, then increase the glow intensity on hover to the stronger target level from the task description.
4. Introduce or restyle visible section identifiers so the sections have explicit orange monospace labels aligned with the mockup language. Prefer inline JSX changes or small local data-structure updates rather than introducing a new abstraction unless duplication becomes difficult to maintain.
5. In `src/app/components/TechnicalDrawer.tsx`, align framed content areas and action controls with the same surface and border language where appropriate, while preserving the drawer's current accessibility semantics and scrolling behavior.

## 4. Technical Constraints
- Preserve the current client-component boundaries and existing drawer state flow.
- Do not change copy, route targets, or content structure beyond what is needed to add or restyle identifiers.
- Keep the implementation in Tailwind utility classes unless a repeated class pattern clearly justifies a small local constant.
- Maintain accessible contrast and existing focus-visible states while adding glow effects.

## 5. Verification Plan
1. Run `pnpm lint && pnpm typecheck`.
2. Verify the home page visually at mobile and desktop breakpoints.
3. Confirm the drawer still opens from each `VIEW TECHNICAL SPECS` button and that blur/isolation behavior is unchanged.

## 6. Required Agent Profiles
- `builder`
