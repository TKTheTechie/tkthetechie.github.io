import type { LayoutLoad } from './$types';
import type { Post } from '$lib/posts';

/*
  Every blog route gets the post index (the listing renders from it), and a
  post route additionally gets its own metadata. Matching uses route.id, which
  is the route path independent of any base path or trailing slash.
*/
export const load: LayoutLoad = async ({ route, fetch }) => {
  let posts: Post[] = [];
  try {
    const response = await fetch('/blog/api/posts');
    if (response.ok) posts = await response.json();
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }

  const current = route.id && route.id !== '/blog' ? posts.find((post) => post.path === route.id) : undefined;

  return {
    posts,
    metadata: current?.meta,
    isBlogPost: Boolean(current)
  };
};
