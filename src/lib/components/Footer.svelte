<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="container-max section-padding">
    <div class="footer-top">
      <a href="/" class="footer-brand" aria-label="TKTheTechie home"
        >tk<span>.</span><small>thetechie</small></a
      >
      <p>Building systems.<br />Connecting possibilities.</p>
      <div class="footer-links">
        <a href="/#skills">Skills</a><a href="/#education">Education</a><a
          href="/blog">Writing</a
        ><a href="/rss.xml">RSS ↗</a>
      </div>
      <a href="#main-content" class="back-top" aria-label="Back to top">↑</a>
    </div>
    <div class="footer-bottom">
      <span>© {year} Thomas Kunnumpurath</span><span
        >A little curiosity goes a long way.</span
      >
    </div>
  </div>
</footer>

<style>
  footer {
    background: #121510;
    color: #e4e9db;
    padding: 40px 0 25px;
  }
  .footer-top {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 35px;
  }
  .footer-brand {
    font: 500 47px/1 var(--font-display);
    letter-spacing: -0.1em;
    display: flex;
    align-items: baseline;
  }
  .footer-brand > span {
    color: #d2f879;
  }
  .footer-brand small {
    margin-left: 15px;
    font: 400 17px var(--font-sans);
    letter-spacing: -0.04em;
  }
  .footer-top > p {
    font-size: 12px;
    line-height: 1.7;
    color: #a6af99;
  }
  .footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 30px;
    font-size: 11px;
    color: #bdc6b1;
  }
  .footer-links a:hover {
    color: #d2f879;
  }
  .back-top {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border: 1px solid #ffffff30;
    border-radius: 50%;
    font-size: 20px;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-top: 22px;
    border-top: 1px solid #ffffff20;
    font: 9px var(--font-mono);
    color: #9aa58d;
  }
  @media (max-width: 700px) {
    .footer-top {
      flex-wrap: wrap;
      gap: 25px;
    }
    .footer-top > p {
      display: none;
    }
    .footer-brand small {
      font-size: 14px;
      margin-left: 10px;
    }
    .footer-links {
      margin-left: auto;
    }
    .back-top {
      display: none;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 12px;
    }
  }
</style>
