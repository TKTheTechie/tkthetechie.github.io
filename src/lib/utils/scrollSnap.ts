/**
 * Simplified scroll snapping utility - CSS-first approach
 */

export interface ScrollSnapOptions {
  container?: string;
  sections?: string;
  threshold?: number;
  offset?: number;
  duration?: number;
}

export class ScrollSnapManager {
  private container: HTMLElement | null = null;
  private sections: NodeListOf<HTMLElement> | null = null;
  private isScrolling = false;
  private scrollTimeout: number | null = null;
  private currentSection = 0;
  private options: Required<ScrollSnapOptions>;

  constructor(options: ScrollSnapOptions = {}) {
    this.options = {
      container: '.scroll-snap-container',
      sections: '.scroll-snap-section',
      threshold: 0.5,
      offset: 80,
      duration: 600,
      ...options
    };
  }

  init(): void {
    this.container = document.querySelector(this.options.container);
    this.sections = document.querySelectorAll(this.options.sections);

    if (!this.container || !this.sections.length) {
      console.warn('ScrollSnapManager: Container or sections not found');
      return;
    }

    this.setupEventListeners();
    this.detectCurrentSection();
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    // Only add wheel events for desktop
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (!isMobile) {
      this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }
    
    // Simple scroll tracking for section detection
    this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private handleWheel(event: WheelEvent): void {
    if (this.isScrolling) {
      event.preventDefault();
      return;
    }

    const delta = event.deltaY;
    const direction = delta > 0 ? 1 : -1;
    
    // Check if we're at the edge of the current section's content
    const currentSectionElement = this.sections?.[this.currentSection];
    if (!currentSectionElement) return;

    const container = this.container!;
    const containerScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const sectionTop = currentSectionElement.offsetTop - this.options.offset;
    const sectionHeight = currentSectionElement.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    // Calculate relative position within the current section
    const relativeScrollTop = containerScrollTop - sectionTop;
    const isAtSectionTop = relativeScrollTop <= 50;
    const isAtSectionBottom = containerScrollTop + containerHeight >= sectionBottom - 50;

    // Only snap if we're trying to scroll beyond the current section's boundaries
    const shouldSnapUp = direction < 0 && isAtSectionTop && this.currentSection > 0;
    const shouldSnapDown = direction > 0 && isAtSectionBottom && this.currentSection < (this.sections?.length || 0) - 1;

    if (shouldSnapUp || shouldSnapDown) {
      if (Math.abs(delta) > 10) {
        event.preventDefault();
        this.snapToSection(this.currentSection + direction);
      }
    }
  }

  private handleScroll(): void {
    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }

    // Simple scroll end detection - just update current section
    this.scrollTimeout = window.setTimeout(() => {
      if (!this.isScrolling) {
        this.detectCurrentSection();
      }
    }, 100);
  }

  private detectCurrentSection(): void {
    if (!this.container || !this.sections) return;

    const containerTop = this.container.scrollTop;
    const viewportTop = containerTop + this.options.offset;

    let currentSection = 0;

    // Find the section that contains the top of the viewport
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
        currentSection = index;
      }
    });

    // If we're past all sections, we're in the last one
    if (viewportTop >= (this.sections[this.sections.length - 1]?.offsetTop || 0)) {
      currentSection = this.sections.length - 1;
    }

    this.currentSection = currentSection;
  }

  private snapToSection(index: number): void {
    if (!this.container || !this.sections) return;

    const targetIndex = Math.max(0, Math.min(index, this.sections.length - 1));
    const targetSection = this.sections[targetIndex];

    if (!targetSection) return;

    this.isScrolling = true;
    this.currentSection = targetIndex;

    const targetPosition = targetSection.offsetTop - this.options.offset;

    this.container.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    window.setTimeout(() => {
      this.isScrolling = false;
    }, this.options.duration);
  }

  public scrollToSection(sectionId: string): void {
    if (!this.sections) return;

    const targetSection = Array.from(this.sections).find(
      section => section.id === sectionId
    );

    if (targetSection) {
      const index = Array.from(this.sections).indexOf(targetSection);
      this.snapToSection(index);
    }
  }

  public getCurrentSection(): number {
    return this.currentSection;
  }

  public destroy(): void {
    if (this.container) {
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      if (!isMobile) {
        this.container.removeEventListener('wheel', this.handleWheel.bind(this));
      }
      this.container.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }
  }
}