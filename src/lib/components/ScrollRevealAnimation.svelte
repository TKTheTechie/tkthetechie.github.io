<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let children: string = '';
  export let delay: number = 0;
  export let duration: number = 0.8;
  export let distance: number = 60;
  export let direction: 'up' | 'down' | 'left' | 'right' | 'fade' = 'up';
  export let threshold: number = 0.1;
  export let once: boolean = true;
  export let cascade: boolean = false;
  export let cascadeDelay: number = 0.1;
  
  let elementRef: HTMLElement;
  let isVisible = false;
  let hasAnimated = false;
  
  onMount(() => {
    if (!browser || !elementRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          isVisible = true;
          hasAnimated = true;
          
          if (cascade) {
            animateCascade();
          }
        } else if (!once) {
          isVisible = false;
        }
      },
      { threshold }
    );
    
    observer.observe(elementRef);
    
    const animateCascade = () => {
      const children = elementRef.querySelectorAll('.cascade-item');
      children.forEach((child, index) => {
        const element = child as HTMLElement;
        element.style.animationDelay = `${delay + (index * cascadeDelay)}s`;
        element.classList.add('animate-reveal');
      });
    };
    
    return () => observer.disconnect();
  });
  
  $: animationClass = getAnimationClass(direction);
  
  function getAnimationClass(dir: string) {
    switch (dir) {
      case 'up': return 'animate-slide-up-reveal';
      case 'down': return 'animate-slide-down-reveal';
      case 'left': return 'animate-slide-left-reveal';
      case 'right': return 'animate-slide-right-reveal';
      case 'fade': return 'animate-fade-reveal';
      default: return 'animate-slide-up-reveal';
    }
  }
</script>

<div 
  bind:this={elementRef}
  class="scroll-reveal"
  class:is-visible={isVisible}
  style="--delay: {delay}s; --duration: {duration}s; --distance: {distance}px;"
>
  <slot />
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transition: all var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: var(--delay);
  }
  
  .scroll-reveal.is-visible {
    opacity: 1;
  }
  
  /* Slide Up Animation */
  .scroll-reveal:not(.is-visible) :global(.animate-slide-up-reveal) {
    transform: translateY(var(--distance));
    opacity: 0;
  }
  
  .scroll-reveal.is-visible :global(.animate-slide-up-reveal) {
    transform: translateY(0);
    opacity: 1;
  }
  
  /* Slide Down Animation */
  .scroll-reveal:not(.is-visible) :global(.animate-slide-down-reveal) {
    transform: translateY(calc(-1 * var(--distance)));
    opacity: 0;
  }
  
  .scroll-reveal.is-visible :global(.animate-slide-down-reveal) {
    transform: translateY(0);
    opacity: 1;
  }
  
  /* Slide Left Animation */
  .scroll-reveal:not(.is-visible) :global(.animate-slide-left-reveal) {
    transform: translateX(var(--distance));
    opacity: 0;
  }
  
  .scroll-reveal.is-visible :global(.animate-slide-left-reveal) {
    transform: translateX(0);
    opacity: 1;
  }
  
  /* Slide Right Animation */
  .scroll-reveal:not(.is-visible) :global(.animate-slide-right-reveal) {
    transform: translateX(calc(-1 * var(--distance)));
    opacity: 0;
  }
  
  .scroll-reveal.is-visible :global(.animate-slide-right-reveal) {
    transform: translateX(0);
    opacity: 1;
  }
  
  /* Fade Animation */
  .scroll-reveal:not(.is-visible) :global(.animate-fade-reveal) {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .scroll-reveal.is-visible :global(.animate-fade-reveal) {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Cascade Animation */
  :global(.cascade-item) {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  :global(.cascade-item.animate-reveal) {
    opacity: 1;
    transform: translateY(0);
  }
</style>