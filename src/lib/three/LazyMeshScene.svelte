<script lang="ts">
  /**
   * Three.js is ~150 kB gzipped, so the scene is imported after hydration
   * rather than bundled into the page. The section paints immediately with
   * its gradients; the mesh fades in a beat later.
   */
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';

  let Scene: ComponentType | null = null;

  onMount(() => {
    let cancelled = false;
    import('./MeshScene.svelte').then((mod) => {
      if (!cancelled) Scene = mod.default;
    });
    return () => {
      cancelled = true;
    };
  });
</script>

{#if Scene}
  <div class="mesh-fade absolute inset-0">
    <svelte:component this={Scene} {...$$restProps} />
  </div>
{/if}

<style>
  .mesh-fade { animation: meshIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  @keyframes meshIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: none; }
  }
</style>
