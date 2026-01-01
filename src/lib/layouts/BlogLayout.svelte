<script lang="ts">
  export let title: string;
  export let date: string;
  export let author: string = 'Thomas Kunnumpurath';
  export let category: string = 'Blog';
  export let headerImage: string = '';
  
  // Check if dark mode is active
  let isDark = false;
  
  // Simple dark mode detection
  if (typeof window !== 'undefined') {
    isDark = document.documentElement.classList.contains('dark');
    
    // Watch for dark mode changes
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
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

<svelte:head>
  <title>{title} - Thomas Kunnumpurath</title>
  <meta name="description" content="Technical blog post: {title}" />
  <meta name="author" content={author} />
</svelte:head>

<div class="min-h-screen transition-colors duration-300" style="background: {isDark ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(75, 85, 99), rgb(55, 65, 81))' : 'white'}">
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
          <div class="flex items-center justify-center space-x-6 text-gray-300">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">TK</span>
              </div>
              <span class="font-medium">{author}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(date)}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
  
  <!-- Article Content -->
  <div class="py-16 transition-colors duration-300" style="background-color: {isDark ? 'rgb(75, 85, 99)' : 'white'}">
    <div class="container-max section-padding">
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
        <div class="prose prose-lg prose-gray dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                    prose-blockquote:border-l-primary-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                    prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                    prose-li:text-gray-700 dark:prose-li:text-gray-300">
          <slot />
        </div>
        
        <!-- Article Footer -->
        <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <!-- Author Info -->
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                <span class="text-white text-lg font-bold">TK</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white">{author}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">VP of Systems Engineering at Solace</p>
              </div>
            </div>
            
            <!-- Social Share -->
            <div class="flex items-center space-x-4">
              <span class="text-gray-600 dark:text-gray-300 text-sm">Share:</span>
              <a 
                href="https://www.linkedin.com/in/tkthetechie/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a 
                href="https://x.com/tkthetechie"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors duration-200"
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