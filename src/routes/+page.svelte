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
  import Seo from '$lib/components/Seo.svelte';
  import schema from '$lib/data/schema.json';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Seo
  title="Thomas Kunnumpurath - VP Systems Engineering & Technical Leader"
  description="Thomas Kunnumpurath is a VP of Systems Engineering at Solace with 15+ years of experience in technical leadership, event-driven architecture, and team scaling."
  path="/"
  jsonld={schema}
/>

<Navigation />
<Hero />
<About />
<ExperienceFromData />
<Skills />
<Portfolio />
<Education />
<Blog posts={data.posts} />
<Contact />
<Footer />
