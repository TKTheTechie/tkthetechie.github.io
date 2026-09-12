<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { reveal, tilt } from '$lib/actions/motion';
  import Seo from '$lib/components/Seo.svelte';
  import { SITE_URL, AUTHOR_NAME } from '$lib/config/site';
  import type { Post } from '$lib/posts';
  import type { PageData } from './$types';

  export let data: PageData;

  /* Posts come from the blog layout load, so every card is in the prerendered HTML. */
  $: posts = (data.posts ?? []) as Post[];
  let searchTerm = '';
  let selectedCategory = 'all';

  $: categories = (() => {
    const unique = new Set<string>();
    for (const post of posts) {
      for (const c of (post.meta?.category ?? '').split(',')) {
        const name = c.trim();
        if (name) unique.add(name);
      }
    }
    return ['all', ...Array.from(unique).sort()];
  })();

  // Honour ?search= so the site's SearchAction structured data is real.
  onMount(() => {
    const q = $page.url.searchParams.get('search');
    if (q) searchTerm = q;
  });

  const DESCRIPTION =
    'Technical blog posts on event-driven architecture, agentic AI, and engineering leadership by Thomas Kunnumpurath, VP of Systems Engineering at Solace.';
  $: blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Thomas Kunnumpurath Technical Blog',
    url: `${SITE_URL}/blog`,
    description: DESCRIPTION,
    inLanguage: 'en-US',
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: AUTHOR_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: AUTHOR_NAME },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.meta.title,
      url: `${SITE_URL}${post.path}`,
      datePublished: post.meta.dateIso
    }))
  };

  const formatDate = (value?: string) =>
    new Date(value ?? Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  /*
    Category colour comes from the brand palette plus a couple of warm
    accents, assigned by name so a category keeps its colour across pages.
  */
  const SWATCHES = [
    { bg: 'rgb(93 120 35 / .16)', fg: '#38bdf8', ring: 'rgb(93 120 35 / .32)' },
    { bg: 'rgb(16 185 129 / .16)', fg: '#34d399', ring: 'rgb(16 185 129 / .32)' },
    { bg: 'rgb(139 92 246 / .16)', fg: '#a78bfa', ring: 'rgb(139 92 246 / .32)' },
    { bg: 'rgb(249 115 22 / .16)', fg: '#fb923c', ring: 'rgb(249 115 22 / .32)' },
    { bg: 'rgb(250 204 21 / .16)', fg: '#facc15', ring: 'rgb(250 204 21 / .32)' },
    { bg: 'rgb(244 63 94 / .16)', fg: '#fb7185', ring: 'rgb(244 63 94 / .32)' },
    { bg: 'rgb(20 184 166 / .16)', fg: '#2dd4bf', ring: 'rgb(20 184 166 / .32)' }
  ];
  const FIXED: Record<string, number> = { Dev: 0, Tech: 1, Architecture: 2, Tutorial: 3, Crypto: 4 };
  const swatch = (name?: string) => {
    const key = (name ?? '').split(',')[0].trim();
    if (!key) return { bg: 'rgb(148 163 184 / .16)', fg: '#94a3b8', ring: 'rgb(148 163 184 / .3)' };
    if (key in FIXED) return SWATCHES[FIXED[key]];
    let h = 0;
    for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return SWATCHES[h % SWATCHES.length];
  };

  const matchesCategory = (post: Post) =>
    selectedCategory === 'all' ||
    (post.meta?.category ?? '')
      .split(',')
      .map((c) => c.trim())
      .includes(selectedCategory);

  $: filteredPosts = posts.filter((post) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (post.meta?.title ?? '').toLowerCase().includes(q) ||
      (post.meta?.category ?? '').toLowerCase().includes(q);
    return matchesSearch && matchesCategory(post);
  });

  $: featured = selectedCategory === 'all' && !searchTerm ? filteredPosts[0] : undefined;
  $: grid = featured ? filteredPosts.slice(1) : filteredPosts;
</script>

<Seo
  title="Blog - Thomas Kunnumpurath | Event-Driven Architecture, Agentic AI & Engineering Leadership"
  description={DESCRIPTION}
  path="/blog"
  jsonld={blogSchema}
/>

<!-- ---------------- masthead ---------------- -->
<header class="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20" style="background-color:#121510;">
  <div
    class="absolute inset-0 -z-20"
    style="background:
      radial-gradient(90% 80% at 78% 4%, #28351e 0%, transparent 58%),
      radial-gradient(70% 70% at 10% 100%, #26331d 0%, transparent 60%),
      linear-gradient(165deg,#121510,#191e16);"
  ></div>
  <div class="aurora -z-20" aria-hidden="true">
    <span class="h-[30rem] w-[30rem] -top-32 left-1/4" style="background:radial-gradient(circle,#5d7823,transparent 62%);opacity:.22;"></span>
    <span class="h-[26rem] w-[26rem] -right-20 top-0" style="background:radial-gradient(circle,#5c813d,transparent 62%);opacity:.18;animation-delay:-12s;"></span>
  </div>
  <div class="mesh-grid -z-10 opacity-40" style="--hairline:rgb(148 163 184 / .12);" aria-hidden="true"></div>

  <div class="container-max section-padding relative">
    <div class="perspective mx-auto max-w-3xl text-center">
      <p class="eyebrow mb-5 justify-center !text-primary-300" use:reveal={{ y: 12, blur: 3 }}>
        <span class="h-px w-6" style="background-image:linear-gradient(90deg,transparent,currentColor);"></span>
        Writing
        <span class="h-px w-6" style="background-image:linear-gradient(90deg,currentColor,transparent);"></span>
      </p>
      <h1
        class="font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] font-medium tracking-[-0.055em] text-white"
        use:reveal={{ y: 30, delay: 60, rotate: -42, blur: 4 }}
      >
        Notes from <span class="gradient-text">the field.</span>
      </h1>
      <div
        class="mx-auto mt-6 h-[3px] w-20 rounded-full"
        style="background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500));"
        use:reveal={{ y: 0, blur: 0, scale: 0.12, delay: 200 }}
      ></div>
      <p class="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300/90" use:reveal={{ y: 18, delay: 260 }}>
        Insights on event-driven architecture, modern development practices, and emerging
        technologies — real-world implementations and hard-won lessons.
      </p>
    </div>
  </div>
</header>

<!-- ---------------- listing ---------------- -->
<div class="relative py-14 md:py-20" style="background-color:var(--surface-0);">
  <div class="container-max section-padding">
    <div class="mx-auto max-w-6xl">
      <!-- ---------- search + filter ---------- -->
      <div class="glass-effect sticky top-[76px] z-20 mb-10 rounded-lg p-3 md:p-4" use:reveal={{ y: 16 }}>
        <div class="flex flex-col gap-3">
          <label class="relative block w-full md:max-w-md">
            <span class="sr-only">Search posts</span>
            <svg class="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" style="color:var(--text-3);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.6-3.6" stroke-linecap="round" />
            </svg>
            <input
              type="search"
              bind:value={searchTerm}
              placeholder="Search {posts.length} posts…"
              class="w-full rounded-xl py-2.5 pr-3 pl-10 text-[14px]"
            />
          </label>

          <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {#each categories as category}
              {@const active = selectedCategory === category}
              <button
                on:click={() => (selectedCategory = category)}
                class="chip !py-1.5"
                style={active
                  ? 'background-color:var(--text-1);color:var(--surface-0);border-color:var(--text-1);'
                  : ''}
                aria-pressed={active}
              >
                {category === 'all' ? 'All' : category}
              </button>
            {/each}
          </div>
        </div>
        <p class="font-mono mt-3 px-1 text-[11px] tracking-wide" style="color:var(--text-3);">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          {#if selectedCategory !== 'all'}· {selectedCategory}{/if}
          {#if searchTerm}· matching “{searchTerm}”{/if}
        </p>
      </div>

      {#if filteredPosts.length === 0}
        <div class="py-20 text-center" use:reveal>
          <span class="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-lg" style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));">
            <svg class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.6-3.6" stroke-linecap="round" />
            </svg>
          </span>
          <h3 class="font-display mb-2 text-xl font-bold" style="color:var(--text-1);">Nothing matches</h3>
          <p style="color:var(--text-2);">Try a different search or clear the category filter.</p>
          <button class="btn btn-ghost spotlight mt-6" on:click={() => { searchTerm = ''; selectedCategory = 'all'; }}>
            <span class="relative z-10">Show all posts</span>
          </button>
        </div>
      {:else}
        <div class="perspective grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <!-- ---------- feature ---------- -->
          {#if featured}
            {@const cat = swatch(featured.meta?.category)}
            <a
              href={featured.path}
              class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-lg md:col-span-2 lg:col-span-3"
              use:tilt={{ max: 3, lift: 6, scale: 1.005 }}
              use:reveal={{ y: 30, rotate: -12 }}
            >
              <div class="relative h-64 overflow-hidden sm:h-80 lg:h-[26rem]" style="background-color:var(--surface-1);">
                {#if featured.meta?.headerImage}
                  <img
                    src="/images/blog/headers/{featured.meta.headerImage}"
                    alt={featured.meta?.title ?? ''}
                    class="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    style="transition-timing-function:cubic-bezier(.16,1,.3,1);"
                  />
                {/if}
                <div class="pointer-events-none absolute inset-0" style="background:linear-gradient(to top,rgb(5 8 15 / .94) 4%,rgb(5 8 15 / .4) 45%,transparent 75%);"></div>
                <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <div class="mb-3 flex flex-wrap items-center gap-2.5">
                    <span class="font-mono rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md" style="background-color:{cat.bg};color:{cat.fg};border:1px solid {cat.ring};">
                      {featured.meta?.category ?? 'Blog'}
                    </span>
                    <span class="font-mono text-[11px] text-slate-300">{formatDate(featured.meta?.date)}</span>
                    <span class="font-mono text-[11px] text-slate-500">· Latest</span>
                  </div>
                  <h2 class="font-display max-w-3xl text-2xl leading-tight font-bold text-white sm:text-3xl lg:text-[2.4rem]">
                    {featured.meta?.title ?? 'Untitled'}
                  </h2>
                  <span class="font-display mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-300">
                    Read the post
                    <svg class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          {/if}

          <!-- ---------- grid ---------- -->
          {#each grid as post, i (post.path)}
            {@const cat = swatch(post.meta?.category)}
            <a
              href={post.path}
              class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-lg"
              use:tilt={{ max: 7, lift: 8 }}
              use:reveal={{ y: 28, delay: (i % 3) * 80, rotate: -16 }}
            >
              <div class="relative h-44 overflow-hidden" style="background-color:var(--surface-1);">
                {#if post.meta?.headerImage}
                  <img
                    src="/images/blog/headers/{post.meta.headerImage}"
                    alt={post.meta?.title ?? ''}
                    class="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                    style="transition-timing-function:cubic-bezier(.16,1,.3,1);"
                    loading="lazy"
                  />
                {:else}
                  <div class="grid h-full w-full place-items-center">
                    <span class="grid h-12 w-12 place-items-center rounded-xl" style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));">
                      <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13" />
                      </svg>
                    </span>
                  </div>
                {/if}
                <div class="pointer-events-none absolute inset-0" style="background:linear-gradient(to top,rgb(5 8 15 / .7),transparent 62%);"></div>
                <span class="font-mono absolute bottom-3 left-3.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md" style="background-color:{cat.bg};color:{cat.fg};border:1px solid {cat.ring};">
                  {post.meta?.category ?? 'Blog'}
                </span>
              </div>

              <div class="flex flex-1 flex-col p-5">
                <div class="font-mono mb-2.5 text-[10.5px]" style="color:var(--text-3);">{formatDate(post.meta?.date)}</div>
                <h2 class="font-display clamp-3 text-[15.5px] leading-snug font-bold" style="color:var(--text-1);">
                  {post.meta?.title ?? 'Untitled'}
                </h2>
                <span class="mt-auto flex items-center gap-1.5 pt-4 font-mono text-[11px]" style="color:var(--color-primary-500);">
                  Read
                  <svg class="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
              </div>
            </a>
          {/each}
        </div>
      {/if}

      <div class="mt-16 flex justify-center">
        <a href="/" class="btn btn-ghost spotlight">
          <svg class="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5 5-5M18 12H6" />
          </svg>
          <span class="relative z-10">Back to home</span>
        </a>
      </div>
    </div>
  </div>
</div>
