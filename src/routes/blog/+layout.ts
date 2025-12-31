import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, route, fetch }) => {
  // Check if this is a specific blog post
  const isBlogPost = route.id?.includes('/blog/') && route.id !== '/blog';
  
  if (isBlogPost) {
    try {
      // Extract blog post name from URL
      const pathParts = url.pathname.split('/');
      const postName = pathParts[pathParts.length - 1];
      
      // Try to get the blog post metadata from the API
      const response = await fetch(`/blog/api/posts`);
      if (response.ok) {
        const posts = await response.json();
        const currentPost = posts.find((post: any) => post.path === url.pathname);
        
        if (currentPost) {
          return {
            metadata: currentPost.meta,
            isBlogPost: true
          };
        }
      }
    } catch (error) {
      console.error('Error loading blog post metadata:', error);
    }
  }
  
  return {
    isBlogPost: false
  };
};