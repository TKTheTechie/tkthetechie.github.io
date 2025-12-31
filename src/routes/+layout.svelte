<script lang="ts">
  import '../app.css';
  import { darkMode } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Initialize dark mode
    darkMode.init();
  });
</script>

<main class="min-h-screen transition-colors duration-300">
  <slot />
</main>