<script lang="ts">
  import OrbitalSculpture from '$lib/three/OrbitalSculpture.svelte';
  import { magnetic } from '$lib/actions/motion';
  let paused = false;
</script>

<section id="home" class="hero">
  <div class="container-max section-padding hero-inner">
    <div class="hero-topline">
      <span>THOMAS KUNNUMPURATH</span><span class="hero-role"
        ><i></i> VP SYSTEMS ENGINEERING · SOLACE</span
      >
    </div>
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-kicker">
          <span>ENGINEER. LEADER. BUILDER.</span><span aria-hidden="true"
            >↗</span
          >
        </p>
        <h1>
          Big ideas.<br />Real-world<br /><span class="impact"
            >impact<span class="period">.</span></span
          >
        </h1>
        <p class="hero-description">
          I connect systems, scale teams, and turn complex technology into
          things that make a difference.
        </p>
        <div class="hero-actions">
          <a href="#portfolio" class="btn hero-primary" use:magnetic={0.12}
            >Explore my work <span aria-hidden="true">↗</span></a
          >
          <a href="#contact" class="hero-secondary"
            >Let’s connect <span aria-hidden="true">↗</span></a
          >
        </div>
        <div class="hero-person">
          <img
            src="/profile-pic.png"
            alt="Thomas Kunnumpurath"
            width="48"
            height="48"
            fetchpriority="high"
          />
          <p>
            <strong>Thomas Kunnumpurath</strong><span
              >Technical leader. Still hands on keys.</span
            >
          </p>
        </div>
      </div>
      <div class="hero-art">
        <div class="art-coordinate" aria-hidden="true">
          <span>01 / CONNECTED THINKING</span><span>+</span>
        </div>
        <OrbitalSculpture {paused} />
        <span class="art-label label-top" aria-hidden="true"
          ><i></i> PEOPLE</span
        >
        <span class="art-label label-bottom" aria-hidden="true"
          ><i></i> TECHNOLOGY</span
        >
        <div class="art-caption">
          <span>Everything works better. Connected.</span><button
            on:click={() => (paused = !paused)}
            aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'}
            aria-pressed={paused}>{paused ? '▶' : 'Ⅱ'}</button
          >
        </div>
      </div>
    </div>
    <div class="hero-baseline">
      <a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a
      ><span>FROM ARCHITECTURE TO EXECUTION</span>
    </div>
  </div>
</section>

<div class="company-band">
  <div class="container-max section-padding company-inner">
    <p>BUILT IN THE REAL WORLD.<br /><span>EXPERIENCE THAT COUNTS.</span></p>
    <div class="companies">
      <span class="solace-word">solace<span aria-hidden="true">◢</span></span
      ><span class="capital-word">Capital One</span><span class="deutsche-word"
        ><span class="bank-symbol" aria-hidden="true">╱</span> Deutsche Bank</span
      >
    </div>
    <a href="#experience" aria-label="Explore my career experience">↗</a>
  </div>
</div>

<style>
  .hero {
    background: #121510;
    color: #f5f5eb;
    overflow: hidden;
    position: relative;
  }
  .hero-inner {
    padding-top: 116px;
  }
  .hero-topline {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid #ffffff24;
    font: 10px var(--font-mono);
    letter-spacing: 0.13em;
    color: #bdc3b3;
  }
  .hero-role {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .hero-role i,
  .art-label i {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #d2f879;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    align-items: center;
    min-height: 650px;
    gap: 16px;
  }
  .hero-copy {
    padding: 42px 0 45px;
    position: relative;
    z-index: 2;
  }
  .hero-kicker {
    display: flex;
    gap: 32px;
    align-items: center;
    color: #d2f879;
    font: 10px var(--font-mono);
    letter-spacing: 0.12em;
    margin-bottom: 26px;
    animation: slideUp 0.8s both;
  }
  .hero-kicker > span:last-child {
    font-size: 20px;
  }
  h1 {
    font-size: clamp(4.9rem, 7.6vw, 7rem);
    font-weight: 500;
    letter-spacing: -0.072em;
    line-height: 0.94;
    margin: 0 0 30px;
    text-wrap: initial;
    animation: slideUp 1s 0.1s both;
  }
  .impact {
    color: #d2f879;
  }
  .period {
    color: #f5f5eb;
  }
  .hero-description {
    font-size: 16px;
    line-height: 1.8;
    max-width: 365px;
    color: #bdc3b3;
    animation: slideUp 1s 0.2s both;
  }
  .hero-actions {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-top: 28px;
    animation: slideUp 1s 0.3s both;
  }
  .hero-primary {
    background: #d2f879;
    color: #17200d;
    border-radius: 4px;
    padding: 16px 22px;
    font-size: 13px;
    box-shadow: none;
    gap: 35px;
  }
  .hero-primary > span {
    font-size: 21px;
    line-height: 1;
  }
  .hero-secondary {
    font-size: 13px;
    border-bottom: 1px solid #68715c;
    padding: 12px 0;
    display: flex;
    gap: 16px;
    transition: color 0.2s;
  }
  .hero-secondary:hover {
    color: #d2f879;
  }
  .hero-person {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 38px;
    animation: slideUp 1s 0.4s both;
  }
  .hero-person img {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    object-fit: cover;
    object-position: top;
    filter: saturate(0.65);
    border: 1px solid #ffffff40;
  }
  .hero-person p {
    display: grid;
    gap: 5px;
    font-size: 11px;
  }
  .hero-person strong {
    font-weight: 500;
  }
  .hero-person p span {
    color: #9ba38f;
    font-size: 10px;
  }
  .hero-art {
    position: relative;
    height: 550px;
    min-width: 0;
    background: radial-gradient(ellipse at center, #b8de6520, transparent 67%);
  }
  .art-coordinate {
    position: absolute;
    left: 6%;
    right: 0;
    top: 2%;
    display: flex;
    justify-content: space-between;
    color: #949d88;
    font: 9px var(--font-mono);
    letter-spacing: 0.12em;
  }
  .art-coordinate > span:last-child {
    font-size: 20px;
    line-height: 12px;
  }
  .art-label {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #d9dfd0;
    font: 9px var(--font-mono);
    letter-spacing: 0.1em;
    border: 1px solid #ffffff26;
    background: #171d16d9;
    padding: 9px 12px;
    border-radius: 3px;
    pointer-events: none;
  }
  .label-top {
    right: 3%;
    top: 25%;
  }
  .label-bottom {
    bottom: 23%;
    left: 0;
  }
  .art-caption {
    position: absolute;
    bottom: 1%;
    left: 6%;
    right: 0;
    border-top: 1px solid #ffffff24;
    padding-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font: 10px var(--font-mono);
    color: #a0aa93;
    gap: 15px;
  }
  .art-caption button {
    border: 1px solid #ffffff35;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    color: #d2f879;
    flex-shrink: 0;
  }
  .hero-baseline {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ffffff24;
    padding: 24px 0;
    font: 9px var(--font-mono);
    letter-spacing: 0.14em;
    color: #969f8a;
  }
  .hero-baseline a {
    display: flex;
    align-items: center;
    gap: 35px;
    color: #dce3d1;
  }
  .hero-baseline a span {
    font-size: 19px;
  }
  .company-band {
    background: var(--surface-0);
    border-bottom: 1px solid var(--hairline);
  }
  .company-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 38px;
    padding-top: 32px;
    padding-bottom: 32px;
  }
  .company-inner > p {
    font: 9px/1.8 var(--font-mono);
    letter-spacing: 0.07em;
    flex-shrink: 0;
  }
  .company-inner p span {
    color: var(--text-3);
  }
  .companies {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 28px;
    color: var(--text-1);
  }
  .solace-word {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.07em;
  }
  .solace-word span {
    font-size: 20px;
    margin-left: 3px;
  }
  .capital-word {
    font-size: 25px;
    font-style: italic;
    font-weight: 650;
    letter-spacing: -0.06em;
  }
  .deutsche-word {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  .bank-symbol {
    font-size: 25px;
    border: 2px solid currentColor;
    height: 25px;
    width: 25px;
    display: grid;
    place-items: center;
    line-height: 20px;
  }
  .company-inner > a {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    border: 1px solid var(--hairline);
    border-radius: 50%;
    font-size: 20px;
  }
  @media (min-width: 1600px) {
    .hero-grid {
      min-height: 740px;
    }
  }
  @media (max-width: 1000px) {
    h1 {
      font-size: clamp(4.4rem, 9vw, 6rem);
    }
    .hero-art {
      height: 480px;
    }
    .hero-grid {
      min-height: 620px;
    }
    .hero-role {
      font-size: 8px;
    }
    .hero-topline {
      font-size: 9px;
    }
    .company-inner {
      gap: 20px;
    }
    .company-inner > a {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .hero-inner {
      padding-top: 100px;
    }
    .hero-topline {
      padding-bottom: 17px;
    }
    .hero-role {
      display: none;
    }
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .hero-copy {
      padding: 34px 0 0;
    }
    h1 {
      font-size: clamp(3.5rem, 18.5vw, 6.8rem);
    }
    .hero-description {
      max-width: 380px;
      font-size: 15px;
    }
    .hero-art {
      height: 390px;
      margin: 20px 0 28px;
    }
    .hero-person {
      margin-top: 28px;
    }
    .hero-kicker {
      margin-bottom: 22px;
    }
    .hero-baseline > span {
      display: none;
    }
    .hero-actions {
      gap: 22px;
    }
    .hero-primary {
      gap: 22px;
    }
    .art-coordinate {
      top: 0;
      left: 0;
    }
    .art-caption {
      left: 0;
    }
    .company-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      padding-block: 26px;
    }
    .company-inner > p br {
      display: none;
    }
    .company-inner > p span {
      margin-left: 8px;
    }
    .companies {
      justify-content: space-between;
      gap: 12px;
    }
    .solace-word {
      font-size: 28px;
    }
    .capital-word {
      font-size: 21px;
    }
    .deutsche-word {
      font-size: 12px;
      gap: 6px;
    }
    .bank-symbol {
      width: 20px;
      height: 20px;
      font-size: 18px;
    }
  }
</style>
