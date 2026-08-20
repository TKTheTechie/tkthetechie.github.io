<script lang="ts">
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
</script>

<svelte:head>
  <title>Thomas Kunnumpurath - VP Systems Engineering & Technical Leader</title>
  <meta name="description" content="Thomas Kunnumpurath is a VP of Systems Engineering at Solace with 15+ years of experience in technical leadership, event-driven architecture, and team scaling." />
</svelte:head>

<Navigation />
<Hero />
<About />
<ExperienceFromData />
<Skills />
<Portfolio />
<Education />
<Blog />
<Contact />
<Footer />
