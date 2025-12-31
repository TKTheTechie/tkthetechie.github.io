<script>
  export let title;
  export let subtitle;
</script>

<section id="experience" class="py-20">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-slide-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Professional <span class="gradient-text">Experience</span>
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      <!-- Markdown Content -->
      <div class="experience-content">
        <slot />
      </div>
    </div>
  </div>
</section>

<style>
  :global(.experience-content) {
    position: relative;
  }
  
  /* Timeline line */
  :global(.experience-content::before) {
    content: '';
    position: absolute;
    left: 2rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgb(14, 165, 233), rgb(217, 70, 239));
  }
  
  @media (min-width: 768px) {
    :global(.experience-content::before) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  /* Company sections */
  :global(.experience-content h2) {
    @apply text-2xl font-bold text-gray-900 dark:text-white mb-2;
    position: relative;
    margin-left: 4rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 768px) {
    :global(.experience-content h2) {
      margin-left: 0;
      width: calc(50% - 2rem);
    }
    
    :global(.experience-content h2:nth-of-type(odd)) {
      margin-right: auto;
      padding-right: 2rem;
    }
    
    :global(.experience-content h2:nth-of-type(even)) {
      margin-left: auto;
      padding-left: 2rem;
    }
  }
  
  /* Timeline dots */
  :global(.experience-content h2::before) {
    content: '';
    position: absolute;
    left: -3.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: linear-gradient(to right, rgb(14, 165, 233), rgb(217, 70, 239));
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark .experience-content h2::before) {
    border-color: rgb(15, 23, 42);
  }
  
  @media (min-width: 768px) {
    :global(.experience-content h2::before) {
      left: calc(50% - 0.5rem);
      transform: translateX(-50%);
    }
  }
  
  /* Job title and location */
  :global(.experience-content p:has(strong)) {
    @apply text-lg font-semibold gradient-text mb-1;
    margin-left: 4rem;
  }
  
  :global(.experience-content p:has(em)) {
    @apply text-gray-500 dark:text-gray-400 mb-4;
    margin-left: 4rem;
  }
  
  @media (min-width: 768px) {
    :global(.experience-content p:has(strong)),
    :global(.experience-content p:has(em)) {
      margin-left: 0;
      width: calc(50% - 2rem);
    }
    
    :global(.experience-content h2:nth-of-type(odd) + p),
    :global(.experience-content h2:nth-of-type(odd) + p + p) {
      margin-right: auto;
      padding-right: 2rem;
    }
    
    :global(.experience-content h2:nth-of-type(even) + p),
    :global(.experience-content h2:nth-of-type(even) + p + p) {
      margin-left: auto;
      padding-left: 2rem;
    }
  }
  
  /* Description paragraphs */
  :global(.experience-content > p:not(:has(strong)):not(:has(em))) {
    @apply text-gray-600 dark:text-gray-300 mb-6 leading-relaxed;
    margin-left: 4rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
  }
  
  :global(.dark .experience-content > p:not(:has(strong)):not(:has(em))) {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  @media (min-width: 768px) {
    :global(.experience-content > p:not(:has(strong)):not(:has(em))) {
      margin-left: 0;
      width: calc(50% - 2rem);
    }
  }
  
  /* Achievements */
  :global(.experience-content h3) {
    @apply font-semibold text-gray-900 dark:text-white mb-3 mt-6;
    margin-left: 4rem;
  }
  
  :global(.experience-content ul) {
    @apply space-y-2 mb-6;
    margin-left: 4rem;
  }
  
  :global(.experience-content li) {
    @apply flex items-start space-x-2 text-gray-600 dark:text-gray-300 text-sm;
  }
  
  :global(.experience-content li::before) {
    content: '✓';
    @apply text-primary-500 mt-0.5 flex-shrink-0;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  @media (min-width: 768px) {
    :global(.experience-content h3),
    :global(.experience-content ul) {
      margin-left: 0;
      width: calc(50% - 2rem);
    }
  }
  
  /* Technologies */
  :global(.experience-content code) {
    @apply px-3 py-1 bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-white rounded-full text-xs font-medium mr-2 mb-2 inline-block;
  }
  
  /* Horizontal rules for separation */
  :global(.experience-content hr) {
    @apply my-12 border-none;
    height: 2px;
    background: linear-gradient(to right, transparent, rgb(14, 165, 233), transparent);
  }
</style>