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

<section id="home" bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
  <!-- Animated Background Pattern -->
  <div class="absolute inset-0 z-0">
    <div class="matrix-bg"></div>
  </div>
  
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-600/10 z-10"></div>
  
  <!-- Content -->
  <div class="relative z-20 container-max section-padding text-center">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Picture -->
      <div class="mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <div class="w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 relative">
          <img 
            src="/profile-pic.png" 
            alt="Thomas Kunnumpurath" 
            class="w-full h-full object-cover object-top rounded-full border-4 border-white/30 shadow-2xl backdrop-blur-sm"
          />
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-600/20"></div>
        </div>
      </div>
      
      <!-- Animated Title -->
      <div class="mb-8 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
        <h1 class="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-2xl">
          <span class="gradient-text">Thomas</span>
          <br />
          <span class="text-white">Kunnumpurath</span>
        </h1>
        <div class="h-1 w-32 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full shadow-lg"></div>
      </div>
      
      <!-- Subtitle -->
      <div class="mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
        <h2 class="text-xl md:text-2xl text-gray-100 font-light mb-4 drop-shadow-lg">
          Vice President of Systems Engineering
        </h2>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Technical leader specializing in Event Driven Architecture, cloud solutions, and scaling engineering teams. 
          Passionate about building innovative systems that drive business transformation.
        </p>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.6s;">
        <button
          on:click={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
          class="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover-lift neon-border shadow-xl"
        >
          View Experience
        </button>
        <button
          on:click={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          class="px-8 py-4 glass-effect text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover-lift shadow-xl border border-white/30"
        >
          Get In Touch
        </button>
      </div>
    </div>
  </div>
</section>