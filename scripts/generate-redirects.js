#!/usr/bin/env node
/*
  Writes a static redirect page into build/ for each legacy URL listed in
  src/lib/data/redirects.json. GitHub Pages cannot issue HTTP redirects, so
  each page carries a canonical link to the new URL plus an instant meta
  refresh, which search engines treat as a permanent redirect.

  Runs after `vite build` (see the `build` script in package.json).
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://tkthetechie.io';
const BUILD_DIR = path.join(__dirname, '../build');
const { redirects } = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/lib/data/redirects.json'), 'utf-8'));

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const page = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting to ${escapeHtml(to)}</title>
<link rel="canonical" href="${escapeHtml(to)}">
<meta http-equiv="refresh" content="0; url=${escapeHtml(to)}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>location.replace(${JSON.stringify(to)});</script>
</head>
<body><p>This page has moved to <a href="${escapeHtml(to)}">${escapeHtml(to)}</a>.</p></body>
</html>
`;

if (!fs.existsSync(BUILD_DIR)) {
  console.error('build/ not found; run vite build first');
  process.exit(1);
}

let written = 0;
for (const { from, to } of redirects) {
  const target = /^https?:\/\//.test(to) ? to : `${SITE_URL}${to}`;
  const html = page(target);
  /*
    "/old-slug/" -> build/old-slug/index.html (served for the slash form; GitHub
    301s the slash-less form to it). A slash-less source gets both a
    "<path>.html" file and a directory index so either form resolves.
  */
  const rel = from.replace(/^\//, '');
  const targets = from.endsWith('/')
    ? [path.join(BUILD_DIR, rel, 'index.html')]
    : [path.join(BUILD_DIR, `${rel}.html`), path.join(BUILD_DIR, rel, 'index.html')];
  for (const file of targets) {
    if (fs.existsSync(file)) {
      console.warn(`skip ${from}: ${path.relative(BUILD_DIR, file)} already exists`);
      continue;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html, 'utf-8');
    written += 1;
  }
}
console.log(`✅ Wrote ${written} redirect page(s) for ${redirects.length} legacy URL(s)`);
