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
  private touchStartY = 0;
  private touchStartTime = 0;

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
    this.markOverflowingSections();
  }

  private markOverflowingSections(): void {
    if (!this.container || !this.sections) return;

    const containerHeight = this.container.clientHeight;
    
    this.sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const hasOverflow = sectionHeight > containerHeight * 1.3;
      
      if (hasOverflow) {
        section.classList.add('has-overflow');
      } else {
        section.classList.remove('has-overflow');
      }
    });
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (!isMobile) {
      // Enhanced wheel events for desktop
      this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    } else {
      // Enhanced touch events for mobile
      this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }
    
    // Simple scroll tracking for section detection
    this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    // Re-mark overflowing sections on resize
    window.addEventListener('resize', this.markOverflowingSections.bind(this), { passive: true });
  }

  private handleTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  private handleTouchEnd(event: TouchEvent): void {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const touchEndY = event.changedTouches[0].clientY;
    const touchDistance = this.touchStartY - touchEndY; // Positive = scroll down
    const touchDuration = Date.now() - this.touchStartTime;
    
    // Detect significant swipe gestures (more restrictive)
    const isSignificantSwipe = Math.abs(touchDistance) > 80 && touchDuration < 250;
    const swipeDirection = touchDistance > 0 ? 1 : -1; // 1 = down, -1 = up
    
    if (isSignificantSwipe) {
      // For clear swipe gestures, snap to next/previous section
      const targetSection = this.currentSection + swipeDirection;
      if (targetSection >= 0 && targetSection < (this.sections?.length || 0)) {
        window.setTimeout(() => {
          this.snapToSection(targetSection);
        }, 100);
      }
    } else {
      // For normal scrolling, wait longer and be more conservative
      window.setTimeout(() => {
        if (!this.isScrolling) {
          this.detectCurrentSection();
          this.checkMobileSnap();
        }
      }, 500); // Longer delay to let users finish reading
    }
  }

  private checkMobileSnap(): void {
    if (!this.container || !this.sections) return;

    const currentSectionElement = this.sections[this.currentSection];
    if (!currentSectionElement) return;

    const containerScrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;
    const sectionTop = currentSectionElement.offsetTop - this.options.offset;
    const sectionHeight = currentSectionElement.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    // Much more conservative boundary detection
    const isAtVeryTop = containerScrollTop <= sectionTop + 10; // Only 10px threshold
    const isAtVeryBottom = containerScrollTop + containerHeight >= sectionBottom - 10; // Only 10px threshold
    
    // Check if section has overflowing content
    const hasOverflowingContent = sectionHeight > containerHeight * 1.2;
    
    if (hasOverflowingContent) {
      // For sections with overflowing content, be even more conservative
      const isAtAbsoluteBottom = containerScrollTop + containerHeight >= sectionBottom - 5;
      const isAtAbsoluteTop = containerScrollTop <= sectionTop + 5;
      
      // Only snap if we're at the absolute edge AND trying to scroll further
      if (isAtAbsoluteBottom && this.currentSection < this.sections.length - 1) {
        // Only snap if we've been at the bottom for a moment (user really wants to continue)
        window.setTimeout(() => {
          const stillAtBottom = this.container!.scrollTop + this.container!.clientHeight >= sectionBottom - 5;
          if (stillAtBottom && !this.isScrolling) {
            this.snapToSection(this.currentSection + 1);
          }
        }, 200);
      } else if (isAtAbsoluteTop && this.currentSection > 0) {
        window.setTimeout(() => {
          const stillAtTop = this.container!.scrollTop <= sectionTop + 5;
          if (stillAtTop && !this.isScrolling) {
            this.snapToSection(this.currentSection - 1);
          }
        }, 200);
      }
    } else {
      // For normal sections, use regular boundary detection
      if (isAtVeryBottom && this.currentSection < this.sections.length - 1) {
        this.snapToSection(this.currentSection + 1);
      } else if (isAtVeryTop && this.currentSection > 0) {
        this.snapToSection(this.currentSection - 1);
      } else {
        // Only align to section start if we're very far off (more than 150px)
        const distanceFromSectionTop = Math.abs(containerScrollTop - sectionTop);
        if (distanceFromSectionTop > 150) {
          this.snapToSection(this.currentSection);
        }
      }
    }
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

    const container = this.container!;
    const containerScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const sectionTop = currentSectionElement.offsetTop - this.options.offset;
    const sectionHeight = currentSectionElement.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    // Check if section has overflowing content
    const hasOverflowingContent = this.isContentOverflowing(currentSectionElement);

    // Calculate relative position within the current section
    const relativeScrollTop = containerScrollTop - sectionTop;
    const threshold = hasOverflowingContent ? 100 : 50; // Larger threshold for overflowing content
    const isAtSectionTop = relativeScrollTop <= threshold;
    const isAtSectionBottom = containerScrollTop + containerHeight >= sectionBottom - threshold;

    // Only snap if we're trying to scroll beyond the current section's boundaries
    const shouldSnapUp = direction < 0 && isAtSectionTop && this.currentSection > 0;
    const shouldSnapDown = direction > 0 && isAtSectionBottom && this.currentSection < (this.sections?.length || 0) - 1;

    if (shouldSnapUp || shouldSnapDown) {
      // Require more significant wheel movement for overflowing content
      const wheelThreshold = hasOverflowingContent ? 50 : 15;
      if (Math.abs(delta) > wheelThreshold) {
        event.preventDefault();
        this.snapToSection(this.currentSection + direction);
      }
    }
    // Otherwise, allow natural scrolling within the section
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
      } else {
        this.container.removeEventListener('touchstart', this.handleTouchStart.bind(this));
        this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
      }
      this.container.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    window.removeEventListener('resize', this.markOverflowingSections.bind(this));

    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }
  }
}