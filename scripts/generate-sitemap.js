#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://tkthetechie.io';
const BLOG_DIR = path.join(__dirname, '../src/routes/blog');
const SITEMAP_PATH = path.join(__dirname, '../static/sitemap.xml');

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Extract date from blog post frontmatter
const extractDateFromPost = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const dateMatch = frontmatter.match(/date:\s*['"]?([^'"]+)['"]?/);
      
      if (dateMatch) {
        let dateStr = dateMatch[1].trim();
        
        // Handle different date formats
        let date;
        
        // Try parsing as-is first
        date = new Date(dateStr);
        
        // If invalid, try parsing M/D/YYYY format
        if (isNaN(date.getTime())) {
          const mdyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
          if (mdyMatch) {
            const [, month, day, year] = mdyMatch;
            date = new Date(year, month - 1, day); // month is 0-indexed
          }
        }
        
        // If still invalid, try other common formats
        if (isNaN(date.getTime())) {
          // Try YYYY-MM-DD format
          const ymdMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
          if (ymdMatch) {
            date = new Date(dateStr);
          }
        }
        
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
    }
  } catch (error) {
    console.warn(`Could not extract date from ${filePath}:`, error.message);
  }
  
  // Fallback to file modification time
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    return getCurrentDate();
  }
};

// Get priority based on post age
const getPriority = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const daysDiff = (now - postDate) / (1000 * 60 * 60 * 24);
  
  if (daysDiff < 30) return '0.8';      // Recent posts
  if (daysDiff < 365) return '0.7';     // Posts within a year
  if (daysDiff < 730) return '0.6';     // Posts within 2 years
  return '0.5';                         // Older posts
};

// Get change frequency based on post age
const getChangeFreq = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const daysDiff = (now - postDate) / (1000 * 60 * 60 * 24);
  
  if (daysDiff < 30) return 'weekly';   // Recent posts might be updated
  if (daysDiff < 365) return 'monthly'; // Posts within a year
  return 'yearly';                      // Older posts rarely change
};

// Scan blog directory for posts
const scanBlogPosts = () => {
  const blogPosts = [];
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn('Blog directory not found:', BLOG_DIR);
    return blogPosts;
  }
  
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const postDir = path.join(BLOG_DIR, entry.name);
      const pageFile = path.join(postDir, '+page.md');
      
      if (fs.existsSync(pageFile)) {
        const slug = entry.name;
        const lastmod = extractDateFromPost(pageFile);
        const priority = getPriority(lastmod);
        const changefreq = getChangeFreq(lastmod);
        
        blogPosts.push({
          slug,
          lastmod,
          priority,
          changefreq,
          url: `${SITE_URL}/blog/${slug}/`
        });
      }
    }
  }
  
  // Sort by date (newest first)
  blogPosts.sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));
  
  return blogPosts;
};

// Generate sitemap XML
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  const blogPosts = scanBlogPosts();
  
  console.log(`Found ${blogPosts.length} blog posts`);
  
  const staticUrls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${SITE_URL}/#home`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#about`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#experience`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#skills`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#portfolio`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#credentials`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/#contact`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${SITE_URL}/blog/`,
      lastmod: blogPosts.length > 0 ? blogPosts[0].lastmod : currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    }
  ];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Page with Navigation Sections -->`;

  // Add static URLs
  for (const url of staticUrls) {
    xml += `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }
  
  xml += `
  
  <!-- Blog Posts -->`;
  
  // Add blog posts
  for (const post of blogPosts) {
    xml += `
  <url>
    <loc>${post.url}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
  }
  
  xml += `
</urlset>`;
  
  return xml;
};

// Main function
const main = () => {
  try {
    console.log('Generating sitemap...');
    
    const sitemap = generateSitemap();
    
    // Ensure static directory exists
    const staticDir = path.dirname(SITEMAP_PATH);
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    // Write sitemap
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
    
    console.log(`✅ Sitemap generated successfully: ${SITEMAP_PATH}`);
    console.log(`📄 Total URLs: ${(sitemap.match(/<url>/g) || []).length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, scanBlogPosts };