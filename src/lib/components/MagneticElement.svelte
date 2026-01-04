<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let strength: number = 0.3;
  export let distance: number = 100;
  export let returnSpeed: number = 0.15;
  export let disabled: boolean = false;
  
  let elementRef: HTMLElement;
  let isHovered = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let animationId: number;
  
  onMount(() => {
    if (!browser || !elementRef || disabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = elementRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distanceFromCenter < distance) {
        isHovered = true;
        const force = Math.max(0, 1 - distanceFromCenter / distance);
        targetX = deltaX * strength * force;
        targetY = deltaY * strength * force;
      } else {
        isHovered = false;
        targetX = 0;
        targetY = 0;
      }
    };
    
    const handleMouseLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    };
    
    const animate = () => {
      currentX += (targetX - currentX) * returnSpeed;
      currentY += (targetY - currentY) * returnSpeed;
      
      elementRef.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      
      animationId = requestAnimationFrame(animate);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    animate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  });
</script>

<div 
  bind:this={elementRef}
  class="magnetic-element"
  class:magnetic-element--hovered={isHovered}
>
  <slot />
</div>

<style>
  .magnetic-element {
    transition: transform 0.1s ease-out;
    will-change: transform;
  }
  
  .magnetic-element--hovered {
    z-index: 10;
  }
</style>