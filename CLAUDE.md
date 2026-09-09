# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Generate sitemap + production build + legacy redirect pages
npm run deploy           # Build and deploy to GitHub Pages (CI does this on push to main)
npm run check            # Run svelte-check type checking
npm run check:watch      # Run svelte-check in watch mode
npm run generate:sitemap # Manually regenerate static/sitemap.xml
npm run generate:redirects # Write legacy redirect pages into build/ (needs a prior build)
```

No test suite is configured.

## Architecture

This is a **SvelteKit static site** (adapter-static) for a personal portfolio and blog. It is fully prerendered with SSR on, so every page's HTML contains its real content (crawlers depend on this: never set `ssr = false`).

### Blog System

Blog posts live at `src/routes/blog/<slug>/+page.md` and use **mdsvex** for Markdown processing. Each post requires frontmatter:

```yaml
---
author: TKTheTechie
title: Post Title
date: 1/17/2022      # M/D/YYYY or YYYY-MM-DD
category: Dev        # Dev | Tech | Architecture | Tutorial | Crypto | Personal
headerImage: image-filename.png   # optional, served from /images/blog/headers/
layout: blog
---
```

Post metadata is read at build time by `src/lib/server/posts.ts` (raw markdown, frontmatter parsed, `description` falling back to the first paragraph). Add a `description:` to frontmatter to control the search snippet.

The blog layout chain works as follows:
1. `src/routes/blog/+layout.ts` — fetches the post index from the prerendered `/blog/api/posts` API, matches the current post by `route.id`, and passes `posts` + `metadata` to page data
2. `src/routes/blog/+layout.svelte` — wraps individual blog posts in `BlogLayout` (when `metadata.title` is present), or renders the listing page as-is
3. `src/lib/layouts/BlogLayout.svelte` — renders the article header, content prose container, and social share buttons

### Prerendered API Endpoints

- `src/routes/blog/api/posts/+server.ts` — returns all blog posts sorted by date (used by the home page, blog listing and layout)
- `src/routes/blog/api/titles/+server.ts` — returns all post titles sorted alphabetically
- `src/routes/rss.xml/+server.ts` — RSS 2.0 feed of all posts

All use `import.meta.glob` to discover `+page.md` files at build time.

### SEO

- `src/lib/components/Seo.svelte` — the only place per-page `<title>`, description, canonical, Open Graph/Twitter tags and JSON-LD are emitted. `src/app.html` deliberately carries none of these, so never add a `<title>` or description there or in a page's own `<svelte:head>`.
- `src/lib/config/site.ts` — `SITE_URL`, author constants, `absoluteUrl`, `toIsoDate`.
- `src/lib/data/schema.json` — Person / ProfessionalService / WebSite graph inlined on the home page.
- `src/lib/data/redirects.json` — legacy (WordPress-era) URLs; `scripts/generate-redirects.js` writes meta-refresh pages for them into `build/` after every build. Add an entry whenever a slug is renamed.
- Posts are served at `/blog/<slug>` with **no trailing slash**; the sitemap and canonicals must match that form (GitHub Pages 404s the slash form).
- Post cards and links must be in the prerendered HTML: load posts in a `load` function, never in `onMount`.

### Theming

Dark mode defaults to `true`. Preference is stored in `localStorage` under the key `theme` (`'dark'` or `'light'`). The `darkMode` store at `src/lib/stores/theme.ts` manages this, applying/removing the `dark` class on `document.documentElement`. Components call `darkMode.initSync()` before mount to avoid flash.

### 3D, Motion and Scrolling

- `src/lib/three/MeshScene.svelte` — the WebGL event mesh (Three.js): sphere topology, packets, holographic polyhedra, optional broker `core`. Pass an `anchor` element and the sphere centres on it. Falls back to the 2D canvas `EventMesh.svelte` if WebGL is unavailable. Shaders live in `src/lib/three/materials.ts`.
- `src/lib/actions/motion.ts` — `reveal`, `stagger`, `tilt`, `magnetic`, `parallax`, `countTo`, `spotlight` actions. `reveal` accepts `rotate` (degrees of rotateX) for perspective entrances; put `.perspective` on an ancestor.
- `src/lib/stores/scroll.ts` — Lenis is created in the root layout. Always scroll via `scrollToId` / `scrollToTop` / `lockScroll` from this module rather than `scrollIntoView`, so smooth scrolling and modal locking stay consistent.
- `src/lib/components/TagSphere.svelte` — DOM-projected 3D word sphere; `Portfolio.svelte` is a CSS 3D coverflow.

All motion honours `prefers-reduced-motion` (single static frame, no Lenis).

### Key Directories

- `src/lib/components/` — page section components (Hero, About, Skills, Portfolio, Blog, Contact, Navigation, Footer, etc.)
- `src/lib/three/` — Three.js scene and shader materials
- `src/lib/layouts/` — full-page layout wrappers (BlogLayout, ExperienceLayout)
- `src/lib/data/` — static JSON data for portfolio and experience sections
- `src/lib/config/site.ts` — site URL, author constants and date helpers
- `src/routes/blog/images/` — header images for blog posts (referenced as `headerImage` in frontmatter)
- `static/` — static assets served at root; `static/sitemap.xml` is auto-generated by `scripts/generate-sitemap.js`

### Deployment

The site deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`, served at the root of the custom domain `tkthetechie.io`. Do not set a base path: the site lives at `/`, and a base prefix breaks route matching in the blog layout and every canonical URL. The custom domain is configured in the repository's Pages settings (the root `CNAME` file is not part of the build). The `deploy` script is a manual fallback using `gh-pages`.
