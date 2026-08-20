<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import EventMesh from './EventMesh.svelte';
  import { reveal, tilt, magnetic } from '$lib/actions/motion';

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tkthetechie/',
      handle: '/in/tkthetechie',
      description: 'Connect professionally',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      from: '#0a66c2',
      to: '#004182'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/TKTheTechie',
      handle: '@TKTheTechie',
      description: 'Code & open source',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      from: '#4b5563',
      to: '#1f2937'
    },
    {
      name: 'X',
      href: 'https://x.com/tkthetechie',
      handle: '@tkthetechie',
      description: 'Tech commentary',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      from: '#334155',
      to: '#0f172a'
    }
  ];

  const availability = [
    {
      title: 'Speaking engagements',
      detail: 'Conferences, panels, and podcasts on event-driven architecture.',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
    },
    {
      title: 'Consulting opportunities',
      detail: 'Architecture review, platform strategy, and team scaling.',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      title: 'Always happy to connect',
      detail: 'With fellow technologists and engineering leaders.',
      icon: 'M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5 5 0 019.28 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
    }
  ];
</script>

<section id="contact" class="relative isolate overflow-hidden py-24 md:py-32" style="background-color:#04070e;">
  <!-- the mesh returns to close the page where it opened it -->
  <div class="absolute inset-0 -z-20" style="background:
      radial-gradient(90% 70% at 50% 0%, #0a2438 0%, transparent 62%),
      radial-gradient(70% 60% at 80% 100%, #06281f 0%, transparent 62%),
      linear-gradient(180deg,#04070e,#060c18);"></div>

  <div class="absolute inset-x-0 -bottom-1/3 -z-10 h-[46rem] opacity-60">
    <EventMesh radius={0.44} nodeCount={62} packetCount={16} degree={3} speed={0.07} />
  </div>
  <div
    class="pointer-events-none absolute inset-0 -z-10"
    style="background:radial-gradient(70% 55% at 50% 32%, rgba(4,7,14,.88) 0%, rgba(4,7,14,.4) 55%, transparent 78%);"
  ></div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-5xl">
      <div class="mb-14 text-center md:mb-16">
        <p class="eyebrow mb-5 !text-primary-300" use:reveal={{ y: 12, blur: 3 }}>
          <span class="h-px w-6" style="background-image:linear-gradient(90deg,transparent,currentColor);"></span>
          Contact
          <span class="h-px w-6" style="background-image:linear-gradient(90deg,currentColor,transparent);"></span>
        </p>
        <h2
          class="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.06] font-bold tracking-[-0.03em] text-white"
          use:reveal={{ y: 22, delay: 70 }}
        >
          Let's build something <span class="gradient-text">event-driven</span>
        </h2>
        <div
          class="mx-auto mt-6 h-[3px] w-20 rounded-full"
          style="background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500));"
          use:reveal={{ y: 0, blur: 0, scale: 0.12, delay: 200 }}
        ></div>
        <p
          class="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300/90"
          use:reveal={{ y: 18, delay: 260 }}
        >
          Opportunities, collaborations, or speaking engagements — I'm always interested in
          connecting with fellow technologists and industry leaders.
        </p>

        <div class="mt-9 flex justify-center" use:reveal={{ y: 16, delay: 320 }}>
          <a
            href="https://www.linkedin.com/in/tkthetechie/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary spotlight"
            use:magnetic={0.14}
          >
            <svg class="relative z-10 h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d={socialLinks[0].icon} />
            </svg>
            <span class="relative z-10">Message me on LinkedIn</span>
          </a>
        </div>
      </div>

      <!-- ---------------- social cards ---------------- -->
      <div class="mb-14 grid gap-4 sm:grid-cols-3">
        {#each socialLinks as social, i}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            class="spotlight group relative flex flex-col items-start overflow-hidden rounded-2xl p-6 transition-colors duration-500"
            style="background-color:rgb(255 255 255 / .045);border:1px solid rgb(255 255 255 / .1);backdrop-filter:blur(14px);"
            use:tilt={{ max: 8, lift: 7 }}
            use:reveal={{ y: 24, delay: 80 + i * 90 }}
          >
            <span
              class="mb-4 grid h-12 w-12 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
              style="background-image:linear-gradient(135deg,{social.from},{social.to});box-shadow:0 12px 26px -14px {social.from};"
            >
              <svg class="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d={social.icon} />
              </svg>
            </span>

            <h3 class="font-display text-[15px] font-bold text-white">{social.name}</h3>
            <p class="font-mono mt-1 text-[11px] text-slate-400">{social.handle}</p>
            <p class="mt-3 text-[13px] text-slate-300/80">{social.description}</p>

            <svg
              class="absolute top-6 right-6 h-4 w-4 text-slate-500 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-300"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        {/each}
      </div>

      <!-- ---------------- what I'm open to ---------------- -->
      <div class="grid gap-4 sm:grid-cols-3">
        {#each availability as item, i}
          <div
            class="flex gap-3.5 rounded-2xl p-5"
            style="background-color:rgb(255 255 255 / .03);border:1px solid rgb(255 255 255 / .07);"
            use:reveal={{ y: 20, delay: 120 + i * 80 }}
          >
            <span
              class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg"
              style="background-color:rgb(16 185 129 / .14);"
            >
              <svg class="h-4 w-4 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
              </svg>
            </span>
            <div>
              <h4 class="font-display text-[13.5px] font-semibold text-white">{item.title}</h4>
              <p class="mt-1 text-[12.5px] leading-relaxed text-slate-400">{item.detail}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
