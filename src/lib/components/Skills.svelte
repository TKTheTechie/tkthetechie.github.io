<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import { reveal, tilt } from '$lib/actions/motion';

  /**
   * Line icons instead of emoji: emoji render differently on every OS and
   * pull the whole grid out of the type system.
   */
  const skillCategories = [
    {
      title: 'Leadership & Strategy',
      accent: 'primary',
      icon: 'M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5 5 0 019.28 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      skills: ['Team Scaling', 'Technical Strategy', 'Product Management', 'Public Speaking']
    },
    {
      title: 'Programming Languages',
      accent: 'accent',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      skills: ['Java', 'JavaScript', 'GoLang', 'Elixir', 'Rust']
    },
    {
      title: 'Frameworks & Libraries',
      accent: 'plasma',
      icon: 'M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 17l8 4 8-4',
      skills: ['Spring Framework', 'Spring Cloud Stream', 'Spring Boot', 'AureliaJS', 'Svelte', 'VueJS', 'TailwindCSS']
    },
    {
      title: 'Cloud Platforms',
      accent: 'primary',
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z',
      skills: ['AWS', 'Azure', 'GCP']
    },
    {
      title: 'Event Brokers',
      accent: 'accent',
      icon: 'M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M8.464 15.536a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M13 12a1 1 0 11-2 0 1 1 0 012 0z',
      skills: ['Solace PubSub+', 'Apache Kafka', 'Redpanda', 'TIBCO EMS', 'TIBCO RV']
    },
    {
      title: 'Integration Platforms',
      accent: 'plasma',
      icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
      skills: ['Dell Boomi', 'MuleSoft']
    },
    {
      title: 'Analytics Platforms',
      accent: 'primary',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      skills: ['Snowflake', 'Databricks']
    },
    {
      title: 'Architecture & Design',
      accent: 'accent',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      skills: ['Event Driven Architecture', 'Microservices', 'Cloud Architecture', 'System Design']
    },
    {
      title: 'Business Impact',
      accent: 'plasma',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      skills: ['Customer Engagement', 'Partnership Development', 'Technical Evangelism', 'Solution Architecture']
    }
  ];

  const ACCENTS: Record<string, { from: string; to: string; tint: string; text: string }> = {
    primary: {
      from: 'var(--color-primary-500)',
      to: 'var(--color-primary-300)',
      tint: 'rgb(14 165 233 / .12)',
      text: 'var(--color-primary-500)'
    },
    accent: {
      from: 'var(--color-accent-500)',
      to: 'var(--color-accent-300)',
      tint: 'rgb(16 185 129 / .12)',
      text: 'var(--color-accent-600)'
    },
    plasma: {
      from: 'var(--color-plasma-500)',
      to: 'var(--color-plasma-300)',
      tint: 'rgb(139 92 246 / .12)',
      text: 'var(--color-plasma-500)'
    }
  };
</script>

<section id="skills" class="section-light relative overflow-hidden py-24 md:py-32">
  <div class="aurora" aria-hidden="true">
    <span
      class="h-[34rem] w-[34rem] -top-40 right-0"
      style="background:radial-gradient(circle,var(--color-plasma-500),transparent 62%);opacity:.09;"
    ></span>
    <span
      class="h-[28rem] w-[28rem] bottom-0 -left-24"
      style="background:radial-gradient(circle,var(--color-primary-500),transparent 62%);opacity:.1;animation-delay:-11s;"
    ></span>
  </div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Capabilities"
        subtitle="A skill set spanning technical leadership, architecture design, and business strategy, developed over 15+ years in the industry."
      >
        Skills &amp; <span class="gradient-text">Expertise</span>
      </SectionHeading>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {#each skillCategories as category, i}
          {@const accent = ACCENTS[category.accent]}
          <article
            class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-2xl p-7"
            use:tilt={{ max: 6, lift: 7 }}
            use:reveal={{ delay: 60 + (i % 3) * 80 + Math.floor(i / 3) * 60, y: 28 }}
          >
            <!-- corner index -->
            <span
              class="font-mono absolute top-5 right-6 text-[10px] tabular-nums opacity-40 transition-opacity duration-500 group-hover:opacity-90"
              style="color:var(--text-3);"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <!-- icon tile -->
            <div class="mb-5 flex items-center gap-3.5">
              <span
                class="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-[1.08]"
                style="background-color:{accent.tint};border:1px solid color-mix(in oklab, {accent.from} 28%, transparent);"
              >
                <svg
                  class="h-[19px] w-[19px]"
                  style="color:{accent.text};"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d={category.icon} />
                </svg>
              </span>
              <h3 class="font-display text-[17px] leading-tight font-bold tracking-tight" style="color:var(--text-1);">
                {category.title}
              </h3>
            </div>

            <!-- skills -->
            <ul class="mb-2 flex flex-wrap gap-2">
              {#each category.skills as skill}
                <li
                  class="skill-item font-mono rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium transition-all duration-300"
                  style="background-color:var(--surface-1);color:var(--text-2);border:1px solid var(--hairline);"
                >
                  {skill}
                </li>
              {/each}
            </ul>

            <!-- footer turns the leftover space into information -->
            <div
              class="mt-auto flex items-center justify-between pt-6"
              style="border-top:1px solid var(--hairline);margin-top:auto;padding-top:1.25rem;"
            >
              <span class="font-mono text-[10px] tracking-[0.14em] uppercase" style="color:var(--text-3);">
                {category.skills.length} area{category.skills.length === 1 ? '' : 's'}
              </span>
              <span class="flex gap-1" aria-hidden="true">
                {#each category.skills as _, dot}
                  <span
                    class="h-1 w-1 rounded-full transition-all duration-500"
                    style="background-color:{accent.text};opacity:{0.3 + dot * 0.1};"
                  ></span>
                {/each}
              </span>
            </div>

            <!-- accent underline on hover -->
            <span
              class="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
              style="background-image:linear-gradient(90deg,{accent.from},{accent.to});transition-timing-function:cubic-bezier(.16,1,.3,1);"
            ></span>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* nudge each chip on card hover — a small, cheap sign of life */
  article:hover .skill-item {
    border-color: color-mix(in oklab, var(--color-primary-500) 26%, transparent);
  }
</style>
