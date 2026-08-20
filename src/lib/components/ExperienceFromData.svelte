<script lang="ts">
  import { onMount } from 'svelte';
  import experienceData from '$lib/data/experience.json';
  import SectionHeading from './SectionHeading.svelte';
  import { reveal, tilt } from '$lib/actions/motion';

  let timelineEl: HTMLElement;
  /** 0–1: how far the reader has travelled through the timeline */
  let progress = 0;
  /** which milestones the progress line has already reached */
  let reached: boolean[] = experienceData.experiences.map(() => false);

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      progress = 1;
      reached = reached.map(() => true);
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      if (!timelineEl) return;
      const rect = timelineEl.getBoundingClientRect();
      // start filling when the timeline top passes 72% of the viewport and
      // finish as its bottom clears the middle
      const startAt = window.innerHeight * 0.72;
      const span = rect.height + startAt - window.innerHeight * 0.5;
      progress = Math.max(0, Math.min(1, (startAt - rect.top) / Math.max(1, span)));

      const dots = Array.from(timelineEl.querySelectorAll<HTMLElement>('[data-dot]'));
      const filledTo = rect.top + rect.height * progress;
      reached = dots.map((dot) => dot.getBoundingClientRect().top <= filledTo + 4);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<section id="experience" class="section-dark relative overflow-hidden py-24 md:py-32">
  <div class="mesh-grid opacity-25" aria-hidden="true"></div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading eyebrow="Career" subtitle={experienceData.subtitle}>
        Professional <span class="gradient-text">Experience</span>
      </SectionHeading>

      <!--
        A left rail rather than an alternating zigzag: these cards are tall,
        and centre-alternating would leave hundreds of pixels of dead space
        opposite each one.
      -->
      <div class="relative" bind:this={timelineEl}>
        <!-- track -->
        <div
          class="absolute top-0 bottom-0 left-[11px] w-[2px] md:left-[10.25rem]"
          style="background-color:var(--hairline);"
          aria-hidden="true"
        ></div>

        <!-- the line draws itself as you scroll -->
        <div
          class="absolute top-0 left-[11px] h-full w-[2px] origin-top md:left-[10.25rem]"
          style="
            transform:scaleY({progress});
            background-image:linear-gradient(to bottom,var(--color-primary-500),var(--color-accent-500),var(--color-plasma-500));
            box-shadow:0 0 14px rgba(14,165,233,.45);
            transition:transform .15s linear;
          "
          aria-hidden="true"
        ></div>

        {#each experienceData.experiences as exp, i}
          <div class="relative mb-8 last:mb-0 md:mb-14 md:grid md:grid-cols-[9rem_2.5rem_1fr] md:items-start">
            <!-- rail: period + place, right-aligned into the line -->
            <div class="hidden md:block md:pt-7 md:pr-0 md:text-right">
              <div
                class="font-mono text-[13px] font-semibold tracking-tight"
                style="color:{reached[i] ? 'var(--color-primary-500)' : 'var(--text-3)'};transition:color .6s var(--ease-out-expo);"
              >
                {exp.period}
              </div>
              <div class="font-mono mt-1 text-[11px]" style="color:var(--text-3);">{exp.location}</div>
            </div>

            <!-- marker column -->
            <div class="absolute top-8 left-0 z-10 md:relative md:top-0 md:left-auto md:grid md:justify-center md:pt-8" aria-hidden="true">
              <span class="relative grid h-6 w-6 place-items-center">
                {#if reached[i]}
                  <span
                    class="animate-pulse-ring absolute h-3 w-3 rounded-full"
                    style="background-color:var(--color-accent-400);"
                  ></span>
                {/if}
                <span
                  class="relative h-3 w-3 rounded-full transition-all duration-700"
                  style="
                    background-image:{reached[i]
                      ? 'linear-gradient(135deg,var(--color-primary-400),var(--color-accent-400))'
                      : 'none'};
                    background-color:{reached[i] ? 'transparent' : 'var(--surface-1)'};
                    border:2px solid {reached[i] ? 'transparent' : 'var(--hairline)'};
                    box-shadow:{reached[i] ? '0 0 0 4px rgba(14,165,233,.16), 0 0 18px rgba(16,185,129,.5)' : 'none'};
                    transform:scale({reached[i] ? 1 : 0.7});
                  "
                ></span>
              </span>
            </div>

            <!-- card -->
            <div class="ml-11 md:ml-0">
              <article
                class="glass-effect spotlight experience-card relative overflow-hidden rounded-2xl p-7 md:p-8"
                use:tilt={{ max: 3, lift: 4, scale: 1.006 }}
                use:reveal={{ y: 30, delay: 60, blur: 6 }}
              >
                <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 class="font-display text-2xl font-bold tracking-tight" style="color:var(--text-1);">
                    {exp.company}
                  </h3>
                  <span
                    class="font-mono rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide md:hidden"
                    style="background-color:rgb(14 165 233 / .12);color:var(--color-primary-600);border:1px solid rgb(14 165 233 / .25);"
                  >
                    {exp.period}
                  </span>
                  <span class="font-mono text-[11px] md:hidden" style="color:var(--text-3);">{exp.location}</span>
                </div>

                <h4 class="font-display mt-1.5 mb-5 text-[15px] font-semibold">
                  <span class="gradient-text">{exp.position}</span>
                </h4>

                <p class="mb-7 leading-relaxed" style="color:var(--text-2);">
                  {exp.description}
                </p>

                <h5 class="font-mono mb-3.5 text-[10px] tracking-[0.16em] uppercase" style="color:var(--text-3);">
                  Key achievements
                </h5>
                <ul class="mb-7 grid gap-2.5 sm:grid-cols-2 sm:gap-x-7">
                  {#each exp.achievements as achievement}
                    <li class="flex items-start gap-3">
                      <span
                        class="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full"
                        style="background-color:rgb(16 185 129 / .14);"
                      >
                        <svg class="h-2.5 w-2.5" style="color:var(--color-accent-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span class="text-[14.5px] leading-relaxed" style="color:var(--text-2);">
                        {achievement}
                      </span>
                    </li>
                  {/each}
                </ul>

                <div class="flex flex-wrap gap-2 pt-5" style="border-top:1px solid var(--hairline);">
                  {#each exp.technologies as tech}
                    <span
                      class="font-mono rounded-md px-2 py-1 text-[10.5px] font-medium"
                      style="background-color:var(--surface-1);color:var(--text-2);border:1px solid var(--hairline);"
                    >
                      {tech}
                    </span>
                  {/each}
                </div>
              </article>
            </div>
          </div>
        {/each}

        <!-- terminator -->
        <div class="relative md:grid md:grid-cols-[9rem_2.5rem_1fr]">
          <div></div>
          <div></div>
          <div class="ml-11 md:ml-0" use:reveal={{ y: 14 }}>
            <span
              class="font-mono inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]"
              style="background-color:var(--surface-1);border:1px solid var(--hairline);color:var(--text-3);"
            >
              <span class="h-1.5 w-1.5 rounded-full" style="background-color:var(--color-plasma-400);"></span>
              2008 — start of the trail
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
