# Build Scripts

This directory contains build-time scripts for the TKTheTechie.io website.

## generate-sitemap.js

Automatically generates `static/sitemap.xml` by scanning the blog directory for posts.

### Features

- **Automatic blog post discovery**: Scans `src/routes/blog/` for all blog post directories
- **Date extraction**: Reads frontmatter from `+page.md` files to get publication dates
- **Smart prioritization**: Assigns priority and change frequency based on post age
- **Multiple date formats**: Supports `M/D/YYYY`, `YYYY-MM-DD`, and other common formats
- **Fallback handling**: Uses file modification time if frontmatter date is unavailable

### Usage

```bash
# Generate sitemap manually
npm run generate:sitemap

# Automatically runs during build
npm run build
npm run build:gh-pages
```

### How it works

1. Scans `src/routes/blog/` for directories containing `+page.md` files
2. Extracts publication date from frontmatter `date:` field
3. Calculates priority and change frequency based on post age:
   - Recent posts (< 30 days): priority 0.8, weekly updates
   - Posts within 1 year: priority 0.7, monthly updates  
   - Posts within 2 years: priority 0.6, yearly updates
   - Older posts: priority 0.5, yearly updates
4. Generates XML sitemap with all static pages and blog posts
5. Writes to `static/sitemap.xml`

### Supported frontmatter date formats

```yaml
# M/D/YYYY format
date: 1/2/2026

# ISO format
date: 2026-01-02

# With quotes
date: "1/2/2026"
```

### Integration

The script is automatically run before each build via the `build` and `build:gh-pages` npm scripts, ensuring the sitemap is always up-to-date when deploying.