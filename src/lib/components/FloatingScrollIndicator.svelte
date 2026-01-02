<script lang="ts">
  import { onMount } from 'svelte';

  let currentSection = 0;
  let totalSections = 0;
  let scrollProgress = 0;
  let isVisible = false;

  const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'education', 'blog', 'contact'];

  onMount(() => {
    totalSections = sections.length;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate overall scroll progress
      scrollProgress = Math.min(scrollTop / documentHeight, 1);
      
      // Show indicator from the start
      isVisible = true;
      
      // Detect current section using viewport center method
      const sectionElements = document.querySelectorAll('section');
      const viewportCenter = scrollTop + window.innerHeight / 2;
      
      let newCurrentSection = 0;
      sectionElements.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
          newCurrentSection = index;
        }
      });
      
      // Special check: if we're near the bottom of the page, we're definitely in the last section
      if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        newCurrentSection = sectionElements.length - 1;
      }
      
      currentSection = newCurrentSection;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollToNext = () => {
    if (currentSection < totalSections - 1) {
      const nextSectionId = sections[currentSection + 1];
      const element = document.querySelector(`#${nextSectionId}`);
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  $: circumference = 2 * Math.PI * 20; // radius = 20
  $: strokeDasharray = circumference;
  $: strokeDashoffset = circumference - (scrollProgress * circumference);
  $: isLastSection = currentSection >= totalSections - 1;
</script>

{#if isVisible}
  <button
    class="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border pulse-border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
    on:click={scrollToNext}
    aria-label={isLastSection ? 'Back to top' : `Go to ${sections[currentSection + 1]} section`}
  >
    <!-- Progress Ring -->
    <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
      <circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke="#d1d5db"
        stroke-width="2"
        class="dark:stroke-gray-600"
      />
      <circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke="#3b82f6"
        stroke-width="2"
        stroke-dasharray={strokeDasharray}
        stroke-dashoffset={strokeDashoffset}
        stroke-linecap="round"
        class="transition-all duration-300 dark:stroke-blue-400"
      />
    </svg>
    
    <!-- Arrow Icon -->
    <div class="relative z-10 transition-transform duration-300 group-hover:scale-110">
      {#if isLastSection}
        <!-- Up Arrow -->
        <svg class="w-5 h-5" fill="none" stroke-width="2" viewBox="0 0 24 24" style="stroke: var(--arrow-color, #374151);">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      {:else}
        <!-- Down Arrow -->
        <svg class="w-5 h-5" fill="none" stroke-width="2" viewBox="0 0 24 24" style="stroke: var(--arrow-color, #374151);">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      {/if}
    </div>
    
    <!-- Tooltip -->
    <div class="absolute right-full mr-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      {isLastSection ? 'Back to top' : `Go to ${sections[currentSection + 1]}`}
      <div class="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-700 border-y-4 border-y-transparent -translate-y-1/2"></div>
    </div>
  </button>
{/if}

<style>
  .pulse-border {
    animation: pulseBorder 2s ease-in-out infinite;
    --arrow-color: #374151; /* Default light mode color */
  }
  
  :global(.dark) .pulse-border {
    --arrow-color: #ffffff; /* White for dark mode */
  }
  
  @keyframes pulseBorder {
    0%, 100% { 
      box-shadow: 
        0 0 0 0 rgba(14, 165, 233, 0.4),
        0 0 0 0 rgba(34, 197, 94, 0.3);
    }
    50% { 
      box-shadow: 
        0 0 0 4px rgba(14, 165, 233, 0.2),
        0 0 0 8px rgba(34, 197, 94, 0.1);
    }
  }
  
  .pulse-border:hover {
    animation-play-state: paused;
  }
</style>