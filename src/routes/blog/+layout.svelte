<script lang="ts">
  import { page } from '$app/stores';
  import Navigation from '$lib/components/Navigation.svelte';
  import BlogLayout from '$lib/layouts/BlogLayout.svelte';
  
  // Check if this is a specific blog post (not the main blog listing)
  $: isBlogPost = $page.route.id?.includes('/blog/') && $page.route.id !== '/blog';
  
  // Extract metadata from the page data if available
  $: metadata = $page.data?.metadata || {};
</script>

<style>
  .blog-content {
    position: relative;
    z-index: 1;
  }
</style>

<!-- Navigation for all blog pages -->
<Navigation />

<div class="blog-content">
  {#if isBlogPost && metadata.title}
    <!-- Use BlogLayout for individual blog posts -->
    <BlogLayout 
      title={metadata.title}
      date={metadata.date}
      author={metadata.author || 'Thomas Kunnumpurath'}
      category={metadata.category || 'Blog'}
      headerImage={metadata.headerImage || ''}
    >
      <slot />
    </BlogLayout>
  {:else}
    <!-- Default layout for blog listing and other pages -->
    <slot />
  {/if}
</div>