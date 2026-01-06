<script lang="ts">
  import { onMount } from 'svelte';
  import portfolioData from '$lib/data/portfolio.json';
  
  let portfolioRef: HTMLElement;
  let carouselContainer: HTMLElement;
  let isVisible = false;
  let currentIndex = 0;
  let itemsPerView = 3;
  let autoplayInterval: NodeJS.Timeout;
  let isHovered = false; // Single hover state for the entire carousel area
  
  // Calculate total slides based on items per view
  $: totalSlides = Math.ceil(portfolioData.portfolioItems.length / itemsPerView);
  $: maxIndex = totalSlides - 1;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.1 }
    );
    
    if (portfolioRef) observer.observe(portfolioRef);
    
    // Handle responsive items per view
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        itemsPerView = 3;
      } else if (window.innerWidth >= 768) {
        itemsPerView = 2;
      } else {
        itemsPerView = 1;
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateItemsPerView);
      stopAutoplay();
    };
  });
  
  const startAutoplay = () => {
    if (isHovered) return; // Don't start if currently hovered
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  };
  
  const handleMouseEnter = () => {
    isHovered = true;
    stopAutoplay();
  };
  
  const handleMouseLeave = () => {
    isHovered = false;
    if (isVisible) {
      startAutoplay();
    }
  };
  
  const nextSlide = () => {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  };
  
  const prevSlide = () => {
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  };
  
  const goToSlide = (index: number) => {
    currentIndex = index;
  };
  
  const handleItemClick = (item: any) => {
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  };
  
  const getItemType = (item: any) => {
    return item.category || 'Project';
  };
  
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Open Source': 'from-green-500 to-green-600',
      'Podcast': 'from-purple-500 to-purple-600',
      'Speaking': 'from-blue-500 to-blue-600',
      'Publication': 'from-orange-500 to-orange-600',
      'Education': 'from-red-500 to-red-600',
      'Project': 'from-yellow-500 to-yellow-600'
    };
    return colors[type] || colors.Project;
  };
</script>

<section id="portfolio" bind:this={portfolioRef} class="py-20 section-dark">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Featured <span class="gradient-text">Portfolio</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
          A showcase of my contributions to the tech community through open source projects, 
          speaking engagements, publications, and educational content.
        </p>
      </div>
      
      <!-- Carousel Container -->
      <div class="relative {isVisible ? 'animate-fade-in' : 'opacity-0'} px-8 md:px-16" style="animation-delay: 0.2s;">
        <!-- Carousel Wrapper -->
        <div 
          class="overflow-hidden rounded-2xl"
          on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave}
        >
          <div 
            bind:this={carouselContainer}
            class="flex transition-transform duration-500 ease-in-out"
            style="transform: translateX(-{currentIndex * 100}%)"
          >
            {#each Array(totalSlides) as _, slideIndex}
              <div class="w-full flex-shrink-0">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                  {#each portfolioData.portfolioItems.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView) as item, itemIndex}
                    {@const itemType = getItemType(item)}
                    <article 
                      class="glass-effect rounded-2xl overflow-hidden hover-lift card-hover transition-all duration-300 cursor-pointer group"
                      on:click={() => handleItemClick(item)}
                      on:keydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleItemClick(item);
                        }
                      }}
                      tabindex="0"
                      role="button"
                      aria-label="View {item.title}"
                    >
                      <!-- Image -->
                      <div class="h-48 bg-gradient-to-br from-primary-500/20 to-accent-600/20 flex items-center justify-center overflow-hidden relative">
                        {#if item.imgSrc}
                          <img 
                            src={item.imgSrc} 
                            alt={item.title}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            on:error={(e) => {
                              // Fallback to gradient background if image fails to load
                              const target = e.target as HTMLImageElement;
                              if (target) {
                                target.style.display = 'none';
                              }
                            }}
                          />
                        {:else}
                          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        {/if}
                        
                        <!-- Hover Overlay -->
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div class="text-white text-center">
                            <svg class="w-12 h-12 mx-auto mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span class="text-sm font-medium text-white">Click to View</span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Content -->
                      <div class="p-6">
                        <!-- Type Badge -->
                        <div class="mb-4">
                          <span class="px-3 py-1 bg-gradient-to-r {getTypeColor(itemType)} text-white text-sm font-medium rounded-full">
                            {itemType}
                          </span>
                        </div>
                        
                        <!-- Title -->
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-3 leading-tight group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <!-- Description -->
                        <p class="text-gray-800 dark:text-gray-300 text-sm mb-4 line-clamp-4 leading-relaxed">
                          {item.description}
                        </p>
                        
                        <!-- Action Indicator -->
                        <div class="flex items-center justify-between">
                          {#if item.href}
                            <span class="inline-flex items-center text-primary-500 dark:text-primary-400 font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-200">
                              {#if item.href.includes('github.com')}
                                View on GitHub
                              {:else if item.href.includes('youtube.com')}
                                Watch Video
                              {:else if item.href.includes('podcast') || item.href.includes('apple.com')}
                                Listen Now
                              {:else}
                                Learn More
                              {/if}
                              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          {:else}
                            <span class="text-gray-800 dark:text-gray-500 text-sm italic">Coming Soon</span>
                          {/if}
                        </div>
                      </div>
                    </article>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Navigation Arrows -->
        <button 
          class="absolute left-0 md:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group z-10 border border-gray-200 dark:border-gray-600"
          on:click={prevSlide}
          aria-label="Previous slide"
        >
          <svg class="w-8 h-8" viewBox="0 0 24 24" style="fill: var(--arrow-color, #000000);">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <button 
          class="absolute right-0 md:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group z-10 border border-gray-200 dark:border-gray-600"
          on:click={nextSlide}
          aria-label="Next slide"
        >
          <svg class="w-8 h-8" viewBox="0 0 24 24" style="fill: var(--arrow-color, #000000);">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
        
        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          {#each Array(totalSlides) as _, index}
            <button
              class="w-3 h-3 rounded-full transition-all duration-300 {currentIndex === index ? 'bg-primary-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300 dark:hover:bg-primary-700'}"
              on:click={() => goToSlide(index)}
              aria-label="Go to slide {index + 1}"
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Portfolio navigation arrows cursor */
  button[aria-label="Previous slide"],
  button[aria-label="Next slide"] {
    cursor: pointer;
    --arrow-color: #374151; /* Default light mode color */
  }
  
  :global(.dark) button[aria-label="Previous slide"],
  :global(.dark) button[aria-label="Next slide"] {
    --arrow-color: #ffffff; /* White for dark mode */
  }
  
  /* Dot indicators cursor */
  button[aria-label^="Go to slide"] {
    cursor: pointer;
  }
  
  /* Portfolio section dark mode subtitle fix */
  :global(.dark #portfolio .text-xl) {
    color: rgb(243, 244, 246) !important;
  }
</style>