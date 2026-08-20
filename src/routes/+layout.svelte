<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { darkMode } from '$lib/stores/theme';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';

  let transitionMs = 0;

  onMount(() => {
    darkMode.init();
    // Only animate route changes for users who want motion.
    transitionMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;
  });

  /* Keyed on pathname only: in-page hash links must not remount the page. */
  $: routeKey = $page.url.pathname;
</script>

<!-- film grain: kills gradient banding and gives the flat surfaces some tooth -->
<div class="grain" aria-hidden="true"></div>

<main class="min-h-screen">
  {#key routeKey}
    <div in:fly={{ y: 14, duration: transitionMs, easing: cubicOut }}>
      <slot />
    </div>
  {/key}
</main>

<CommandPalette />
<BackToTop />
