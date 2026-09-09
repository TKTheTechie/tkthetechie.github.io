import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

/* Prerendered to build/blog/api/posts; used by the blog layout, listing and home. */
export const GET = () => json(getPosts());
