<script lang="ts">
  import { onMount } from 'svelte';
  
  export let stats = [];
  export let isVisible = false;
  
  let animatedValues = [];
  let previousStats = [];
  let animationTimers = [];
  
  // Initialize animated values when stats change
  $: if (stats && stats.length > 0) {
    // If this is the first time or stats structure changed, initialize
    if (animatedValues.length !== stats.length) {
      animatedValues = stats.map(() => 0);
    }
    
    // If stats actually changed, animate to new values
    if (JSON.stringify(stats) !== JSON.stringify(previousStats)) {
      animateToNewStats();
      previousStats = [...stats];
    }
  }
  
  onMount(() => {
    if (isVisible && stats.length > 0) {
      // Initial animation when component mounts
      animatedValues = stats.map(() => 0);
      animateToNewStats();
    }
    
    return () => {
      // Cleanup timers on component destroy
      animationTimers.forEach(timer => clearInterval(timer));
    };
  });
  
  function animateToNewStats() {
    // Clear any existing timers
    animationTimers.forEach(timer => clearInterval(timer));
    animationTimers = [];
    
    stats.forEach((stat, index) => {
      const target = parseInt(stat.value.replace(/[^\d]/g, '')) || 0;
      const startValue = animatedValues[index] || 0;
      const difference = target - startValue;
      
      if (difference === 0) return; // No change needed
      
      const duration = 800; // Shorter duration for snappier transitions
      const steps = 20;
      const stepIncrement = difference / steps;
      let current = startValue;
      let stepCount = 0;
      
      const timer = setInterval(() => {
        stepCount++;
        current += stepIncrement;
        
        if (stepCount >= steps) {
          current = target;
          clearInterval(timer);
        }
        
        // Update the reactive array properly
        animatedValues = animatedValues.map((val, i) => i === index ? Math.floor(current) : val);
      }, duration / steps);
      
      animationTimers.push(timer);
    });
  }
</script>

{#if isVisible && stats.length > 0}
  <div class="floating-stats fixed top-1/2 right-8 transform -translate-y-1/2 z-20 space-y-4">
    {#each stats as stat, index (stat.label)}
      <div class="stat-card glass-effect rounded-2xl p-4 backdrop-blur-xl border border-white/20 shadow-xl animate-slide-in-right"
           style="animation-delay: {index * 0.1}s;">
        <div class="text-center">
          <div class="text-2xl font-bold gradient-text mb-1 transition-all duration-300">
            {animatedValues[index] || 0}{stat.suffix || ''}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 font-medium transition-all duration-300">
            {stat.label}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .floating-stats {
    pointer-events: none;
  }
  
  .stat-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(20px);
    min-width: 80px;
    transform: translateX(100px);
    opacity: 0;
    animation: slideInRight 0.8s ease-out forwards;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .stat-card:hover {
    transform: translateX(0) scale(1.05);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  }
  
  @keyframes slideInRight {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #0ea5e9, #22c55e);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 1024px) {
    .floating-stats {
      display: none;
    }
  }
</style>