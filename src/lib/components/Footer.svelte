<script lang="ts">
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tkthetechie/',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'X',
      href: 'https://x.com/tkthetechie',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/TKTheTechie',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    }
  ];

  const sections = ['About', 'Experience', 'Skills', 'Portfolio', 'Education', 'Contact'];

  const go = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
</script>

<footer class="relative overflow-hidden pt-16 pb-8" style="background-color:#030509;color:#e2e8f0;">
  <!-- hairline gradient seam at the top edge -->
  <div
    class="absolute inset-x-0 top-0 h-px"
    style="background-image:linear-gradient(90deg,transparent,rgb(14 165 233 / .5),rgb(16 185 129 / .5),transparent);"
    aria-hidden="true"
  ></div>
  <div class="mesh-grid opacity-[0.35]" style="--hairline:rgb(148 163 184 / .1);" aria-hidden="true"></div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <!-- brand -->
        <div>
          <div class="mb-4 flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-[10px]" style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));">
              <span class="font-display text-[13px] font-extrabold text-white">TK</span>
            </span>
            <span class="font-display text-[17px] font-bold">
              <span class="gradient-text">TheTechie</span>
            </span>
          </div>
          <p class="max-w-sm text-[14px] leading-relaxed text-slate-400">
            Building scalable systems, leading engineering teams, and evangelising modern
            architectural patterns.
          </p>

          <div class="mt-6 flex items-center gap-2.5">
            {#each socialLinks as social}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="group grid h-9 w-9 place-items-center rounded-xl transition-all duration-500 hover:-translate-y-1"
                style="background-color:rgb(255 255 255 / .04);border:1px solid rgb(255 255 255 / .09);"
                aria-label={social.name}
              >
                <svg class="h-4 w-4 fill-slate-400 transition-colors duration-300 group-hover:fill-white" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            {/each}
          </div>
        </div>

        <!-- sections -->
        <div>
          <h3 class="font-mono mb-4 text-[10px] tracking-[0.18em] text-slate-500 uppercase">Sections</h3>
          <ul class="grid gap-2.5">
            {#each sections as link}
              <li>
                <button
                  on:click={() => go(link.toLowerCase())}
                  class="group inline-flex items-center gap-2 text-[14px] text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <span class="h-px w-0 transition-all duration-500 group-hover:w-3" style="background-color:var(--color-primary-400);"></span>
                  {link}
                </button>
              </li>
            {/each}
          </ul>
        </div>

        <!-- writing -->
        <div>
          <h3 class="font-mono mb-4 text-[10px] tracking-[0.18em] text-slate-500 uppercase">Writing</h3>
          <ul class="grid gap-2.5">
            <li>
              <a href="/blog" class="group inline-flex items-center gap-2 text-[14px] text-slate-400 transition-colors duration-300 hover:text-white">
                <span class="h-px w-0 transition-all duration-500 group-hover:w-3" style="background-color:var(--color-accent-400);"></span>
                All blog posts
              </a>
            </li>
            <li>
              <a href="https://github.com/TKTheTechie" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-[14px] text-slate-400 transition-colors duration-300 hover:text-white">
                <span class="h-px w-0 transition-all duration-500 group-hover:w-3" style="background-color:var(--color-accent-400);"></span>
                Open source
              </a>
            </li>
          </ul>

          <p class="font-mono mt-6 text-[11px] leading-relaxed text-slate-600">
            Press <kbd class="rounded px-1.5 py-0.5" style="background-color:rgb(255 255 255 / .06);color:#94a3b8;">⌘K</kbd>
            to jump anywhere
          </p>
        </div>
      </div>

      <!-- baseline -->
      <div
        class="flex flex-col items-center justify-between gap-3 pt-7 sm:flex-row"
        style="border-top:1px solid rgb(255 255 255 / .07);"
      >
        <p class="font-mono text-[11.5px] text-slate-500">
          © {currentYear} Thomas Kunnumpurath. All rights reserved.
        </p>
        <p class="font-mono text-[11.5px] text-slate-600">
          Built with Svelte 5 · Tailwind CSS
        </p>
      </div>
    </div>
  </div>
</footer>
