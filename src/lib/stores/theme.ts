import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createDarkModeStore() {
  const { subscribe, set, update } = writable(true);

  return {
    subscribe,
    toggle: () => {
      if (browser) {
        update(isDark => {
          const newValue = !isDark;
          
          // Update DOM immediately
          if (newValue) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }
          
          return newValue;
        });
      }
    },
    init: () => {
      if (browser) {
        const savedTheme = localStorage.getItem('theme');
        
        // Default to dark mode if no saved preference, otherwise respect saved preference
        const shouldBeDark = savedTheme === 'light' ? false : true;
        
        // Set initial state
        set(shouldBeDark);
        
        // Update DOM
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  };
}

export const darkMode = createDarkModeStore();