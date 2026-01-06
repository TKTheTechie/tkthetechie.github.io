<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { darkMode } from '$lib/stores/theme';
  import { browser } from '$app/environment';
  
  let posts: any[] = [];
  let loading = true;
  let searchTerm = '';
  let selectedCategory = 'all';
  let categories: string[] = [];
  let isDark = true; // Default to dark mode for SSR
  
  // Initialize theme synchronously if in browser
  if (browser) {
    isDark = darkMode.initSync();
  }
  
  // Subscribe to dark mode changes
  darkMode.subscribe(value => {
    isDark = value;
  });
  
  onMount(() => {
    // Initialize theme
    darkMode.init();
    fetchPosts();
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
        
        // Extract unique categories
        const uniqueCategories = [...new Set(posts.map(post => post.meta?.category).filter(Boolean))];
        categories = ['all', ...uniqueCategories];
      } else {
        console.error('API did not return an array:', data);
        posts = [];
        categories = ['all'];
      }
      
      loading = false;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      posts = [];
      categories = ['all'];
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
      'Crypto': 'from-yellow-500 to-yellow-600',
      'Personal': 'from-indigo-500 to-indigo-600',
      'Other': 'from-gray-500 to-gray-600',
      'default': 'from-gray-500 to-gray-600'
    };
    
    // Handle combined categories (like "Crypto, Personal")
    if (category && category.includes(',')) {
      const firstCategory = category.split(',')[0].trim();
      return colors[firstCategory] || colors.default;
    }
    
    return colors[category] || colors.default;
  };
  
  const getCategoryFilterColor = (category: string, isSelected: boolean) => {
    if (category === 'all') {
      return isSelected 
        ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white' 
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600';
    }
    
    // Use the same gradient colors as the badge colors for consistency
    const badgeGradient = getCategoryColor(category);
    
    if (isSelected) {
      return `bg-gradient-to-r ${badgeGradient} text-white`;
    }
    
    // For unselected state, return different styles based on dark mode
    const getColorForCategory = (cat: string) => {
      const colorStyles = {
        'Dev': {
          light: 'bg-blue-200 text-blue-800 hover:bg-blue-300 border border-blue-300',
          dark: 'bg-blue-600 text-blue-100 hover:bg-blue-500 border border-blue-500'
        },
        'Tech': {
          light: 'bg-green-200 text-green-800 hover:bg-green-300 border border-green-300',
          dark: 'bg-green-600 text-green-100 hover:bg-green-500 border border-green-500'
        },
        'Architecture': {
          light: 'bg-purple-200 text-purple-800 hover:bg-purple-300 border border-purple-300',
          dark: 'bg-purple-600 text-purple-100 hover:bg-purple-500 border border-purple-500'
        },
        'Tutorial': {
          light: 'bg-orange-200 text-orange-800 hover:bg-orange-300 border border-orange-300',
          dark: 'bg-orange-600 text-orange-100 hover:bg-orange-500 border border-orange-500'
        },
        'Crypto': {
          light: 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300 border border-yellow-300',
          dark: 'bg-yellow-600 text-yellow-100 hover:bg-yellow-500 border border-yellow-500'
        },
        'Personal': {
          light: 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300 border border-indigo-300',
          dark: 'bg-indigo-600 text-indigo-100 hover:bg-indigo-500 border border-indigo-500'
        },
        'Other': {
          light: 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300',
          dark: 'bg-gray-600 text-gray-100 hover:bg-gray-500 border border-gray-500'
        }
      };
      
      const colors = colorStyles[cat] || colorStyles['Other'];
      return isDark ? colors.dark : colors.light;
    };
    
    // Handle combined categories (like "Crypto, Personal")
    if (category.includes(',')) {
      const firstCategory = category.split(',')[0].trim();
      return getColorForCategory(firstCategory);
    }
    
    return getColorForCategory(category);
  };
  
  $: filteredPosts = (posts || []).filter(post => {
    const matchesSearch = post.meta?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.meta?.category && post.meta.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.meta?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
</script>

<svelte:head>
  <title>Blog - Thomas Kunnumpurath | Technical Insights & Tutorials</title>
  <meta name="description" content="Technical blog posts on event-driven architecture, modern development practices, and emerging technologies by Thomas Kunnumpurath." />
  <meta name="keywords" content="Event Driven Architecture, Technical Blog, Software Engineering, Microservices, Cloud Architecture, Pre Sales Engineering, Solutions Architecture, Financial Technology, Thomas Kunnumpurath" />
  <meta name="author" content="Thomas Kunnumpurath" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://tkthetechie.io/blog/" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tkthetechie.io/blog/" />
  <meta property="og:title" content="Technical Blog - Thomas Kunnumpurath" />
  <meta property="og:description" content="Technical blog posts on event-driven architecture, modern development practices, and emerging technologies." />
  <meta property="og:image" content="https://tkthetechie.io/profile-pic.png" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://tkthetechie.io/blog/" />
  <meta property="twitter:title" content="Technical Blog - Thomas Kunnumpurath" />
  <meta property="twitter:description" content="Technical blog posts on event-driven architecture, modern development practices, and emerging technologies." />
  <meta property="twitter:image" content="https://tkthetechie.io/profile-pic.png" />
  
  <!-- Structured Data - Blog Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Thomas Kunnumpurath Technical Blog",
      "url": "https://tkthetechie.io/blog/",
      "description": "Technical blog posts on event-driven architecture, modern development practices, and emerging technologies",
      "author": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath",
        "url": "https://tkthetechie.io"
      },
      "publisher": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath"
      },
      "inLanguage": "en-US"
    }
  </script>
</svelte:head>

<div 
  class="blog-listing-container min-h-screen transition-colors duration-300 relative overflow-hidden"
  style="background: {isDark ? 'linear-gradient(135deg, rgb(3, 7, 18) 0%, rgb(15, 23, 42) 50%, rgb(3, 7, 18) 100%)' : 'linear-gradient(135deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 50%, rgb(249, 250, 251) 100)'}"
>
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-20">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 30%, {isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 50%), radial-gradient(circle at 80% 70%, {isDark ? 'rgba(34, 197, 94, 0.05)' : 'rgba(34, 197, 94, 0.05)'} 0%, transparent 50%), radial-gradient(circle at 40% 80%, {isDark ? 'rgba(168, 85, 247, 0.04)' : 'rgba(168, 85, 247, 0.03)'} 0%, transparent 50%);"></div>
  </div>
  <!-- Header -->
  <div class="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white py-20 relative z-10">
    <div class="container-max section-padding">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Technical <span class="gradient-text">Blog</span>
        </h1>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Insights on event-driven architecture, modern development practices, and emerging technologies.
          Real-world implementations and industry experience shared through detailed tutorials and analysis.
        </p>
        
        <!-- Back to Home -->
        <div class="mt-8">
          <a 
            href="/"
            class="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200 relative z-20"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="py-16 relative z-10">
    <div class="container-max section-padding">
      <div class="max-w-6xl mx-auto">
        
        {#if loading}
          <!-- Loading State -->
          <div class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        {:else}
          <!-- Search and Filter -->
          <div class="mb-12">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
              <!-- Search -->
              <div class="relative flex-1 max-w-md">
                <input
                  type="text"
                  bind:value={searchTerm}
                  placeholder="Search posts..."
                  class="w-full px-4 py-3 pl-10 {isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <!-- Category Filter -->
              <div class="flex flex-wrap gap-2">
                {#each categories as category}
                  <button
                    on:click={() => selectedCategory = category}
                    class="px-4 py-2 rounded-full font-medium transition-all duration-200 {getCategoryFilterColor(category, selectedCategory === category)}"
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                {/each}
              </div>
            </div>
            
            <!-- Results Count -->
            <div class="mt-4 {isDark ? 'text-white' : 'text-gray-600'}">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            </div>
          </div>
          
          {#if filteredPosts.length === 0}
            <!-- No Results -->
            <div class="text-center py-20">
              <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold {isDark ? 'text-white' : 'text-gray-900'} mb-4">No Posts Found</h3>
              <p class="{isDark ? 'text-gray-300' : 'text-gray-600'}">Try adjusting your search or filter criteria.</p>
            </div>
          {:else}
            <!-- Blog Posts Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {#each filteredPosts as post, index}
                <article class="rounded-2xl overflow-hidden hover-lift card-hover transition-all duration-300 
                               border {isDark ? 'border-gray-700/60 shadow-xl shadow-black/50 bg-gray-900/90 hover:shadow-2xl hover:shadow-black/70 hover:border-primary-600/60' : 'border-gray-200/60 shadow-xl shadow-gray-200/50 bg-white/90 hover:shadow-2xl hover:shadow-gray-300/60 hover:border-primary-300/60'} 
                               backdrop-blur-sm hover:-translate-y-1 hover:scale-[1.02]">
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
                  <div class="p-6 {isDark ? 'bg-gradient-to-b from-gray-900/95 to-gray-900/98' : 'bg-gradient-to-b from-white/95 to-white/98'}">
                    <!-- Category and Date -->
                    <div class="flex items-center justify-between mb-4">
                      <span class="px-3 py-1 bg-gradient-to-r {getCategoryColor(post.meta?.category)} text-white text-sm font-medium rounded-full">
                        {post.meta?.category || 'Blog'}
                      </span>
                      <span class="text-sm {isDark ? 'text-gray-400' : 'text-gray-500'}">
                        {formatDate(post.meta?.date || new Date().toISOString())}
                      </span>
                    </div>
                    
                    <!-- Title -->
                    <h2 class="text-xl font-bold {isDark ? 'text-white hover:text-primary-400' : 'text-gray-900 hover:text-primary-600'} mb-3 line-clamp-2 
                             tracking-tight leading-tight font-black
                             transition-colors duration-200">
                      {post.meta?.title || 'Untitled'}
                    </h2>
                    
                    <!-- Read More -->
                    <div class="flex items-center justify-between">
                      <div></div>
                      
                      <!-- Read More Link -->
                      <a 
                        href={post.path}
                        class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-600 
                               text-white font-semibold text-sm rounded-lg
                               hover:from-primary-600 hover:to-accent-700 
                               transition-all duration-200 hover:shadow-lg hover:scale-105
                               border border-primary-400/50"
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
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>