import type { PageLoad } from './$types';
import type { Post } from '$lib/posts';

/* Posts are loaded here so the home page's blog section is in the prerendered HTML. */
export const load: PageLoad = async ({ fetch }) => {
  let posts: Post[] = [];
  try {
    const response = await fetch('/blog/api/posts');
    if (response.ok) posts = await response.json();
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  return { posts };
};
