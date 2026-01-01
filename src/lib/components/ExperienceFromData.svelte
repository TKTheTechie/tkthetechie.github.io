<script lang="ts">
  import { onMount } from 'svelte';
  import experienceData from '$lib/data/experience.json';
  
  let experienceRef: HTMLElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (experienceRef) observer.observe(experienceRef);
    
    return () => observer.disconnect();
  });
</script>

<section id="experience" bind:this={experienceRef} class="scroll-snap-section py-20">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Professional <span class="gradient-text">Experience</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
          {experienceData.subtitle}
        </p>
      </div>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-600"></div>
        
        {#each experienceData.experiences as exp, i}
          <div class="relative mb-12 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {0.2 * i}s;">
            <!-- Timeline Dot -->
            <div class="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
            
            <!-- Content Card -->
            <div class="ml-16 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pr-8' : 'md:ml-auto md:pl-8'}">
              <div class="glass-effect rounded-2xl p-8 hover-lift experience-card card-hover">
                <!-- Header -->
                <div class="mb-6">
                  <div class="flex flex-wrap items-center gap-3 mb-2">
                    <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-300" style="background-color: white !important;">
                      <img 
                        src={exp.logo} 
                        alt="{exp.company} logo" 
                        class="w-40 h-24 object-contain"
                        on:error={(e) => {
                          console.error(`Failed to load logo for ${exp.company}:`, exp.logo);
                          e.target.style.display = 'none';
                        }}
                        on:load={() => console.log(`Successfully loaded logo for ${exp.company}`)}
                      />
                    </div>
                    <span class="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-white rounded-full text-sm font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <h4 class="text-lg font-semibold gradient-text mb-1">{exp.position}</h4>
                  <p class="text-gray-800 dark:text-gray-400">{exp.location}</p>
                </div>
                
                <!-- Description -->
                <p class="text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <!-- Achievements -->
                <div class="mb-6">
                  <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h5>
                  <ul class="space-y-2">
                    {#each exp.achievements as achievement}
                      <li class="flex items-start space-x-2">
                        <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-800 dark:text-gray-300 text-sm">{achievement}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
                
                <!-- Technologies -->
                <div>
                  <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h5>
                  <div class="flex flex-wrap gap-2">
                    {#each exp.technologies as tech}
                      <span class="px-3 py-1 bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-white rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>