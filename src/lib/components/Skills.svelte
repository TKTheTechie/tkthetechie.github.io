<script lang="ts">
  import { onMount } from 'svelte';
  
  let skillsRef: HTMLElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    
    if (skillsRef) observer.observe(skillsRef);
    
    return () => observer.disconnect();
  });
  
  const skillCategories = [
    {
      title: 'Leadership & Strategy',
      icon: '👥',
      skills: [
        'Team Scaling',
        'Technical Strategy',
        'Product Management',
        'Public Speaking'
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        'Java',
        'JavaScript',
        'GoLang',
        'Elixir',
        'Rust'
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: '🔧',
      skills: [
        'Spring Framework',
        'Spring Cloud Stream',
        'Spring Boot',
        'AureliaJS',
        'Svelte',
        'VueJS',
        'TailwindCSS'
      ]
    },
    {
      title: 'Cloud Platforms',
      icon: '☁️',
      skills: [
        'AWS',
        'Azure',
        'GCP'
      ]
    },
    {
      title: 'Event Brokers',
      icon: '📡',
      skills: [
        'Solace PubSub+',
        'Apache Kafka',
        'Redpanda',
        'TIBCO EMS',
        'TIBCO RV'
      ]
    },
    {
      title: 'Integration Platforms',
      icon: '🔗',
      skills: [
        'Dell Boomi',
        'MuleSoft'
      ]
    },
    {
      title: 'Analytics Platforms',
      icon: '📊',
      skills: [
        'Snowflake',
        'Databricks'
      ]
    },
    {
      title: 'Architecture & Design',
      icon: '🏗️',
      skills: [
        'Event Driven Architecture',
        'Microservices',
        'Cloud Architecture',
        'System Design'
      ]
    },
    {
      title: 'Business Impact',
      icon: '📈',
      skills: [
        'Customer Engagement',
        'Partnership Development',
        'Technical Evangelism',
        'Solution Architecture'
      ]
    }
  ];
</script>

<section id="skills" bind:this={skillsRef} class="scroll-snap-section py-20 section-light">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Skills & <span class="gradient-text">Expertise</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
          A comprehensive skill set spanning technical leadership, architecture design, 
          and business strategy developed over 15+ years in the industry.
        </p>
      </div>
      
      <!-- Skills Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each skillCategories as category, categoryIndex}
          <div class="glass-effect rounded-2xl p-8 hover-lift card-hover {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: {0.2 * categoryIndex}s;">
            <!-- Category Header -->
            <div class="flex items-center space-x-3 mb-6">
              <span class="text-3xl">{category.icon}</span>
              <h3 class="text-2xl font-bold gradient-text">{category.title}</h3>
            </div>
            
            <!-- Skills List -->
            <div class="space-y-3">
              {#each category.skills as skill, skillIndex}
                <div class="skill-item {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: {0.1 * (categoryIndex * 4 + skillIndex)}s;">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full"></div>
                    <span class="font-medium text-gray-900 dark:text-white">{skill}</span>
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