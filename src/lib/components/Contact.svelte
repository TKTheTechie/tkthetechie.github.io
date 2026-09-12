<script lang="ts">
  import { reveal, magnetic } from '$lib/actions/motion';
</script>

<section id="contact" class="contact">
  <div class="container-max section-padding">
    <div class="contact-top">
      <p><span class="dot"></span> GOOD THINGS START WITH A CONVERSATION</p>
      <span aria-hidden="true">LET’S MAKE IT HAPPEN ↙</span>
    </div>
    <div class="contact-main">
      <h2 use:reveal={{ y: 24, blur: 0 }}>
        What’s<br />your next<br /><span>big idea?</span>
      </h2>
      <div class="contact-aside" use:reveal={{ y: 20, blur: 0, delay: 100 }}>
        <div class="contact-orbit" aria-hidden="true">
          <span></span><span></span><span></span><i>↗</i>
        </div>
        <p>
          A challenging architecture. A team ready to grow. A conversation your
          audience needs to hear.
        </p>
        <p>I’d love to be part of it.</p>
        <a
          href="https://www.linkedin.com/in/tkthetechie/"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-cta"
          use:magnetic={0.1}
          >Let’s connect on LinkedIn <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <div class="contact-bottom">
      <span>SPEAKING · ARCHITECTURE · COLLABORATION</span>
      <div>
        <a
          href="https://github.com/TKTheTechie"
          target="_blank"
          rel="noopener noreferrer">GitHub ↗</a
        ><a
          href="https://x.com/tkthetechie"
          target="_blank"
          rel="noopener noreferrer">X / Twitter ↗</a
        >
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background: #d2f879;
    color: #202b15;
    padding: 40px 0 28px;
    overflow: hidden;
  }
  .contact-top {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #27371738;
    font: 9px var(--font-mono);
    letter-spacing: 0.1em;
  }
  .contact-top p {
    display: flex;
    gap: 9px;
    align-items: center;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #344b21;
  }
  .contact-main {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 60px;
    align-items: center;
    padding: 55px 0 65px;
  }
  h2 {
    font-size: clamp(5rem, 9vw, 8.5rem);
    font-weight: 500;
    letter-spacing: -0.075em;
    line-height: 0.93;
  }
  h2 > span {
    color: #4d6d2b;
  }
  .contact-aside {
    max-width: 320px;
    margin-left: auto;
  }
  .contact-aside > p {
    font-size: 15px;
    line-height: 1.8;
    margin-bottom: 12px;
  }
  .contact-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 26px;
    border-bottom: 1px solid #27371788;
    padding: 18px 0;
    margin-top: 10px;
    font-size: 13px;
    font-weight: 600;
  }
  .contact-cta > span {
    font-size: 25px;
  }
  .contact-cta:hover {
    color: #506f2e;
  }
  .contact-orbit {
    width: 125px;
    height: 125px;
    position: relative;
    margin: 0 0 25px;
    perspective: 400px;
  }
  .contact-orbit > span {
    position: absolute;
    inset: 0;
    border: 1px solid #405c3188;
    border-radius: 50%;
    transform: rotateY(55deg) rotateZ(-30deg);
  }
  .contact-orbit > span:nth-child(2) {
    transform: rotateY(-55deg) rotateZ(30deg);
  }
  .contact-orbit > span:nth-child(3) {
    transform: rotateX(65deg);
  }
  .contact-orbit i {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 50px;
    font-style: normal;
  }
  .contact-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-top: 1px solid #27371738;
    padding-top: 24px;
    font: 9px var(--font-mono);
    letter-spacing: 0.06em;
  }
  .contact-bottom > div {
    display: flex;
    gap: 24px;
  }
  .contact-bottom a:hover {
    text-decoration: underline;
  }
  @media (max-width: 700px) {
    .contact-top > span {
      display: none;
    }
    .contact-main {
      grid-template-columns: 1fr;
      gap: 30px;
      padding-block: 40px;
    }
    h2 {
      font-size: clamp(4.6rem, 17vw, 7rem);
    }
    .contact-aside {
      max-width: none;
      margin: 0;
    }
    .contact-orbit {
      display: none;
    }
    .contact-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
    .contact-top {
      font-size: 8px;
    }
  }
</style>
