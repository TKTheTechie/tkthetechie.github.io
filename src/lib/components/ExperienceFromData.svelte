<script lang="ts">
  import { onMount } from 'svelte';
  import experienceData from '$lib/data/experience.json';
  import FloatingStats from './FloatingStats.svelte';
  
  let experienceRef: HTMLElement;
  let isVisible = false;
  let activeCard = -1;
  let timelineProgress = 0;
  let currentCompanyStats = []; // Start with empty array - no default tiles
  
  // Calculate years at Solace dynamically
  const currentYear = new Date().getFullYear();
  const solaceStartYear = 2018;
  const yearsAtSolace = currentYear - solaceStartYear;
  
  // Company-specific stats that change based on active card
  const companyStats = {
    0: [ // Solace (2018 - Present = dynamically calculated)
      { value: yearsAtSolace.toString(), suffix: '', label: 'Years at Solace' },
      { value: '3', suffix: 'x', label: 'Team Growth' },
      { value: '100', suffix: '+', label: 'Customer Engagements' },
      { value: '10', suffix: '+', label: 'Speaking Events' }
    ],
    1: [ // CapitalOne (2017 - 2018 = 1 year)
      { value: '1', suffix: '', label: 'Year at CapitalOne' },
      { value: '5', suffix: '', label: 'Projects Delivered' },
      { value: '1', suffix: '', label: 'Hackathon Award' },
      { value: '3', suffix: '', label: 'Interns Managed' }
    ],
    2: [ // Deutsche Bank (2008 - 2017 = 9 years)
      { value: '9', suffix: '', label: 'Years at Deutsche Bank' },
      { value: '10', suffix: 'x', label: 'Performance Improvements' },
      { value: '1', suffix: '', label: 'Innovation Award' },
      { value: '5', suffix: 'x', label: 'Stability Improvements' }
    ]
  };
  
  // No default stats - tiles only appear on hover
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Animate timeline progress
          setTimeout(() => {
            timelineProgress = 100;
          }, 500);
        }
      },
      { threshold: 0.1 }
    );
    
    if (experienceRef) observer.observe(experienceRef);
    
    return () => observer.disconnect();
  });
  
  function handleCardHover(index: number) {
    if (activeCard !== index) {
      activeCard = index;
      // Show stats for the hovered card
      setTimeout(() => {
        currentCompanyStats = companyStats[index] || [];
      }, 100);
    }
  }
  
  function handleCardLeave() {
    if (activeCard !== -1) {
      activeCard = -1;
      // Hide stats when no card is active
      setTimeout(() => {
        currentCompanyStats = [];
      }, 100);
    }
  }
</script>

<section id="experience" bind:this={experienceRef} class="py-20 section-dark">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Professional <span class="gradient-text">Experience</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-700 dark:text-gray-100 max-w-3xl mx-auto">
          {experienceData.subtitle}
        </p>
      </div>
      
      <!-- Timeline -->
      <div class="relative overflow-visible">
        <!-- Animated Timeline Line -->
        <div class="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="w-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-600 rounded-full transition-all duration-2000 ease-out"
            style="height: {timelineProgress}%; box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);"
          ></div>
        </div>
        
        {#each experienceData.experiences as exp, i}
          <div 
            class="relative mb-16 pt-4 {isVisible ? 'animate-fade-in' : 'opacity-0'}" 
            style="animation-delay: {0.3 * i}s;"
            on:mouseenter={() => handleCardHover(i)}
            on:mouseleave={handleCardLeave}
          >
            <!-- Enhanced Timeline Dot -->
            <div class="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full border-4 border-white dark:border-gray-900 shadow-xl z-10 transition-all duration-300"
                 class:scale-125={activeCard === i}
                 class:animate-pulse={activeCard === i}
                 style="box-shadow: 0 0 20px rgba(14, 165, 233, {activeCard === i ? '0.8' : '0.3'});">
              <!-- Pulsing Ring -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-600 animate-ping opacity-20"></div>
            </div>
            
            <!-- Content Card with 3D Transform -->
            <div class="ml-20 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}">
              <div class="experience-card-container">
                <!-- Floating Metrics (only for Solace) -->
                {#if activeCard === i && i === 0}
                  <div class="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20 floating-badge">
                    {exp.period.split(' - ')[1] === 'Present' ? 'Current Role' : `${exp.achievements.length} Achievements`}
                  </div>
                {/if}
                
                <div class="experience-card glass-effect rounded-3xl p-8 hover-lift transition-all duration-500 transform-gpu"
                     class:card-active={activeCard === i}
                     style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); backdrop-filter: blur(20px);">
                
                <!-- Header with Enhanced Logo -->
                <div class="mb-10">
                  <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-4 sm:gap-6 mb-6">
                    <div class="logo-container bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-300 transition-all duration-300 hover:scale-105 mx-auto sm:mx-0"
                         class:logo-spotlight={activeCard === i}>
                      <img 
                        src={exp.logo} 
                        alt="{exp.company} logo" 
                        class="w-24 h-16 sm:w-32 sm:h-20 object-contain transition-all duration-300"
                        on:error={(e) => {
                          console.error(`Failed to load logo for ${exp.company}:`, exp.logo);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <!-- Company Badge -->
                    <div class="company-badge flex-1 min-w-0 text-center sm:text-left">
                      <h3 class="text-2xl sm:text-3xl font-extrabold gradient-text mb-2 tracking-tight break-words">{exp.company}</h3>
                      <div class="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mb-3 mx-auto sm:mx-0"></div>
                      <h4 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-snug break-words">{exp.position}</h4>
                    </div>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span class="flex items-center justify-center sm:justify-start gap-2">
                      <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <span class="font-semibold break-words">{exp.location}</span>
                    </span>
                    <span class="flex items-center justify-center sm:justify-start gap-2">
                      <svg class="w-4 h-4 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      <span class="font-semibold break-words">{exp.period}</span>
                    </span>
                  </div>
                </div>
                
                <!-- Enhanced Description -->
                <div class="description-section mb-10">
                  <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base font-medium tracking-wide">
                    {exp.description}
                  </p>
                </div>
                
                <!-- Achievements with Progress Animation -->
                <div class="achievements-section">
                  <h5 class="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 text-lg tracking-wide">
                    <div class="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-600 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="font-extrabold">Key Achievements</span>
                  </h5>
                  <div class="space-y-4">
                    {#each exp.achievements as achievement, achievementIndex}
                      <div class="achievement-item flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                           class:achievement-highlight={activeCard === i}
                           style="animation-delay: {achievementIndex * 0.1}s;">
                        <div class="achievement-icon w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span class="text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-sm tracking-wide">{achievement}</span>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Floating Stats -->
  <FloatingStats stats={currentCompanyStats} {isVisible} />
</section>

<style>
  /* Enhanced Experience Card Styles */
  .experience-card-container {
    position: relative;
    isolation: isolate;
    border-radius: 1.5rem;
    overflow: visible; /* Changed to visible to show badges */
    padding-top: 0.5rem; /* Add padding to accommodate badges */
  }
  
  .experience-card {
    position: relative;
    overflow: hidden; /* Keep overflow hidden on the actual card for glass effect containment */
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin-top: 1rem; /* Add top margin to accommodate floating badges */
    isolation: isolate; /* Create new stacking context */
    border-radius: 1.5rem; /* Ensure proper border radius */
  }
  
  .experience-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.8s ease;
  }
  
  .experience-card:hover::before {
    left: 100%;
  }
  
  .card-active {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(14, 165, 233, 0.2),
      0 0 30px rgba(14, 165, 233, 0.1);
  }
  
  /* Floating Badge */
  .floating-badge {
    animation: floatingBadge 2s ease-in-out infinite;
    transform-origin: center;
    z-index: 20; /* Ensure badge is above everything */
    position: absolute;
  }
  
  @keyframes floatingBadge {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-8px) scale(1.05);
    }
  }
  
  /* Logo Spotlight Effect */
  .logo-container {
    position: relative;
    overflow: hidden;
  }
  
  .logo-spotlight {
    box-shadow: 
      0 0 30px rgba(14, 165, 233, 0.3),
      0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .logo-spotlight::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(14, 165, 233, 0.1), transparent);
    animation: logoRotate 3s linear infinite;
  }
  
  /* Company Badge Animation */
  .company-badge h3 {
    background: linear-gradient(135deg, #0ea5e9, #22c55e, #8b5cf6);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease-in-out infinite;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }
  
  .company-badge h4 {
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  
  /* Achievement Animations */
  .achievement-item {
    transform: translateX(-10px);
    opacity: 0.8;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .achievement-item:hover {
    border-color: rgba(14, 165, 233, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .achievement-item span {
    line-height: 1.6;
    letter-spacing: 0.01em;
  }
  
  .achievement-highlight .achievement-item {
    transform: translateX(0);
    opacity: 1;
    animation: slideInLeft 0.5s ease-out forwards;
  }
  
  .achievement-icon {
    position: relative;
    overflow: hidden;
  }
  
  .achievement-icon::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  
  .achievement-item:hover .achievement-icon::before {
    width: 100%;
    height: 100%;
  }
  
  /* Timeline Enhancements */
  .timeline-progress {
    position: relative;
  }
  
  .timeline-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
    animation: timelinePulse 2s ease-in-out infinite;
  }
  
  /* Keyframe Animations */
  @keyframes logoRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes slideInLeft {
    0% {
      transform: translateX(-20px);
      opacity: 0.5;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes timelinePulse {
    0%, 100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1.5);
    }
  }
  
  /* Enhanced Typography */
  .description-section p {
    line-height: 1.7;
    letter-spacing: 0.01em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .achievements-section h5 {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.01em;
  }
  
  /* Professional spacing and alignment */
  .company-badge {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  /* Enhanced readability */
  .experience-card {
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  }
  @media (max-width: 768px) {
    .experience-card {
      margin-left: 0;
      margin-right: 0;
      padding: 1.5rem;
    }
    
    .logo-container {
      width: 100%;
      max-width: 200px;
    }
    
    .company-badge h3 {
      font-size: 1.5rem !important;
      line-height: 1.2;
      word-break: break-word;
      hyphens: auto;
    }
    
    .company-badge h4 {
      font-size: 1rem !important;
      line-height: 1.3;
      word-break: break-word;
      hyphens: auto;
    }
    
    .description-section p {
      font-size: 0.875rem;
      line-height: 1.6;
    }
    
    .achievements-section h5 {
      font-size: 1rem !important;
    }
    
    .achievement-item span {
      font-size: 0.8125rem;
      line-height: 1.5;
    }
  }
  
  @media (max-width: 480px) {
    .experience-card {
      padding: 1rem;
    }
    
    .company-badge h3 {
      font-size: 1.375rem !important;
    }
    
    .company-badge h4 {
      font-size: 0.9375rem !important;
    }
    
    .logo-container {
      padding: 0.75rem;
    }
    
    .logo-container img {
      width: 5rem !important;
      height: 3rem !important;
    }
  }
  
  /* Dark Mode Enhancements */
  :global(.dark) .experience-card {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  :global(.dark) .card-active {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3));
    border-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(14, 165, 233, 0.3),
      0 0 30px rgba(14, 165, 233, 0.2);
  }
  
  /* Light Mode Enhancements */
  :global(body:not(.dark)) .experience-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    border-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }
  
  :global(body:not(.dark)) .card-active {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    border-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);
  }
  
  :global(body:not(.dark)) .experience-card h5 {
    color: #1f2937 !important; /* Force dark text for headings in light mode */
  }
  
  :global(.dark) .experience-card h5 {
    color: #ffffff !important; /* Force white text for headings in dark mode */
  }
  
  :global(body:not(.dark)) .achievements-section h5,
  :global(body:not(.dark)) .technologies-section h5 {
    color: #111827 !important; /* Even darker for better contrast */
  }
  
  :global(.dark) .achievements-section h5,
  :global(.dark) .technologies-section h5 {
    color: #ffffff !important; /* White text for dark mode */
  }
  
  /* Additional specificity for dark mode headings */
  :global(html.dark) .experience-card .achievements-section h5,
  :global(html.dark) .experience-card .technologies-section h5 {
    color: #ffffff !important;
  }
  
  /* Maximum specificity for dark mode */
  :global(.dark .experience-card .achievements-section h5),
  :global(.dark .experience-card .technologies-section h5) {
    color: #ffffff !important;
  }
  
  :global(body:not(.dark)) .achievement-item {
    background: rgba(0, 0, 0, 0.03);
  }
  
  :global(body:not(.dark)) .achievement-item:hover {
    background: rgba(0, 0, 0, 0.06);
  }
  
  :global(.dark) .tech-badge {
    color: white !important;
  }
  
  :global(body:not(.dark)) .tech-badge {
    color: rgb(30 58 138) !important;
  }
</style>