<script lang="ts">
  import { onMount } from 'svelte';
  import { pushState, replaceState } from '$app/navigation';
  import { darkMode } from '$lib/stores/theme';
  
  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isDark = false;
  let currentSection = 'home';
  
  // Subscribe to dark mode changes
  darkMode.subscribe(value => {
    isDark = value;
  });
  
  const navItems = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'Blog', href: '/#blog', id: 'blog' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Portfolio', href: '/#portfolio', id: 'portfolio' },
    { name: 'Credentials', href: '/#credentials', id: 'credentials' },
    { name: 'Contact', href: '/#contact', id: 'contact' }
  ];
  
  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    
    // Throttle the section update to improve performance
    let ticking = false;
    const throttledUpdateCurrentSection = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCurrentSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Track current section for highlighting and URL updates
    const updateCurrentSection = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionElements = document.querySelectorAll('section[id]');

      let detectedSection = 'home';
      let closestSection = null;
      let closestDistance = Infinity;

      sectionElements.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;
        const viewportCenter = scrollTop + window.innerHeight / 2;
        
        // Calculate distance from viewport center to section center
        const distance = Math.abs(viewportCenter - sectionCenter);
        
        // Also check if we're within the section bounds
        const isInSection = scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100;
        
        if (isInSection && distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id;
        }
      });

      // If we found a close section, use it
      if (closestSection) {
        detectedSection = closestSection;
      }

      // If we're at the very top, ensure we're on home
      if (scrollTop < 100) {
        detectedSection = 'home';
      }

      // Only update if section has changed
      if (currentSection !== detectedSection) {
        currentSection = detectedSection;
        
        // Update URL hash to reflect current section
        const url = new URL(window.location.href);
        url.hash = detectedSection;
        
        // Use replaceState to update URL without adding to history
        // This prevents back button issues when scrolling through sections
        replaceState(url.toString(), { section: detectedSection });
      }
    };

    // Handle direct navigation to hash URLs
    const handleHashNavigation = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      }
    };

    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.section) {
        scrollToSection(event.state.section);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', throttledUpdateCurrentSection, { passive: true });
    window.addEventListener('popstate', handlePopState);
    
    // Initial calls
    handleScroll();
    updateCurrentSection();
    handleHashNavigation();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', throttledUpdateCurrentSection);
      window.removeEventListener('popstate', handlePopState);
    };
  });
  
  const toggleDarkMode = () => {
    darkMode.toggle();
  };
  
  const scrollToSection = (sectionId: string, event?: Event) => {
    // Prevent default behavior if event is provided
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Find the element directly by ID
    const element = document.getElementById(sectionId);
    if (element) {
      // Element exists on current page - scroll to it
      // Update the URL with the hash using SvelteKit's pushState
      const url = new URL(window.location.href);
      url.hash = sectionId;
      pushState(url.toString(), { section: sectionId });
      
      // Calculate the offset position accounting for fixed navigation
      const elementTop = element.offsetTop;
      const navHeight = 80; // Account for fixed navigation height
      
      // Use a simple, reliable scroll method
      window.scrollTo({
        top: elementTop - navHeight,
        behavior: 'smooth'
      });
      
      // Update current section
      currentSection = sectionId;
      isMobileMenuOpen = false;
    } else {
      // Element doesn't exist on current page - navigate to home page with hash
      const currentPath = window.location.pathname;
      if (currentPath !== '/') {
        // Navigate to home page with the section hash
        window.location.href = `/#${sectionId}`;
      }
    }
  };
</script>

<nav 
  class="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-md shadow-lg border-b {isDark ? 'border-gray-800' : 'border-gray-200/50'}"
  style="background-color: {isDark ? 'rgb(0, 0, 0)' : (isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)')}"
>
  <div class="container-max section-padding">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">TK</span>
        </div>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <button
            type="button"
            on:click={(event) => scrollToSection(item.id, event)}
            class="relative text-black dark:text-white hover:text-primary-500 dark:hover:text-primary-300 transition-all duration-200 font-bold dark:font-extrabold cursor-pointer {
              currentSection === item.id 
                ? 'text-primary-500 dark:text-primary-400' 
                : ''
            }"
            style="text-shadow: {isDark ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'}"
          >
            {item.name}
            
            <!-- Active indicator -->
            {#if currentSection === item.id}
              <div class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full animate-fade-in"></div>
            {/if}
          </button>
        {/each}
        
        <!-- Dark Mode Toggle -->
        <button
          on:click={toggleDarkMode}
          class="p-2 rounded-lg {isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200 cursor-pointer"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <svg class="w-5 h-5 {isDark ? 'text-gray-100' : 'text-gray-900'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="{isDark ? 'hidden' : 'block'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            <path class="{isDark ? 'block' : 'hidden'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center space-x-2">
        <button
          on:click={toggleDarkMode}
          class="p-2 rounded-lg {isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200 cursor-pointer"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <svg class="w-5 h-5 {isDark ? 'text-gray-100' : 'text-gray-900'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="{isDark ? 'hidden' : 'block'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            <path class="{isDark ? 'block' : 'hidden'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        
        <button
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
          class="p-2 rounded-lg {isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200 cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6 {isDark ? 'text-gray-100' : 'text-gray-900'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if !isMobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    {#if isMobileMenuOpen}
      <div class="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-3 pt-4">
          {#each navItems as item}
            <button
              type="button"
              on:click={(event) => scrollToSection(item.id, event)}
              class="relative text-left text-black dark:text-white hover:text-primary-500 dark:hover:text-primary-300 transition-all duration-200 font-bold dark:font-extrabold py-2 cursor-pointer {
                currentSection === item.id 
                  ? 'text-primary-500 dark:text-primary-400' 
                  : ''
              }"
              style="text-shadow: {isDark ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'}"
            >
              {item.name}
              
              <!-- Active indicator for mobile -->
              {#if currentSection === item.id}
                <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-600 rounded-full animate-fade-in"></div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</nav>

<style>
  /* Navigation text override for dark mode */
  :global(.dark) nav button {
    color: white !important;
  }
  
  :global(.dark) nav button:hover {
    color: rgb(147, 197, 253) !important; /* primary-300 */
  }
  
  /* Active state override */
  :global(.dark) nav button.text-primary-500 {
    color: rgb(59, 130, 246) !important; /* primary-400 in dark mode */
  }
</style>