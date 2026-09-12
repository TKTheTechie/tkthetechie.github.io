<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { darkMode } from '$lib/stores/theme';
  import { paletteOpen } from '$lib/stores/palette';
  let scrolled = false;
  let menuOpen = false;
  let active = 'home';
  let progress = 0;
  let menuButton: HTMLButtonElement;
  let mobileMenu: HTMLDivElement;
  const links = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'portfolio' },
    { label: 'Experience', id: 'experience' },
    { label: 'Writing', id: 'blog' },
  ];
  $: home = $page.url.pathname === '/';
  $: prefix = home ? '' : '/';
  async function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      await tick();
      mobileMenu.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  }
  function escape(event: KeyboardEvent) {
    if (event.key === 'Escape' && menuOpen) {
      menuOpen = false;
      menuButton.focus();
    }
  }
  onMount(() => {
    darkMode.initSync();
    const update = () => {
      scrolled = window.scrollY > 24;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      let current = home ? 'home' : 'blog';
      for (const section of document.querySelectorAll<HTMLElement>(
        'section[id]',
      )) {
        if (section.getBoundingClientRect().top < 180) current = section.id;
      }
      active = current;
    };
    const resize = () => {
      if (innerWidth >= 900) menuOpen = false;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', resize);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<svelte:window on:keydown={escape} />
<svelte:head
  ><meta
    name="theme-color"
    content={$darkMode ? '#121510' : '#f5f4ed'}
  /></svelte:head
>
<a class="skip-link" href="#main-content">Skip to content</a>
<nav class:scrolled class:open={menuOpen} aria-label="Main navigation">
  <div
    class="progress"
    style:transform="scaleX({progress})"
    aria-hidden="true"
  ></div>
  <div class="container-max section-padding nav-inner">
    <a class="brand" href="/" aria-label="TKTheTechie home"
      ><span class="monogram">tk<span>.</span></span><span class="wordmark"
        >thetechie</span
      ></a
    >
    <div class="desktop-links">
      {#each links as link}<a
          href="{prefix}#{link.id}"
          class:active={active === link.id}
          aria-current={active === link.id ? 'location' : undefined}
          >{link.label}</a
        >{/each}
    </div>
    <div class="nav-actions">
      <button
        class="search"
        on:click={() => paletteOpen.set(true)}
        aria-label="Open command palette"
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
          ><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg
        ><kbd>⌘K</kbd></button
      >
      <button
        class="theme"
        on:click={() => darkMode.toggle()}
        aria-label={$darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
          >{#if $darkMode}<circle cx="12" cy="12" r="4" /><path
              d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
            />{:else}<path
              d="M20 14.3A8.5 8.5 0 0 1 9.7 4 8.5 8.5 0 1 0 20 14.3Z"
            />{/if}</svg
        ></button
      >
      <a class="connect" href="{prefix}#contact"
        >Let’s talk <span aria-hidden="true">↗</span></a
      >
      <button
        bind:this={menuButton}
        class="menu-toggle"
        on:click={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        ><span>{menuOpen ? '✕' : '☰'}</span></button
      >
    </div>
  </div>
  <div
    bind:this={mobileMenu}
    id="mobile-navigation"
    class="mobile-menu"
    inert={!menuOpen}
    hidden={!menuOpen}
  >
    {#each [...links, { label: 'Skills', id: 'skills' }, { label: 'Education', id: 'education' }, { label: 'Contact', id: 'contact' }] as link, i}<a
        href="{prefix}#{link.id}"
        on:click={() => (menuOpen = false)}
        ><span class="menu-index">0{i + 1}</span>{link.label}<span
          aria-hidden="true">↗</span
        ></a
      >{/each}
  </div>
</nav>

<style>
  nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 100;
    color: #e5eadc;
    background: #121510f2;
    border-bottom: 1px solid #ffffff18;
    backdrop-filter: blur(16px);
    transition:
      background 0.25s,
      color 0.25s;
  }
  nav.scrolled {
    background: color-mix(in srgb, var(--surface-0) 94%, transparent);
    color: var(--text-1);
    border-color: var(--hairline);
  }
  .nav-inner {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
  }
  .monogram {
    font: 600 36px/0.8 var(--font-display);
    letter-spacing: -0.12em;
  }
  .monogram > span {
    color: #c4ed74;
  }
  .wordmark {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.04em;
  }

  .desktop-links {
    display: flex;
    gap: 32px;
    font-size: 12px;
  }
  .desktop-links a {
    position: relative;
    padding: 15px 0;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .desktop-links a:hover,
  .desktop-links a.active {
    opacity: 1;
  }
  .desktop-links a.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    height: 2px;
    background: currentColor;
  }
  .nav-actions {
    display: flex;
    gap: 13px;
    align-items: center;
  }
  .nav-actions button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-actions svg {
    width: 17px;
    height: 17px;
  }
  .nav-actions .search {
    width: auto;
    gap: 7px;
  }
  kbd {
    font: 9px var(--font-mono);
    opacity: 0.8;
  }
  .connect {
    display: flex;
    gap: 28px;
    align-items: center;
    border: 1px solid currentColor;
    padding: 10px 16px;
    font-size: 12px;
    border-radius: 3px;
  }
  .connect:hover {
    background: #d2f879;
    color: #17200d;
    border-color: #d2f879;
  }
  .connect > span {
    font-size: 19px;
    line-height: 1;
  }
  .nav-actions .menu-toggle {
    display: none;
  }
  .progress {
    height: 2px;
    background: #a4c65c;
    position: absolute;
    inset: 0 0 auto;
    transform-origin: left;
  }
  .mobile-menu {
    padding: 10px 24px 24px;
    max-height: calc(100dvh - 80px);
    overflow-y: auto;
    background: var(--surface-0);
    color: var(--text-1);
  }
  .mobile-menu[hidden] {
    display: none;
  }
  .mobile-menu a {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--hairline);
    font: 500 24px var(--font-display);
    gap: 18px;
  }
  .mobile-menu a > span:last-child {
    margin-left: auto;
  }
  .menu-index {
    font: 10px var(--font-mono);
    color: var(--text-3);
  }
  .skip-link {
    position: fixed;
    top: -80px;
    left: 16px;
    z-index: 200;
    background: #d2f879;
    color: #17200d;
    padding: 12px 20px;
  }
  .skip-link:focus {
    top: 12px;
  }
  @media (max-width: 1050px) {
    .desktop-links {
      gap: 23px;
    }
    .nav-inner {
      gap: 20px;
    }
    .wordmark {
      display: none;
    }
  }
  @media (max-width: 899px) {
    .desktop-links {
      display: none;
    }
    .nav-actions .menu-toggle {
      display: flex;
    }
    .wordmark {
      display: inline;
    }
    .nav-inner {
      height: 72px;
    }
    .nav-actions {
      gap: 8px;
    }
    .connect {
      gap: 14px;
    }
    .nav-actions .search {
      display: none;
    }
  }
  @media (max-width: 380px) {
    .wordmark {
      display: none;
    }
  }
</style>
