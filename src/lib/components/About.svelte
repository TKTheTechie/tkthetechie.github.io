<script lang="ts">
  import { onMount } from 'svelte';
  
  let aboutRef: HTMLElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    
    if (aboutRef) observer.observe(aboutRef);
    
    return () => observer.disconnect();
  });
  
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '3x', label: 'Team Growth' },
    { number: '10+', label: 'Speaking Events' },
    { number: '100+', label: 'Customer Engagements' }
  ];
</script>

<section id="about" bind:this={aboutRef} class="scroll-snap-section py-20 section-light">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="gradient-text">About</span> Me
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
          A passionate technical leader with a proven track record of scaling teams, 
          driving innovation, and delivering enterprise-grade solutions.
        </p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="{isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.2s;">
          <div class="prose prose-lg max-w-none">
            <p class="text-secondary leading-relaxed mb-6">
              As Vice President of Systems Engineering at Solace, I lead a team of 15 engineers 
              across the Americas, focusing on Event Driven Architecture and cloud-native solutions. 
              My journey spans over 15 years in the financial services and technology sectors.
            </p>
            
            <p class="text-secondary leading-relaxed mb-6">
              I'm passionate about building scalable systems, mentoring engineering talent, and 
              evangelizing modern architectural patterns. My experience ranges from hands-on 
              development to executive-level technical strategy.
            </p>
            
            <div class="flex flex-wrap gap-3 mb-8">
              {#each ['Event Driven Architecture', 'Cloud Solutions', 'Team Leadership', 'Technical Strategy', 'Public Speaking'] as skill}
                <span class="px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-white rounded-full text-sm font-medium">
                  {skill}
                </span>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
          {#each stats as stat, i}
            <div class="text-center p-6 glass-effect rounded-xl hover-lift card-hover" style="animation-delay: {0.1 * i}s;">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div class="text-gray-800 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Education -->
      <div class="mt-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.6s;">
        <div class="glass-effect rounded-2xl p-8 card-hover">
          <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Education</h3>
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Science, Computer Science</h4>
              <p class="text-gray-800 dark:text-gray-100">New Jersey Institute of Technology • 2005 • 4.0 Major GPA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>