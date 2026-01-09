<script lang="ts">
  import { onMount } from 'svelte';
  import { darkMode } from '$lib/stores/theme';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  
  export let title: string;
  export let date: string;
  export let category: string = 'Blog';
  export let headerImage: string = '';
  
  // Use the theme store for proper dark mode detection
  let isDark = false; // Default to light mode for SSR
  
  // Initialize theme synchronously if in browser
  if (browser) {
    isDark = darkMode.initSync();
  }
  
  // Create sharing URLs
  $: currentUrl = browser ? window.location.href : '';
  $: encodedUrl = encodeURIComponent(currentUrl);
  $: encodedTitle = encodeURIComponent(title);
  $: linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=Check%20out%20this%20blog%20post`;
  $: twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=tkthetechie`;
  
  onMount(() => {
    // Initialize theme and subscribe to changes
    darkMode.init();
    
    // Subscribe to theme changes
    const unsubscribe = darkMode.subscribe(value => {
      isDark = value;
    });
    
    return unsubscribe;
  });
  
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
</script>

<svelte:head>
  <title>{title} - Thomas Kunnumpurath</title>
  <meta name="description" content="Technical blog post: {title}" />
</svelte:head>

<div class="min-h-screen transition-colors duration-300" style="background: {isDark ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(75, 85, 99), rgb(55, 65, 81))' : 'linear-gradient(to bottom right, rgb(249, 250, 251), rgb(255, 255, 255), rgb(249, 250, 251))'}">
  <!-- Header -->
  <div class="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white py-16 pt-24">
    <div class="container-max section-padding">
      <div class="max-w-4xl mx-auto">
        <!-- Back Navigation -->
        <div class="mb-8">
          <a 
            href="/blog"
            class="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </a>
        </div>
        
        <!-- Article Header -->
        <article class="text-center">
          <!-- Category -->
          <div class="mb-4">
            <span class="px-4 py-2 bg-gradient-to-r {getCategoryColor(category)} text-white text-sm font-medium rounded-full">
              {category}
            </span>
          </div>
          
          <!-- Title -->
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white" style="color: white !important;">
            {title}
          </h1>
          
          <!-- Meta Info -->
          <div class="flex items-center justify-center space-x-6 text-white">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span style="color: white !important;">{formatDate(date)}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
  
  <!-- Article Content -->
  <div class="py-16 transition-colors duration-300 relative overflow-hidden" 
       style="background: {isDark ? 'linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(31, 41, 55) 50%, rgb(17, 24, 39) 100%)' : 'linear-gradient(135deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 50%, rgb(249, 250, 251) 100%)'}">
    
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, {isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 50%), radial-gradient(circle at 75% 75%, {isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)'} 0%, transparent 50%);"></div>
    </div>
    
    <div class="container-max section-padding relative z-10">
      <div class="max-w-4xl mx-auto">
        
        <!-- Header Image -->
        {#if headerImage}
          <div class="mb-12 flex justify-center">
            <div class="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl" style="height: 30vh;">
              <img 
                src="/images/blog/headers/{headerImage}" 
                alt={title}
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        {/if}
        
        <!-- Blog Post Content Container -->
        <div class="blog-post-container relative">
          <!-- Decorative Background Elements -->
          <div class="absolute inset-0 -z-10 overflow-hidden">
            <div class="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl"></div>
          </div>
          
          <div class="prose prose-lg prose-gray dark:prose-invert max-w-none
                      relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm
                      border border-gray-200/80 dark:border-gray-700/60 rounded-2xl
                      shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50
                      p-8 md:p-12 lg:p-16"
               style="font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'ss01' 1; 
                      -webkit-font-smoothing: antialiased; 
                      -moz-osx-font-smoothing: grayscale; 
                      text-rendering: optimizeLegibility;
                      font-variant-ligatures: common-ligatures;
                      letter-spacing: 0.01em;">
            <slot />
          </div>
        </div>
        
        <!-- Article Footer -->
        <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <!-- Social Share -->
            <div class="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600" style="background-color: {isDark ? 'rgb(31, 41, 55)' : 'rgb(249, 250, 251)'}">
              <span class="text-sm share-text" style="color: {isDark ? '#ffffff' : '#6b7280'} !important;">Share:</span>
              <a 
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
                title="Share on LinkedIn"
              >
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a 
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors duration-200"
                title="Share on X (Twitter)"
              >
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Back to Blog -->
        <div class="mt-12 text-center">
          <a 
            href="/blog"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-accent-700 transition-all duration-300 hover-lift shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Posts
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Blog-specific prose enhancements */
  :global(.prose h1) {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  :global(.prose h2) {
    margin-top: 4rem;
    margin-bottom: 1.5rem;
  }

  :global(.prose h3) {
    margin-top: 3rem;
    margin-bottom: 1.25rem;
  }

  :global(.prose h4) {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  :global(.prose ul), :global(.prose ol) {
    margin-bottom: 1.5rem;
    margin-top: 1rem;
  }

  :global(.prose li) {
    margin-bottom: 0.5rem;
    font-weight: 450;
    letter-spacing: 0.01em;
  }

  :global(.prose ul li::marker) {
    color: rgb(59, 130, 246);
  }

  :global(.prose ol li::marker) {
    color: rgb(59, 130, 246);
    font-weight: 600;
  }

  :global(.prose img) {
    margin: 2rem auto;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  :global(.prose pre) {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(31, 41, 55) 100%);
    border: 1px solid rgb(75, 85, 99);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  :global(.dark .prose pre) {
    background: linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%);
    border: 1px solid rgb(51, 65, 85);
  }

  :global(.prose blockquote) {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    border-left: 4px solid rgb(59, 130, 246);
    background-color: rgb(249, 250, 251);
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    position: relative;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  :global(.dark .prose blockquote) {
    background-color: rgb(31, 41, 55);
  }

  :global(.prose blockquote::before) {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    font-size: 4rem;
    font-weight: bold;
    color: rgb(59, 130, 246);
    opacity: 0.3;
    line-height: 1;
  }

  :global(.prose hr) {
    margin: 3rem 0;
  }

  :global(.prose a:hover) {
    text-decoration-thickness: 3px;
    text-underline-offset: 2px;
  }

  :global(.prose a:focus) {
    outline: 2px solid rgb(59, 130, 246);
    outline-offset: 2px;
    border-radius: 0.25rem;
  }

  :global(.prose pre code) {
    color: rgb(243, 244, 246);
    background-color: transparent;
    padding: 0;
  }

  :global(.prose table) {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid rgb(209, 213, 219);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }

  :global(.dark .prose table) {
    border-color: rgb(75, 85, 99);
  }

  :global(.prose th), :global(.prose td) {
    border: 1px solid rgb(209, 213, 219);
    padding: 1rem;
  }

  :global(.dark .prose th), :global(.dark .prose td) {
    border-color: rgb(75, 85, 99);
  }

  :global(.prose th) {
    background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%);
    color: white;
    font-weight: 700;
    letter-spacing: 0.025em;
  }

  :global(.prose td) {
    font-weight: 450;
  }

  :global(.prose pre::-webkit-scrollbar) {
    height: 8px;
  }

  :global(.prose pre::-webkit-scrollbar-track) {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  :global(.prose pre::-webkit-scrollbar-thumb) {
    background: rgba(59, 130, 246, 0.6);
    border-radius: 4px;
  }

  :global(.prose pre::-webkit-scrollbar-thumb:hover) {
    background: rgba(59, 130, 246, 0.8);
  }

  /* Blog content dark mode fixes */
  :global(.dark .blog-post-container .prose) {
    background-color: rgba(31, 41, 55, 0.9) !important;
    border-color: rgba(75, 85, 99, 0.6) !important;
  }

  :global(.dark .blog-post-container .prose.prose-lg.prose-gray) {
    background-color: rgba(31, 41, 55, 0.9) !important;
    border-color: rgba(75, 85, 99, 0.6) !important;
  }

  :global(.dark .blog-post-container .backdrop-blur-sm) {
    background-color: rgba(31, 41, 55, 0.9) !important;
    border-color: rgba(75, 85, 99, 0.6) !important;
  }

  /* Blog content light mode fixes */
  :global(.blog-post-container .prose) {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border-color: rgba(229, 231, 235, 0.8) !important;
  }

  :global(.blog-post-container .prose.prose-lg.prose-gray) {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border-color: rgba(229, 231, 235, 0.8) !important;
  }

  :global(.blog-post-container .backdrop-blur-sm) {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border-color: rgba(229, 231, 235, 0.8) !important;
  }

  :global(.dark .blog-post-container .prose p) {
    color: rgb(229, 231, 235) !important;
  }

  :global(.dark .blog-post-container .prose h1),
  :global(.dark .blog-post-container .prose h2),
  :global(.dark .blog-post-container .prose h3),
  :global(.dark .blog-post-container .prose h4),
  :global(.dark .blog-post-container .prose h5),
  :global(.dark .blog-post-container .prose h6) {
    color: rgb(255, 255, 255) !important;
  }

  :global(.dark .blog-post-container .prose a) {
    color: rgb(96, 165, 250) !important;
  }

  :global(.dark .blog-post-container .prose strong) {
    color: rgb(255, 255, 255) !important;
  }

  :global(.dark .blog-post-container .prose code) {
    background-color: rgba(55, 65, 81, 0.8) !important;
    color: rgb(96, 165, 250) !important;
    border-color: rgba(75, 85, 99, 0.6) !important;
  }

  :global(.dark .blog-post-container .prose pre) {
    background-color: rgba(17, 24, 39, 0.9) !important;
    border-color: rgba(75, 85, 99, 0.6) !important;
  }

  :global(.dark .blog-post-container .prose blockquote) {
    background: linear-gradient(to right, rgba(31, 41, 55, 0.8), rgba(30, 58, 138, 0.3)) !important;
    border-left-color: rgb(59, 130, 246) !important;
    color: rgb(229, 231, 235) !important;
  }

  /* List items dark mode fix */
  :global(.dark .blog-post-container .prose li) {
    color: rgb(255, 255, 255) !important;
  }

  :global(.dark .blog-post-container .prose ul li) {
    color: rgb(255, 255, 255) !important;
  }

  :global(.dark .blog-post-container .prose ol li) {
    color: rgb(255, 255, 255) !important;
  }

  /* Share text styling */
  :global(.share-text) {
    color: rgb(75, 85, 99) !important;
  }

  :global(.dark .share-text),
  :global(.dark span.share-text),
  :global(.dark .flex .share-text) {
    color: rgb(255, 255, 255) !important;
  }

  /* Blog title should always be white (on dark header background) */
  :global(.bg-gradient-to-br h1) {
    color: white !important;
  }

  :global(.bg-gradient-to-br article h1) {
    color: white !important;
  }
</style>