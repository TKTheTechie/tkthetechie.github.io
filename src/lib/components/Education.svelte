<script lang="ts">
  import { onMount } from 'svelte';
  
  let educationRef: HTMLElement;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    
    if (educationRef) observer.observe(educationRef);
    
    return () => observer.disconnect();
  });
</script>

<section id="education" bind:this={educationRef} class="scroll-snap-section py-20 section-dark">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Education & <span class="gradient-text">Recognition</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-800 dark:text-white max-w-3xl mx-auto">
          Academic achievements, professional certifications, industry recognition, and community involvement.
        </p>
      </div>
      
      <!-- Education -->
      <div class="mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
        <h3 class="text-2xl font-bold text-center mb-8 gradient-text">Education</h3>
        <div class="glass-effect rounded-xl p-8 hover-lift card-hover max-w-2xl mx-auto">
          <div class="flex items-start space-x-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Bachelor of Science, Computer Science</h4>
              <p class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">4.0 Major GPA</p>
              <p class="text-gray-800 dark:text-gray-100 mb-1">New Jersey Institute Of Technology</p>
              <p class="text-gray-800 dark:text-gray-100 mb-2">Newark, NJ</p>
              <p class="text-gray-800 dark:text-gray-100 font-medium">2005</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.4s;">
        <h3 class="text-2xl font-bold text-center mb-8 gradient-text">Professional Certifications</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">AWS Certified Developer</h4>
                <p class="text-gray-800 dark:text-gray-100 text-sm">2017</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Google Cloud Certified Developer</h4>
                <p class="text-gray-800 dark:text-gray-100 text-sm">2018</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Chartered Financial Analyst Level 1</h4>
                <p class="text-gray-800 dark:text-gray-100 text-sm">2010</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Awards -->
      <div class="mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.6s;">
        <h3 class="text-2xl font-bold text-center mb-8 gradient-text">Awards & Recognition</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="glass-effect rounded-xl p-6 text-center hover-lift card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Solace Simply Stunning Award</h4>
            <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Target Achievement</p>
            <p class="text-gray-800 dark:text-gray-100 text-xs">2022, 2023, 2025</p>
          </div>
          
          <div class="glass-effect rounded-xl p-6 text-center hover-lift card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Solace Individual Contributor Award</h4>
            <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Cloud spending optimization</p>
            <p class="text-gray-800 dark:text-gray-100 text-xs">2019</p>
          </div>
          
          <div class="glass-effect rounded-xl p-6 text-center hover-lift card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">CapitalOne Hackathon Creative Award</h4>
            <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Innovation Winner</p>
            <p class="text-gray-800 dark:text-gray-100 text-xs">2017</p>
          </div>
          
          <div class="glass-effect rounded-xl p-6 text-center hover-lift card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Deutsche Bank My Recognition Award</h4>
            <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Outstanding Performance</p>
            <p class="text-gray-800 dark:text-gray-100 text-xs">2014</p>
          </div>
        </div>
      </div>

      <!-- Corporate Volunteering -->
      <div class="{isVisible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.8s;">
        <h3 class="text-2xl font-bold text-center mb-8 gradient-text">Corporate Volunteering</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Habitat for Humanity</h4>
                <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Career services and food packing initiatives</p>
                <p class="text-gray-800 dark:text-gray-100 text-sm">2006-2018</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">C1 Coders</h4>
                <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Coding lessons to middle schoolers</p>
                <p class="text-gray-800 dark:text-gray-100 text-sm">2017</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6 hover-lift card-hover">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Coding Camp at St. Paul's School</h4>
              <p class="text-gray-800 dark:text-gray-100 text-sm mb-1">Volunteer instructor</p>
              <p class="text-gray-800 dark:text-gray-100 text-sm">2022 - 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>