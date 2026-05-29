Smidhus is a [Next.js](https://nextjs.org) App Router project with TypeScript, Tailwind CSS, and pnpm.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For a full local validation pass, run `pnpm lint`, `pnpm typecheck`, and `pnpm test` before `pnpm build`.

## Scripts

```bash
pnpm dev       # Start the local dev server
pnpm build     # Build the production app
pnpm start     # Run the built app
pnpm lint      # Run ESLint
pnpm typecheck # Run TypeScript checks
pnpm test      # Run the Vitest suite
```

## Project Notes

- Uses `Inter` and `Fira Code` via `next/font/google`.
- Applies global Tailwind tokens for the Smidhus color palette.
- Includes baseline quality scripts for linting, type checking, and tests in `package.json`.
- Includes security headers for `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
- Mounts a shared top-level navbar from the root layout so all routes inherit global navigation.
- Renders the home page as a centered hero with the Smidhus character artwork and `READY SOON!` messaging.
- Includes a canvas-based ambient particle overlay on the homepage hero.
- Extends the landing page with a `#projects` section for the `REPHORA` and `SMIDHUS-HARNESS` product cards.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
