<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import { reveal, tilt } from '$lib/actions/motion';

  const ICONS = {
    cap: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    badge: 'M9 12l2 2 4-4m-2.5-7.303a3.42 3.42 0 00-3 0 3.42 3.42 0 01-1.946.806 3.42 3.42 0 00-3.138 3.138 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 000 3.826 3.42 3.42 0 01.806 1.946 3.42 3.42 0 003.138 3.138 3.42 3.42 0 011.946.806 3.42 3.42 0 003.826 0 3.42 3.42 0 011.946-.806 3.42 3.42 0 003.138-3.138 3.42 3.42 0 01.806-1.946 3.42 3.42 0 000-3.826 3.42 3.42 0 01-.806-1.946 3.42 3.42 0 00-3.138-3.138 3.42 3.42 0 01-1.946-.806z',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 9.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    bulb: 'M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    coin: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
    heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13'
  };

  const certifications = [
    { name: 'AWS Certified Developer', year: '2017', icon: ICONS.badge, from: '#f97316', to: '#ea580c' },
    { name: 'Google Cloud Certified Developer', year: '2018', icon: ICONS.badge, from: '#38bdf8', to: '#0284c7' },
    { name: 'Chartered Financial Analyst Level 1', year: '2010', icon: ICONS.coin, from: '#34d399', to: '#059669' }
  ];

  const awards = [
    { name: 'Solace Simply Stunning Award', detail: 'Quota achievement', year: '2022, 2023', icon: ICONS.star, from: '#fbbf24', to: '#d97706' },
    { name: 'Solace Individual Contributor Award', detail: 'Cloud spending optimisation', year: '2019', icon: ICONS.user, from: '#38bdf8', to: '#10b981' },
    { name: 'CapitalOne Hackathon Creative Award', detail: 'Innovation winner', year: '2017', icon: ICONS.bulb, from: '#a78bfa', to: '#7c3aed' },
    { name: 'Deutsche Bank My Recognition Award', detail: 'Outstanding performance', year: '2014', icon: ICONS.coin, from: '#38bdf8', to: '#0369a1' }
  ];

  const volunteering = [
    { name: 'Habitat for Humanity', detail: 'Career services and food packing initiatives', year: '2006 – 2018', icon: ICONS.heart, from: '#34d399', to: '#059669' },
    { name: 'C1 Coders', detail: 'Coding lessons to middle schoolers', year: '2017', icon: ICONS.code, from: '#38bdf8', to: '#0284c7' },
    { name: "Coding Camp at St. Paul's School", detail: 'Volunteer instructor', year: '2022 – 2023', icon: ICONS.book, from: '#a78bfa', to: '#7c3aed' }
  ];
</script>

<section id="education" class="section-light relative overflow-hidden py-24 md:py-32">
  <div class="aurora" aria-hidden="true">
    <span
      class="h-[30rem] w-[30rem] -top-32 left-1/3"
      style="background:radial-gradient(circle,var(--color-accent-500),transparent 62%);opacity:.1;"
    ></span>
  </div>

  <div class="container-max section-padding relative">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Credentials"
        subtitle="Academic achievements, professional certifications, industry recognition, and community involvement."
      >
        Education &amp; <span class="gradient-text">Recognition</span>
      </SectionHeading>

      <!-- ---------------- degree, given hero treatment ---------------- -->
      <div
        class="glass-effect spotlight relative mb-16 overflow-hidden rounded-3xl p-8 md:p-10"
        use:tilt={{ max: 3, lift: 5, scale: 1.005 }}
        use:reveal={{ y: 26 }}
      >
        <!-- oversized watermark year -->
        <span
          class="font-display pointer-events-none absolute -top-6 right-4 text-[7rem] leading-none font-extrabold opacity-[0.05] select-none md:text-[9rem]"
          style="color:var(--text-1);"
          aria-hidden="true"
        >2005</span>

        <div class="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <span
            class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl"
            style="background-image:linear-gradient(135deg,var(--color-primary-500),var(--color-accent-500));box-shadow:0 12px 30px -12px rgba(14,165,233,.7);"
          >
            <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d={ICONS.cap} />
            </svg>
          </span>

          <div class="min-w-0">
            <p class="eyebrow mb-2.5">Degree</p>
            <h3 class="font-display text-2xl font-bold tracking-tight md:text-[1.75rem]" style="color:var(--text-1);">
              Bachelor of Science, Computer Science
            </h3>
            <p class="font-display mt-2 text-[15px] font-semibold" style="color:var(--text-2);">
              New Jersey Institute of Technology · Newark, NJ
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-2.5">
              <span
                class="font-mono rounded-full px-3 py-1.5 text-[11px] font-semibold"
                style="background-image:linear-gradient(120deg,rgb(14 165 233 / .16),rgb(16 185 129 / .16));color:var(--color-primary-600);border:1px solid rgb(14 165 233 / .28);"
              >
                4.0 major GPA
              </span>
              <span class="chip">Class of 2005</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------- three credential groups ---------------- -->
      {#each [{ title: 'Professional Certifications', items: certifications, cols: 'md:grid-cols-3' }, { title: 'Awards & Recognition', items: awards, cols: 'md:grid-cols-2 lg:grid-cols-4' }, { title: 'Corporate Volunteering', items: volunteering, cols: 'md:grid-cols-3' }] as group, groupIndex}
        <div class="mb-14 last:mb-0">
          <h3 class="font-display mb-6 text-center text-lg font-bold tracking-tight" use:reveal={{ y: 14 }}>
            <span class="gradient-text">{group.title}</span>
          </h3>

          <div class="grid gap-4 {group.cols}">
            {#each group.items as item, i}
              <article
                class="glass-effect spotlight group relative flex flex-col overflow-hidden rounded-2xl p-6"
                use:tilt={{ max: 7, lift: 6 }}
                use:reveal={{ delay: 60 + i * 80, y: 24 }}
              >
                <span
                  class="mb-4 grid h-11 w-11 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                  style="background-image:linear-gradient(135deg,{item.from},{item.to});box-shadow:0 10px 24px -12px {item.from};"
                >
                  <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                  </svg>
                </span>

                <h4 class="font-display mb-1.5 text-[15px] leading-snug font-bold" style="color:var(--text-1);">
                  {item.name}
                </h4>

                {#if 'detail' in item && item.detail}
                  <p class="mb-3 text-[13px] leading-relaxed" style="color:var(--text-2);">{item.detail}</p>
                {/if}

                <span
                  class="font-mono mt-auto pt-3 text-[11px] tracking-wide"
                  style="color:var(--text-3);border-top:1px solid var(--hairline);"
                >
                  {item.year}
                </span>

                <span
                  class="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  style="background-image:linear-gradient(90deg,{item.from},{item.to});transition-timing-function:cubic-bezier(.16,1,.3,1);"
                ></span>
              </article>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
