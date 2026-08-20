<script lang="ts">
  import { reveal } from '$lib/actions/motion';

  export let title: string;
  export let date: string;
  export let author: string = 'Thomas Kunnumpurath';
  export let category: string = 'Blog';
  export let headerImage: string = '';

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const CATEGORY: Record<string, { bg: string; fg: string; ring: string }> = {
    Dev: { bg: 'rgb(14 165 233 / .16)', fg: '#38bdf8', ring: 'rgb(14 165 233 / .32)' },
    Tech: { bg: 'rgb(16 185 129 / .16)', fg: '#34d399', ring: 'rgb(16 185 129 / .32)' },
    Architecture: { bg: 'rgb(139 92 246 / .16)', fg: '#a78bfa', ring: 'rgb(139 92 246 / .32)' },
    Tutorial: { bg: 'rgb(249 115 22 / .16)', fg: '#fb923c', ring: 'rgb(249 115 22 / .32)' },
    Crypto: { bg: 'rgb(250 204 21 / .16)', fg: '#facc15', ring: 'rgb(250 204 21 / .32)' }
  };
  $: cat = CATEGORY[category] ?? { bg: 'rgb(148 163 184 / .16)', fg: '#94a3b8', ring: 'rgb(148 163 184 / .3)' };

  const shareTargets = [
    {
      name: 'LinkedIn',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      url: (u: string, t: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
    },
    {
      name: 'X',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      url: (u: string, t: string) => `https://x.com/intent/tweet?url=${u}&text=${t}`
    }
  ];

  let shareUrl = '';
  let shareTitle = '';
  $: if (typeof window !== 'undefined') {
    shareUrl = encodeURIComponent(window.location.href);
    shareTitle = encodeURIComponent(title);
  }
</script>

<svelte:head>
  <title>{title} - Thomas Kunnumpurath</title>
  <meta name="description" content="Technical blog post: {title}" />
  <meta name="author" content={author} />
</svelte:head>

<article style="background-color:var(--surface-0);">
  <!-- ---------------- masthead ---------------- -->
  <header class="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20" style="background-color:#04070e;">
    <div
      class="absolute inset-0 -z-20"
      style="background:
        radial-gradient(90% 80% at 78% 4%, #0b2b45 0%, transparent 58%),
        radial-gradient(70% 70% at 10% 100%, #06281f 0%, transparent 60%),
        linear-gradient(165deg,#04070e,#060c18);"
    ></div>
    <div class="mesh-grid -z-10 opacity-40" style="--hairline:rgb(148 163 184 / .12);" aria-hidden="true"></div>

    <div class="container-max section-padding relative">
      <div class="mx-auto max-w-3xl">
        <a
          href="/blog"
          class="font-mono group mb-8 inline-flex items-center gap-2 text-[12px] text-slate-400 transition-colors duration-300 hover:text-primary-300"
        >
          <svg
            class="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5 5-5M18 12H6" />
          </svg>
          All posts
        </a>

        <div class="mb-6 flex flex-wrap items-center gap-3" use:reveal={{ y: 14 }}>
          <span
            class="font-mono rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md"
            style="background-color:{cat.bg};color:{cat.fg};border:1px solid {cat.ring};"
          >
            {category}
          </span>
          <span class="font-mono text-[12px] text-slate-400">{formatDate(date)}</span>
        </div>

        <h1
          class="font-display text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-white"
          use:reveal={{ y: 24, delay: 60 }}
        >
          {title}
        </h1>

        <div class="mt-8 flex items-center gap-3" use:reveal={{ y: 16, delay: 140 }}>
          <span
            class="grid h-10 w-10 place-items-center rounded-full"
            style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));"
          >
            <span class="font-display text-[13px] font-bold text-white">TK</span>
          </span>
          <div>
            <p class="font-display text-[14px] font-semibold text-white">{author}</p>
            <p class="font-mono text-[11px] text-slate-400">VP Systems Engineering · Solace</p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ---------------- body ---------------- -->
  <div class="py-14 md:py-20">
    <div class="container-max section-padding">
      <div class="mx-auto max-w-3xl">
        {#if headerImage}
          <figure class="mb-12 overflow-hidden rounded-2xl" style="border:1px solid var(--hairline);" use:reveal={{ y: 22 }}>
            <img
              src="/images/blog/headers/{headerImage}"
              alt=""
              class="w-full object-cover"
              style="max-height:22rem;"
            />
          </figure>
        {/if}

        <div class="prose">
          <slot />
        </div>

        <!-- ---------------- footer ---------------- -->
        <div class="mt-16 pt-8" style="border-top:1px solid var(--hairline);">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3.5">
              <span
                class="grid h-12 w-12 place-items-center rounded-full"
                style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));"
              >
                <span class="font-display text-[15px] font-bold text-white">TK</span>
              </span>
              <div>
                <p class="font-display text-[15px] font-bold" style="color:var(--text-1);">{author}</p>
                <p class="text-[13px]" style="color:var(--text-2);">VP of Systems Engineering at Solace</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <span class="font-mono text-[11px]" style="color:var(--text-3);">Share</span>
              {#each shareTargets as target}
                <a
                  href={target.url(shareUrl, shareTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group grid h-9 w-9 place-items-center rounded-xl transition-all duration-500 hover:-translate-y-1"
                  style="background-color:var(--surface-1);border:1px solid var(--hairline);"
                  aria-label="Share on {target.name}"
                >
                  <svg class="h-3.5 w-3.5 transition-colors duration-300" style="fill:var(--text-2);" viewBox="0 0 24 24">
                    <path d={target.icon} />
                  </svg>
                </a>
              {/each}
            </div>
          </div>

          <div class="mt-10 flex flex-wrap items-center justify-between gap-4">
            <a href="/blog" class="btn btn-ghost spotlight">
              <svg class="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5 5-5M18 12H6" />
              </svg>
              <span class="relative z-10">All posts</span>
            </a>
            <a href="/#contact" class="btn btn-primary spotlight">
              <span class="relative z-10">Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>
