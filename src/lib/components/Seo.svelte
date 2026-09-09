<script lang="ts">
  /*
    One place for every per-page head tag. app.html carries only tags that are
    identical on every page, so nothing here is duplicated.
  */
  import { SITE_NAME, TWITTER_HANDLE, DEFAULT_OG_IMAGE, absoluteUrl } from '$lib/config/site';

  export let title: string;
  export let description: string;
  /** Site-relative path used for the canonical and og:url. */
  export let path = '/';
  export let image: string = DEFAULT_OG_IMAGE;
  export let type: 'website' | 'article' = 'website';
  export let publishedTime = '';
  /** Schema.org object (or array of them) to emit as JSON-LD. */
  export let jsonld: unknown = null;

  $: url = absoluteUrl(path);
  $: imageUrl = absoluteUrl(image);
  $: ld = jsonld
    ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}<\/script>`
    : '';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  {#if type === 'article' && publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content={TWITTER_HANDLE} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />

  {@html ld}
</svelte:head>
