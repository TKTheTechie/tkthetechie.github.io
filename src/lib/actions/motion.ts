/**
 * Motion primitives.
 *
 * A small set of Svelte actions that the whole site shares, so animation
 * behaviour (and its reduced-motion handling) lives in exactly one place.
 */

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const coarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/* -------------------------------------------------------------------------- */
/* reveal — one-shot scroll-in transition                                      */
/* -------------------------------------------------------------------------- */

export interface RevealOptions {
  /** ms to wait after entering the viewport */
  delay?: number;
  /** px travelled upward */
  y?: number;
  /** starting blur in px */
  blur?: number;
  /** starting scale */
  scale?: number;
  /** 0–1 of the element that must be visible */
  threshold?: number;
  /** replay every time it re-enters (default: reveal once and forget) */
  repeat?: boolean;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  let opts = options;

  const apply = () => {
    const { delay = 0, y = 26, blur = 6, scale = 1 } = opts;
    node.style.setProperty('--reveal-delay', `${delay}ms`);
    node.style.setProperty('--reveal-y', `${y}px`);
    node.style.setProperty('--reveal-blur', `${blur}px`);
    node.style.setProperty('--reveal-s', `${scale}`);
  };

  if (reduced()) {
    node.classList.add('reveal-in');
    return {
      update(next: RevealOptions) {
        opts = next;
      }
    };
  }

  apply();
  node.classList.add('reveal-init');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('reveal-in');
          if (!opts.repeat) observer.unobserve(node);
        } else if (opts.repeat) {
          node.classList.remove('reveal-in');
        }
      }
    },
    { threshold: opts.threshold ?? 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  observer.observe(node);

  return {
    update(next: RevealOptions) {
      opts = next;
      apply();
    },
    destroy() {
      observer.disconnect();
    }
  };
}

/* -------------------------------------------------------------------------- */
/* stagger — reveal each child of a container in sequence                      */
/* -------------------------------------------------------------------------- */

export interface StaggerOptions extends Omit<RevealOptions, 'delay'> {
  /** ms between successive children */
  step?: number;
  /** ms before the first child */
  offset?: number;
  /** CSS selector for the items; defaults to direct children */
  select?: string;
}

export function stagger(node: HTMLElement, options: StaggerOptions = {}) {
  const { step = 70, offset = 0, y = 22, blur = 5, scale = 1, select } = options;

  const items = Array.from(
    select ? node.querySelectorAll<HTMLElement>(select) : (node.children as unknown as HTMLElement[])
  ) as HTMLElement[];

  if (reduced()) {
    items.forEach((el) => el.classList.add('reveal-in'));
    return {};
  }

  items.forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${offset + i * step}ms`);
    el.style.setProperty('--reveal-y', `${y}px`);
    el.style.setProperty('--reveal-blur', `${blur}px`);
    el.style.setProperty('--reveal-s', `${scale}`);
    el.classList.add('reveal-init');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          items.forEach((el) => el.classList.add('reveal-in'));
          observer.disconnect();
        }
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

/* -------------------------------------------------------------------------- */
/* tilt — pointer-tracked 3D rotation + spotlight position                     */
/* -------------------------------------------------------------------------- */

export interface TiltOptions {
  /** max rotation in degrees on each axis */
  max?: number;
  /** px the card floats toward the viewer */
  lift?: number;
  /** hover scale */
  scale?: number;
  /** perspective depth in px */
  perspective?: number;
  /** set false to only track the spotlight without rotating */
  rotate?: boolean;
}

export function tilt(node: HTMLElement, options: TiltOptions = {}) {
  const { max = 7, lift = 8, scale = 1.02, perspective = 1000, rotate = true } = options;

  // Touch devices have no hover, and reduced-motion users opted out.
  if (reduced() || coarse()) return {};

  let frame = 0;
  let rect: DOMRect | null = null;

  node.style.transformStyle = 'preserve-3d';
  node.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

  const measure = () => {
    rect = node.getBoundingClientRect();
  };

  const onEnter = () => {
    measure();
    // While actively tracking, drop the easing so the card feels attached
    // to the cursor instead of lagging behind it.
    node.style.transition = 'transform 0.12s linear';
  };

  const onMove = (event: PointerEvent) => {
    if (!rect) measure();
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!rect) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      node.style.setProperty('--mx', `${px * 100}%`);
      node.style.setProperty('--my', `${py * 100}%`);

      if (!rotate) return;
      const ry = (px - 0.5) * 2 * max;
      const rx = (0.5 - py) * 2 * max;
      node.style.transform =
        `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ` +
        `translate3d(0, ${-lift}px, 0) scale(${scale})`;
    });
  };

  const onLeave = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    rect = null;
    node.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    node.style.transform = '';
    node.style.removeProperty('--mx');
    node.style.removeProperty('--my');
  };

  node.addEventListener('pointerenter', onEnter);
  node.addEventListener('pointermove', onMove);
  node.addEventListener('pointerleave', onLeave);
  window.addEventListener('scroll', () => (rect = null), { passive: true });

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener('pointerenter', onEnter);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    }
  };
}

/* -------------------------------------------------------------------------- */
/* magnetic — element drifts toward the cursor while it is nearby              */
/* -------------------------------------------------------------------------- */

export function magnetic(node: HTMLElement, strength = 0.28) {
  if (reduced() || coarse()) return {};

  let frame = 0;

  const onMove = (event: PointerEvent) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      node.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      node.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      node.style.transform = `translate3d(${dx * strength}px, ${dy * strength - 3}px, 0)`;
    });
  };

  const onLeave = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    node.style.transform = '';
  };

  node.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.45s ease';
  node.addEventListener('pointermove', onMove);
  node.addEventListener('pointerleave', onLeave);

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    }
  };
}

/* -------------------------------------------------------------------------- */
/* parallax — translate an element against the scroll direction                */
/* -------------------------------------------------------------------------- */

export function parallax(node: HTMLElement, speed = 0.12) {
  if (reduced()) return {};

  let frame = 0;

  const update = () => {
    frame = 0;
    const rect = node.getBoundingClientRect();
    // 0 when the element is centred in the viewport, ±1 at the edges
    const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
    node.style.transform = `translate3d(0, ${progress * speed * 100}px, 0)`;
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };
}

/* -------------------------------------------------------------------------- */
/* countTo — animate a number upward once it scrolls into view                 */
/* -------------------------------------------------------------------------- */

export interface CountOptions {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function countTo(node: HTMLElement, options: CountOptions) {
  const { value, duration = 1600, prefix = '', suffix = '', decimals = 0 } = options;

  const render = (n: number) => {
    node.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
  };

  if (reduced()) {
    render(value);
    return {};
  }

  render(0);
  let raf = 0;

  const run = () => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      render(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(node);

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
    }
  };
}

/* -------------------------------------------------------------------------- */
/* spotlight — track the pointer for `.spotlight` without any rotation         */
/* -------------------------------------------------------------------------- */

export function spotlight(node: HTMLElement) {
  if (coarse()) return {};

  let frame = 0;
  const onMove = (event: PointerEvent) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      node.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  node.addEventListener('pointermove', onMove);
  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener('pointermove', onMove);
    }
  };
}
