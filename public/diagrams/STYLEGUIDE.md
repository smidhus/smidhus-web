# Rephora Forge Diagram Style Guide

This document captures the approved diagram and viewer conventions for Rephora forge logs.

## Viewer Contract

All Mermaid diagrams are rendered through `src/app/components/Mermaid.tsx`.

Required behavior:

- Inline preview inside the forge log article.
- Whole preview area is clickable and keyboard-accessible.
- Expanded modal renders through a portal mounted on `document.body`.
- Modal has one primary exit action: `Back to reading`.
- Modal supports zoom controls:
  - `-` down to 75%.
  - `+` up to 200%.
  - `Fit` resets to 100%.
- Modal supports drag-to-pan when zoomed or when the diagram overflows.
- Only one SVG instance should render at a time to avoid Mermaid duplicate ID collisions.
- Every diagram should have a caption generated through `[DIAGRAM:name]` in `src/lib/forgeLogs.ts`.

## Visual System

Use the Smidhus dark technical palette:

- Canvas: near-black `#07090C`.
- Base nodes: dark graphite `#101418`.
- Text: warm bone `#F4F1E8`.
- Flow lines: copper `#E0A96D` / `#D38B5B`.
- Borders: muted brass/stone `#8A7657`.

Avoid highly saturated block fills. Use color as an ownership signal, not decoration.

## Domain Colors

For Rephora architecture diagrams, use stable domain colors:

- Mobile / Flutter: cyan `#4FB7C5`.
- AWS Cognito / identity: amber `#D9A45F`.
- Backend / Spring Boot: green `#7AA66A`.

For sequence diagrams, prefer subtle `box` backgrounds:

```mermaid
box rgba(79, 183, 197, 0.10) Rephora Mobile Client
box rgba(217, 164, 95, 0.10) AWS Cognito Identity
box rgba(122, 166, 106, 0.10) Spring Boot Resource Server
```

The expanded viewer shows a domain legend automatically when a diagram contains these three labels:

- `Rephora Mobile Client`
- `AWS Cognito Identity`
- `Spring Boot Resource Server`

## Diagram Type Selection

Use `sequenceDiagram` when the documentation describes a request lifecycle, token lifecycle, pipeline, retry, async dispatch, or event handoff. It makes left-to-right reading explicit and ensures arrows point to real participants instead of broad containers.

Use `flowchart` when the documentation describes topology, storage layout, table relationships, infrastructure ownership, or component dependency graphs.

Avoid `architecture-beta` for detailed process diagrams. It supports icons, but layout control is weaker and can produce ambiguous crossing flows.

## Sequence Diagram Rules

Participant order should match human reading order from request origin to final processing:

1. Client/mobile actor.
2. Local cache or client-side helper.
3. External identity/cloud service.
4. Backend API boundary.
5. Backend filters/use cases/workers.
6. Final data store or notification target.

Rules:

- Arrows must point to a concrete participant, not a large container.
- Use `box` only for ownership/domain grouping.
- Use `rect` sparingly for phases such as authentication, authorized request, or async retry.
- Keep phase bars subtle; they should not hide domain boundaries.
- Use `alt` for conditional flows such as token refresh, failure handling, or retry.
- Prefer real implementation names from code over generic labels.

## Flowchart Rules

For non-sequence diagrams:

- Keep direction left-to-right when showing data/process flow.
- Keep direction top-to-bottom when showing lifecycle stages or cleanup.
- Use subgraphs only when they clarify ownership.
- Avoid cross-subgraph arrows that visually attach to the container instead of a node.
- Apply domain colors through `classDef`, keeping fills dark and borders colored.

## Current Reference Diagram

`public/diagrams/rephora-cognito.mermaid` is the approved reference for lifecycle diagrams:

- It uses `sequenceDiagram`.
- It has domain `box` grouping.
- It has subtle phase `rect` bands.
- It has an `alt` branch for access-token expiry / 401 refresh.
- It reads left-to-right from Flutter to Cognito to Spring Boot.

Use it as the baseline for future Rephora diagrams where a lifecycle is being documented.

## Validation Checklist

Before considering a diagram done:

- Render it in the forge log page.
- Open expanded mode.
- Check at 100%, 150%, and `Fit`.
- Drag-to-pan after zooming.
- Confirm there is one `Back to reading` action.
- Check browser console for Mermaid errors.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
