<script lang="ts">
  import { onMount } from 'svelte';
  
  let heroRef: HTMLElement;
  let isVisible = false;
  let mouseX = 0;
  let mouseY = 0;
  let isMouseInside = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (heroRef) observer.observe(heroRef);
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef) return;
      
      const rect = heroRef.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      
      // Optional: Add subtle console logging for debugging (remove in production)
      // console.log('Mouse position:', { mouseX: mouseX.toFixed(2), mouseY: mouseY.toFixed(2) });
    };
    
    const handleMouseEnter = () => {
      isMouseInside = true;
    };
    
    const handleMouseLeave = () => {
      isMouseInside = false;
      // Reset to center when mouse leaves
      mouseX = 0.5;
      mouseY = 0.5;
    };
    
    if (heroRef) {
      heroRef.addEventListener('mousemove', handleMouseMove);
      heroRef.addEventListener('mouseenter', handleMouseEnter);
      heroRef.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      observer.disconnect();
      if (heroRef) {
        heroRef.removeEventListener('mousemove', handleMouseMove);
        heroRef.removeEventListener('mouseenter', handleMouseEnter);
        heroRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  });
  
  // Calculate parallax transforms based on mouse position
  $: parallaxStrong = `translate(${(mouseX - 0.5) * 60}px, ${(mouseY - 0.5) * 60}px)`;
  $: parallaxMedium = `translate(${(mouseX - 0.5) * 40}px, ${(mouseY - 0.5) * 40}px)`;
  $: parallaxLight = `translate(${(mouseX - 0.5) * 20}px, ${(mouseY - 0.5) * 20}px)`;
  $: parallaxReverse = `translate(${(0.5 - mouseX) * 30}px, ${(0.5 - mouseY) * 30}px)`;
</script>

<section id="home" bind:this={heroRef} class="scroll-snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
  <!-- Animated Background Pattern -->
  <div class="absolute inset-0 z-0">
    <div class="matrix-bg" style="transform: {parallaxLight}; transition: transform 0.1s ease-out;"></div>
    
    <!-- Floating Orbs with enhanced movement and mouse tracking -->
    <div class="floating-orb orb-1" style="transform: {parallaxMedium}; transition: transform 0.15s ease-out;"></div>
    <div class="floating-orb orb-2" style="transform: {parallaxStrong}; transition: transform 0.1s ease-out;"></div>
    <div class="floating-orb orb-3" style="transform: {parallaxLight}; transition: transform 0.2s ease-out;"></div>
    <div class="floating-orb orb-4" style="transform: {parallaxReverse}; transition: transform 0.15s ease-out;"></div>
    <div class="floating-orb orb-5" style="transform: {parallaxMedium}; transition: transform 0.1s ease-out;"></div>
    
    <!-- Enhanced Animated Particles -->
    <div class="particles-container" style="transform: {parallaxLight}; transition: transform 0.2s ease-out;">
      <div class="particle particle-1 enhanced-particle"></div>
      <div class="particle particle-2 enhanced-particle"></div>
      <div class="particle particle-3 enhanced-particle"></div>
      <div class="particle particle-4 enhanced-particle"></div>
      <div class="particle particle-5 enhanced-particle"></div>
      <div class="particle particle-6 enhanced-particle"></div>
      <!-- Additional particles for more pronounced effect -->
      <div class="particle particle-7 enhanced-particle"></div>
      <div class="particle particle-8 enhanced-particle"></div>
      <div class="particle particle-9 enhanced-particle"></div>
      <div class="particle particle-10 enhanced-particle"></div>
    </div>
    
    <!-- Enhanced Gradient Waves -->
    <div class="gradient-wave wave-1 enhanced-wave" style="transform: {parallaxReverse}; transition: transform 0.25s ease-out;"></div>
    <div class="gradient-wave wave-2 enhanced-wave" style="transform: {parallaxMedium}; transition: transform 0.2s ease-out;"></div>
    
    <!-- New: Interactive cursor glow effect -->
    {#if isMouseInside}
      <div 
        class="cursor-glow" 
        style="left: {mouseX * 100}%; top: {mouseY * 100}%; transform: translate(-50%, -50%);"
      ></div>
    {/if}
  </div>
  
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-600/10 z-10"></div>
  
  <!-- Content -->
  <div class="relative z-20 w-full h-full">
    <!-- Mobile Layout (stacked) -->
    <div class="lg:hidden flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center">
      <!-- Profile Picture -->
      <div class="mb-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <div class="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 relative">
          <div class="absolute inset-0 rounded-full animate-pulse-border" style="animation: pulseBorder 2s ease-in-out infinite;"></div>
          <img 
            src="/profile-pic.png" 
            alt="Thomas Kunnumpurath" 
            class="w-full h-full object-cover object-top rounded-full border-2 sm:border-3 border-white/30 shadow-2xl backdrop-blur-sm relative z-10"
          />
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-600/20"></div>
        </div>
      </div>
      
      <!-- Text Content -->
      <div class="max-w-lg">
        <!-- Title -->
        <div class="mb-6 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
          <h1 class="text-3xl sm:text-4xl font-bold mb-3 text-white drop-shadow-2xl">
            <span class="gradient-text">Thomas</span>
            <br />
            <span class="text-white">Kunnumpurath</span>
          </h1>
          <div class="h-1 w-24 sm:w-28 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full shadow-lg"></div>
        </div>
        
        <!-- Subtitle -->
        <div class="mb-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
          <h2 class="text-lg sm:text-xl text-gray-100 font-light mb-3 drop-shadow-lg">
            Vice President of Systems Engineering
          </h2>
          <p class="text-base text-gray-200 leading-relaxed drop-shadow-md">
            Technical leader specializing in Event Driven Architecture, cloud solutions, and scaling engineering teams.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.6s;">
          <button
            on:click={() => {
              const container = document.querySelector('.scroll-snap-container');
              const element = document.querySelector('#experience');
              if (container && element) {
                container.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              } else {
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            class="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover-lift neon-border shadow-xl text-sm"
          >
            View Experience
          </button>
          <button
            on:click={() => {
              const container = document.querySelector('.scroll-snap-container');
              const element = document.querySelector('#contact');
              if (container && element) {
                container.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              } else {
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            class="px-6 py-3 glass-effect text-black dark:text-white rounded-lg font-semibold hover:bg-white/20 dark:hover:bg-white/20 hover:text-black dark:hover:text-white transition-all duration-300 hover-lift shadow-xl border border-white/30 text-sm"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Layout (split) -->
    <div class="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:justify-center lg:min-h-screen lg:px-8 xl:px-16">
      <!-- Left Half - Profile Picture -->
      <div class="flex items-center justify-center {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <div class="relative">
          <div class="w-80 h-80 xl:w-96 xl:h-96 relative">
            <div class="absolute inset-0 rounded-full animate-pulse-border" style="animation: pulseBorder 2s ease-in-out infinite;"></div>
            <img 
              src="/profile-pic.png" 
              alt="Thomas Kunnumpurath" 
              class="w-full h-full object-cover object-top rounded-full border-4 border-white/30 shadow-2xl backdrop-blur-sm relative z-10"
            />
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-600/20"></div>
          </div>
          <!-- Decorative elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500/30 to-accent-600/30 rounded-full blur-xl"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-500/20 to-primary-600/20 rounded-full blur-xl"></div>
        </div>
      </div>

      <!-- Right Half - Text Content -->
      <div class="flex flex-col justify-center text-left">
        <!-- Title -->
        <div class="mb-8 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
          <h1 class="text-5xl xl:text-6xl font-bold mb-4 text-white drop-shadow-2xl">
            <span class="gradient-text">Thomas</span>
            <br />
            <span class="text-white">Kunnumpurath</span>
          </h1>
          <div class="h-1 w-32 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full shadow-lg"></div>
        </div>
        
        <!-- Subtitle -->
        <div class="mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
          <h2 class="text-2xl xl:text-3xl text-gray-100 font-light mb-4 drop-shadow-lg">
            Vice President of Systems Engineering
          </h2>
          <p class="text-lg xl:text-xl text-gray-200 leading-relaxed drop-shadow-md max-w-lg">
            Technical leader specializing in Event Driven Architecture, cloud solutions, and scaling engineering teams. 
            Passionate about building innovative systems that drive business transformation.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-row gap-4 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.6s;">
          <button
            on:click={() => {
              const container = document.querySelector('.scroll-snap-container');
              const element = document.querySelector('#experience');
              if (container && element) {
                container.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              } else {
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            class="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover-lift neon-border shadow-xl"
          >
            View Experience
          </button>
          <button
            on:click={() => {
              const container = document.querySelector('.scroll-snap-container');
              const element = document.querySelector('#contact');
              if (container && element) {
                container.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              } else {
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            class="px-8 py-4 glass-effect text-black dark:text-white rounded-lg font-semibold hover:bg-white/20 dark:hover:bg-white/20 hover:text-black dark:hover:text-white transition-all duration-300 hover-lift shadow-xl border border-white/30"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  </div>
</section>