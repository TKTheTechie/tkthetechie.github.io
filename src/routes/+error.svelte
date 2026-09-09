<script lang="ts">
  import { page } from '$app/stores';
  import Navigation from '$lib/components/Navigation.svelte';
</script>

<svelte:head>
  <title>Page not found - Thomas Kunnumpurath</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<Navigation />

<section class="section-dark relative flex min-h-screen items-center overflow-hidden">
  <div class="mesh-grid opacity-25" aria-hidden="true"></div>
  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-xl text-center">
      <p class="font-mono mb-4 text-[12px] tracking-wide text-slate-400">{$page.status}</p>
      <h1 class="font-display mb-4 text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-[-0.03em] text-white">
        {$page.status === 404 ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p class="mb-8 text-slate-300/90">
        {$page.status === 404
          ? 'That page has moved or never existed. The blog index has every post.'
          : ($page.error?.message ?? 'Please try again.')}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="/blog" class="btn btn-primary spotlight"><span class="relative z-10">Browse the blog</span></a>
        <a href="/" class="btn btn-ghost spotlight"><span class="relative z-10">Back to home</span></a>
      </div>
    </div>
  </div>
</section>
