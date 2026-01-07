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
    { number: '15+', label: 'Years of Tech Leadership' },
    { number: '3x', label: 'Org Scaling' },
    { number: '10+', label: 'Conference Speaking & Thought Leadership Events' },
    { number: '100+', label: 'Customer Engagements' }
  ];
</script>

<section id="about" bind:this={aboutRef} class="py-20 section-light">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="gradient-text">About</span> Me
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-black dark:text-gray-100 max-w-3xl mx-auto">
          Engineering Executive bridging technical strategy and business growth by 
          scaling high-performance teams, modernizing enterprise architecture, 
          and driving revenue through technical innovation.
        </p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="{isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.2s;">
          <div class="prose prose-lg max-w-none">
            <p class="text-black dark:text-gray-100 leading-relaxed mb-6">
              As Vice President of Systems Engineering at Solace, I lead a team of 15 engineers 
              across the Americas, focusing on Event Driven Architecture and cloud-native solutions. 
              My journey spans over 15 years engineering mission-critical systems for global financial 
              institutions and high-growth tech firms, with deep expertise across capital markets, 
              banking, airlines, SaaS providers, fintech, retail, and manufacturing.
            </p>
            
            <p class="text-black dark:text-gray-100 leading-relaxed mb-6">
              I'm passionate about building scalable systems, mentoring engineering talent, and 
              evangelizing modern architectural patterns. My experience ranges from hands-on 
              development to executive-level technical strategy.
            </p>
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-6 {isVisible ? 'animate-fade-in' : 'opacity-0'}" style="animation-delay: 0.4s;">
          {#each stats as stat, i}
            <div class="text-center p-6 glass-effect rounded-xl hover-lift card-hover" style="animation-delay: {0.1 * i}s;">
              <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div class="text-black dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Leadership Philosophy -->
      <div class="mt-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.6s;">
        <div class="glass-effect leadership-quote rounded-2xl p-8 card-hover relative overflow-hidden">
          <!-- Decorative Quote Icon -->
          <div class="absolute top-4 right-4 opacity-10">
            <svg class="w-16 h-16 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-2xl font-bold mb-6 gradient-text">Leadership Philosophy</h3>
            
            <!-- Quote Content -->
            <blockquote class="relative">
              <div class="absolute -left-2 -top-2 text-4xl text-primary-500 opacity-30 font-serif quote-mark">"</div>
              <p class="text-lg text-black dark:text-white leading-relaxed italic pl-6 pr-4" style="color: inherit;">
                I believe in Servant Leadership backed by Engineering Excellence. My goal is to build psychological safety that empowers teams to take technical risks, while implementing the rigorous architectural standards required for enterprise scale.
              </p>
              <div class="absolute -right-2 -bottom-2 text-4xl text-primary-500 opacity-30 font-serif quote-mark">"</div>
            </blockquote>
            
            <!-- Attribution -->
            <div class="mt-6 flex items-center justify-end attribution">
              <div class="flex items-center space-x-3">
                <div class="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                <div class="text-right">
                  <div class="font-semibold text-black dark:text-white">Thomas Kunnumpurath</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">VP Systems Engineering</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Subtle Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-accent-500/10"></div>
            <div class="absolute top-4 left-4 w-8 h-8 border border-primary-500/20 rounded-full decorative-circle"></div>
            <div class="absolute bottom-8 right-8 w-12 h-12 border border-accent-500/20 rounded-full decorative-circle"></div>
            <div class="absolute top-1/2 left-8 w-6 h-6 border border-primary-500/20 rounded-full decorative-circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<style>
  /* About section text colors - only target elements that exist */
  :root:not(.dark) #about p,
  :root:not(.dark) #about div:not(.gradient-text),
  :root:not(.dark) #about h3:not(.gradient-text) {
    color: black !important;
  }
  
  .dark #about p,
  .dark #about div:not(.gradient-text),
  .dark #about h3:not(.gradient-text) {
    color: white !important;
  }
</style>