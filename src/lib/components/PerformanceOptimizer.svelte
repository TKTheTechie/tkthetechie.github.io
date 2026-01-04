<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let performanceMode: 'high' | 'balanced' | 'low' = 'high';
  let fps = 60;
  let lastFrameTime = 0;
  let frameCount = 0;
  
  onMount(() => {
    if (!browser) return;
    
    // Detect device capabilities
    detectPerformanceCapabilities();
    
    // Monitor FPS
    monitorPerformance();
    
    // Apply optimizations
    applyOptimizations();
    
    return () => {
      // Cleanup
    };
  });
  
  function detectPerformanceCapabilities() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    // Check for hardware acceleration
    const hasWebGL = !!gl;
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    // Determine performance mode
    if (hasWebGL && deviceMemory >= 8 && hardwareConcurrency >= 8) {
      performanceMode = 'high';
    } else if (hasWebGL && deviceMemory >= 4 && hardwareConcurrency >= 4) {
      performanceMode = 'balanced';
    } else {
      performanceMode = 'low';
    }
    
    console.log(`Performance mode: ${performanceMode}`);
  }
  
  function monitorPerformance() {
    function measureFPS(currentTime: number) {
      frameCount++;
      
      if (currentTime - lastFrameTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastFrameTime));
        frameCount = 0;
        lastFrameTime = currentTime;
        
        // Adjust performance mode based on FPS
        if (fps < 30 && performanceMode === 'high') {
          performanceMode = 'balanced';
          applyOptimizations();
        } else if (fps < 20 && performanceMode === 'balanced') {
          performanceMode = 'low';
          applyOptimizations();
        }
      }
      
      requestAnimationFrame(measureFPS);
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  function applyOptimizations() {
    const root = document.documentElement;
    
    switch (performanceMode) {
      case 'high':
        root.style.setProperty('--animation-quality', '1');
        root.style.setProperty('--particle-count', '80');
        root.style.setProperty('--blur-quality', '20px');
        break;
        
      case 'balanced':
        root.style.setProperty('--animation-quality', '0.8');
        root.style.setProperty('--particle-count', '50');
        root.style.setProperty('--blur-quality', '10px');
        break;
        
      case 'low':
        root.style.setProperty('--animation-quality', '0.5');
        root.style.setProperty('--particle-count', '20');
        root.style.setProperty('--blur-quality', '5px');
        
        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.heavy-animation');
        heavyAnimations.forEach(el => {
          (el as HTMLElement).style.animation = 'none';
        });
        break;
    }
    
    // Apply GPU acceleration hints
    const animatedElements = document.querySelectorAll('[class*="animate"], .floating-orb, .particle');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.transform += ' translateZ(0)';
      (el as HTMLElement).style.willChange = 'transform, opacity';
    });
  }
  
  // Intersection Observer for performance
  function setupLazyAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-active');
          } else {
            entry.target.classList.remove('animate-active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const lazyElements = document.querySelectorAll('.lazy-animate');
    lazyElements.forEach(el => observer.observe(el));
  }
</script>

<!-- FPS monitor removed -->

<style>
  /* Performance-based CSS variables */
  :root {
    --animation-quality: 1;
    --particle-count: 80;
    --blur-quality: 20px;
  }
  
  /* Optimized animations */
  :global(.animate-active) {
    animation-play-state: running;
  }
  
  :global(.animate-active:not(.animate-active)) {
    animation-play-state: paused;
  }
  
  /* GPU acceleration for all animated elements */
  :global([class*="animate"]) {
    transform: translateZ(0);
    will-change: transform, opacity;
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>