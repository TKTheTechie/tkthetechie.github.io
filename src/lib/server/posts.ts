/*
  Build-time loader for blog posts. Reads the raw markdown of every
  src/routes/blog/<slug>/+page.md so it can derive a description from the
  body without compiling the page, and so the posts API and RSS feed share
  one source of truth.
*/
import { AUTHOR_NAME, toIsoDate } from '$lib/config/site';
import type { Post } from '$lib/posts';

const files = import.meta.glob('/src/routes/blog/*/+page.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const parseFrontmatter = (src: string) => {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta: Record<string, string> = {};
  if (!match) return { meta, body: src };
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
    meta[key] = value;
  }
  return { meta, body: src.slice(match[0].length) };
};

/* First real paragraph of the body, stripped of markdown, trimmed to ~160 chars. */
const excerpt = (body: string, max = 160): string => {
  const paragraph = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(#|!\[|import\s|\||[-*]\s|\d+\.\s|>|---)/.test(p));
  if (!paragraph) return '';
  const clean = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const titleFromSlug = (slug: string) => slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

let cache: Post[] | undefined;

/** All published posts, newest first. */
export const getPosts = (): Post[] => {
  if (cache) return cache;
  const posts: Post[] = [];
  for (const [file, src] of Object.entries(files)) {
    const slug = file.split('/').at(-2) ?? '';
    const { meta, body } = parseFrontmatter(src);
    if (meta.published === 'false') continue;
    posts.push({
      slug,
      path: `/blog/${slug}`,
      meta: {
        title: meta.title || titleFromSlug(slug),
        date: meta.date || '',
        dateIso: toIsoDate(meta.date),
        category: meta.category || 'Blog',
        headerImage: meta.headerImage || null,
        description: meta.description || excerpt(body),
        author: meta.author || AUTHOR_NAME
      }
    });
  }
  posts.sort((a, b) => b.meta.dateIso.localeCompare(a.meta.dateIso));
  cache = posts;
  return posts;
};
