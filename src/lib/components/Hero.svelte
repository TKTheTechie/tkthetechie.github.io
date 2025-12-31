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
  </div>
  
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-600/10 z-10"></div>
  
  <!-- Content -->
  <div class="relative z-20 container-max section-padding text-center py-8 sm:py-12 md:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Profile Picture -->
      <div class="mb-6 md:mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <div class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-4 md:mb-6 relative">
          <img 
            src="/profile-pic.png" 
            alt="Thomas Kunnumpurath" 
            class="w-full h-full object-cover object-top rounded-full border-2 sm:border-3 md:border-4 border-white/30 shadow-2xl backdrop-blur-sm"
          />
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-600/20"></div>
        </div>
      </div>
      
      <!-- Animated Title -->
      <div class="mb-6 md:mb-8 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 text-white drop-shadow-2xl">
          <span class="gradient-text">Thomas</span>
          <br />
          <span class="text-white">Kunnumpurath</span>
        </h1>
        <div class="h-1 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full shadow-lg"></div>
      </div>
      
      <!-- Subtitle -->
      <div class="mb-6 md:mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
        <h2 class="text-lg sm:text-xl md:text-2xl text-gray-100 font-light mb-3 md:mb-4 drop-shadow-lg">
          Vice President of Systems Engineering
        </h2>
        <p class="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4 sm:px-0">
          Technical leader specializing in Event Driven Architecture, cloud solutions, and scaling engineering teams. 
          Passionate about building innovative systems that drive business transformation.
        </p>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.6s;">
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
          class="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover-lift neon-border shadow-xl text-sm sm:text-base"
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
          class="px-6 sm:px-8 py-3 sm:py-4 glass-effect text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover-lift shadow-xl border border-white/30 text-sm sm:text-base"
        >
          Get In Touch
        </button>
      </div>
    </div>
  </div>
</section>