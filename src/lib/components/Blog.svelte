<script lang="ts">
  import { onMount } from 'svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { reveal, tilt } from '$lib/actions/motion';

  type Post = {
    path: string;
    meta?: {
      title?: string;
      date?: string;
      category?: string;
      author?: string;
      headerImage?: string | null;
      readingTime?: number | null;
    };
  };

  let posts: Post[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('/blog/api/posts');
      const data = response.ok ? await response.json() : [];
      posts = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      posts = [];
    } finally {
      loading = false;
    }
  });

  const formatDate = (value?: string) =>
    new Date(value ?? Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const CATEGORY: Record<string, { bg: string; fg: string; ring: string }> = {
    Dev: { bg: 'rgb(14 165 233 / .16)', fg: '#38bdf8', ring: 'rgb(14 165 233 / .32)' },
    Tech: { bg: 'rgb(16 185 129 / .16)', fg: '#34d399', ring: 'rgb(16 185 129 / .32)' },
    Architecture: { bg: 'rgb(139 92 246 / .16)', fg: '#a78bfa', ring: 'rgb(139 92 246 / .32)' },
    Tutorial: { bg: 'rgb(249 115 22 / .16)', fg: '#fb923c', ring: 'rgb(249 115 22 / .32)' },
    Crypto: { bg: 'rgb(250 204 21 / .16)', fg: '#facc15', ring: 'rgb(250 204 21 / .32)' }
  };
  const categoryStyle = (name?: string) =>
    CATEGORY[name ?? ''] ?? { bg: 'rgb(148 163 184 / .16)', fg: '#94a3b8', ring: 'rgb(148 163 184 / .3)' };

  // The newest post gets a wide feature card; the next four fill the grid.
  $: featured = posts[0];
  $: rest = posts.slice(1, 5);
</script>

<section id="blog" class="section-dark relative overflow-hidden py-24 md:py-32">
  <div class="mesh-grid opacity-25" aria-hidden="true"></div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Writing"
        subtitle="Insights on event-driven architecture, modern development practices, and emerging technologies — from real-world implementations."
      >
        Latest <span class="gradient-text">Blog Posts</span>
      </SectionHeading>

      {#if loading}
        <!-- skeletons keep the layout from jumping when posts land -->
        <div class="grid gap-5 lg:grid-cols-3">
          {#each Array(3) as _, i}
            <div
              class="glass-effect animate-pulse overflow-hidden rounded-2xl"
              style="animation-delay:{i * 160}ms;"
            >
              <div class="h-44" style="background-color:var(--surface-1);"></div>
              <div class="space-y-3 p-6">
                <div class="h-3 w-24 rounded-full" style="background-color:var(--surface-1);"></div>
                <div class="h-4 w-full rounded-full" style="background-color:var(--surface-1);"></div>
                <div class="h-4 w-2/3 rounded-full" style="background-color:var(--surface-1);"></div>
              </div>
            </div>
          {/each}
        </div>
      {:else if posts.length === 0}
        <div class="py-16 text-center">
          <span
            class="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl"
            style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));"
          >
            <svg class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13" />
            </svg>
          </span>
          <h3 class="font-display mb-2 text-xl font-bold" style="color:var(--text-1);">No posts yet</h3>
          <p style="color:var(--text-2);">Check back soon for insights and tutorials.</p>
        </div>
      {:else}
        <div class="grid gap-5 lg:grid-cols-3">
          <!-- ---------- feature ---------- -->
          {#if featured}
            {@const cat = categoryStyle(featured.meta?.category)}
            <a
              href={featured.path}
              class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-2xl lg:col-span-2"
              use:tilt={{ max: 4, lift: 7 }}
              use:reveal={{ y: 28 }}
            >
              <div class="relative h-52 overflow-hidden sm:h-64" style="background-color:var(--surface-1);">
                {#if featured.meta?.headerImage}
                  <img
                    src="/images/blog/headers/{featured.meta.headerImage}"
                    alt=""
                    class="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.06]"
                    style="transition-timing-function:cubic-bezier(.16,1,.3,1);"
                    loading="lazy"
                  />
                {/if}
                <div
                  class="pointer-events-none absolute inset-0"
                  style="background:linear-gradient(to top,rgb(5 8 15 / .92) 4%,rgb(5 8 15 / .35) 42%,transparent 72%);"
                ></div>

                <!-- title sits on the image for the feature -->
                <div class="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div class="mb-3 flex flex-wrap items-center gap-2.5">
                    <span
                      class="font-mono rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md"
                      style="background-color:{cat.bg};color:{cat.fg};border:1px solid {cat.ring};"
                    >
                      {featured.meta?.category ?? 'Blog'}
                    </span>
                    <span class="font-mono text-[11px] text-slate-300">
                      {formatDate(featured.meta?.date)}
                    </span>
                    {#if featured.meta?.readingTime}
                      <span class="font-mono text-[11px] text-slate-400">
                        · {featured.meta.readingTime} min read
                      </span>
                    {/if}
                  </div>
                  <h3 class="font-display clamp-2 text-xl leading-snug font-bold text-white sm:text-2xl">
                    {featured.meta?.title ?? 'Untitled'}
                  </h3>
                </div>
              </div>

              <div class="flex items-center justify-between p-6">
                <span class="font-mono text-[11px]" style="color:var(--text-3);">Latest post</span>
                <span
                  class="font-display inline-flex items-center gap-1.5 text-[13px] font-semibold"
                  style="color:var(--color-primary-500);"
                >
                  Read the post
                  <svg
                    class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
              </div>
            </a>
          {/if}

          <!-- ---------- the rest ---------- -->
          {#each rest as post, i}
            {@const cat = categoryStyle(post.meta?.category)}
            <a
              href={post.path}
              class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-2xl"
              use:tilt={{ max: 7, lift: 8 }}
              use:reveal={{ y: 26, delay: 90 + i * 80 }}
            >
              <div class="relative h-36 overflow-hidden" style="background-color:var(--surface-1);">
                {#if post.meta?.headerImage}
                  <img
                    src="/images/blog/headers/{post.meta.headerImage}"
                    alt=""
                    class="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                    style="transition-timing-function:cubic-bezier(.16,1,.3,1);"
                    loading="lazy"
                  />
                {/if}
                <div
                  class="pointer-events-none absolute inset-0"
                  style="background:linear-gradient(to top,rgb(5 8 15 / .7),transparent 62%);"
                ></div>
                <span
                  class="font-mono absolute bottom-3 left-3.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md"
                  style="background-color:{cat.bg};color:{cat.fg};border:1px solid {cat.ring};"
                >
                  {post.meta?.category ?? 'Blog'}
                </span>
              </div>

              <div class="flex flex-1 flex-col p-5">
                <div class="mb-2.5 flex items-center gap-2 font-mono text-[10.5px]" style="color:var(--text-3);">
                  <span>{formatDate(post.meta?.date)}</span>
                  {#if post.meta?.readingTime}
                    <span>·</span>
                    <span>{post.meta.readingTime} min</span>
                  {/if}
                </div>

                <h3
                  class="font-display clamp-3 text-[15px] leading-snug font-bold transition-colors duration-300"
                  style="color:var(--text-1);"
                >
                  {post.meta?.title ?? 'Untitled'}
                </h3>

                <span
                  class="mt-auto flex items-center gap-1.5 pt-4 font-mono text-[11px] transition-colors duration-300"
                  style="color:var(--color-primary-500);"
                >
                  Read
                  <svg
                    class="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
              </div>
            </a>
          {/each}
        </div>

        <!-- ---------- all posts ---------- -->
        <div class="mt-12 flex flex-col items-center gap-3" use:reveal={{ delay: 120 }}>
          <a href="/blog" class="btn btn-primary spotlight">
            <span class="relative z-10">Browse all {posts.length} posts</span>
            <svg class="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </a>
        </div>
      {/if}
    </div>
  </div>
</section>
