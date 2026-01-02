<script lang="ts">
  import '../app.css';
  import { darkMode } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  
  let isReady = false;
  
  onMount(() => {
    // Initialize the store state to match what was set in app.html
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme === 'light' ? false : true;
    darkMode.set(shouldBeDark);
    
    // Fallback timeout to ensure loading doesn't hang
    const fallbackTimer = setTimeout(() => {
      isReady = true;
    }, 2000);
    
    // Wait for fonts and critical resources to load
    Promise.all([
      document.fonts.ready,
      new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', () => resolve(true));
        }
      })
    ]).then(() => {
      clearTimeout(fallbackTimer);
      // Small additional delay to ensure smooth transition
      setTimeout(() => {
        isReady = true;
      }, 50);
    }).catch(() => {
      // In case of any errors, still show the content
      clearTimeout(fallbackTimer);
      isReady = true;
    });
  });
</script>

<LoadingIndicator />

{#if isReady}
  <main class="min-h-screen transition-colors duration-300">
    <slot />
  </main>
{/if}