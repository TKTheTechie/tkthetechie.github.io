<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'primary' | 'secondary' | 'accent' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let href: string = '';
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let morphOnHover: boolean = true;
  export let glowEffect: boolean = true;
  export let rippleEffect: boolean = true;
  
  const dispatch = createEventDispatcher();
  
  let buttonRef: HTMLElement;
  let isHovered = false;
  let isPressed = false;
  let ripples: Array<{ id: number; x: number; y: number }> = [];
  let rippleId = 0;
  
  function handleClick(event: MouseEvent) {
    if (disabled || loading) return;
    
    if (rippleEffect && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = { id: rippleId++, x, y };
      ripples = [...ripples, newRipple];
      
      // Remove ripple after animation
      setTimeout(() => {
        ripples = ripples.filter(r => r.id !== newRipple.id);
      }, 600);
    }
    
    dispatch('click', event);
  }
  
  function handleMouseDown() {
    isPressed = true;
  }
  
  function handleMouseUp() {
    isPressed = false;
  }
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
    isPressed = false;
  }
  
  $: sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }[size];
  
  $: variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-gray-600',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white border-accent-500'
  }[variant];
</script>

{#if href}
  <a
    {href}
    bind:this={buttonRef}
    class="morphing-button {sizeClasses} {variantClasses}"
    class:morphing-button--hovered={isHovered}
    class:morphing-button--pressed={isPressed}
    class:morphing-button--disabled={disabled}
    class:morphing-button--loading={loading}
    class:morphing-button--glow={glowEffect}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:click={handleClick}
  >
    <span class="morphing-button__content">
      {#if loading}
        <div class="morphing-button__spinner"></div>
      {/if}
      <slot />
    </span>
    
    {#if rippleEffect}
      {#each ripples as ripple (ripple.id)}
        <span 
          class="morphing-button__ripple"
          style="left: {ripple.x}px; top: {ripple.y}px;"
        ></span>
      {/each}
    {/if}
  </a>
{:else}
  <button
    bind:this={buttonRef}
    class="morphing-button {sizeClasses} {variantClasses}"
    class:morphing-button--hovered={isHovered}
    class:morphing-button--pressed={isPressed}
    class:morphing-button--disabled={disabled}
    class:morphing-button--loading={loading}
    class:morphing-button--glow={glowEffect}
    {disabled}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:click={handleClick}
  >
    <span class="morphing-button__content">
      {#if loading}
        <div class="morphing-button__spinner"></div>
      {/if}
      <slot />
    </span>
    
    {#if rippleEffect}
      {#each ripples as ripple (ripple.id)}
        <span 
          class="morphing-button__ripple"
          style="left: {ripple.x}px; top: {ripple.y}px;"
        ></span>
      {/each}
    {/if}
  </button>
{/if}

<style>
  .morphing-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;
    transform-origin: center;
    backdrop-filter: blur(10px);
  }
  
  .morphing-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  .morphing-button--hovered::before {
    transform: translateX(100%);
  }
  
  .morphing-button--hovered {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  .morphing-button--pressed {
    transform: translateY(0) scale(0.98);
    box-shadow: 
      0 5px 15px rgba(0, 0, 0, 0.3),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .morphing-button--glow {
    box-shadow: 
      0 0 20px rgba(14, 165, 233, 0.3),
      0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .morphing-button--glow.morphing-button--hovered {
    box-shadow: 
      0 0 30px rgba(14, 165, 233, 0.5),
      0 10px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  .morphing-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  .morphing-button--loading {
    cursor: wait;
  }
  
  .morphing-button__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 2;
  }
  
  .morphing-button__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .morphing-button__ripple {
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes ripple {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
</style>