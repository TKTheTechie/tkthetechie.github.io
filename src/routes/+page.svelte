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
        scrollSnapManager.scrollToSection('footer');
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
  <!-- Primary Meta Tags -->
  <title>Thomas Kunnumpurath - VP Systems Engineering & Technical Leader | Event Driven Architecture Expert</title>
  <meta name="title" content="Thomas Kunnumpurath - VP Systems Engineering & Technical Leader | Event Driven Architecture Expert" />
  <meta name="description" content="Thomas Kunnumpurath is VP of Systems Engineering at Solace with 15+ years experience in technical leadership, event-driven architecture, cloud solutions, and scaling engineering teams. Open source contributor and public speaker." />
  <meta name="keywords" content="Thomas Kunnumpurath, Systems Engineering, Event Driven Architecture, Solace, Technical Leadership, Cloud Solutions, Open Source, GraphQL, DAPR, Microservices, AWS, Public Speaking, Software Engineering" />
  <meta name="author" content="Thomas Kunnumpurath" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://tkthetechie.io/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tkthetechie.io/" />
  <meta property="og:title" content="Thomas Kunnumpurath - VP Systems Engineering & Technical Leader" />
  <meta property="og:description" content="VP of Systems Engineering at Solace with 15+ years experience in technical leadership, event-driven architecture, and scaling engineering teams. Open source contributor and public speaker." />
  <meta property="og:image" content="https://tkthetechie.io/profile-pic.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="TKTheTechie" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://tkthetechie.io/" />
  <meta property="twitter:title" content="Thomas Kunnumpurath - VP Systems Engineering & Technical Leader" />
  <meta property="twitter:description" content="VP of Systems Engineering at Solace with 15+ years experience in technical leadership, event-driven architecture, and scaling engineering teams." />
  <meta property="twitter:image" content="https://tkthetechie.io/profile-pic.png" />
  <meta property="twitter:creator" content="@TKTheTechie" />

  <!-- Additional SEO Meta Tags -->
  <meta name="theme-color" content="#0ea5e9" />
  <meta name="msapplication-TileColor" content="#0ea5e9" />
  <meta name="application-name" content="TKTheTechie" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="TKTheTechie" />
  
  <!-- Performance Hints -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//fonts.gstatic.com" />
  
  <!-- Security Headers -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
  
  <!-- Structured Data - Person Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Thomas Kunnumpurath",
      "alternateName": "TKTheTechie",
      "url": "https://tkthetechie.io",
      "image": "https://tkthetechie.io/profile-pic.png",
      "sameAs": [
        "https://www.linkedin.com/in/thomas-kunnumpurath/",
        "https://github.com/TKTheTechie",
        "https://twitter.com/TKTheTechie"
      ],
      "jobTitle": "Vice President of Systems Engineering",
      "worksFor": {
        "@type": "Organization",
        "name": "Solace"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "New Jersey Institute of Technology"
      },
      "knowsAbout": [
        "Event Driven Architecture",
        "Systems Engineering",
        "Technical Leadership",
        "Cloud Solutions",
        "Microservices",
        "Open Source Development",
        "Public Speaking"
      ],
      "description": "VP of Systems Engineering at Solace with 15+ years experience in technical leadership, event-driven architecture, and scaling engineering teams."
    }
  </script>

  <!-- Structured Data - Professional Service Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Thomas Kunnumpurath - Technical Leadership & Consulting",
      "url": "https://tkthetechie.io",
      "description": "Technical leadership, systems engineering, and event-driven architecture expertise",
      "provider": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath"
      },
      "areaServed": "Global",
      "serviceType": [
        "Technical Leadership",
        "Systems Engineering",
        "Event Driven Architecture",
        "Public Speaking",
        "Technical Consulting"
      ]
    }
  </script>

  <!-- Structured Data - Website Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TKTheTechie - Thomas Kunnumpurath",
      "url": "https://tkthetechie.io",
      "description": "Personal website and portfolio of Thomas Kunnumpurath, VP of Systems Engineering at Solace",
      "author": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://tkthetechie.io/blog?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  </script>

  <!-- Structured Data - Organization Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://tkthetechie.io/#organization",
      "name": "TKTheTechie",
      "url": "https://tkthetechie.io",
      "logo": "https://tkthetechie.io/profile-pic.png",
      "founder": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath"
      },
      "sameAs": [
        "https://www.linkedin.com/in/thomas-kunnumpurath/",
        "https://github.com/TKTheTechie",
        "https://twitter.com/TKTheTechie"
      ]
    }
  </script>
</svelte:head>

<Navigation />
<ScrollIndicator />
<FloatingScrollIndicator />
<main class="scroll-snap-container" role="main" aria-label="Main content">
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
