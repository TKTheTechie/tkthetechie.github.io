<script lang="ts">
  import { PORTFOLIO_ITEMS } from '$lib/data/portfolio';
  import SectionHeading from './SectionHeading.svelte';
  import { reveal } from '$lib/actions/motion';
  let selected = 'All work';
  let expanded = false;
  const categories = [
    'All work',
    'Projects',
    'Speaking',
    'Podcasts',
    'Publications',
  ];
  const category = (title: string) =>
    title.includes('Podcast')
      ? 'Podcasts'
      : /Talk|re:Invent|Office Hours/.test(title)
        ? 'Speaking'
        : /Whitepaper|Course/.test(title)
          ? 'Publications'
          : 'Projects';
  const title = (value: string) =>
    value
      .replace(/^Open Source Project - /, '')
      .replace(/^Podcast - /, '')
      .replace(/^Whitepaper - /, '')
      .replace(/^Udemy Course - /, '');
  $: filtered = PORTFOLIO_ITEMS.filter(
    (item) => selected === 'All work' || category(item.title) === selected,
  );
  $: visible = expanded ? filtered : filtered.slice(0, 5);
  const action = (href: string) =>
    /youtube|edasummit/.test(href)
      ? 'Watch the conversation'
      : /podcast|apple.com/.test(href)
        ? 'Listen to the episode'
        : href.includes('github')
          ? 'Explore the code'
          : 'Explore the work';
</script>

<section id="portfolio" class="section-dark work">
  <div class="container-max section-padding">
    <SectionHeading
      eyebrow="Selected work"
      subtitle="Open source, experiments, and conversations on stage. A few ways I turn ideas into something useful."
      >Less theory.<br /><span class="gradient-text">More doing.</span
      ></SectionHeading
    >
    <div class="filters" role="group" aria-label="Filter portfolio">
      {#each categories as item}<button
          class:active={selected === item}
          aria-pressed={selected === item}
          on:click={() => {
            selected = item;
            expanded = false;
          }}
          >{item}{#if selected === item}<span
              >{filtered.length.toString().padStart(2, '0')}</span
            >{/if}</button
        >{/each}
      <span class="gallery-label" aria-hidden="true"
        >SELECTED / {String(PORTFOLIO_ITEMS.length).padStart(2, '0')}</span
      >
    </div>
    <p class="sr-only" aria-live="polite">
      Showing {visible.length} of {filtered.length}
      {selected === 'All work' ? 'portfolio items' : selected.toLowerCase()}
    </p>
    <div class="work-grid" class:expanded>
      {#each visible as item, i (item.title)}
        <article
          class="work-card"
          class:featured={i < 2}
          use:reveal={{ y: 20, blur: 0, delay: (i % 2) * 70 }}
        >
          {#if item.href}<a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              class="image-link"
              aria-label={title(item.title)}
              ><div class="work-image">
                <img src={item.imgSrc} alt="" loading="lazy" /><span
                  class="image-arrow"
                  aria-hidden="true">↗</span
                >
              </div></a
            >{:else}<div class="work-image">
              <img src={item.imgSrc} alt={title(item.title)} loading="lazy" />
            </div>{/if}
          <div class="work-meta">
            <span>{category(item.title)}</span><span
              >{String(PORTFOLIO_ITEMS.indexOf(item) + 1).padStart(
                2,
                '0',
              )}</span
            >
          </div>
          <h3>
            {#if item.href}<a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer">{title(item.title)}</a
              >{:else}{title(item.title)}{/if}
          </h3>
          <p class="work-description">{item.description}</p>
          {#if item.href}<a
              class="work-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              >{action(item.href)}<span aria-hidden="true">↗</span></a
            >{:else}<span class="archived">Course · Past project</span>{/if}
        </article>
      {/each}
    </div>
    {#if filtered.length > 5}<div class="show-more">
        <button class="btn btn-ghost" on:click={() => (expanded = !expanded)}
          >{expanded
            ? 'Show selected work'
            : `View all ${filtered.length} projects & appearances`}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span></button
        >
      </div>{/if}
  </div>
</section>

<style>
  .work {
    padding-block: 100px;
  }
  .filters {
    display: flex;
    gap: 8px;
    align-items: center;
    border-block: 1px solid var(--hairline);
    padding: 15px 0;
    margin-bottom: 35px;
    flex-wrap: wrap;
  }
  .filters button {
    font-size: 11px;
    padding: 9px 14px;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--text-2);
    display: flex;
    gap: 13px;
    align-items: center;
  }
  .filters button:hover {
    border-color: var(--hairline);
  }
  .filters button.active {
    background: var(--text-1);
    color: var(--surface-0);
  }
  .filters button span {
    font: 9px var(--font-mono);
    opacity: 0.7;
  }
  .gallery-label {
    margin-left: auto;
    font: 9px var(--font-mono);
    color: var(--text-3);
    letter-spacing: 0.1em;
  }
  .work-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    column-gap: 28px;
    row-gap: 45px;
  }
  .work-card {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .work-card.featured,
  .work-grid.expanded .work-card {
    grid-column: span 3;
  }
  .work-image {
    aspect-ratio: 1.6;
    background: #e1e6d6;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }
  .work-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.5s;
    filter: saturate(0.7);
  }
  .work-card:hover .work-image img {
    transform: scale(1.035);
    filter: saturate(1);
  }
  .image-arrow {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f5f4ed;
    color: #20261b;
    font-size: 21px;
    transition:
      background 0.25s,
      transform 0.3s;
  }
  .image-link:hover .image-arrow {
    background: #d2f879;
    transform: rotate(45deg);
  }
  .work-meta {
    display: flex;
    justify-content: space-between;
    margin: 18px 0 11px;
    font: 9px var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-3);
  }
  h3 {
    font-size: 19px;
    line-height: 1.35;
    font-weight: 500;
    letter-spacing: -0.04em;
  }
  .featured h3 {
    font-size: 24px;
  }
  .work-description {
    margin-top: 12px;
    font-size: 12px;
    line-height: 1.8;
    color: var(--text-2);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .work-link {
    margin-top: auto;
    padding-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    border-bottom: 1px solid var(--hairline);
    padding-bottom: 12px;
  }
  .work-link > span {
    font-size: 20px;
  }
  .work-link:hover {
    color: var(--color-primary-600);
  }
  .archived {
    font: 10px var(--font-mono);
    color: var(--text-3);
    margin-top: 20px;
  }
  .show-more {
    margin-top: 40px;
    text-align: center;
  }
  .show-more button {
    gap: 26px;
  }
  @media (max-width: 900px) {
    .work-card {
      grid-column: span 3;
    }
    .gallery-label {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .work {
      padding-block: 70px;
    }
    .work-grid {
      grid-template-columns: 1fr;
      gap: 35px;
    }
    .work-card,
    .work-card.featured {
      grid-column: auto;
    }
    .filters {
      gap: 2px;
    }
    .filters button {
      padding: 8px 9px;
      font-size: 10px;
    }
    .featured h3,
    h3 {
      font-size: 22px;
    }
    .work-description {
      font-size: 13px;
    }
  }
</style>
