<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tkthetechie/',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'X',
      href: 'https://x.com/tkthetechie',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/TKTheTechie',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    }
  ];
</script>

<footer id="footer" class="py-12 transition-colors duration-300 bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
  <div class="container-max section-padding">
    <div class="max-w-6xl mx-auto">
      <!-- Main Footer Content -->
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">TK</span>
            </div>
            <span class="text-xl font-bold gradient-text">TheTechie</span>
          </div>
          <p class="text-gray-700 dark:text-gray-400 leading-relaxed">
            Passionate about building scalable systems, leading engineering teams, 
            and evangelizing modern architectural patterns.
          </p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-black dark:text-white">Quick Links</h3>
          <div class="space-y-2">
            {#each ['About', 'Experience', 'Skills', 'Contact'] as link}
              <button
                on:click={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                class="block text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {link}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Get In Touch</h3>
          <div class="space-y-2 text-gray-600 dark:text-gray-400">
            <p>Available for speaking engagements</p>
            <p>Open to consulting opportunities</p>
            <p>Always happy to connect with fellow technologists</p>
          </div>
        </div>
      </div>
      
      <!-- Social Links -->
      <div class="flex justify-center space-x-6 mb-8">
        {#each socialLinks as social}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 bg-gray-300 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-600 rounded-lg flex items-center justify-center transition-all duration-300 hover-lift text-gray-700 dark:text-white"
            aria-label={social.name}
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d={social.icon} />
            </svg>
          </a>
        {/each}
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-gray-300 dark:border-gray-800 pt-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          © {currentYear} Thomas Kunnumpurath. All rights reserved.
        </p>
        <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
          Built with Svelte 5 and Tailwind CSS
        </p>
      </div>
    </div>
  </div>
</footer>
<style>
  /* Footer light mode - ensure white background and dark text */
  :root:not(.dark) #footer {
    background-color: rgb(255, 255, 255) !important;
    color: rgb(0, 0, 0) !important;
  }
  
  :root:not(.dark) #footer .text-gray-900,
  :root:not(.dark) #footer .text-gray-600,
  :root:not(.dark) #footer .text-gray-700 {
    color: rgb(0, 0, 0) !important;
  }
  
  /* Social icons light mode */
  :root:not(.dark) #footer .bg-gray-300 {
    background-color: rgb(229, 231, 235) !important;
  }
  
  :root:not(.dark) #footer .text-gray-700 {
    color: rgb(55, 65, 81) !important;
  }
  
  /* Footer dark mode fixes */
  .dark #footer {
    background-color: rgb(15, 23, 42) !important;
    color: rgb(255, 255, 255) !important;
  }
  
  .dark #footer .text-gray-900 {
    color: rgb(255, 255, 255) !important;
  }
  
  .dark #footer .text-gray-600 {
    color: rgb(156, 163, 175) !important;
  }
  
  .dark #footer .text-gray-500 {
    color: rgb(107, 114, 128) !important;
  }
  
  .dark #footer .border-gray-300 {
    border-color: rgb(75, 85, 99) !important;
  }
  
  .dark #footer .bg-gray-300 {
    background-color: rgb(55, 65, 81) !important;
  }
  
  .dark #footer .text-gray-700 {
    color: rgb(255, 255, 255) !important;
  }
</style>