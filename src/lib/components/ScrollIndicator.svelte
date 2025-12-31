<script lang="ts">
  import { onMount } from 'svelte';

  let scrollProgress = 0;
  let currentSection = 0;
  let totalSections = 0;

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'education', name: 'Education' },
    { id: 'blog', name: 'Blog' },
    { id: 'contact', name: 'Contact' }
  ];

  onMount(() => {
    totalSections = sections.length;
    
    const container = document.querySelector('.scroll-snap-container');
    if (!container) return;

    const updateProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      scrollProgress = (scrollTop / scrollHeight) * 100;

      // Detect current section using viewport top method
      const sectionElements = document.querySelectorAll('.scroll-snap-section');
      const viewportTop = container.scrollTop + 80; // Account for navigation offset

      let detectedSection = 0;

      // Find the section that contains the top of the viewport
      sectionElements.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
          detectedSection = index;
        }
      });

      // If we're past all sections, we're in the last one
      if (viewportTop >= ((sectionElements[sectionElements.length - 1] as HTMLElement)?.offsetTop || 0)) {
        detectedSection = sectionElements.length - 1;
      }

      currentSection = detectedSection;
    };

    container.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      container.removeEventListener('scroll', updateProgress);
    };
  });

  const scrollToSection = (sectionId: string) => {
    const container = document.querySelector('.scroll-snap-container');
    const element = document.querySelector(`#${sectionId}`);
    
    if (container && element) {
      container.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
</script>

<!-- Scroll Progress Bar -->
<div class="fixed top-0 left-0 right-0 z-[110] h-1 bg-gray-200/30 dark:bg-gray-800/30">
  <div 
    class="h-full bg-gradient-to-r from-primary-500 to-accent-600 transition-all duration-300 ease-out"
    style="width: {scrollProgress}%"
  ></div>
</div>

<!-- Section Dots Indicator -->
<div class="fixed right-6 top-1/2 transform -translate-y-1/2 z-[90] hidden lg:flex flex-col space-y-3">
  {#each sections as section, index}
    <button
      on:click={() => scrollToSection(section.id)}
      class="group relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 {
        currentSection === index 
          ? 'bg-gradient-to-r from-primary-500 to-accent-600 shadow-lg' 
          : 'bg-gray-400/50 dark:bg-gray-600/50 hover:bg-primary-400/70'
      }"
      title={section.name}
    >
      <!-- Tooltip -->
      <div class="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {section.name}
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent"></div>
        </div>
      </div>
    </button>
  {/each}
</div>

<style>
  /* Smooth animations for indicators */
  .fixed button {
    backdrop-filter: blur(8px);
  }
</style>