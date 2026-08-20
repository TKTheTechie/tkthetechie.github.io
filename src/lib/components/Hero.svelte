<script lang="ts">
  import { onMount } from 'svelte';
  import EventMesh from './EventMesh.svelte';
  import { magnetic } from '$lib/actions/motion';

  const NAME_FIRST = 'Thomas';
  const NAME_LAST = 'Kunnumpurath';

  const ROLES = [
    'Event-Driven Architecture',
    'Cloud-Native Platforms',
    'Engineering Leadership',
    'Technical Evangelism'
  ];

  const PRIOR = ['Solace', 'Capital One', 'Deutsche Bank'];

  /**
   * background-clip:text can't survive per-character transforms, so instead of
   * a CSS gradient we sample the ramp once per letter. Same look, but each
   * glyph is a real colour we're free to animate.
   */
  const RAMP: Array<[number, number, number]> = [
    [56, 189, 248],  // sky-400
    [52, 211, 153],  // emerald-400
    [125, 211, 252]  // sky-300
  ];

  const colourAt = (t: number) => {
    const scaled = Math.min(0.9999, Math.max(0, t)) * (RAMP.length - 1);
    const i = Math.floor(scaled);
    const f = scaled - i;
    const [r1, g1, b1] = RAMP[i];
    const [r2, g2, b2] = RAMP[i + 1];
    return `rgb(${Math.round(r1 + (r2 - r1) * f)},${Math.round(g1 + (g2 - g1) * f)},${Math.round(b1 + (b2 - b1) * f)})`;
  };

  const SOCIALS = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tkthetechie/',
      d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/TKTheTechie',
      d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
      name: 'X',
      href: 'https://x.com/tkthetechie',
      d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    }
  ];

  /* ---- role typewriter ---------------------------------------------- */
  let typed = '';
  let roleIndex = 0;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      typed = ROLES[0];
      return;
    }

    let charIndex = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROLES[roleIndex];

      if (!erasing) {
        charIndex++;
        typed = word.slice(0, charIndex);
        if (charIndex === word.length) {
          erasing = true;
          timer = setTimeout(tick, 2100);
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 45);
      } else {
        charIndex -= 2;
        if (charIndex <= 0) {
          charIndex = 0;
          erasing = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          timer = setTimeout(tick, 260);
          return;
        }
        typed = word.slice(0, charIndex);
        timer = setTimeout(tick, 22);
      }
    };

    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  });

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
</script>

<!--
  The hero is deliberately dark in both themes: the event mesh needs an
  ink background to read, and it gives the page a strong opening chord.
-->
<section
  id="home"
  class="relative isolate flex min-h-[100svh] items-center overflow-hidden"
  style="background-color:#04070e;"
>
  <!-- layer 1: base wash -->
  <div
    class="absolute inset-0 -z-30"
    style="background:
      radial-gradient(120% 90% at 78% 12%, #0b2b45 0%, transparent 58%),
      radial-gradient(90% 80% at 12% 92%, #06281f 0%, transparent 60%),
      linear-gradient(160deg, #04070e 0%, #060c18 45%, #04070e 100%);"
  ></div>

  <!-- layer 2: drifting colour fields -->
  <div class="aurora -z-20">
    <span
      class="h-[38rem] w-[38rem] -left-40 -top-40"
      style="background:radial-gradient(circle,#0ea5e9,transparent 62%);opacity:.34;animation-duration:30s;"
    ></span>
    <span
      class="h-[32rem] w-[32rem] right-[-8rem] top-1/3"
      style="background:radial-gradient(circle,#10b981,transparent 62%);opacity:.3;animation-duration:38s;animation-delay:-9s;"
    ></span>
    <span
      class="h-[26rem] w-[26rem] left-1/3 bottom-[-9rem]"
      style="background:radial-gradient(circle,#8b5cf6,transparent 62%);opacity:.22;animation-duration:44s;animation-delay:-18s;"
    ></span>
  </div>

  <!-- layer 3: engineering grid -->
  <div class="mesh-grid -z-20 opacity-40" style="--hairline:rgb(148 163 184 / 0.13);"></div>

  <!-- layer 5: vignette so text always wins -->
  <div
    class="pointer-events-none absolute inset-0 -z-10"
    style="background:radial-gradient(80% 60% at 22% 50%, rgba(4,7,14,.92) 0%, rgba(4,7,14,.55) 45%, transparent 72%);"
  ></div>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40"
    style="background:linear-gradient(to top,#04070e,transparent);"
  ></div>

  <!-- ---------------------------------------------------------------- -->
  <div class="container-max section-padding relative w-full pt-28 pb-24 lg:pt-32">
    <div class="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
      <!-- ============ copy ============ -->
      <div class="max-w-2xl text-center lg:text-left">
        <!-- status line -->
        <div
          class="animate-fade-in mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.045] px-3.5 py-1.5 backdrop-blur-md"
          style="animation-delay:.15s;"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400"></span>
          </span>
          <span class="font-mono text-[11px] tracking-[0.16em] text-slate-300 uppercase">
            VP Systems Engineering · Solace
          </span>
        </div>

        <!-- name, per-character 3D rise -->
        <h1
          class="font-display mb-6 text-[clamp(2.35rem,7vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-white"
          style="perspective:900px;"
        >
          <span class="sr-only">Thomas Kunnumpurath</span>
          <span class="block" aria-hidden="true">
            {#each NAME_FIRST.split('') as ch, i}
              <span class="animate-rise inline-block" style="animation-delay:{260 + i * 42}ms;">{ch}</span>
            {/each}
          </span>
          <span class="block" aria-hidden="true">
            {#each NAME_LAST.split('') as ch, i}
              <span
                class="animate-rise inline-block"
                style="animation-delay:{520 + i * 34}ms;color:{colourAt(i / (NAME_LAST.length - 1))};"
              >{ch}</span>
            {/each}
          </span>
        </h1>

        <!-- rotating specialism -->
        <p
          class="animate-fade-in mb-7 flex min-h-[1.9rem] items-center justify-center gap-2 font-mono text-sm text-slate-400 sm:text-base lg:justify-start"
          style="animation-delay:.9s;"
        >
          <span class="text-accent-400">&gt;</span>
          <span class="text-slate-200">{typed}</span>
          <span class="animate-caret inline-block h-[1.05em] w-[2px] translate-y-[0.14em] bg-primary-400"></span>
        </p>

        <p
          class="animate-fade-in mx-auto mb-9 max-w-xl text-lg leading-relaxed text-slate-300/90 lg:mx-0"
          style="animation-delay:1s;"
        >
          I lead a team of 15 engineers across the Americas, helping enterprises
          move to real-time event-driven architectures — and I still write
          code, ship open source, and give talks.
        </p>

        <!-- CTAs -->
        <div
          class="animate-fade-in flex flex-col justify-center gap-3.5 sm:flex-row lg:justify-start"
          style="animation-delay:1.12s;"
        >
          <button class="btn btn-primary spotlight" use:magnetic={0.16} on:click={() => scrollTo('#experience')}>
            <span class="relative z-10">View Experience</span>
            <svg class="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
          <button
            class="btn btn-ghost spotlight !border-white/15 !bg-white/[0.055] !text-white hover:!border-primary-400/60"
            use:magnetic={0.16}
            on:click={() => scrollTo('#contact')}
          >
            <span class="relative z-10">Get In Touch</span>
          </button>
        </div>

        <!-- prior companies + socials -->
        <div
          class="animate-fade-in mt-12 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between lg:items-center"
          style="animation-delay:1.3s;"
        >
         

          <div class="flex items-center gap-2.5">
            {#each SOCIALS as social}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                class="group grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/60 hover:bg-white/10"
              >
                <svg
                  class="h-[17px] w-[17px] fill-slate-400 transition-colors duration-300 group-hover:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d={social.d} />
                </svg>
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- ============ portrait, sitting at the centre of the mesh ============ -->
      <div class="relative order-first flex justify-center lg:order-last lg:justify-end">
        <div
          class="animate-fade-in relative aspect-square w-[min(78vw,20rem)] sm:w-[22rem] lg:w-[26rem]"
          style="animation-delay:.35s;"
        >
          <!-- the mesh is centred on the portrait: he sits inside the topology -->
          <div class="absolute -inset-[78%] sm:-inset-[70%] lg:-inset-[62%]">
            <EventMesh radius={0.29} nodeCount={80} packetCount={24} />
          </div>

          <!-- orbiting rings -->
          <div class="animate-spin-slow absolute inset-[4%] rounded-full border border-dashed border-white/10"></div>
          <div
            class="absolute inset-[16%] rounded-full border border-white/[0.07]"
            style="animation:spin 34s linear infinite reverse;"
          ></div>

          <!-- conic halo -->
          <div
            class="absolute inset-[19%] rounded-full opacity-70 blur-xl"
            style="background:conic-gradient(from 0deg,#0ea5e9,#10b981,#8b5cf6,#0ea5e9);animation:spin 14s linear infinite;"
          ></div>

          <!-- portrait -->
          <div class="animate-float-slow absolute inset-[21%]">
            <div class="relative h-full w-full rounded-full p-[2px]" style="background:linear-gradient(150deg,rgba(56,189,248,.9),rgba(52,211,153,.55),rgba(139,92,246,.75));">
              <img
                src="/profile-pic.png"
                alt="Thomas Kunnumpurath"
                class="h-full w-full rounded-full object-cover object-top"
                style="background-color:#0b1220;"
              />
              <!-- inner rim light -->
              <div class="pointer-events-none absolute inset-0 rounded-full" style="box-shadow:inset 0 1px 12px rgba(255,255,255,.22), inset 0 -14px 30px rgba(4,7,14,.55);"></div>
            </div>
          </div>

          <!-- orbiting capability chips -->
          {#each [{ label: 'Event Mesh', dur: '28s', delay: '0s', inset: '-6%', at: 20 }, { label: 'Kafka', dur: '36s', delay: '-13s', inset: '5%', at: 145 }, { label: 'Multi-Cloud', dur: '32s', delay: '-24s', inset: '-1%', at: 260 }] as chip}
            <!--
              Three nested layers on purpose: the outer ring spins, the middle
              layer holds the static centring translate (an animation on the
              same element would overwrite it), and the inner layer counter-
              spins so the label stays upright as it orbits.
            -->
            <div
              class="pointer-events-none absolute hidden sm:block"
              style="inset:{chip.inset};rotate:{chip.at}deg;animation:spin {chip.dur} linear infinite;animation-delay:{chip.delay};"
            >
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  class="block rounded-full border border-white/12 bg-[#070d19]/85 px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-slate-300 backdrop-blur-md"
                  style="rotate:{-chip.at}deg;animation:spin {chip.dur} linear infinite reverse;animation-delay:{chip.delay};"
                >
                  {chip.label}
                </span>
              </div>
            </div>
          {/each}
        </div>

        <!-- mesh readout — describes exactly what you're looking at -->
        <p
          class="animate-fade-in absolute -bottom-2 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-slate-500 uppercase sm:block lg:right-0 lg:left-auto lg:translate-x-0"
          style="animation-delay:1.5s;"
        >
          live mesh · 80 nodes · 24 events in flight
        </p>
      </div>
    </div>
  </div>

  <!-- scroll cue -->
  <button
    on:click={() => scrollTo('#about')}
    class="animate-fade-in group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
    style="animation-delay:1.7s;"
    aria-label="Scroll to about section"
  >
    <span class="font-mono text-[10px] tracking-[0.22em] text-slate-500 uppercase transition-colors group-hover:text-slate-300">
      Scroll
    </span>
    <span class="relative h-9 w-[1px] overflow-hidden bg-white/12">
      <span class="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-primary-400 to-transparent" style="animation:scrollCue 2s cubic-bezier(0.16,1,0.3,1) infinite;"></span>
    </span>
  </button>
</section>

<style>
  @keyframes scrollCue {
    0%   { transform: translateY(-100%); opacity: 0; }
    35%  { opacity: 1; }
    100% { transform: translateY(300%); opacity: 0; }
  }
</style>
