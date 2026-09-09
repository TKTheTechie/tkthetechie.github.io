<script lang="ts">
  /**
   * A word cloud on the surface of a sphere, projected by hand onto the DOM.
   * No WebGL — every tag is a real, selectable element — but it rotates,
   * shades with depth, and spins on drag like a physical object.
   */
  import { onMount } from 'svelte';

  export let items: string[] = [];
  /** px radius on desktop; shrinks with the container */
  export let radius = 190;
  export let autoSpeed = 0.28;

  let host: HTMLDivElement;
  let tags: HTMLElement[] = [];
  let dragging = false;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = items.length;

    // Fibonacci sphere, so the words spread evenly
    const points = items.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return { x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) };
    });

    let ax = 0.35; // rotation about x
    let ay = 0; // rotation about y
    let vx = 0;
    let vy = autoSpeed;
    let R = radius;
    let raf = 0;
    let onScreen = true;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const measure = () => {
      const rect = host.getBoundingClientRect();
      R = Math.min(radius, rect.width * 0.42, rect.height * 0.42);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    measure();

    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.05 });
    io.observe(host);

    const render = () => {
      const cx = host.clientWidth / 2;
      const cy = host.clientHeight / 2;
      const sy = Math.sin(ay);
      const cyy = Math.cos(ay);
      const sx = Math.sin(ax);
      const cxx = Math.cos(ax);
      for (let i = 0; i < n; i++) {
        const p = points[i];
        // rotate about y, then x
        const x1 = p.x * cyy - p.z * sy;
        const z1 = p.x * sy + p.z * cyy;
        const y2 = p.y * cxx - z1 * sx;
        const z2 = p.y * sx + z1 * cxx;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const scale = 0.62 + depth * 0.58;
        const el = tags[i];
        if (!el) continue;
        el.style.transform = `translate3d(${cx + x1 * R}px, ${cy + y2 * R}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = (0.18 + depth * 0.82).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = `blur(${((1 - depth) * 1.6).toFixed(2)}px)`;
      }
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!onScreen) return;
      if (!dragging) {
        // ease back toward the idle spin
        vy += (autoSpeed - vy) * 0.02;
        vx += (0 - vx) * 0.04;
        ax += (0.35 - ax) * 0.01;
      }
      ay += vy * 0.016;
      ax += vx * 0.016;
      render();
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      host.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(8, now - lastT) / 1000;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      // keep the release velocity equal to the drag rate, capped so a flick can't spin it wild
      vy = Math.max(-6, Math.min(6, ((dx / R) * 0.9) / dt));
      vx = Math.max(-6, Math.min(6, ((dy / R) * 0.9) / dt));
      ay += dx / R * 0.9;
      ax += dy / R * 0.9;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const onUp = () => {
      dragging = false;
    };

    host.addEventListener('pointerdown', onDown);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerup', onUp);
    host.addEventListener('pointercancel', onUp);

    render();
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp);
      host.removeEventListener('pointercancel', onUp);
    };
  });
</script>

<div
  bind:this={host}
  class="tag-sphere relative mx-auto h-[22rem] w-full max-w-[34rem] select-none sm:h-[26rem]"
  class:is-dragging={dragging}
  role="img"
  aria-label={items.join(', ')}
>
  <!-- a soft core so the sphere reads as a solid -->
  <div
    class="pointer-events-none absolute top-1/2 left-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
    style="background:radial-gradient(circle,rgb(14 165 233 / .35),rgb(16 185 129 / .18) 55%,transparent 72%);"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
    style="border:1px dashed color-mix(in oklab, var(--color-primary-500) 30%, transparent);animation:spin 40s linear infinite;"
    aria-hidden="true"
  ></div>

  {#each items as item, i}
    <span
      bind:this={tags[i]}
      class="tag absolute top-0 left-0 rounded-full px-3.5 py-1.5 font-mono text-[12px] whitespace-nowrap will-change-transform"
      style="border:1px solid var(--hairline);background-color:color-mix(in oklab, var(--surface-2) 88%, transparent);color:var(--text-1);backdrop-filter:blur(6px);"
    >
      {item}
    </span>
  {/each}
</div>

<style>
  .tag-sphere { cursor: grab; touch-action: none; }
  .tag-sphere.is-dragging { cursor: grabbing; }
  .tag { transition: border-color 0.3s ease, color 0.3s ease; }
  .tag-sphere:hover .tag { border-color: color-mix(in oklab, var(--color-primary-500) 35%, transparent); }
</style>
