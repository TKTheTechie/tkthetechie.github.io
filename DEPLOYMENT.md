# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Quick Start

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Your site will be live at:** `https://[username].github.io/[repository-name]`

### Option 2: Manual Deployment

**Using the deployment script (Linux/Mac):**
```bash
./deploy.sh
```

**Using the deployment script (Windows):**
```cmd
deploy.bat
```

**Using npm commands:**
```bash
# For GitHub Pages subdirectory deployment
npm run deploy:gh-pages

# For custom domain deployment
npm run deploy
```

## Configuration

### Repository Settings

1. **Update repository name** in `github-pages.config.js`:
   ```javascript
   repositoryName: 'your-repo-name',
   githubUsername: 'your-username',
   ```

2. **For custom domains**, add your domain to `static/CNAME`:
   ```
   yourdomain.com
   ```

### Environment Variables

The GitHub Actions workflow automatically sets:
- `BASE_PATH`: Repository name for proper asset paths
- `NODE_ENV`: Production environment

## File Structure

```
├── .github/workflows/deploy.yml    # GitHub Actions workflow
├── static/.nojekyll               # Prevents Jekyll processing
├── deploy.sh                      # Unix deployment script
├── deploy.bat                     # Windows deployment script
├── github-pages.config.js         # Configuration file
├── svelte.config.js              # SvelteKit config with static adapter
└── DEPLOYMENT.md                 # This file
```

## How It Works

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`):
1. Triggers on push to `main` branch
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the static site with proper base path
5. Deploys to GitHub Pages

### SvelteKit Configuration

- Uses `@sveltejs/adapter-static` for static site generation
- Configures base path for GitHub Pages subdirectory
- Enables prerendering for all routes
- Handles asset paths correctly

## Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run check
```

**404 Errors:**
- Ensure `prerender = true` in `src/routes/+layout.ts`
- Check base path configuration in `svelte.config.js`

**Assets Not Loading:**
- Verify static files are in `static/` directory
- Check base path in browser developer tools

**GitHub Pages Not Updating:**
- Check Actions tab for workflow status
- Verify Pages source is set to "GitHub Actions"
- Clear browser cache

### Manual Troubleshooting

**Check deployment status:**
```bash
# View GitHub Actions logs
# Go to repository → Actions tab → Latest workflow run

# Test production build locally
npm run build
npm run preview
```

**Verify configuration:**
```bash
# Check if gh-pages branch exists
git branch -a

# View deployed files
git checkout gh-pages
ls -la
git checkout main
```

## Advanced Configuration

### Custom Domain Setup

1. **Add CNAME file:**
   ```bash
   echo "yourdomain.com" > static/CNAME
   ```

2. **Update DNS settings:**
   - Add CNAME record pointing to `username.github.io`
   - Or A records pointing to GitHub Pages IPs

3. **Update configuration:**
   ```javascript
   // github-pages.config.js
   customDomain: 'yourdomain.com'
   ```

### Multiple Environments

**Staging deployment:**
```bash
# Deploy to different branch
npx gh-pages -d build -b gh-pages-staging
```

**Production with custom domain:**
```bash
# Build without base path
npm run build
npx gh-pages -d build -t true
```

## Security Notes

- The deployment uses GitHub's official actions
- No secrets or tokens required for public repositories
- Private repositories need `GITHUB_TOKEN` (automatically provided)
- Static files only - no server-side code execution

## Performance Optimization

The build process includes:
- Static site generation (SSG)
- Asset optimization
- Code splitting
- Prerendering for SEO

## Support

If you encounter issues:
1. Check the [GitHub Actions logs](../../actions)
2. Review the [SvelteKit documentation](https://kit.svelte.dev/docs)
3. Verify [GitHub Pages settings](../../settings/pages)