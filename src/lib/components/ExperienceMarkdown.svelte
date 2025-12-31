<script lang="ts">
  import { onMount } from 'svelte';
  
  let experienceRef: HTMLElement;
  let isVisible = false;
  let ExperienceContent: any = null;
  
  onMount(async () => {
    // Dynamically import the markdown content
    const module = await import('../content/experience.md');
    ExperienceContent = module.default;
    
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

<div bind:this={experienceRef} class="{isVisible ? 'animate-fade-in' : 'opacity-0'}">
  {#if ExperienceContent}
    <svelte:component this={ExperienceContent} />
  {:else}
    <!-- Loading state -->
    <section id="experience" class="py-20">
      <div class="container-max section-padding">
        <div class="max-w-6xl mx-auto text-center">
          <div class="animate-pulse">
            <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  {/if}
</div>