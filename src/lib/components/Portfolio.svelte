<script lang="ts">
  /**
   * A coverflow: every card lives on a curved 3D rail and the active one
   * turns to face you. Drag, swipe, arrow keys, the side cards, or the dots
   * all move the rail; it also autoplays while it's on screen.
   */
  import { onMount } from 'svelte';
  import { PORTFOLIO_ITEMS } from '$lib/data/portfolio';
  import SectionHeading from './SectionHeading.svelte';
  import { reveal } from '$lib/actions/motion';

  const AUTOPLAY_MS = 5600;
  const N = PORTFOLIO_ITEMS.length;

  let current = 0;
  let isVisible = false;
  let paused = false;
  let autoplayTimer: ReturnType<typeof setInterval> | undefined;
  let sectionEl: HTMLElement;
  let railEl: HTMLElement;

  /** card width in px, measured so the rail spacing scales with it */
  let cardW = 340;
  /** how many cards show on each side of the active one */
  let wings = 3;

  /* drag state — `offset` is in cards, fractional while dragging */
  let dragging = false;
  let dragStartX = 0;
  let dragOffset = 0;
  let moved = false;

  const startAutoplay = () => {
    stopAutoplay();
    if (paused || !isVisible) return;
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  };
  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  };

  const next = () => (current = (current + 1) % N);
  const prev = () => (current = (current - 1 + N) % N);
  const goTo = (index: number) => (current = ((index % N) + N) % N);

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reduced) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionEl);

    const measure = () => {
      const w = window.innerWidth;
      cardW = w >= 1024 ? 360 : w >= 640 ? 320 : Math.min(300, w * 0.78);
      wings = w >= 1280 ? 3 : w >= 768 ? 2 : 1;
    };
    measure();
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      stopAutoplay();
    };
  });

  /* ---- pointer drag / swipe ---- */
  const onPointerDown = (event: PointerEvent) => {
    dragging = true;
    moved = false;
    dragStartX = event.clientX;
    dragOffset = 0;
    paused = true;
    stopAutoplay();
    // Track on the window rather than capturing the pointer: capture would
    // retarget the click to the rail and the card links would never fire.
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    const dx = event.clientX - dragStartX;
    if (Math.abs(dx) > 6) moved = true;
    dragOffset = -dx / (cardW * 0.62);
  };
  const onPointerUp = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dragOffset) > 0.22) goTo(current + Math.round(dragOffset));
    dragOffset = 0;
    paused = false;
    startAutoplay();
  };
  /** cards are links; a drag must not also count as a click */
  const onClickCapture = (event: MouseEvent) => {
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  };

  /** signed distance from the active card, wrapped so the rail is circular */
  const offsetOf = (i: number, pos: number) => {
    let d = i - pos;
    d = ((((d + N / 2) % N) + N) % N) - N / 2;
    return d;
  };

  $: position = current + dragOffset;

  const getItemType = (item: { title: string }) => {
    if (item.title.includes('Open Source Project')) return 'Open Source';
    if (item.title.includes('Podcast')) return 'Podcast';
    if (item.title.includes('Talk') || item.title.includes('re:Invent') || item.title.includes('Office Hours')) return 'Speaking';
    if (item.title.includes('Whitepaper')) return 'Publication';
    if (item.title.includes('Course')) return 'Education';
    return 'Project';
  };

  const TYPE_STYLE: Record<string, { bg: string; fg: string; ring: string }> = {
    'Open Source': { bg: 'rgb(16 185 129 / .16)', fg: '#34d399', ring: 'rgb(16 185 129 / .32)' },
    Podcast: { bg: 'rgb(139 92 246 / .16)', fg: '#a78bfa', ring: 'rgb(139 92 246 / .32)' },
    Speaking: { bg: 'rgb(14 165 233 / .16)', fg: '#38bdf8', ring: 'rgb(14 165 233 / .32)' },
    Publication: { bg: 'rgb(249 115 22 / .16)', fg: '#fb923c', ring: 'rgb(249 115 22 / .32)' },
    Education: { bg: 'rgb(244 63 94 / .16)', fg: '#fb7185', ring: 'rgb(244 63 94 / .32)' },
    Project: { bg: 'rgb(148 163 184 / .16)', fg: '#94a3b8', ring: 'rgb(148 163 184 / .3)' }
  };

  const linkLabel = (href: string) => {
    if (href.includes('github.com')) return 'View on GitHub';
    if (href.includes('youtube.com')) return 'Watch the talk';
    if (href.includes('podcast') || href.includes('apple.com')) return 'Listen now';
    return 'Learn more';
  };
</script>

<section id="portfolio" bind:this={sectionEl} class="section-dark relative overflow-hidden py-24 md:py-32">
  <div class="aurora" aria-hidden="true">
    <span
      class="h-[30rem] w-[30rem] top-1/3 -left-40"
      style="background:radial-gradient(circle,var(--color-primary-500),transparent 62%);opacity:.1;"
    ></span>
    <span
      class="h-[28rem] w-[28rem] -right-32 bottom-0"
      style="background:radial-gradient(circle,var(--color-plasma-500),transparent 62%);opacity:.09;animation-delay:-16s;"
    ></span>
  </div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Selected work"
        subtitle="Open source projects, conference stages, podcasts, and publications — the work that happens outside the org chart."
      >
        Featured <span class="gradient-text">Portfolio</span>
      </SectionHeading>
    </div>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="relative outline-none"
    use:reveal={{ delay: 80 }}
    role="group"
    aria-roledescription="carousel"
    aria-label="Featured portfolio"
    tabindex="0"
    on:keydown={onKeydown}
    on:mouseenter={() => {
      paused = true;
      stopAutoplay();
    }}
    on:mouseleave={() => {
      paused = false;
      startAutoplay();
    }}
  >
    <!-- the rail: pointer events only; keyboard navigation lives on the carousel group above -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      bind:this={railEl}
      class="coverflow relative mx-auto w-full"
      style="height:{cardW * 1.32}px;perspective:{cardW * 4.2}px;"
      on:pointerdown={onPointerDown}
      on:click|capture={onClickCapture}
    >
      {#each PORTFOLIO_ITEMS as item, i}
        {@const off = offsetOf(i, position)}
        {@const abs = Math.abs(off)}
        {@const visible = abs <= wings + 0.5}
        {@const type = getItemType(item)}
        {@const style = TYPE_STYLE[type]}
        {@const active = Math.round(position) === i || (abs < 0.5 && !dragging)}
        <article
          class="coverflow-card absolute top-1/2 left-1/2"
          class:is-active={active}
          class:is-dragging={dragging}
          style="
            width:{cardW}px;
            transform:
              translate(-50%,-50%)
              translateX({off * cardW * 0.62}px)
              translateZ({-abs * cardW * 0.55}px)
              rotateY({-Math.max(-1, Math.min(1, off)) * 38 - Math.sign(off) * Math.max(0, abs - 1) * 4}deg);
            opacity:{visible ? Math.max(0, 1 - Math.max(0, abs - 0.5) * 0.32) : 0};
            z-index:{100 - Math.round(abs * 10)};
            pointer-events:{visible ? 'auto' : 'none'};
          "
          aria-hidden={!active}
        >
          <!-- the active card is one big link; side cards are buttons that bring themselves forward -->
          <svelte:element
            this={active && item.href ? 'a' : 'div'}
            href={active && item.href ? item.href : undefined}
            target={active && item.href ? '_blank' : undefined}
            rel={active && item.href ? 'noopener noreferrer' : undefined}
            draggable="false"
            class="glass-effect spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl"
          >
            <!-- media -->
            <div class="relative h-44 overflow-hidden" style="background-color:var(--surface-1);">
              {#if item.imgSrc}
                <img
                  src={item.imgSrc}
                  alt=""
                  class="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                  style="transition-timing-function:cubic-bezier(.16,1,.3,1);"
                  loading="lazy"
                  draggable="false"
                />
              {:else}
                <div class="grid h-full w-full place-items-center">
                  <span
                    class="grid h-14 w-14 place-items-center rounded-2xl"
                    style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));"
                  >
                    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 17l8 4 8-4" />
                    </svg>
                  </span>
                </div>
              {/if}
              <div
                class="pointer-events-none absolute inset-0"
                style="background:linear-gradient(to top,rgb(5 8 15 / .88) 0%,rgb(5 8 15 / .3) 34%,transparent 62%);"
              ></div>
              <span
                class="font-mono absolute bottom-3.5 left-3.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md"
                style="background-color:{style.bg};color:{style.fg};border:1px solid {style.ring};"
              >
                {type}
              </span>
              <span class="font-mono absolute top-3.5 right-4 text-[10px] tabular-nums text-slate-400">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <!-- body -->
            <div class="flex flex-1 flex-col p-6">
              <h3 class="font-display clamp-3 mb-3 text-[16px] leading-snug font-bold tracking-tight" style="color:var(--text-1);">
                {item.title}
              </h3>
              <p class="clamp-4 mb-5 text-[13.5px] leading-relaxed" style="color:var(--text-2);">
                {item.description}
              </p>

              <div class="mt-auto pt-4" style="border-top:1px solid var(--hairline);">
                {#if item.href}
                  <span
                    class="font-display inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300"
                    style="color:var(--color-primary-500);"
                  >
                    {linkLabel(item.href)}
                    <svg class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                {:else}
                  <span class="font-mono text-[12px] italic" style="color:var(--text-3);">Not publicly linked</span>
                {/if}
              </div>
            </div>

            <!-- side cards are dimmed; a click on one brings it to the front -->
            {#if !active}
              <button
                class="absolute inset-0 z-10 h-full w-full"
                style="background:linear-gradient(to bottom,rgb(5 8 15 / {0.2 + Math.min(abs, 3) * 0.12}),rgb(5 8 15 / {0.45 + Math.min(abs, 3) * 0.12}));"
                on:click={() => goTo(i)}
                aria-label="Show {item.title}"
                tabindex="-1"
              ></button>
            {/if}
          </svelte:element>

          <!-- reflection -->
          <div class="coverflow-reflection" aria-hidden="true"></div>
        </article>
      {/each}
    </div>

    <!-- controls -->
    <div class="container-max section-padding relative">
      <div class="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-4">
        <button
          class="grid h-11 w-11 place-items-center rounded-full transition-all duration-500 hover:scale-110"
          style="background-color:var(--glass-bg);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);backdrop-filter:blur(14px);color:var(--text-1);"
          on:click={prev}
          aria-label="Previous"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="flex items-center gap-2">
          {#each PORTFOLIO_ITEMS as _, index}
            <button
              class="relative h-[3px] overflow-hidden rounded-full transition-all duration-500"
              style="width:{index === current ? '2.25rem' : '0.9rem'};background-color:var(--hairline);"
              on:click={() => goTo(index)}
              aria-label="Go to item {index + 1} of {N}"
              aria-current={index === current ? 'true' : undefined}
            >
              {#if index === current}
                {#key current}
                  <span
                    class="absolute inset-y-0 left-0 rounded-full"
                    style="
                      background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500));
                      animation:segFill {AUTOPLAY_MS}ms linear both;
                      animation-play-state:{paused ? 'paused' : 'running'};
                    "
                  ></span>
                {/key}
              {/if}
            </button>
          {/each}
        </div>

        <button
          class="grid h-11 w-11 place-items-center rounded-full transition-all duration-500 hover:scale-110"
          style="background-color:var(--glass-bg);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);backdrop-filter:blur(14px);color:var(--text-1);"
          on:click={next}
          aria-label="Next"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <span class="font-mono ml-2 text-[11px] tabular-nums" style="color:var(--text-3);">
          {String(current + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}
        </span>
      </div>
    </div>
  </div>
</section>

<style>
  .coverflow {
    transform-style: preserve-3d;
    touch-action: pan-y;
    cursor: grab;
    /* fade the rail's edges into the section */
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .coverflow:active { cursor: grabbing; }
  .coverflow-card a { cursor: pointer; }

  .coverflow-card {
    height: calc(100% - 3.5rem);
    transform-style: preserve-3d;
    transition:
      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .coverflow-card.is-dragging { transition: none; }

  .coverflow-card > .glass-effect {
    transition: box-shadow 0.6s var(--ease-out-expo), border-color 0.6s var(--ease-out-expo);
  }
  .coverflow-card.is-active > .glass-effect {
    border-color: rgb(56 189 248 / 0.45);
    box-shadow:
      0 0 0 1px rgb(56 189 248 / 0.15),
      0 30px 70px -24px rgb(14 165 233 / 0.55),
      var(--glass-shadow-hover);
  }

  /* a faint mirrored glow beneath each card, sitting on the rail's "floor" */
  .coverflow-reflection {
    position: absolute;
    left: 8%;
    right: 8%;
    bottom: -2.4rem;
    height: 2rem;
    border-radius: 9999px;
    background: radial-gradient(ellipse at 50% 0%, rgb(56 189 248 / 0.35), rgb(52 211 153 / 0.12) 55%, transparent 75%);
    filter: blur(10px);
    opacity: 0.55;
    transform: translateZ(-1px);
    transition: opacity 0.6s ease;
  }
  .coverflow-card.is-active .coverflow-reflection { opacity: 1; }

  @keyframes segFill {
    from { width: 0%; }
    to   { width: 100%; }
  }
</style>
