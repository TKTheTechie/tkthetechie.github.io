<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import { reveal } from '$lib/actions/motion';
  type Post = {
    path: string;
    meta?: {
      title?: string;
      date?: string;
      category?: string;
      headerImage?: string | null;
      readingTime?: number | null;
    };
  };
  export let posts: Post[] = [];
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  $: featured = posts[0];
  $: rest = posts.slice(1, 4);
</script>

<section id="blog" class="section-dark writing">
  <div class="container-max section-padding">
    <SectionHeading
      eyebrow="Writing"
      subtitle="Field notes on architecture, AI, and engineering leadership. Lessons from building things that have to work."
      >Ideas worth<br /><span class="gradient-text">passing on.</span
      ></SectionHeading
    >
    {#if featured}
      <div class="writing-grid">
        <a
          href={featured.path}
          class="featured-post"
          use:reveal={{ y: 20, blur: 0 }}
        >
          <div class="post-image">
            {#if featured.meta?.headerImage}<img
                src="/images/blog/headers/{featured.meta.headerImage}"
                alt=""
                loading="lazy"
              />{/if}<span
              >LATEST FIELD NOTE <span aria-hidden="true">↗</span></span
            >
          </div>
          <p class="post-meta">
            {featured.meta?.category ?? 'Blog'}
            <span>{formatDate(featured.meta?.date)}</span>
          </p>
          <h3>{featured.meta?.title ?? 'Untitled'}</h3>
          <p class="read-link">
            Read the story <span aria-hidden="true">↗</span>
          </p>
        </a>
        <div class="post-list">
          {#each rest as post, i}<a
              href={post.path}
              class="post-row"
              use:reveal={{ y: 18, delay: i * 70, blur: 0 }}
              ><div class="row-top">
                <span class="post-index">0{i + 2}</span>
                <p class="post-meta">
                  {formatDate(post.meta?.date)}{#if post.meta?.readingTime}<span
                      >{post.meta.readingTime} MIN READ</span
                    >{/if}
                </p>
              </div>
              <h3>{post.meta?.title ?? 'Untitled'}</h3>
              <p class="row-bottom">
                <span>{post.meta?.category ?? 'Blog'}</span><span
                  aria-hidden="true">↗</span
                >
              </p></a
            >{/each}
        </div>
      </div>
    {:else}<p class="empty">New field notes are on their way.</p>{/if}
    <div class="writing-bottom">
      <p>Curiosity is a practice. Keep going.</p>
      <a href="/blog" class="btn btn-ghost"
        >All {posts.length} articles <span aria-hidden="true">↗</span></a
      >
    </div>
  </div>
</section>

<style>
  .writing {
    padding-block: 100px;
  }
  .writing-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 50px;
  }
  .post-image {
    aspect-ratio: 1.7;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
    background: #293020;
  }
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s;
    filter: saturate(0.75);
  }
  .featured-post:hover img {
    transform: scale(1.04);
  }
  .post-image > span {
    position: absolute;
    inset: auto 14px 14px;
    padding: 10px 13px;
    color: #20261b;
    background: #d2f879;
    font: 9px var(--font-mono);
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-image > span > span {
    font-size: 18px;
  }
  .post-meta {
    font: 9px/1.6 var(--font-mono);
    text-transform: uppercase;
    color: var(--text-3);
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
  }
  .featured-post > .post-meta {
    margin: 20px 0 11px;
  }
  h3 {
    font-size: 21px;
    line-height: 1.35;
    font-weight: 500;
    letter-spacing: -0.035em;
  }
  .featured-post h3 {
    font-size: 27px;
  }
  .read-link {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 12px;
  }
  .read-link > span {
    font-size: 21px;
  }
  .post-row {
    display: block;
    border-top: 1px solid var(--hairline);
    padding: 20px 0;
  }
  .row-top {
    display: flex;
    align-items: center;
    gap: 17px;
    margin-bottom: 12px;
  }
  .post-index {
    color: var(--color-primary-600);
    font: 10px var(--font-mono);
  }
  .row-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    font: 9px var(--font-mono);
    color: var(--text-3);
  }
  .row-bottom > span:last-child {
    font-size: 22px;
    color: var(--text-1);
  }
  .post-row:hover h3,
  .featured-post:hover h3 {
    color: var(--color-primary-600);
  }
  .writing-bottom {
    margin-top: 45px;
    padding-top: 24px;
    border-top: 1px solid var(--hairline);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .writing-bottom p {
    font-size: 12px;
    color: var(--text-3);
  }
  .writing-bottom a {
    gap: 30px;
  }
  .empty {
    color: var(--text-2);
  }
  @media (max-width: 800px) {
    .writing {
      padding-block: 70px;
    }
    .writing-grid {
      grid-template-columns: 1fr;
      gap: 35px;
    }
    .featured-post h3 {
      font-size: 25px;
    }
    .writing-bottom {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
