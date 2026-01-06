<script lang="ts">
  import { onMount } from 'svelte';
  import InteractiveParticles from './InteractiveParticles.svelte';
  import MagneticElement from './MagneticElement.svelte';
  import MorphingButton from './MorphingButton.svelte';
  
  let heroRef: HTMLElement;
  let isVisible = false;
  let mouseX = 0;
  let mouseY = 0;
  let isMouseInside = false;
  let mouseTrackingParticle: HTMLElement;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (heroRef) observer.observe(heroRef);
    
    // Mouse tracking for parallax effects and particle
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef) return;
      
      const rect = heroRef.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      
      // Update mouse tracking particle position
      if (mouseTrackingParticle && isMouseInside) {
        const actualX = e.clientX - rect.left;
        const actualY = e.clientY - rect.top;
        mouseTrackingParticle.style.left = `${actualX}px`;
        mouseTrackingParticle.style.top = `${actualY}px`;
      }
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
  
  function scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="home" bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
  <!-- Animated Background Pattern -->
  <div class="absolute inset-0 z-0">
    <!-- Interactive Particles Layer -->
    <InteractiveParticles particleCount={80} connectionDistance={150} mouseRadius={200} />
    
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
    
    <!-- New: Mouse tracking blurred particle -->
    {#if isMouseInside}
      <div 
        bind:this={mouseTrackingParticle}
        class="mouse-tracking-particle"
      ></div>
    {/if}
    
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
        <MagneticElement strength={0.2} distance={80}>
          <div class="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 relative">
            <div class="absolute inset-0 rounded-full animate-pulse-border" style="animation: pulseBorder 2s ease-in-out infinite;"></div>
            <img 
              src="/profile-pic.png" 
              alt="Thomas Kunnumpurath" 
              class="w-full h-full object-cover object-top rounded-full border-2 sm:border-3 border-white/30 shadow-2xl backdrop-blur-sm relative z-10"
            />
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-600/20"></div>
          </div>
        </MagneticElement>
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
        
        <!-- Open Source Highlight -->
        <div class="mb-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.5s;">
          <div class="flex items-center justify-center gap-2 mb-2">
            <svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="text-accent-400 font-medium text-sm">Open Source Contributor</span>
          </div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Author of multiple open source projects including Solace plugins for GraphQL, DAPR, and innovative microservices solutions.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.7s;">
          <MorphingButton 
            variant="primary" 
            size="md" 
            on:click={() => scrollToSection('#experience')}
          >
            View Experience
          </MorphingButton>
          <MorphingButton 
            variant="secondary" 
            size="md" 
            on:click={() => scrollToSection('#contact')}
          >
            Get In Touch
          </MorphingButton>
        </div>
      </div>
    </div>

    <!-- Desktop Layout (split) -->
    <div class="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:justify-center lg:min-h-screen lg:px-8 xl:px-16">
      <!-- Left Half - Profile Picture -->
      <div class="flex items-center justify-center {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.1s;">
        <MagneticElement strength={0.3} distance={120}>
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
        </MagneticElement>
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
            Engineering Executive transforming technical strategy into business value. I scale high-performance teams and architect event-driven platforms that accelerate revenue and digital agility.
          </p>
        </div>
        
        <!-- Open Source Highlight -->
        <div class="mb-8 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.5s;">
          <div class="flex items-center gap-3 mb-3">
            <svg class="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="text-accent-400 font-semibold text-lg">Open Source Contributor</span>
          </div>
          <p class="text-base xl:text-lg text-gray-300 leading-relaxed max-w-lg">
            Author of multiple open source projects including Solace plugins for GraphQL, DAPR, and innovative microservices solutions that are used by developers worldwide.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-row gap-4 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.7s;">
          <MorphingButton 
            variant="primary" 
            size="lg" 
            on:click={() => scrollToSection('#experience')}
          >
            View Experience
          </MorphingButton>
          <MorphingButton 
            variant="secondary" 
            size="lg" 
            on:click={() => scrollToSection('#contact')}
          >
            Get In Touch
          </MorphingButton>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Hero-specific background effects */
  .matrix-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(22, 146, 79, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(22, 146, 79, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 60% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 50%);
    opacity: 0.8;
  }
  
  .matrix-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(90deg, transparent 96%, rgba(22, 146, 79, 0.15) 100%),
      linear-gradient(0deg, transparent 96%, rgba(14, 165, 233, 0.15) 100%);
    background-size: 40px 40px;
  }
  
  /* Floating Orbs */
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(1px);
    opacity: 0.4;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  .orb-1 {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%);
    top: 10%;
    left: 10%;
    filter: blur(4px) brightness(1.1);
  }
  
  .orb-2 {
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%);
    top: 20%;
    right: 15%;
    filter: blur(2px) brightness(1.2);
  }
  
  .orb-3 {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%);
    bottom: 30%;
    left: 20%;
    filter: blur(5px) brightness(1.0);
  }
  
  .orb-4 {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
    bottom: 15%;
    right: 25%;
    filter: blur(2px) brightness(1.3);
  }
  
  .orb-5 {
    width: 90px;
    height: 90px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%);
    top: 60%;
    left: 50%;
    filter: blur(3px) brightness(1.1);
  }
  
  /* Animated Particles */
  .particles-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(14, 165, 233, 0.6);
    border-radius: 50%;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  .particle-1 {
    top: 20%;
    left: 10%;
  }
  
  .particle-2 {
    top: 40%;
    left: 80%;
    background: rgba(34, 197, 94, 0.6);
  }
  
  .particle-3 {
    top: 70%;
    left: 30%;
  }
  
  .particle-4 {
    top: 15%;
    left: 60%;
    background: rgba(34, 197, 94, 0.6);
  }
  
  .particle-5 {
    top: 80%;
    left: 70%;
  }
  
  .particle-6 {
    top: 50%;
    left: 20%;
    background: rgba(34, 197, 94, 0.6);
  }
  
  .particle-7 {
    top: 35%;
    left: 75%;
    background: rgba(14, 165, 233, 0.7);
  }
  
  .particle-8 {
    top: 85%;
    left: 45%;
    background: rgba(34, 197, 94, 0.5);
  }
  
  .particle-9 {
    top: 25%;
    left: 35%;
    background: rgba(14, 165, 233, 0.6);
  }
  
  .particle-10 {
    top: 75%;
    left: 85%;
    background: rgba(34, 197, 94, 0.7);
  }
  
  /* Gradient Waves */
  .gradient-wave {
    position: absolute;
    width: 200%;
    height: 200%;
    opacity: 0.1;
    border-radius: 50%;
    filter: blur(2px);
  }
  
  .wave-1 {
    background: conic-gradient(from 0deg, rgba(14, 165, 233, 0.3), rgba(34, 197, 94, 0.3), rgba(14, 165, 233, 0.3));
    top: -50%;
    left: -50%;
  }
  
  .wave-2 {
    background: conic-gradient(from 180deg, rgba(34, 197, 94, 0.2), rgba(14, 165, 233, 0.2), rgba(34, 197, 94, 0.2));
    bottom: -50%;
    right: -50%;
  }

  /* Mouse tracking blurred particle */
  .mouse-tracking-particle {
    position: absolute;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(34, 197, 94, 0.3) 50%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 15;
    transform: translate(-50%, -50%);
    filter: blur(20px);
    animation: particlePulse 3s ease-in-out infinite;
  }
  
  .mouse-tracking-particle::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(14, 165, 233, 0.4) 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    filter: blur(10px);
    animation: particlePulse 2s ease-in-out infinite reverse;
  }
  
  .mouse-tracking-particle::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    height: 30%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(34, 197, 94, 0.6) 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    filter: blur(5px);
    animation: particlePulse 1.5s ease-in-out infinite;
  }
  
  @keyframes particlePulse {
    0%, 100% {
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  
  /* Enhanced cursor glow */
  .cursor-glow {
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(34, 197, 94, 0.1) 40%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 5;
    filter: blur(30px);
  }
</style>