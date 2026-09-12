<script lang="ts">
  import { reveal } from '$lib/actions/motion';
  export let eyebrow = '';
  export let subtitle = '';
  export let align: 'center' | 'left' = 'left';
  const indices: Record<string, string> = {
    About: '01',
    'Selected work': '02',
    Career: '03',
    Capabilities: '04',
    Credentials: '05',
    Writing: '06',
  };
</script>

<div class="section-heading" class:centered={align === 'center'}>
  {#if eyebrow}<p class="eyebrow" use:reveal={{ y: 10, blur: 0 }}>
      <span class="section-index">{indices[eyebrow] ?? '↗'}</span>{eyebrow}
    </p>{/if}
  <div class="heading-row">
    <h2 use:reveal={{ y: 22, delay: 60, blur: 0 }}><slot /></h2>
    {#if subtitle}<p
        class="subtitle"
        use:reveal={{ y: 16, delay: 130, blur: 0 }}
      >
        {subtitle}
      </p>{/if}
  </div>
</div>

<style>
  .section-heading {
    margin-bottom: 52px;
  }
  .eyebrow {
    margin-bottom: 25px;
    font-size: 10px;
    letter-spacing: 0.13em;
    color: var(--text-2);
    gap: 13px;
  }
  .section-index {
    display: inline-grid;
    place-items: center;
    width: 27px;
    height: 24px;
    border: 1px solid var(--hairline);
    border-radius: 3px;
    font-size: 9px;
  }
  .heading-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 48px;
  }
  h2 {
    font-size: clamp(2.5rem, 4.3vw, 4rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.055em;
    color: var(--text-1);
  }
  .subtitle {
    max-width: 345px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-2);
    flex-shrink: 0;
  }
  .centered {
    text-align: center;
  }
  .centered .eyebrow {
    justify-content: center;
  }
  .centered .heading-row {
    flex-direction: column;
    align-items: center;
    gap: 22px;
  }
  .centered .subtitle {
    max-width: 600px;
  }
  @media (max-width: 800px) {
    .heading-row {
      display: block;
    }
    .subtitle {
      margin-top: 22px;
      max-width: 520px;
    }
    .section-heading {
      margin-bottom: 36px;
    }
  }
</style>
