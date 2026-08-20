import { writable } from 'svelte/store';

/** Open state of the ⌘K command palette, shared by the nav and the palette. */
export const paletteOpen = writable(false);
