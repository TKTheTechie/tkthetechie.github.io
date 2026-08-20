<script lang="ts">
  import { onMount } from 'svelte';
  import { PORTFOLIO_ITEMS } from '$lib/data/portfolio';
  import SectionHeading from './SectionHeading.svelte';
  import { reveal, tilt } from '$lib/actions/motion';

  const AUTOPLAY_MS = 6000;

  let isVisible = false;
  let currentIndex = 0;
  let itemsPerView = 3;
  let autoplayTimer: ReturnType<typeof setInterval> | undefined;
  let paused = false;
  let sectionEl: HTMLElement;

  /** drag state */
  let dragging = false;
  let dragStartX = 0;
  let dragDelta = 0;
  let trackWidth = 1;

  $: totalSlides = Math.max(1, Math.ceil(PORTFOLIO_ITEMS.length / itemsPerView));
  $: maxIndex = totalSlides - 1;
  // clamp when the breakpoint changes under us
  $: if (currentIndex > maxIndex) currentIndex = maxIndex;

  const startAutoplay = () => {
    stopAutoplay();
    if (paused || !isVisible) return;
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  };
  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  };

  const next = () => (currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1);
  const prev = () => (currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1);
  const goTo = (index: number) => (currentIndex = index);

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reduced) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.15 }
    );
    if (sectionEl) observer.observe(sectionEl);

    const updateItemsPerView = () => {
      itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateItemsPerView);
      stopAutoplay();
    };
  });

  /* ---- pointer drag / swipe ---- */
  const onPointerDown = (event: PointerEvent) => {
    // let clicks on the cards themselves through
    if ((event.target as HTMLElement).closest('a')) return;
    dragging = true;
    dragStartX = event.clientX;
    dragDelta = 0;
    trackWidth = (event.currentTarget as HTMLElement).clientWidth || 1;
    paused = true;
    stopAutoplay();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    dragDelta = event.clientX - dragStartX;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    const threshold = Math.min(120, trackWidth * 0.12);
    if (dragDelta <= -threshold) next();
    else if (dragDelta >= threshold) prev();
    dragging = false;
    dragDelta = 0;
    paused = false;
    startAutoplay();
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
  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Selected work"
        subtitle="Open source projects, conference stages, podcasts, and publications — the work that happens outside the org chart."
      >
        Featured <span class="gradient-text">Portfolio</span>
      </SectionHeading>

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
        <!-- viewport -->
        <div
          class="overflow-hidden rounded-3xl"
          style="cursor:{dragging ? 'grabbing' : 'grab'};touch-action:pan-y;"
          on:pointerdown={onPointerDown}
          on:pointermove={onPointerMove}
          on:pointerup={onPointerUp}
          on:pointercancel={onPointerUp}
          on:pointerleave={onPointerUp}
        >
          <div
            class="flex"
            style="
              transform:translate3d(calc({-currentIndex * 100}% + {dragDelta}px),0,0);
              transition:{dragging ? 'none' : 'transform .75s cubic-bezier(.16,1,.3,1)'};
            "
          >
            {#each Array(totalSlides) as _, slideIndex}
              <div class="w-full shrink-0" aria-hidden={slideIndex !== currentIndex}>
                <div class="grid gap-5 px-1 md:grid-cols-2 lg:grid-cols-3">
                  {#each PORTFOLIO_ITEMS.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView) as item}
                    {@const type = getItemType(item)}
                    {@const style = TYPE_STYLE[type]}
                    <article
                      class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-2xl"
                      use:tilt={{ max: 6, lift: 8 }}
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

                        <!-- scrim so the badge always reads -->
                        <div
                          class="pointer-events-none absolute inset-0"
                          style="background:linear-gradient(to top,rgb(5 8 15 / .88) 0%,rgb(5 8 15 / .3) 34%,transparent 62%);"
                        ></div>

                        <!-- type badge -->
                        <span
                          class="font-mono absolute bottom-3.5 left-3.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md"
                          style="background-color:{style.bg};color:{style.fg};border:1px solid {style.ring};"
                        >
                          {type}
                        </span>
                      </div>

                      <!-- body -->
                      <div class="flex flex-1 flex-col p-6">
                        <h3
                          class="font-display clamp-3 mb-3 text-[16px] leading-snug font-bold tracking-tight transition-colors duration-300"
                          style="color:var(--text-1);"
                        >
                          {item.title}
                        </h3>
                        <p class="clamp-4 mb-5 text-[13.5px] leading-relaxed" style="color:var(--text-2);">
                          {item.description}
                        </p>

                        <div class="mt-auto pt-4" style="border-top:1px solid var(--hairline);">
                          {#if item.href}
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="font-display inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300"
                              style="color:var(--color-primary-500);"
                            >
                              {linkLabel(item.href)}
                              <svg
                                class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                              </svg>
                            </a>
                          {:else}
                            <span class="font-mono text-[12px] italic" style="color:var(--text-3);">
                              Not publicly linked
                            </span>
                          {/if}
                        </div>
                      </div>
                    </article>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- arrows -->
        <button
          class="absolute top-1/2 -left-3 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition-all duration-500 hover:scale-110 lg:-left-14"
          style="background-color:var(--glass-bg);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);backdrop-filter:blur(14px);color:var(--text-1);"
          on:click={prev}
          aria-label="Previous slide"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute top-1/2 -right-3 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition-all duration-500 hover:scale-110 lg:-right-14"
          style="background-color:var(--glass-bg);border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);backdrop-filter:blur(14px);color:var(--text-1);"
          on:click={next}
          aria-label="Next slide"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- segmented progress: the active bar fills over the autoplay dwell -->
        <div class="mt-9 flex items-center justify-center gap-2.5">
          {#each Array(totalSlides) as _, index}
            <button
              class="group relative h-[3px] overflow-hidden rounded-full transition-all duration-500"
              style="width:{index === currentIndex ? '2.75rem' : '1.25rem'};background-color:var(--hairline);"
              on:click={() => goTo(index)}
              aria-label="Go to slide {index + 1} of {totalSlides}"
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              {#if index === currentIndex}
                {#key currentIndex}
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

          <span class="font-mono ml-3 text-[11px] tabular-nums" style="color:var(--text-3);">
            {String(currentIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes segFill {
    from { width: 0%; }
    to   { width: 100%; }
  }
</style>
