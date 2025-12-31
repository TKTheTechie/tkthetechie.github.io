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
      duration: 600,
      ...options
    };
    
    // Adjust options for mobile
    if (window.innerWidth <= 768) {
      this.options.duration = 300; // Faster animations on mobile
      this.options.threshold = 0.3; // Less sensitive threshold
    }
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

  private touchStartY = 0;
  private touchEndY = 0;
  private touchStartTime = 0;
  private lastTouchMoveY = 0;
  private touchVelocity = 0;

  private setupEventListeners(): void {
    if (!this.container) return;

    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    if (!isMobile) {
      // Enhanced wheel event handling for desktop
      this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }
    
    // Enhanced touch events for mobile
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
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

  private handleTouchStart(event: TouchEvent): void {
    this.isScrolling = false;
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = Date.now();
    this.lastTouchMoveY = this.touchStartY;
    this.touchVelocity = 0;
  }

  private handleTouchMove(event: TouchEvent): void {
    const currentY = event.touches[0].clientY;
    const currentTime = Date.now();
    const timeDiff = currentTime - this.touchStartTime;
    
    if (timeDiff > 0) {
      this.touchVelocity = (currentY - this.lastTouchMoveY) / timeDiff;
    }
    
    this.lastTouchMoveY = currentY;
  }

  private handleTouchEnd(event: TouchEvent): void {
    this.touchEndY = event.changedTouches[0].clientY;
    
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) return;

    const touchDistance = this.touchEndY - this.touchStartY;
    const touchDuration = Date.now() - this.touchStartTime;
    
    // Only snap on significant gestures
    const isSignificantSwipe = Math.abs(touchDistance) > 100 && touchDuration < 500;
    const isSlowScroll = touchDuration > 500;
    
    // Don't snap on small movements or very fast flicks
    if (Math.abs(touchDistance) < 30) return;
    
    // Wait longer for momentum to settle
    const snapDelay = isSignificantSwipe ? 600 : (isSlowScroll ? 400 : 0);
    
    if (snapDelay > 0) {
      window.setTimeout(() => {
        if (!this.isScrolling) {
          this.detectCurrentSection();
          this.gentleMobileSnap();
        }
      }, snapDelay);
    }
  }

  private gentleMobileSnap(): void {
    if (!this.container || !this.sections) return;

    const containerScrollTop = this.container.scrollTop;
    const currentSectionElement = this.sections[this.currentSection];
    
    if (!currentSectionElement) return;

    const sectionTop = currentSectionElement.offsetTop - this.options.offset;
    const sectionHeight = currentSectionElement.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Calculate position within the current section
    const relativePosition = containerScrollTop - sectionTop;
    const sectionProgress = relativePosition / sectionHeight;
    
    // Only snap if we're very close to section boundaries
    const snapThreshold = 0.1; // 10% of section height
    
    if (sectionProgress < snapThreshold && this.currentSection > 0) {
      // Close to top of section, might want to snap to previous section
      const distanceToSectionTop = Math.abs(containerScrollTop - sectionTop);
      if (distanceToSectionTop < 50) {
        this.snapToSection(this.currentSection);
      }
    } else if (sectionProgress > (1 - snapThreshold) && this.currentSection < this.sections.length - 1) {
      // Close to bottom of section, might want to snap to next section
      const distanceToSectionBottom = Math.abs(containerScrollTop - sectionBottom + this.container.clientHeight);
      if (distanceToSectionBottom < 50) {
        this.snapToSection(this.currentSection + 1);
      }
    }
    // Otherwise, don't snap - let user scroll naturally within the section
  }

  private handleScroll(): void {
    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }

    const isMobile = window.innerWidth <= 768;
    
    // On mobile, only snap after a longer period of inactivity
    const timeout = isMobile ? 800 : 200;

    this.scrollTimeout = window.setTimeout(() => {
      if (!this.isScrolling) {
        this.detectCurrentSection();
        
        // On mobile, only snap if we're close to a section boundary
        if (isMobile) {
          this.gentleMobileSnap();
        }
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

    // Don't snap if we're already very close to the target
    const currentScrollTop = this.container.scrollTop;
    const targetPosition = targetSection.offsetTop - this.options.offset;
    const distance = Math.abs(currentScrollTop - targetPosition);
    
    if (distance < 20) return; // Already close enough

    this.isScrolling = true;
    this.currentSection = targetIndex;

    // Add snap animation class
    targetSection.classList.add('snapping-in');

    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 300 : this.options.duration; // Faster on mobile

    this.container.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    window.setTimeout(() => {
      this.isScrolling = false;
      targetSection.classList.remove('snapping-in');
    }, duration);
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
      this.container.removeEventListener('touchmove', this.handleTouchMove.bind(this));
      this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
      this.container.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }
  }
}