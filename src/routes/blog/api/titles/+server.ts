import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

/* All post titles, alphabetical. */
export const GET = () =>
  json(
    getPosts()
      .map(({ path, meta }) => ({ title: meta.title, path }))
      .sort((a, b) => a.title.localeCompare(b.title))
  );
