import { writable } from 'svelte/store';

export let siteMap = new Map<string, number>([
  ['Home', 0],
  ['Experience', 2],
  ['Proficiency', 3],
  ['Education', 4],
  ['Portfolio', 5],
  ['Blog', 6]
]);

export const currentPage = writable("Home");

