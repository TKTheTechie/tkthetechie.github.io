<script lang="ts">
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import ExperienceFromData from '$lib/components/ExperienceFromData.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Portfolio from '$lib/components/Portfolio.svelte';
  import Education from '$lib/components/Education.svelte';
  import Blog from '$lib/components/Blog.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { ScrollSnapManager } from '$lib/utils/scrollSnap';
  import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
  import FloatingScrollIndicator from '$lib/components/FloatingScrollIndicator.svelte';

  let scrollSnapManager: ScrollSnapManager;

  onMount(() => {
    // Initialize scroll snap manager for enhanced snapping
    scrollSnapManager = new ScrollSnapManager({
      container: '.scroll-snap-container',
      sections: '.scroll-snap-section',
      threshold: 0.5,
      offset: 80,
      duration: 600
    });

    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      scrollSnapManager.init();
    }, 100);

    // Add keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        const current = scrollSnapManager.getCurrentSection();
        const sections = document.querySelectorAll('.scroll-snap-section');
        if (current < sections.length - 1) {
          const nextSection = sections[current + 1] as HTMLElement;
          scrollSnapManager.scrollToSection(nextSection.id);
        }
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        const current = scrollSnapManager.getCurrentSection();
        if (current > 0) {
          const sections = document.querySelectorAll('.scroll-snap-section');
          const prevSection = sections[current - 1] as HTMLElement;
          scrollSnapManager.scrollToSection(prevSection.id);
        }
      } else if (event.key === 'Home') {
        event.preventDefault();
        scrollSnapManager.scrollToSection('home');
      } else if (event.key === 'End') {
        event.preventDefault();
        scrollSnapManager.scrollToSection('contact');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      scrollSnapManager?.destroy();
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<svelte:head>
  <title>Thomas Kunnumpurath - VP Systems Engineering & Technical Leader</title>
  <meta name="description" content="Thomas Kunnumpurath is a VP of Systems Engineering at Solace with 15+ years of experience in technical leadership, event-driven architecture, and team scaling." />
</svelte:head>

<Navigation />
<ScrollIndicator />
<FloatingScrollIndicator />
<main class="scroll-snap-container">
  <Hero />
  <About />
  <ExperienceFromData />
  <Skills />
  <Portfolio />
  <Education />
  <Blog />
  <Contact />
  <Footer />
</main>
