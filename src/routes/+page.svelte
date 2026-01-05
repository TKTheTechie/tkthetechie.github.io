<script lang="ts">
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import ExperienceFromData from '$lib/components/ExperienceFromData.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Portfolio from '$lib/components/Portfolio.svelte';
  import Credentials from '$lib/components/Credentials.svelte';
  import Blog from '$lib/components/Blog.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FloatingScrollIndicator from '$lib/components/FloatingScrollIndicator.svelte';
  import ScrollRevealAnimation from '$lib/components/ScrollRevealAnimation.svelte';
  import MicroInteractions from '$lib/components/MicroInteractions.svelte';
  import PerformanceOptimizer from '$lib/components/PerformanceOptimizer.svelte';
  import ImmersiveLoader from '$lib/components/ImmersiveLoader.svelte';

  onMount(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical animations
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    document.head.appendChild(link);
  });
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Thomas Kunnumpurath - Pre Sales Engineering Leader & Solutions Architect | Financial Services & SMB Expert</title>
  <meta name="title" content="Thomas Kunnumpurath - Pre Sales Engineering Leader & Solutions Architect | Financial Services & SMB Expert" />
  <meta name="description" content="VP of Systems Engineering & Pre Sales Leader with 15+ years scaling technical teams and driving revenue. Expert Solutions Architect for SMBs and Engineering Leader for Financial Institutions. Specializes in event-driven architecture, cloud solutions, and technical sales leadership." />
  <meta name="keywords" content="Pre Sales Engineering Leader, Solutions Architect SMB, Engineering Leader Financial Services, Technical Sales Manager, Systems Engineering VP, Pre Sales Director, Solutions Engineering Manager, Financial Technology Leader, Banking Technology Executive, Enterprise Architecture SMB, Cloud Solutions Architect, Revenue Engineering, Technical Leadership, Team Scaling, Event Driven Architecture, Microservices Expert, AWS Solutions, Financial Services Technology, Capital Markets Technology, Trading Systems Architecture" />
  <meta name="author" content="Thomas Kunnumpurath" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://tkthetechie.io/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tkthetechie.io/" />
  <meta property="og:title" content="Thomas Kunnumpurath - Pre Sales Engineering Leader & Solutions Architect" />
  <meta property="og:description" content="VP of Systems Engineering & Pre Sales Leader with 15+ years scaling technical teams and driving revenue. Expert Solutions Architect for SMBs and Engineering Leader for Financial Institutions." />
  <meta property="og:image" content="https://tkthetechie.io/profile-pic.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="TKTheTechie" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://tkthetechie.io/" />
  <meta property="twitter:title" content="Thomas Kunnumpurath - Pre Sales Engineering Leader & Solutions Architect" />
  <meta property="twitter:description" content="VP of Systems Engineering & Pre Sales Leader with 15+ years scaling technical teams and driving revenue. Expert Solutions Architect for SMBs and Financial Institutions." />
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
      "jobTitle": [
        "Vice President of Systems Engineering",
        "Pre Sales Engineering Leader", 
        "Solutions Architect",
        "Technical Sales Leader"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Solace"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "New Jersey Institute of Technology"
      },
      "knowsAbout": [
        "Pre Sales Engineering",
        "Solutions Architecture",
        "Financial Services Technology",
        "Event Driven Architecture",
        "Systems Engineering",
        "Technical Leadership",
        "Cloud Solutions",
        "Microservices",
        "Capital Markets Technology",
        "Banking Technology",
        "Enterprise Architecture",
        "Team Scaling",
        "Revenue Engineering",
        "Technical Sales",
        "SMB Solutions",
        "Open Source Development",
        "Public Speaking"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Pre Sales Engineering Leader",
        "occupationLocation": {
          "@type": "Country",
          "name": "United States"
        },
        "skills": [
          "Pre Sales Engineering",
          "Solutions Architecture", 
          "Technical Sales Leadership",
          "Financial Services Technology",
          "SMB Solutions",
          "Enterprise Architecture",
          "Team Management",
          "Revenue Growth"
        ]
      },
      "description": "VP of Systems Engineering & Pre Sales Leader with 15+ years scaling technical teams and driving revenue. Expert Solutions Architect for SMBs and Engineering Leader for Financial Institutions specializing in event-driven architecture and cloud solutions."
    }
  </script>

  <!-- Structured Data - Professional Service Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Thomas Kunnumpurath - Pre Sales Engineering & Solutions Architecture",
      "url": "https://tkthetechie.io",
      "description": "Pre Sales Engineering leadership, Solutions Architecture for SMBs, and Engineering Leadership for Financial Institutions. Expert in event-driven architecture, technical sales, and team scaling.",
      "provider": {
        "@type": "Person",
        "name": "Thomas Kunnumpurath"
      },
      "areaServed": [
        "United States",
        "North America", 
        "Global"
      ],
      "serviceType": [
        "Pre Sales Engineering Leadership",
        "Solutions Architecture",
        "Technical Sales Leadership", 
        "Systems Engineering",
        "Financial Services Technology Consulting",
        "SMB Enterprise Architecture",
        "Event Driven Architecture",
        "Team Scaling & Management",
        "Revenue Engineering",
        "Public Speaking",
        "Technical Consulting"
      ],
      "audience": [
        {
          "@type": "Audience",
          "audienceType": "Small to Medium Businesses",
          "name": "SMB Technology Leaders"
        },
        {
          "@type": "Audience", 
          "audienceType": "Financial Institutions",
          "name": "Banking & Capital Markets"
        },
        {
          "@type": "Audience",
          "audienceType": "Technology Companies", 
          "name": "Pre Sales & Solutions Teams"
        }
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

  <!-- Additional Structured Data - Job Posting Schema for Target Roles -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Thomas Kunnumpurath",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Pre Sales Engineering Leadership",
          "description": "15+ years leading pre-sales engineering teams and driving technical revenue growth"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "Solutions Architecture for SMBs",
          "description": "Expert in designing scalable enterprise solutions for small to medium businesses"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Financial Services Technology Leadership", 
          "description": "9+ years engineering mission-critical systems for global financial institutions including Deutsche Bank and Capital One"
        }
      ],
      "seeks": {
        "@type": "Demand",
        "name": "Pre Sales Engineering & Solutions Architecture Opportunities",
        "description": "Seeking leadership roles in Pre Sales Engineering, Solutions Architecture for SMBs, or Engineering Leadership in Financial Services"
      }
    }
  </script>

  <!-- Structured Data - FAQ Schema for Common Searches -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What experience does Thomas Kunnumpurath have in Pre Sales Engineering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Thomas has 15+ years of experience leading pre-sales engineering teams, scaling organizations 3x, and driving technical revenue growth. As VP of Systems Engineering at Solace, he leads a team of 15 engineers across the Americas and has opened high-value verticals including Airlines, Manufacturing, and SaaS."
          }
        },
        {
          "@type": "Question", 
          "name": "How does Thomas help small to medium businesses with Solutions Architecture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Thomas specializes in designing scalable, event-driven architectures for SMBs. He has experience with cloud-native solutions, microservices, and modern integration patterns that help growing companies build robust technical foundations without over-engineering."
          }
        },
        {
          "@type": "Question",
          "name": "What Financial Services experience does Thomas have?", 
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Thomas spent 9+ years at Deutsche Bank as VP Lead Messaging Middleware Specialist and at Capital One as Software Development Manager, engineering mission-critical real-time trading systems, payment processing, and risk management platforms for global financial institutions."
          }
        }
      ]
    }
  </script>
</svelte:head>

<!-- Immersive Loading Experience -->
<ImmersiveLoader />

<!-- Micro-interactions Enhancement -->
<MicroInteractions />

<!-- Performance Optimization -->
<PerformanceOptimizer />

<Navigation />
<FloatingScrollIndicator />
<main role="main" aria-label="Main content">
  <ScrollRevealAnimation direction="fade" duration={1.2}>
    <Hero />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="up" delay={0.2} cascade={true}>
    <About />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="left" delay={0.1}>
    <ExperienceFromData />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="right" delay={0.1}>
    <Skills />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="up" delay={0.2} cascade={true}>
    <Portfolio />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="fade" delay={0.1}>
    <Credentials />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="up" delay={0.2}>
    <Blog />
  </ScrollRevealAnimation>
  
  <ScrollRevealAnimation direction="fade" delay={0.1}>
    <Contact />
  </ScrollRevealAnimation>
  
  <Footer />
</main>
