<script lang="ts">
  import { onMount } from 'svelte';

  let isVisible = false;
  let currentSection = 0;
  let totalSections = 0;
  let isAtBottom = false;

  const sections = [
    'home', 'about', 'experience', 'skills', 
    'portfolio', 'education', 'blog', 'contact', 'footer'
  ];

  onMount(() => {
    totalSections = sections.length;
    
    const container = document.querySelector('.scroll-snap-container');
    if (!container) return;

    const updateIndicator = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrollProgress = scrollTop / scrollHeight;
      
      // Show indicator on hero page and after scrolling a bit
      isVisible = scrollProgress >= 0 || currentSection === 0;
      
      // Check if we're at the bottom
      isAtBottom = scrollProgress > 0.95;

      // Detect current section using viewport top method
      const sectionElements = document.querySelectorAll('.scroll-snap-section');
      const viewportTop = container.scrollTop + 80; // Account for navigation offset

      let detectedSection = 0;

      sectionElements.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
          detectedSection = index;
        }
      });

      if (viewportTop >= ((sectionElements[sectionElements.length - 1] as HTMLElement)?.offsetTop || 0)) {
        detectedSection = sectionElements.length - 1;
      }

      currentSection = detectedSection;
    };

    container.addEventListener('scroll', updateIndicator, { passive: true });
    updateIndicator();

    return () => {
      container.removeEventListener('scroll', updateIndicator);
    };
  });

  const scrollToNext = () => {
    if (currentSection < totalSections - 1) {
      const nextSectionId = sections[currentSection + 1];
      const container = document.querySelector('.scroll-snap-container');
      const element = document.querySelector(`#${nextSectionId}`);
      
      if (container && element) {
        container.scrollTo({
          top: (element as HTMLElement).offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTop = () => {
    const container = document.querySelector('.scroll-snap-container');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Determine what the button should do
  $: buttonAction = isAtBottom ? 'top' : 'next';
  $: canScrollNext = currentSection < totalSections - 1;
  $: showButton = isVisible && (canScrollNext || isAtBottom);
</script>

{#if showButton}
  <div class="fixed right-4 bottom-4 z-[90] md:right-6 md:bottom-6 lg:right-8 lg:bottom-8">
    <button
      on:click={buttonAction === 'top' ? scrollToTop : scrollToNext}
      class="group relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 animate-fade-in"
      title={buttonAction === 'top' ? 'Back to top' : 'Scroll to next section'}
    >
      <!-- Animated background pulse -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 animate-ping opacity-20"></div>
      
      <!-- Icon -->
      <div class="relative z-10 flex items-center justify-center w-full h-full text-white">
        {#if buttonAction === 'top'}
          <!-- Up arrow for back to top -->
          <svg 
            class="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 group-hover:-translate-y-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
          </svg>
        {:else}
          <!-- Down arrow for next section -->
          <svg 
            class="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 group-hover:translate-y-1 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style="animation-duration: 2s;"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        {/if}
      </div>
      
      <!-- Progress ring -->
      <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          stroke-width="2"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="rgba(255, 255, 255, 0.8)"
          stroke-width="2"
          stroke-dasharray="163.36"
          stroke-dashoffset={163.36 - (163.36 * (currentSection + 1) / totalSections)}
          stroke-linecap="round"
          class="transition-all duration-500 ease-out"
        />
      </svg>
      
      <!-- Tooltip -->
      <div class="absolute right-14 md:right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {#if buttonAction === 'top'}
            Back to top
          {:else if canScrollNext}
            Next: {sections[currentSection + 1]?.charAt(0).toUpperCase() + sections[currentSection + 1]?.slice(1)}
          {:else}
            Scroll down
          {/if}
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent"></div>
        </div>
      </div>
    </button>
  </div>
{/if}

<style>
  /* Smooth animations */
  button {
    backdrop-filter: blur(8px);
  }
  
  /* Glow effect on hover */
  button:hover {
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.4), 0 0 40px rgba(34, 197, 94, 0.2);
  }
</style>