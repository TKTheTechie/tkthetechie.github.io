<script lang="ts">
  /** Items are rendered twice so the -50% translation loops seamlessly. */
  export let items: string[] = [];
  export let duration = 46;
  export let reverse = false;
</script>

<div class="marquee-mask overflow-hidden">
  <div
    class="marquee-track gap-3"
    style="--marquee-duration:{duration}s;animation-direction:{reverse ? 'reverse' : 'normal'};"
  >
    {#each [0, 1] as copy}
      <div class="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 ? 'true' : undefined}>
        {#each items as item}
          <span
            class="shrink-0 rounded-full px-4 py-2 font-mono text-[12px] whitespace-nowrap transition-colors duration-300"
            style="border:1px solid var(--hairline);background-color:var(--surface-2);color:var(--text-2);"
          >
            {item}
          </span>
        {/each}
      </div>
    {/each}
  </div>
</div>
