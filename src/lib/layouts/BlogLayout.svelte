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
  let isDark = true; // Default to dark mode for SSR
  
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
      'default': 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.default;
  };
</script>

<style>
  .share-text {
    color: rgb(75, 85, 99) !important;
  }
  
  /* Multiple levels of specificity to override global rules */
  :global(.dark) .share-text,
  :global(.dark) span.share-text,
  :global(.dark) .flex .share-text {
    color: rgb(255, 255, 255) !important;
  }
</style>

<svelte:head>
  <title>{title} - Thomas Kunnumpurath</title>
  <meta name="description" content="Technical blog post: {title}" />
</svelte:head>

<div class="min-h-screen transition-colors duration-300" style="background: {isDark ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(75, 85, 99), rgb(55, 65, 81))' : 'linear-gradient(to bottom right, rgb(249, 250, 251), rgb(255, 255, 255), rgb(249, 250, 251))'}">>
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
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
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
        <!-- Blog Post Content Container with Enhanced Styling -->
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
                      p-8 md:p-12 lg:p-16
                      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:mb-6 prose-headings:mt-12 prose-headings:tracking-tight
                      prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-medium prose-p:tracking-wide
                      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                      prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                      prose-code:text-blue-700 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:font-semibold prose-code:border prose-code:border-blue-200 dark:prose-code:border-gray-700
                      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-300 dark:prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:mb-8 prose-pre:mt-6 prose-pre:shadow-lg
                      prose-blockquote:border-l-4 prose-blockquote:border-l-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50/50 dark:prose-blockquote:from-gray-800 dark:prose-blockquote:to-blue-900/30 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:shadow-md
                      prose-ul:text-gray-800 dark:prose-ul:text-gray-300 prose-ul:mb-6 prose-ul:mt-4
                      prose-ol:text-gray-800 dark:prose-ol:text-gray-300 prose-ol:mb-6 prose-ol:mt-4
                      prose-li:text-gray-800 dark:prose-li:text-gray-300 prose-li:mb-2 prose-li:font-medium
                      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:font-black prose-h1:letter-spacing-tight prose-h1:text-gray-900 dark:prose-h1:text-white
                      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h2:font-bold prose-h2:tracking-tight prose-h2:text-gray-900 dark:prose-h2:text-white
                      prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-12 prose-h3:font-bold prose-h3:tracking-tight prose-h3:text-gray-900 dark:prose-h3:text-white
                      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-10 prose-h4:font-semibold prose-h4:tracking-tight prose-h4:text-gray-900 dark:prose-h4:text-white
                      prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8 prose-img:mx-auto prose-img:border prose-img:border-gray-300 dark:prose-img:border-gray-700
                      prose-hr:my-12 prose-hr:border-gray-400 dark:prose-hr:border-gray-600"
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
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-accent-700 transition-all duration-300 hover-lift shadow-lg !bg-gradient-to-r !from-primary-500 !to-accent-600 !text-white"
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