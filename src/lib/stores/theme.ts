import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createDarkModeStore() {
  const { subscribe, set, update } = writable(true);

  return {
    subscribe,
    set, // Expose the set method
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
        
        // Update DOM immediately and synchronously
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    // New method to initialize theme before component mount
    initSync: () => {
      if (browser) {
        const savedTheme = localStorage.getItem('theme');
        const shouldBeDark = savedTheme === 'light' ? false : true;
        
        // Apply theme immediately to prevent flash
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        return shouldBeDark;
      }
      return true; // Default to dark mode
    }
  };
}

export const darkMode = createDarkModeStore();