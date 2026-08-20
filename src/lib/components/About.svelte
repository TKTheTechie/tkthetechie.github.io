<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import Marquee from './Marquee.svelte';
  import { reveal, tilt, countTo, parallax } from '$lib/actions/motion';

  const stats = [
    { value: 15, suffix: '+', label: 'Years Experience', detail: 'Financial services & infrastructure' },
    { value: 3, suffix: 'x', label: 'Team Growth', detail: 'Scaled the Americas SE org' },
    { value: 10, suffix: '+', label: 'Speaking Events', detail: 're:Invent, EDA Summit, podcasts' },
    { value: 100, suffix: '+', label: 'Customer Engagements', detail: 'Architecture to executive' }
  ];

  const focus = [
    'Event Driven Architecture',
    'Cloud Solutions',
    'Team Leadership',
    'Technical Strategy',
    'Public Speaking'
  ];

  const stack = [
    'Solace PubSub+', 'Apache Kafka', 'Redpanda', 'AWS', 'Azure', 'GCP',
    'Java', 'GoLang', 'Elixir', 'Rust', 'Svelte', 'Spring Boot',
    'Snowflake', 'Databricks', 'MuleSoft', 'Dell Boomi', 'TIBCO EMS'
  ];
</script>

<section id="about" class="section-light relative overflow-hidden py-24 md:py-32">
  <!-- soft field, drifting behind the content -->
  <div class="aurora" aria-hidden="true">
    <span
      class="h-[30rem] w-[30rem] -top-32 -left-24"
      style="background:radial-gradient(circle,var(--color-primary-500),transparent 62%);opacity:.12;"
    ></span>
    <span
      class="h-[26rem] w-[26rem] -right-24 bottom-0"
      style="background:radial-gradient(circle,var(--color-accent-500),transparent 62%);opacity:.1;animation-delay:-14s;"
    ></span>
  </div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="About"
        subtitle="A technical leader with a proven track record of scaling teams, driving innovation, and delivering enterprise-grade solutions."
      >
        Engineering leadership,<br class="hidden sm:block" />
        <span class="gradient-text">still hands on keys</span>
      </SectionHeading>

      <div class="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <!-- ---------------- narrative ---------------- -->
        <div>
          <p class="mb-6 text-lg leading-[1.75]" style="color:var(--text-2);" use:reveal={{ delay: 60 }}>
            As <strong style="color:var(--text-1);">Vice President of Systems Engineering at Solace</strong>,
            I lead a team of 15 engineers across the Americas, focusing on Event Driven
            Architecture and cloud-native solutions. My journey spans over 15 years in the
            financial services and technology sectors.
          </p>

          <p class="mb-8 text-lg leading-[1.75]" style="color:var(--text-2);" use:reveal={{ delay: 130 }}>
            I'm passionate about building scalable systems, mentoring engineering talent, and
            evangelising modern architectural patterns — from hands-on development through to
            executive-level technical strategy.
          </p>

          <div class="mb-10 flex flex-wrap gap-2.5" use:reveal={{ delay: 200 }}>
            {#each focus as item}
              <span class="chip">{item}</span>
            {/each}
          </div>

        </div>

        <!-- ---------------- stats ---------------- -->
        <div class="grid grid-cols-2 gap-4 sm:gap-5" use:parallax={0.05}>
          {#each stats as stat, i}
            <div
              class="glass-effect spotlight group relative overflow-hidden rounded-2xl p-6"
              use:tilt={{ max: 8, lift: 6 }}
              use:reveal={{ delay: 120 + i * 90, y: 30 }}
            >
              <!-- index watermark -->
              <span
                class="font-mono absolute top-3 right-4 text-[10px] opacity-40"
                style="color:var(--text-3);"
              >0{i + 1}</span>

              <div
                class="font-display mb-1 text-[2.6rem] leading-none font-extrabold tracking-tight"
                style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));-webkit-background-clip:text;background-clip:text;color:transparent;"
                use:countTo={{ value: stat.value, suffix: stat.suffix, duration: 1500 + i * 160 }}
              >
                {stat.value}{stat.suffix}
              </div>

              <div class="font-display text-sm font-semibold" style="color:var(--text-1);">
                {stat.label}
              </div>
              <div class="mt-1.5 text-xs leading-snug" style="color:var(--text-3);">
                {stat.detail}
              </div>

              <!-- hover underline -->
              <span
                class="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style="background-image:linear-gradient(90deg,var(--color-primary-500),var(--color-accent-500));transition-timing-function:cubic-bezier(.16,1,.3,1);"
              ></span>
            </div>
          {/each}
        </div>
      </div>

      <!-- ---------------- currently, as a full-width strip ---------------- -->
      <div class="mt-12">
        <!-- factual "currently" card -->
        <div class="glass-effect relative overflow-hidden rounded-2xl p-7" use:reveal={{ delay: 120 }}>
          <span
            class="absolute top-0 left-0 h-full w-[3px]"
            style="background-image:linear-gradient(to bottom,var(--color-primary-500),var(--color-accent-500));"
          ></span>

          <p class="eyebrow mb-5">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-pulse-ring absolute inline-flex h-full w-full rounded-full" style="background-color:var(--color-accent-500);"></span>
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full" style="background-color:var(--color-accent-500);"></span>
            </span>
            Currently
          </p>

          <dl class="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {#each [{ k: 'Role', v: 'VP, Systems Engineering' }, { k: 'Company', v: 'Solace · since 2018' }, { k: 'Team', v: '15 engineers, Americas' }, { k: 'Focus', v: 'Event mesh & cloud-native' }] as row}
              <div>
                <dt class="font-mono text-[10px] tracking-[0.16em] uppercase" style="color:var(--text-3);">
                {row.k}
                </dt>
                <dd class="font-display mt-1 text-[15px] font-semibold" style="color:var(--text-1);">
                {row.v}
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      </div>

      <!-- ---------------- the stack, on a loop ---------------- -->
      <div class="mt-20 text-center" use:reveal={{ delay: 80 }}>
        <p class="eyebrow mb-5">
          <span class="h-px w-6" style="background-image:linear-gradient(90deg,transparent,currentColor);"></span>
          Day to day
          <span class="h-px w-6" style="background-image:linear-gradient(90deg,currentColor,transparent);"></span>
        </p>
        <Marquee items={stack} duration={52} />
      </div>
    </div>
  </div>
</section>
