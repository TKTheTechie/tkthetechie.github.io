// GitHub Pages specific configuration
// This file can be used to override settings for GitHub Pages deployment

export const config = {
  // Repository name (update this to match your GitHub repository name)
  repositoryName: 'tkthetechie.io',
  
  // GitHub username (update this to match your GitHub username)
  githubUsername: 'your-username',
  
  // Custom domain (if you have one, otherwise leave empty)
  customDomain: '',
  
  // Base path for GitHub Pages (automatically set based on repository name)
  get basePath() {
    return this.customDomain ? '' : `/${this.repositoryName}`;
  },
  
  // Full GitHub Pages URL
  get siteUrl() {
    return this.customDomain 
      ? `https://${this.customDomain}`
      : `https://${this.githubUsername}.github.io/${this.repositoryName}`;
  }
};

export default config;