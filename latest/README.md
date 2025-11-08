
# md8-habibullah

A lightweight personal portfolio built with Next.js, React and TypeScript.

This repository contains a small portfolio site composed of modular React components (hero, header, projects, experience, skills, footer) and a modern toolchain (Next.js, Tailwind CSS, TypeScript).

## Quick overview

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS / PostCSS
- Package manager: pnpm (pnpm-lock.yaml present)

The UI is split into reusable components in the `components/` folder and the app entry is in the `app/` directory (Next.js app router). A small `lib/` folder holds utilities.

## Features

- Hero section
- Header with theme support
- Projects list (project cards)
- Experience timeline
- Skills section
- Footer
- Theme provider (dark/light)

## Project structure (important files)

- `app/` — Next.js App Router pages and layout
	- `layout.tsx`, `page.tsx`, `globals.css`
- `components/` — UI components used by pages (e.g. `hero.tsx`, `projects.tsx`, `header.tsx`, `footer.tsx`, `theme-provider.tsx`)
- `lib/` — small utilities (`utils.ts`)
- `public/` — static assets
- `styles/` — global CSS (Tailwind)
- `package.json` — scripts & dependencies

## Requirements

- Node.js 18+ recommended (matches Next.js 13+ / 16 runtime)
- pnpm (preferred) or npm/yarn

## Install

Install dependencies with pnpm:

```bash
pnpm install
```

If you use npm or yarn, use the equivalent commands (`npm install` / `yarn install`).

## Available scripts

Run these from the project root. These map to the scripts in `package.json`.

- Start dev server

```bash
pnpm run dev
```

- Build for production

```bash
pnpm run build
```

- Start production server (after build)

```bash
pnpm run start
```

- Lint the project

```bash
pnpm run lint
```

## Environment & deployment

- No special environment variables are required by default. If you add third-party services (analytics, CMS, etc.), document required environment variables in this file.
- Recommended deployment: Vercel — it has first-class Next.js support. You can also deploy to other platforms that support Node.js.

## Notes & next steps

- This repo uses the Next.js App Router (`app/`) and TypeScript. It's small and intended to be a portfolio template or personal site.
- To customize, update the components in `components/` and the content in `app/page.tsx`.

---