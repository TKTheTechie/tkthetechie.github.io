import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'theme';

/**
 * The inline script in app.html already resolves the theme and stamps `.dark`
 * on <html> before first paint, so the class is the source of truth here —
 * this store just mirrors it and writes changes back.
 */
function createDarkModeStore() {
  const { subscribe, set } = writable(false);

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark);
    set(dark);
  };

  return {
    subscribe,

    /**
     * Seed the store from the `.dark` class before first paint, so components
     * that read `isDark` during init don't render a frame of the wrong theme.
     * Returns the resolved value for convenience.
     */
    initSync: () => {
      if (!browser) return false;
      const dark = document.documentElement.classList.contains('dark');
      set(dark);
      return dark;
    },

    toggle: () => {
      if (!browser) return;
      const next = !document.documentElement.classList.contains('dark');
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      apply(next);
    },

    init: () => {
      if (!browser) return;
      apply(document.documentElement.classList.contains('dark'));

      // Follow the OS while the visitor hasn't made an explicit choice.
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', (event) => {
        if (!localStorage.getItem(STORAGE_KEY)) apply(event.matches);
      });
    }
  };
}

export const darkMode = createDarkModeStore();
