<script lang="ts">
  import { onMount } from 'svelte';

  let visible = false;
  let progress = 0;

  onMount(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      visible = window.scrollY > window.innerHeight * 0.9;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const CIRCUMFERENCE = 2 * Math.PI * 20;
</script>

<button
  on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  class="group fixed right-5 bottom-5 z-[120] grid h-12 w-12 place-items-center rounded-full transition-all duration-500"
  style="
    background-color:var(--glass-bg);
    border:1px solid var(--glass-border);
    box-shadow:var(--glass-shadow);
    backdrop-filter:blur(14px) saturate(160%);
    opacity:{visible ? 1 : 0};
    transform:translateY({visible ? '0' : '14px'}) scale({visible ? 1 : 0.85});
    pointer-events:{visible ? 'auto' : 'none'};
  "
  aria-label="Back to top"
  aria-hidden={!visible}
>
  <!-- the ring doubles as a read-progress dial -->
  <svg class="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="20" fill="none" stroke="var(--hairline)" stroke-width="2" />
    <circle
      cx="24" cy="24" r="20" fill="none" stroke="url(#btt-grad)" stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray={CIRCUMFERENCE}
      stroke-dashoffset={CIRCUMFERENCE * (1 - progress)}
      style="transition:stroke-dashoffset .15s linear;"
    />
    <defs>
      <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--color-primary-500)" />
        <stop offset="100%" stop-color="var(--color-accent-500)" />
      </linearGradient>
    </defs>
  </svg>
  <svg
    class="relative h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5"
    style="color:var(--text-1);"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7" />
  </svg>
</button>
