<script lang="ts">
  import { reveal, countTo } from '$lib/actions/motion';
  const stats = [
    {
      value: 15,
      suffix: '+',
      label: 'Years of building',
      detail: 'Financial services & technology',
    },
    {
      value: 3,
      suffix: '×',
      label: 'Team growth',
      detail: 'Scaled the Americas SE organisation',
    },
    {
      value: 100,
      suffix: '+',
      label: 'Customer engagements',
      detail: 'From architecture to the boardroom',
    },
  ];
</script>

<section id="about" class="section-light about">
  <div class="container-max section-padding">
    <div class="about-grid">
      <div class="about-intro" use:reveal={{ y: 20, blur: 0 }}>
        <p class="eyebrow"><span>01</span> THE PERSON BEHIND THE PLATFORMS</p>
        <h2>Big-picture thinker.<br /><span>Hands-on builder.</span></h2>
        <a href="#experience" class="text-link"
          >A little more about my journey <span aria-hidden="true">↗</span></a
        >
      </div>
      <div class="about-copy" use:reveal={{ y: 20, delay: 100, blur: 0 }}>
        <p>
          I’m Thomas. I lead <strong>Systems Engineering at Solace</strong>,
          helping enterprises build the real-time systems their next chapter
          depends on.
        </p>
        <p>
          My work lives at the intersection of people and technology: scaling a
          team of 15 engineers across the Americas, shaping event-driven
          architecture, and making complex ideas click.
        </p>
        <p>
          And I still write code. Because the best technical leadership stays
          close to the craft.
        </p>
        <div class="focus-line">
          <span class="status-dot"></span> CURRENTLY EXPLORING
          <strong>Event mesh → Agent mesh</strong>
        </div>
      </div>
    </div>
    <div class="stats">
      {#each stats as stat, i}<div
          class="stat"
          use:reveal={{ delay: i * 80, y: 20, blur: 0 }}
        >
          <div
            class="stat-number"
            use:countTo={{
              value: stat.value,
              suffix: stat.suffix,
              duration: 1400,
            }}
          >
            {stat.value}{stat.suffix}
          </div>
          <div>
            <h3>{stat.label}</h3>
            <p>{stat.detail}</p>
          </div>
          <span class="stat-plus" aria-hidden="true">+</span>
        </div>{/each}
    </div>
  </div>
</section>

<style>
  .about {
    padding-block: 100px;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
  }
  .eyebrow {
    font-size: 9px;
    color: var(--text-2);
    letter-spacing: 0.1em;
    gap: 12px;
    margin-bottom: 28px;
  }
  .eyebrow > span {
    border: 1px solid var(--hairline);
    padding: 4px 6px;
    border-radius: 3px;
  }
  h2 {
    font-size: clamp(2.3rem, 3.8vw, 3.5rem);
    font-weight: 500;
    line-height: 1.13;
    letter-spacing: -0.06em;
  }
  h2 > span {
    color: var(--color-primary-600);
  }
  .text-link {
    margin-top: 32px;
    display: inline-flex;
    align-items: center;
    gap: 25px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--hairline);
    font-size: 12px;
  }
  .text-link:hover {
    color: var(--color-primary-600);
  }
  .text-link > span {
    font-size: 20px;
  }
  .about-copy {
    padding-top: 4px;
  }
  .about-copy > p {
    font-size: 15px;
    line-height: 1.85;
    color: var(--text-2);
    margin-bottom: 17px;
  }
  .about-copy > p:first-child {
    font-size: 19px;
    line-height: 1.6;
    color: var(--text-1);
  }
  .about-copy strong {
    font-weight: 500;
  }
  .focus-line {
    border-top: 1px solid var(--hairline);
    padding-top: 19px;
    margin-top: 27px;
    font: 8px var(--font-mono);
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 9px;
    color: var(--text-3);
  }
  .focus-line strong {
    font: 11px var(--font-sans);
    color: var(--text-1);
  }
  .status-dot {
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: var(--color-primary-500);
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-block: 1px solid var(--hairline);
    margin-top: 65px;
  }
  .stat {
    position: relative;
    padding: 30px 26px;
    border-right: 1px solid var(--hairline);
  }
  .stat:first-child {
    padding-left: 0;
  }
  .stat:last-child {
    border-right: 0;
  }
  .stat-number {
    font: 500 clamp(3rem, 5vw, 4.6rem)/1 var(--font-display);
    letter-spacing: -0.07em;
    margin-bottom: 15px;
  }
  .stat h3 {
    font: 500 13px var(--font-sans);
    letter-spacing: 0;
  }
  .stat p {
    font-size: 11px;
    color: var(--text-3);
    margin-top: 6px;
  }
  .stat-plus {
    position: absolute;
    top: 28px;
    right: 25px;
    font: 20px var(--font-mono);
    color: var(--text-3);
  }
  @media (max-width: 800px) {
    .about {
      padding-block: 70px;
    }
    .about-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .stats {
      margin-top: 35px;
    }
    .stat {
      padding: 25px 15px;
    }
    .stat-plus {
      display: none;
    }
    .stat p {
      font-size: 10px;
    }
  }
  @media (max-width: 420px) {
    .stat {
      padding-inline: 10px;
    }
    .stat-number {
      font-size: 2.9rem;
    }
    .stat h3 {
      font-size: 11px;
    }
    .stat p {
      font-size: 9px;
    }
  }
</style>
