/**
 * One place that knows how the page scrolls.
 *
 * Lenis drives smooth scrolling when it's active; everything else on the site
 * goes through these helpers so it never has to care whether it is.
 */
import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

const NAV_OFFSET = -76;

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.45 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.3 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Freeze page scroll (modals, palettes) without losing position. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
