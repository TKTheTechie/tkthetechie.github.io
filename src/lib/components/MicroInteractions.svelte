<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let mounted = false;
  
  onMount(() => {
    if (!browser) return;
    
    mounted = true;
    
    // Add micro-interaction classes to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(element => {
      // Add hover sound effect (optional)
      element.addEventListener('mouseenter', () => {
        element.classList.add('micro-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('micro-hover');
      });
      
      // Add click feedback
      element.addEventListener('mousedown', () => {
        element.classList.add('micro-click');
      });
      
      element.addEventListener('mouseup', () => {
        setTimeout(() => {
          element.classList.remove('micro-click');
        }, 150);
      });
    });
    
    // Add scroll-triggered micro-animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('micro-reveal');
        }
      });
    }, observerOptions);
    
    // Observe elements with micro-animation classes
    const animatedElements = document.querySelectorAll('.micro-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  });
</script>

{#if mounted}
  <!-- Floating Action Feedback -->
  <div id="micro-feedback" class="fixed top-4 right-4 z-[10000] pointer-events-none">
    <!-- Dynamic feedback messages will be inserted here -->
  </div>
{/if}

<style>
  :global(.micro-hover) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  :global(.micro-click) {
    transform: translateY(0) scale(0.98);
    transition: transform 0.1s ease;
  }
  
  :global(.micro-reveal) {
    animation: microReveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  :global(.micro-animate) {
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes microReveal {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Micro-interaction for form elements */
  :global(input:focus, textarea:focus) {
    transform: scale(1.02);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
  
  /* Micro-interaction for cards */
  :global(.card:hover) {
    transform: translateY(-4px) rotateX(2deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  /* Micro-interaction for badges */
  :global(.badge:hover) {
    transform: scale(1.1) rotate(2deg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
</style>