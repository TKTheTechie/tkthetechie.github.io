<script lang="ts">
  import { onMount } from 'svelte';
  
  let heroRef: HTMLElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (heroRef) observer.observe(heroRef);
    
    return () => observer.disconnect();
  });
</script>

<section id="home" bind:this={heroRef} class="scroll-snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
  <!-- Animated Background Pattern -->
  <div class="absolute inset-0 z-0">
    <div class="matrix-bg"></div>
    
    <!-- Floating Orbs -->
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    <div class="floating-orb orb-4"></div>
    <div class="floating-orb orb-5"></div>
    
    <!-- Animated Particles -->
    <div class="particles-container">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
      <div class="particle particle-6"></div>
    </div>
    
    <!-- Gradient Waves -->
    <div class="gradient-wave wave-1"></div>
    <div class="gradient-wave wave-2"></div>
  </div>
  
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-600/10 z-10"></div>
  
  <!-- Content -->
  <div class="relative z-20 w-full h-full">
    <!-- Mobile Layout (stacked) -->
    <div class="lg:hidden flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center">
      <!-- Profile Picture -->
      <div class="mb-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <div class="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 relative">
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
            class="px-6 py-3 glass-effect text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover-lift shadow-xl border border-white/30 text-sm"
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
            class="px-8 py-4 glass-effect text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover-lift shadow-xl border border-white/30"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  </div>
</section>