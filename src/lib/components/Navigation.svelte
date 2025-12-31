<script lang="ts">
  import { onMount } from 'svelte';
  import { darkMode } from '$lib/stores/theme';
  
  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isDark = false;
  
  // Subscribe to dark mode changes
  darkMode.subscribe(value => {
    isDark = value;
  });
  
  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Education', href: '/#education' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' }
  ];
  
  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const toggleDarkMode = () => {
    darkMode.toggle();
  };
  
  const scrollToSection = (href: string) => {
    // If we're not on the home page, navigate to the home page with the hash
    if (window.location.pathname !== '/') {
      window.location.href = href;
      return;
    }
    
    // Extract the hash part (e.g., '#blog' from '/#blog')
    const hash = href.split('#')[1];
    if (hash) {
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        isMobileMenuOpen = false;
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
        <span class="text-xl font-bold gradient-text">TheTechie</span>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <button
            on:click={() => scrollToSection(item.href)}
            class="text-gray-700 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200 font-bold dark:font-extrabold"
            style="text-shadow: {isDark ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'}"
          >
            {item.name}
          </button>
        {/each}
        
        <!-- Dark Mode Toggle -->
        <button
          on:click={toggleDarkMode}
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <svg class="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="{isDark ? 'hidden' : 'block'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            <path class="{isDark ? 'block' : 'hidden'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center space-x-2">
        <button
          on:click={toggleDarkMode}
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <svg class="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="{isDark ? 'hidden' : 'block'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            <path class="{isDark ? 'block' : 'hidden'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        
        <button
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              on:click={() => scrollToSection(item.href)}
              class="text-left text-gray-700 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200 font-bold dark:font-extrabold py-2"
              style="text-shadow: {isDark ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'}"
            >
              {item.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</nav>