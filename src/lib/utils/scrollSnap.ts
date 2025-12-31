/**
 * Enhanced scroll snapping utility for smooth section transitions
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
      duration: 800,
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

    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    if (!isMobile) {
      // Enhanced wheel event handling for desktop
      this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }
    
    // Touch events for mobile (always enabled)
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
    // Scroll end detection
    this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private isContentOverflowing(sectionElement: HTMLElement): boolean {
    const container = this.container!;
    const containerHeight = container.clientHeight;
    const sectionHeight = sectionElement.offsetHeight;
    
    // Consider content overflowing if section is significantly larger than viewport
    return sectionHeight > containerHeight * 1.2;
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

    // If content is overflowing, be more permissive with natural scrolling
    const hasOverflowingContent = this.isContentOverflowing(currentSectionElement);
    
    const container = this.container!;
    const containerScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const sectionTop = currentSectionElement.offsetTop - this.options.offset;
    const sectionHeight = currentSectionElement.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    // Calculate relative position within the current section
    const relativeScrollTop = containerScrollTop - sectionTop;
    const threshold = hasOverflowingContent ? 50 : 10; // Larger threshold for overflowing content
    const isAtSectionTop = relativeScrollTop <= threshold;
    const isAtSectionBottom = containerScrollTop + containerHeight >= sectionBottom - threshold;

    // Only snap if we're trying to scroll beyond the current section's boundaries
    const shouldSnapUp = direction < 0 && isAtSectionTop && this.currentSection > 0;
    const shouldSnapDown = direction > 0 && isAtSectionBottom && this.currentSection < (this.sections?.length || 0) - 1;

    if (shouldSnapUp || shouldSnapDown) {
      // Require more significant wheel movement for overflowing content
      const wheelThreshold = hasOverflowingContent ? 30 : 10;
      if (Math.abs(delta) > wheelThreshold) {
        event.preventDefault();
        this.snapToSection(this.currentSection + direction);
      }
    }
    // Otherwise, allow natural scrolling within the section
  }

  private handleTouchStart(): void {
    this.isScrolling = false;
  }

  private handleTouchEnd(): void {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, allow CSS scroll-snap to handle most of the work
      // Only intervene for fine-tuning
      window.setTimeout(() => {
        if (!this.isScrolling) {
          this.detectCurrentSection();
          
          const currentSectionElement = this.sections?.[this.currentSection];
          if (!currentSectionElement) return;

          const container = this.container!;
          const containerScrollTop = container.scrollTop;
          const sectionTop = currentSectionElement.offsetTop - this.options.offset;
          const distanceFromSectionTop = Math.abs(containerScrollTop - sectionTop);

          // Only snap if we're very close to a section start (within 30px on mobile)
          if (distanceFromSectionTop < 30) {
            this.snapToSection(this.currentSection);
          }
        }
      }, 200); // Shorter delay for mobile responsiveness
    } else {
      // Desktop behavior - more aggressive snapping
      window.setTimeout(() => {
        if (!this.isScrolling) {
          this.detectCurrentSection();
          const currentSectionElement = this.sections?.[this.currentSection];
          if (!currentSectionElement) return;

          const container = this.container!;
          const containerScrollTop = container.scrollTop;
          const sectionTop = currentSectionElement.offsetTop - this.options.offset;
          const distanceFromSectionTop = Math.abs(containerScrollTop - sectionTop);

          if (distanceFromSectionTop < 50) {
            this.snapToSection(this.currentSection);
          }
        }
      }, 300);
    }
  }

  private handleScroll(): void {
    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }

    // Shorter timeout on mobile for better responsiveness
    const isMobile = window.innerWidth <= 768;
    const timeout = isMobile ? 100 : 150;

    this.scrollTimeout = window.setTimeout(() => {
      if (!this.isScrolling) {
        this.detectCurrentSection();
        // Let CSS scroll-snap handle the snapping naturally
      }
    }, timeout);
  }

  private detectCurrentSection(): void {
    if (!this.container || !this.sections) return;

    const containerTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;
    
    // Use the top of the viewport (plus offset) to determine current section
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

    // Add snap animation class
    targetSection.classList.add('snapping-in');

    const targetPosition = targetSection.offsetTop - this.options.offset;

    this.container.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    window.setTimeout(() => {
      this.isScrolling = false;
      targetSection.classList.remove('snapping-in');
    }, this.options.duration);
  }

  private snapToNearestSection(): void {
    this.detectCurrentSection();
    this.snapToSection(this.currentSection);
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
      // Only remove wheel listener if it was added (non-mobile)
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      if (!isMobile) {
        this.container.removeEventListener('wheel', this.handleWheel.bind(this));
      }
      
      this.container.removeEventListener('touchstart', this.handleTouchStart.bind(this));
      this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
      this.container.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }
  }
}