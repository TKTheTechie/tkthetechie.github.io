<script lang="ts">
  import { onMount } from 'svelte';
  
  let isLoading = true;
  let fadeOut = false;
  
  onMount(() => {
    // Start fade out after a short delay
    const fadeTimer = setTimeout(() => {
      fadeOut = true;
    }, 100);
    
    // Hide loading indicator after fade animation
    const hideTimer = setTimeout(() => {
      isLoading = false;
    }, 400);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  });
</script>

{#if isLoading}
  <div class="loading-overlay" class:fade-out={fadeOut} aria-label="Loading">
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
{/if}

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }
  
  .loading-overlay.fade-out {
    opacity: 0;
  }
  
  .loading-content {
    text-align: center;
    color: white;
    animation: fadeInUp 0.5s ease-out;
  }
  
  .loading-spinner {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
  }
  
  .spinner-ring {
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid transparent;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  
  .spinner-ring:nth-child(1) {
    border-top-color: #0ea5e9;
    animation-delay: -0.45s;
  }
  
  .spinner-ring:nth-child(2) {
    border-top-color: #22c55e;
    animation-delay: -0.3s;
  }
  
  .spinner-ring:nth-child(3) {
    border-top-color: #0ea5e9;
    animation-delay: -0.15s;
  }
  
  .loading-text {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    opacity: 0.9;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>