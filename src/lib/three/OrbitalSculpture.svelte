<script lang="ts">
  import { onMount } from 'svelte';
  export let paused = false;
  let host: HTMLDivElement;
  let ready = false;
  let scene:
    { destroy: () => void; setPaused: (value: boolean) => void } | undefined;
  $: scene?.setPaused(paused);
  onMount(() => {
    let cancelled = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const { createOrbitalScene } = await import('./orbital-scene');
          if (cancelled) return;
          scene = createOrbitalScene(host, paused);
          ready = true;
        } catch {
          // Keep the CSS sculpture on devices without WebGL.
        }
      },
      { rootMargin: '150px' },
    );
    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      scene?.destroy();
    };
  });
</script>

<div bind:this={host} class="sculpture" class:ready aria-hidden="true">
  <div class="fallback"><span></span><span></span><span></span><i></i></div>
</div>

<style>
  .sculpture {
    position: absolute;
    inset: 0;
  }
  .sculpture :global(canvas) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s;
  }
  .sculpture.ready :global(canvas) {
    opacity: 1;
  }
  .ready .fallback {
    opacity: 0;
  }
  .fallback {
    position: absolute;
    inset: 18% 12%;
    perspective: 700px;
    transition: opacity 0.8s;
  }
  .fallback span {
    position: absolute;
    inset: 10%;
    border: 22px solid #b5d4a0;
    border-radius: 50%;
    box-shadow:
      inset 3px 6px 8px #eaffe5,
      6px 12px 20px #0008;
    transform: rotateY(55deg) rotateZ(-35deg);
  }
  .fallback span:nth-child(2) {
    transform: rotateX(55deg) rotateZ(30deg);
    border-color: #8d9e89;
  }
  .fallback span:nth-child(3) {
    transform: rotateY(-45deg) rotateZ(45deg);
    border-color: #d6e3bc;
  }
  .fallback i {
    position: absolute;
    inset: -6%;
    border: 1px solid #d2f87988;
    border-radius: 50%;
    transform: rotateX(60deg) rotateZ(-25deg);
  }
</style>
