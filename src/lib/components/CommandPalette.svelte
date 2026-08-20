<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { paletteOpen } from '$lib/stores/palette';
  import { darkMode } from '$lib/stores/theme';

  type Command = {
    label: string;
    hint?: string;
    group: string;
    icon: string;
    run: () => void;
  };

  let open = false;
  let query = '';
  let cursor = 0;
  let input: HTMLInputElement;
  let listEl: HTMLElement;
  let posts: Array<{ path: string; meta?: { title?: string; category?: string } }> = [];

  paletteOpen.subscribe((value) => {
    open = value;
    if (value) {
      query = '';
      cursor = 0;
      tick().then(() => input?.focus());
    }
  });

  const ICONS = {
    section: 'M4 6h16M4 12h16M4 18h10',
    post: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13',
    link: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
    theme: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  };

  const SECTIONS = [
    ['home', 'Home'],
    ['about', 'About'],
    ['experience', 'Experience'],
    ['skills', 'Skills & Expertise'],
    ['portfolio', 'Portfolio'],
    ['education', 'Education & Recognition'],
    ['blog', 'Blog'],
    ['contact', 'Contact']
  ] as const;

  const goSection = (id: string) => {
    close();
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openUrl = (url: string, external = false) => {
    close();
    if (external) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  };

  const close = () => paletteOpen.set(false);

  $: commands = [
    ...SECTIONS.map(([id, label]) => ({
      label,
      hint: `#${id}`,
      group: 'Navigate',
      icon: ICONS.section,
      run: () => goSection(id)
    })),
    {
      label: 'All blog posts',
      hint: '/blog',
      group: 'Navigate',
      icon: ICONS.post,
      run: () => openUrl('/blog')
    },
    ...posts.slice(0, 40).map((post) => ({
      label: post.meta?.title ?? 'Untitled post',
      hint: post.meta?.category ?? 'Post',
      group: 'Writing',
      icon: ICONS.post,
      run: () => openUrl(post.path)
    })),
    {
      label: 'LinkedIn',
      hint: 'linkedin.com/in/tkthetechie',
      group: 'Elsewhere',
      icon: ICONS.link,
      run: () => openUrl('https://www.linkedin.com/in/tkthetechie/', true)
    },
    {
      label: 'GitHub',
      hint: 'github.com/TKTheTechie',
      group: 'Elsewhere',
      icon: ICONS.link,
      run: () => openUrl('https://github.com/TKTheTechie', true)
    },
    {
      label: 'X / Twitter',
      hint: 'x.com/tkthetechie',
      group: 'Elsewhere',
      icon: ICONS.link,
      run: () => openUrl('https://x.com/tkthetechie', true)
    },
    {
      label: 'Toggle theme',
      hint: 'Light / dark',
      group: 'Actions',
      icon: ICONS.theme,
      run: () => {
        darkMode.toggle();
        close();
      }
    }
  ] as Command[];

  /** Subsequence match — typing "evdr" still finds "Event Driven". */
  const fuzzy = (haystack: string, needle: string) => {
    if (!needle) return true;
    const h = haystack.toLowerCase();
    const n = needle.toLowerCase().replace(/\s+/g, '');
    let i = 0;
    for (const char of h) {
      if (char === n[i]) i++;
      if (i === n.length) return true;
    }
    return false;
  };

  $: results = commands.filter((c) => fuzzy(`${c.label} ${c.hint ?? ''}`, query));
  $: groups = results.reduce<Record<string, Command[]>>((acc, command) => {
    (acc[command.group] ??= []).push(command);
    return acc;
  }, {});
  /** Flat order must match the rendered order for arrow keys to line up. */
  $: flat = Object.values(groups).flat();
  $: if (cursor >= flat.length) cursor = Math.max(0, flat.length - 1);

  const scrollCursorIntoView = async () => {
    await tick();
    listEl?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  };

  onMount(() => {
    fetch('/blog/api/posts')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) posts = data;
      })
      .catch(() => {});

    const onKey = (event: KeyboardEvent) => {
      const isToggle = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (isToggle) {
        event.preventDefault();
        paletteOpen.update((v) => !v);
        return;
      }
      if (!open) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        cursor = (cursor + 1) % Math.max(1, flat.length);
        scrollCursorIntoView();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        cursor = (cursor - 1 + flat.length) % Math.max(1, flat.length);
        scrollCursorIntoView();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        flat[cursor]?.run();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  $: if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
</script>

{#if open}
  <!-- backdrop -->
  <div
    class="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
    style="background-color:rgb(2 6 16 / .62);backdrop-filter:blur(10px);animation:paletteFade .25s ease both;"
  >
    <!-- a real button, so dismissing works for pointer and keyboard alike -->
    <button
      class="absolute inset-0 h-full w-full cursor-default"
      aria-label="Close command palette"
      on:click={close}
    ></button>

    <!-- panel -->
    <div
      class="relative w-full max-w-xl overflow-hidden rounded-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style="
        background-color:var(--surface-2);
        border:1px solid var(--hairline);
        box-shadow:0 40px 90px -30px rgb(2 6 23 / .65), 0 0 0 1px rgb(14 165 233 / .12);
        animation:palettePop .42s cubic-bezier(.16,1,.3,1) both;
      "
    >
      <!-- search row -->
      <div class="flex items-center gap-3 px-4" style="border-bottom:1px solid var(--hairline);">
        <svg class="h-4 w-4 shrink-0" style="color:var(--text-3);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.6-3.6" stroke-linecap="round" />
        </svg>
        <!-- svelte-ignore a11y-autofocus -->
        <input
          bind:this={input}
          bind:value={query}
          on:input={() => (cursor = 0)}
          type="text"
          placeholder="Search sections, posts, links…"
          autocomplete="off"
          spellcheck="false"
          class="w-full border-0 bg-transparent py-4 text-[15px] outline-none"
          style="color:var(--text-1);box-shadow:none;"
        />
        <kbd
          class="hidden shrink-0 rounded px-1.5 py-1 font-mono text-[10px] sm:block"
          style="background-color:var(--surface-1);color:var(--text-3);border:1px solid var(--hairline);"
        >ESC</kbd>
      </div>

      <!-- results -->
      <div bind:this={listEl} class="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
        {#if flat.length === 0}
          <p class="px-3 py-10 text-center text-sm" style="color:var(--text-3);">
            Nothing matches “{query}”.
          </p>
        {:else}
          {#each Object.entries(groups) as [group, items]}
            <p
              class="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.16em] uppercase"
              style="color:var(--text-3);"
            >
              {group}
            </p>
            {#each items as command}
              {@const index = flat.indexOf(command)}
              <button
                data-active={index === cursor}
                on:click={command.run}
                on:mouseenter={() => (cursor = index)}
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150"
                style="background-color:{index === cursor ? 'var(--surface-1)' : 'transparent'};"
              >
                <span
                  class="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                  style="background-color:{index === cursor
                    ? 'rgb(14 165 233 / .16)'
                    : 'var(--surface-1)'};color:{index === cursor ? 'var(--color-primary-500)' : 'var(--text-3)'};"
                >
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d={command.icon} />
                  </svg>
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-[14px] font-medium" style="color:var(--text-1);">
                    {command.label}
                  </span>
                </span>
                {#if command.hint}
                  <span class="shrink-0 font-mono text-[10px]" style="color:var(--text-3);">{command.hint}</span>
                {/if}
                {#if index === cursor}
                  <svg class="h-3.5 w-3.5 shrink-0" style="color:var(--color-primary-500);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                {/if}
              </button>
            {/each}
          {/each}
        {/if}
      </div>

      <!-- footer legend -->
      <div
        class="flex items-center justify-between px-4 py-2.5 font-mono text-[10px]"
        style="border-top:1px solid var(--hairline);color:var(--text-3);"
      >
        <span class="flex items-center gap-3">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
        </span>
        <span>{flat.length} result{flat.length === 1 ? '' : 's'}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes paletteFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes palettePop {
    from { opacity: 0; transform: translateY(-14px) scale(0.965); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
