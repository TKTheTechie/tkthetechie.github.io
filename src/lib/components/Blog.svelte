<script lang="ts">
  import { onMount } from 'svelte';
  
  let blogRef: HTMLElement;
  let isVisible = false;
  let posts: any[] = [];
  let loading = true;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    
    if (blogRef) observer.observe(blogRef);
    
    // Fetch blog posts
    fetchPosts();
    
    return () => observer.disconnect();
  });
  
  const fetchPosts = async () => {
    try {
      const response = await fetch('/blog/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Ensure we have an array
      if (Array.isArray(data)) {
        posts = data;
      } else {
        console.error('API did not return an array:', data);
        posts = [];
      }
      loading = false;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      posts = [];
      loading = false;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCategoryColor = (category: string) => {
    const colors = {
      'Dev': 'from-blue-500 to-blue-600',
      'Tech': 'from-green-500 to-green-600',
      'Architecture': 'from-purple-500 to-purple-600',
      'Tutorial': 'from-orange-500 to-orange-600',
      'default': 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.default;
  };
</script>

<section id="blog" bind:this={blogRef} class="scroll-snap-section py-20 section-light">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Latest <span class="gradient-text">Blog Posts</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
          Insights on event-driven architecture, modern development practices, and emerging technologies.
          Sharing knowledge from real-world implementations and industry experience.
        </p>
      </div>
      
      {#if loading}
        <!-- Loading State -->
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      {:else if (posts || []).length === 0}
        <!-- Empty State -->
        <div class="text-center py-20">
          <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Blog Posts Yet</h3>
          <p class="text-gray-600 dark:text-gray-300">Check back soon for insights and tutorials!</p>
        </div>
      {:else}
        <!-- Blog Posts Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each (posts || []).slice(0, 6) as post, index}
            <article class="glass-effect rounded-2xl overflow-hidden hover-lift card-hover transition-all duration-300 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {0.1 * index}s;">
              <!-- Header Image Placeholder -->
              <div class="h-48 bg-gradient-to-br from-primary-500/20 to-accent-600/20 flex items-center justify-center">
                {#if post.meta?.headerImage}
                  <img 
                    src="/images/blog/headers/{post.meta.headerImage}" 
                    alt={post.meta?.title || 'Blog post'}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                {:else}
                  <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                {/if}
              </div>
              
              <!-- Content -->
              <div class="p-6">
                <!-- Category and Date -->
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 bg-gradient-to-r {getCategoryColor(post.meta?.category)} text-white text-sm font-medium rounded-full">
                    {post.meta?.category || 'Blog'}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.meta?.date || new Date().toISOString())}
                  </span>
                </div>
                
                <!-- Title -->
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.meta?.title || 'Untitled'}
                </h3>
                
                <!-- Author -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-bold">TK</span>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-300">
                      {post.meta?.author || 'Thomas Kunnumpurath'}
                    </span>
                  </div>
                  
                  <!-- Read More Link -->
                  <a 
                    href={post.path}
                    class="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-200"
                  >
                    Read More
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          {/each}
        </div>
        
        <!-- View All Posts Button -->
        {#if (posts || []).length > 6}
          <div class="text-center mt-12 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.8s;">
            <a 
              href="/blog"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-accent-700 transition-all duration-300 hover-lift neon-border shadow-xl"
            >
              View All Posts
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>