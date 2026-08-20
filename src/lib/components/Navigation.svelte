<script lang="ts">
  import { onMount } from 'svelte';
  import { darkMode } from '$lib/stores/theme';
  import { paletteOpen } from '$lib/stores/palette';

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isDark = false;
  let activeSection = 'home';
  let progress = 0;
  let onHome = true;

  /** pixel geometry of the sliding active-pill */
  let indicator = { left: 0, width: 0, ready: false };
  let navList: HTMLElement;

  darkMode.subscribe((value) => (isDark = value));

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Education', id: 'education' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' }
  ];

  const moveIndicator = () => {
    if (!navList) return;
    const target = navList.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (!target) {
      indicator = { ...indicator, ready: false };
      return;
    }
    indicator = {
      left: target.offsetLeft,
      width: target.offsetWidth,
      ready: true
    };
  };

  onMount(() => {
    onHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

    // Off the home page there are no sections to spy on, so highlight the
    // route we're actually on instead of leaving "Home" lit.
    if (!onHome) {
      activeSection = window.location.pathname.startsWith('/blog') ? 'blog' : '';
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      isScrolled = window.scrollY > 24;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;

      // Scroll spy: the section whose top is nearest just under the navbar wins.
      let current = activeSection;
      let best = Number.POSITIVE_INFINITY;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top - 120;
        const distance = Math.abs(top);
        if (top <= 40 && distance < best) {
          best = distance;
          current = section.id;
        }
      }
      // near the very bottom, always highlight the last section
      if (max > 0 && window.scrollY >= max - 8 && sections.length) {
        current = sections[sections.length - 1].id;
      }
      if (current !== activeSection) {
        activeSection = current;
        moveIndicator();
      }
    };

    onScroll();
    moveIndicator();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', moveIndicator);

    /*
      The pill is measured in pixels, so anything that changes label widths
      after mount will leave it misaligned. The display font swapping in is
      the usual culprit — watch the list itself rather than guessing.
    */
    const listObserver = new ResizeObserver(moveIndicator);
    if (navList) listObserver.observe(navList);
    requestAnimationFrame(moveIndicator);
    if (document.fonts?.ready) document.fonts.ready.then(moveIndicator);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', moveIndicator);
      listObserver.disconnect();
    };
  });

  const go = (id: string) => {
    isMobileMenuOpen = false;
    if (!onHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
</script>

<svelte:head>
  <meta name="theme-color" content={isDark ? '#05080f' : '#ffffff'} />
</svelte:head>

<!-- reading-progress hairline, pinned above the bar -->
<div class="fixed top-0 left-0 right-0 z-[110] h-[2px]" aria-hidden="true">
  <div
    class="h-full origin-left"
    style="
      transform:scaleX({progress});
      background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-400),var(--color-plasma-400));
      transition:transform .12s linear;
      box-shadow:0 0 12px rgba(14,165,233,.6);
    "
  ></div>
</div>

<nav
  class="fixed top-0 right-0 left-0 z-[100] transition-all duration-500"
  class:is-scrolled={isScrolled}
  style="
    background-color:{isScrolled ? 'var(--nav-bg)' : 'transparent'};
    border-bottom:1px solid {isScrolled ? 'var(--nav-border)' : 'transparent'};
    backdrop-filter:{isScrolled ? 'blur(18px) saturate(180%)' : 'none'};
    -webkit-backdrop-filter:{isScrolled ? 'blur(18px) saturate(180%)' : 'none'};
  "
>
  <div class="container-max section-padding">
    <div class="flex h-[68px] items-center justify-between gap-4">
      <!-- ---------- logo ---------- -->
      <a href="/" class="group flex shrink-0 items-center gap-2.5" aria-label="TKTheTechie home">
        <span class="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px]">
          <span
            class="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));"
          ></span>
          <span
            class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background-image:linear-gradient(135deg,var(--color-accent-400),var(--color-plasma-500));"
          ></span>
          <span class="font-display relative text-[13px] font-extrabold tracking-tight text-white">TK</span>
        </span>
        <span class="font-display text-[17px] font-bold tracking-tight" style="color:var(--nav-fg-strong);">
          <span class="gradient-text">TheTechie</span>
        </span>
      </a>

      <!-- ---------- desktop links ---------- -->
      <div class="relative hidden items-center gap-1 lg:flex" bind:this={navList}>
        <!-- sliding active pill -->
        <span
          class="pointer-events-none absolute top-1/2 h-8 rounded-full"
          aria-hidden="true"
          style="
            left:{indicator.left}px;
            width:{indicator.width}px;
            opacity:{indicator.ready ? 1 : 0};
            transform:translateY(-50%);
            background-color:var(--nav-pill);
            transition:left .55s cubic-bezier(.16,1,.3,1), width .55s cubic-bezier(.16,1,.3,1), opacity .3s ease;
          "
        ></span>

        {#each navItems as item}
          <button
            data-section={item.id}
            on:click={() => go(item.id)}
            class="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors duration-300"
            style="color:{activeSection === item.id ? 'var(--nav-fg-active)' : 'var(--nav-fg)'};"
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.name}
          </button>
        {/each}
      </div>

      <!-- ---------- actions ---------- -->
      <div class="flex shrink-0 items-center gap-2">
        <!-- command palette trigger -->
        <button
          on:click={() => paletteOpen.set(true)}
          class="hidden items-center gap-2 rounded-full py-1.5 pr-2 pl-3 text-[12px] font-medium transition-all duration-300 md:flex"
          style="border:1px solid var(--nav-border-strong);color:var(--nav-fg);"
          aria-label="Open command palette"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.6-3.6" stroke-linecap="round" />
          </svg>
          <span class="hidden lg:inline">Jump to…</span>
          <kbd
            class="rounded px-1.5 py-0.5 font-mono text-[10px]"
            style="background-color:var(--nav-pill);color:var(--nav-fg-strong);"
          >⌘K</kbd>
        </button>

        <!-- theme toggle -->
        <button
          on:click={() => darkMode.toggle()}
          class="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full transition-all duration-300"
          style="border:1px solid var(--nav-border-strong);color:var(--nav-fg-strong);"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <!-- the two icons cross-fade and counter-rotate -->
          <svg
            class="absolute h-[17px] w-[17px] transition-all duration-500"
            style="opacity:{isDark ? 0 : 1};transform:rotate({isDark ? -90 : 0}deg) scale({isDark ? 0.4 : 1});"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg
            class="absolute h-[17px] w-[17px] transition-all duration-500"
            style="opacity:{isDark ? 1 : 0};transform:rotate({isDark ? 0 : 90}deg) scale({isDark ? 1 : 0.4});"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <!-- mobile menu -->
        <button
          on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
          class="grid h-9 w-9 place-items-center rounded-full transition-all duration-300 lg:hidden"
          style="border:1px solid var(--nav-border-strong);color:var(--nav-fg-strong);"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span class="relative block h-3.5 w-4">
            <span
              class="absolute left-0 block h-[1.6px] w-full rounded-full bg-current transition-all duration-500"
              style="top:{isMobileMenuOpen ? '6.4px' : '1px'};transform:rotate({isMobileMenuOpen ? 45 : 0}deg);"
            ></span>
            <span
              class="absolute left-0 block h-[1.6px] w-full rounded-full bg-current transition-all duration-300"
              style="top:6.4px;opacity:{isMobileMenuOpen ? 0 : 1};"
            ></span>
            <span
              class="absolute left-0 block h-[1.6px] w-full rounded-full bg-current transition-all duration-500"
              style="top:{isMobileMenuOpen ? '6.4px' : '12px'};transform:rotate({isMobileMenuOpen ? -45 : 0}deg);"
            ></span>
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- ---------- mobile drawer ---------- -->
  <div
    class="overflow-hidden lg:hidden"
    style="
      max-height:{isMobileMenuOpen ? '30rem' : '0'};
      opacity:{isMobileMenuOpen ? 1 : 0};
      background-color:var(--nav-bg-solid);
      backdrop-filter:blur(18px) saturate(180%);
      transition:max-height .6s cubic-bezier(.16,1,.3,1), opacity .35s ease;
    "
  >
    <div class="container-max section-padding pt-2 pb-5">
      <div class="grid gap-1" style="border-top:1px solid var(--nav-border);padding-top:.75rem;">
        {#each navItems as item, i}
          <button
            on:click={() => go(item.id)}
            class="flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold transition-all duration-500"
            style="
              color:{activeSection === item.id ? 'var(--nav-fg-active)' : 'var(--nav-fg)'};
              background-color:{activeSection === item.id ? 'var(--nav-pill)' : 'transparent'};
              transform:translateY({isMobileMenuOpen ? '0' : '10px'});
              opacity:{isMobileMenuOpen ? 1 : 0};
              transition-delay:{isMobileMenuOpen ? 40 + i * 35 : 0}ms;
            "
          >
            {item.name}
            <span class="font-mono text-[10px] opacity-50">0{i + 1}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</nav>

<style>
  /*
    The bar floats over a very dark hero at rest and over normal page surfaces
    once scrolled, so its palette is expressed as variables that flip with the
    scrolled state rather than with the theme alone.
  */
  nav {
    --nav-fg: rgb(203 213 225 / 0.82);
    --nav-fg-strong: #fff;
    --nav-fg-active: #fff;
    --nav-pill: rgb(255 255 255 / 0.12);
    --nav-border: rgb(255 255 255 / 0.1);
    --nav-border-strong: rgb(255 255 255 / 0.14);
    --nav-bg: rgb(5 8 15 / 0.72);
    --nav-bg-solid: rgb(5 8 15 / 0.94);
  }

  /* Once scrolled past the hero the bar adopts the page theme. */
  :global(html:not(.dark)) nav.is-scrolled {
    --nav-fg: #475569;
    --nav-fg-strong: #0b1220;
    --nav-fg-active: #0b1220;
    --nav-pill: rgb(15 23 42 / 0.07);
    --nav-border: rgb(15 23 42 / 0.08);
    --nav-border-strong: rgb(15 23 42 / 0.12);
    --nav-bg: rgb(255 255 255 / 0.78);
    --nav-bg-solid: rgb(255 255 255 / 0.96);
  }
</style>
