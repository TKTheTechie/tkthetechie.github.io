<script lang="ts">
  import { onMount } from 'svelte';
  
  let skillsRef: HTMLElement;
  let isVisible = false;
  let isDarkMode = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    
    if (skillsRef) observer.observe(skillsRef);
    
    // Check for dark mode
    const checkDarkMode = () => {
      isDarkMode = document.documentElement.classList.contains('dark');
    };
    
    checkDarkMode();
    
    // Watch for dark mode changes
    const darkModeObserver = new MutationObserver(checkDarkMode);
    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
      darkModeObserver.disconnect();
    };
  });
  
  const topSkillSections = [
    {
      title: 'Strategic Leadership & Revenue Growth',
      icon: '👥',
      skills: [
        'Organizational Scaling',
        'Pre-Sales Strategy & Revenue Growth',
        'Partnership Development',
        'Technical Evangelism & Public Speaking'
      ]
    },
    {
      title: 'Systems Architecture & Vision',
      icon: '⚖️',
      skills: [
        'Event-Driven Architecture (EDA)',
        'Cloud-Native & Microservices Design',
        'High-Throughput Streaming Systems',
        'Enterprise Integration Patterns'
      ]
    },
    {
      title: 'Industry Vertical Experience',
      icon: '🏢',
      skills: [
        'Capital Markets',
        'Banking',
        'Airlines',
        'SaaS Providers',
        'Fintech',
        'Retail',
        'Manufacturing'
      ]
    }
  ];

  const bottomSkillSections = [
    {
      title: 'Enterprise Ecosystem',
      icon: '☁️',
      categories: [
        {
          name: 'Cloud:',
          skills: ['AWS', 'Azure', 'GCP', 'OCI', 'Cloudflare']
        },
        {
          name: 'Data:',
          skills: ['Snowflake', 'Databricks']
        },
        {
          name: 'Integration:',
          skills: ['MuleSoft', 'Boomi', 'SAP']
        }
      ]
    },
    {
      title: 'Event Brokers/Messaging',
      icon: '🔄',
      categories: [
        {
          name: '',
          skills: ['Solace PubSub+', 'Apache Kafka', 'Redpanda', 'TIBCO EMS', 'TIBCO RV', 'Informatica UltraMessaging']
        }
      ]
    },
    {
      title: 'Technical Toolkit',
      icon: '💻',
      categories: [
        {
          name: 'Core:',
          skills: ['Java', 'Go (Golang)', 'Rust', 'Node']
        },
        {
          name: 'Web:',
          skills: ['Svelte', 'React', 'TailwindCSS', 'Vue']
        }
      ]
    }
  ];
</script>

<style>
  .skill-tag {
    --skill-text-color: rgb(30 58 138);
  }
  
  :global(.dark) .skill-tag {
    --skill-text-color: white;
    color: white !important;
  }
  
  .category-label {
    color: rgb(31 41 55);
  }
  
  :global(.dark) .category-label {
    color: white !important;
  }
</style>

<section id="skills" bind:this={skillsRef} class="py-20 section-light">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Skills & <span class="gradient-text">Expertise</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-900 dark:text-gray-100 max-w-3xl mx-auto">
          A comprehensive skill set spanning technical leadership, architecture design, 
          and business strategy developed over 15+ years in the industry.
        </p>
      </div>
      
      <!-- Skills Grid -->
      <!-- Top Section - Three Main Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {#each topSkillSections as section, sectionIndex}
          <div class="glass-effect rounded-2xl p-8 hover-lift card-hover {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {0.2 * sectionIndex}s;">
            <!-- Section Header -->
            <div class="flex items-center space-x-3 mb-6">
              <span class="text-3xl">{section.icon}</span>
              <h3 class="text-2xl font-bold gradient-text">{section.title}</h3>
            </div>
            
            <!-- Skills List -->
            <div class="space-y-4">
              {#each section.skills as skill, skillIndex}
                <div class="skill-item {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: {0.1 * (sectionIndex * 4 + skillIndex)}s;">
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="font-medium text-gray-900 dark:text-white leading-relaxed">{skill}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Bottom Section - Three Cards -->
      <div class="grid md:grid-cols-3 gap-8">
        {#each bottomSkillSections as section, sectionIndex}
          <div class="glass-effect rounded-2xl p-8 hover-lift card-hover {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {0.4 + 0.2 * sectionIndex}s;">
            <!-- Section Header -->
            <div class="flex items-center space-x-3 mb-6">
              <span class="text-3xl">{section.icon}</span>
              <h3 class="text-xl font-bold gradient-text">{section.title}</h3>
            </div>
            
            <!-- Categories and Skills -->
            <div class="space-y-4">
              {#each section.categories as category, categoryIndex}
                <div class="skill-category {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: {0.1 * (sectionIndex * 3 + categoryIndex)}s;">
                  {#if category.name}
                    <div class="category-label font-semibold mb-2">{category.name}</div>
                  {/if}
                  <div class="flex flex-wrap gap-2">
                    {#each category.skills as skill}
                      <span class="skill-tag px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-800/40 dark:to-accent-800/40 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-600" style="color: {isDarkMode ? 'white' : 'rgb(30 58 138)'} !important;">
                        {skill}
                      </span>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>