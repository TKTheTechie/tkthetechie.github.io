<script lang="ts">
  import { reveal } from '$lib/actions/motion';

  export let eyebrow = '';
  export let subtitle = '';
  /** left-aligns the block instead of centring it */
  export let align: 'center' | 'left' = 'center';
</script>

<div class="mb-14 md:mb-16 {align === 'center' ? 'text-center' : 'text-left'}">
  {#if eyebrow}
    <p
      class="eyebrow mb-5 {align === 'center' ? 'justify-center' : ''}"
      use:reveal={{ y: 12, blur: 3 }}
    >
      <span class="h-px w-6" style="background-image:linear-gradient(90deg,transparent,currentColor);"></span>
      {eyebrow}
    </p>
  {/if}

  <h2
    class="font-display text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.06] font-bold tracking-[-0.03em]"
    style="color:var(--text-1);"
    use:reveal={{ y: 22, delay: 70 }}
  >
    <slot />
  </h2>

  <!-- the rule scales up from a dot, which reads as it being drawn -->
  <div
    class="mt-6 h-[3px] w-20 rounded-full {align === 'center' ? 'mx-auto' : ''}"
    style="background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500));"
    use:reveal={{ y: 0, blur: 0, scale: 0.12, delay: 200 }}
  ></div>

  {#if subtitle}
    <p
      class="mt-7 text-lg leading-relaxed {align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'}"
      style="color:var(--text-2);"
      use:reveal={{ y: 18, delay: 260 }}
    >
      {subtitle}
    </p>
  {/if}
</div>
