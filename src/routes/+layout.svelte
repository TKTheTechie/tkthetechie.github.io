<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { darkMode } from '$lib/stores/theme';
  import { setLenis } from '$lib/stores/scroll';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';

  let transitionMs = 0;

  onMount(() => {
    darkMode.init();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Only animate route changes for users who want motion.
    transitionMs = reduced ? 0 : 320;
    if (reduced) return;

    /*
      Lenis gives the page inertia: wheel input is eased instead of stepped,
      which is what makes the parallax layers and 3D scenes feel attached to
      the scroll rather than jittering behind it. Loaded lazily so it never
      blocks first paint.
    */
    let raf = 0;
    let lenis: import('lenis').default | null = null;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        anchors: { duration: 1.2 }
      });
      setLenis(lenis);
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
    };
  });

  /* Keyed on pathname only: in-page hash links must not remount the page. */
  $: routeKey = $page.url.pathname;

  // A route change lands at the top; a hash on the URL is honoured after paint.
  afterNavigate(({ to }) => {
    const hash = to?.url.hash;
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
      });
    }
  });
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
