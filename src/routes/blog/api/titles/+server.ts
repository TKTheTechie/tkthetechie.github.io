import { json } from '@sveltejs/kit'

export const prerender = true;

const fetchBlogTitles = async () => {
  try {
    // Get all blog post directories
    const allPostFiles = import.meta.glob('/src/routes/blog/**/+page.md', { eager: false })
    const iterablePostFiles = Object.entries(allPostFiles)
    
    const titles = []
    
    for (const [path, resolver] of iterablePostFiles) {
      try {
        // Extract the blog post path from the file path
        const pathParts = path.split('/')
        const blogIndex = pathParts.indexOf('blog')
        const postName = pathParts[blogIndex + 1]
        const postPath = `/blog/${postName}`

        // Try to resolve the module to get metadata
        let title = postName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        
        try {
          const resolved = await resolver()
          if (resolved && typeof resolved === 'object' && 'metadata' in resolved) {
            const metadata = resolved.metadata || {}
            title = metadata.title || title
          }
        } catch (resolverError) {
          // Use default title if we can't resolve the file
        }

        titles.push({
          title,
          path: postPath
        })
      } catch (error) {
        console.error(`Error processing file ${path}:`, error)
      }
    }

    return titles
  } catch (error) {
    console.error('Error in fetchBlogTitles:', error)
    return []
  }
}

export const GET = async () => {
  try {
    const titles = await fetchBlogTitles()

    // Sort alphabetically by title
    const sortedTitles = titles.sort((a, b) => 
      a.title.localeCompare(b.title)
    )

    return json(sortedTitles)
  } catch (error) {
    console.error('Error in GET handler:', error)
    return json({ error: 'Failed to fetch blog titles', details: error.message }, { status: 500 })
  }
}
