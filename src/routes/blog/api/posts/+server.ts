import { json } from '@sveltejs/kit'

export const prerender = true;

const fetchMarkdownPosts = async () => {
  try {
    // Get all blog post directories
    const allPostFiles = import.meta.glob('/src/routes/blog/**/+page.md', { eager: false })
    const iterablePostFiles = Object.entries(allPostFiles)
    
    console.log('Found blog files:', iterablePostFiles.length, 'files')
    
    const allPosts = []
    
    for (const [path, resolver] of iterablePostFiles) {
      try {
        console.log('Processing file:', path)
        
        // Extract the blog post path from the file path
        // /src/routes/blog/post-name/+page.md -> /blog/post-name
        const pathParts = path.split('/')
        const blogIndex = pathParts.indexOf('blog')
        const postName = pathParts[blogIndex + 1]
        const postPath = `/blog/${postName}`

        // Try to resolve the module to get metadata
        let metadata = {}
        try {
          const resolved = await resolver()
          if (resolved && typeof resolved === 'object' && 'metadata' in resolved) {
            metadata = resolved.metadata || {}
          }
        } catch (resolverError) {
          console.warn(`Could not resolve metadata for ${path}, using defaults:`, resolverError.message)
          // Use default metadata if we can't resolve the file
          metadata = {
            title: postName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            date: new Date().toISOString(),
            category: 'Blog',
            author: 'Thomas Kunnumpurath'
          }
        }

        allPosts.push({
          meta: {
            title: metadata.title || postName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            date: metadata.date || new Date().toISOString(),
            category: metadata.category || 'Blog',
            author: metadata.author || 'Thomas Kunnumpurath',
            headerImage: metadata.headerImage || null
          },
          path: postPath,
        })
      } catch (error) {
        console.error(`Error processing file ${path}:`, error)
      }
    }

    console.log('Successfully processed', allPosts.length, 'blog posts')
    return allPosts
  } catch (error) {
    console.error('Error in fetchMarkdownPosts:', error)
    return []
  }
}

export const GET = async () => {
  try {
    const allPosts = await fetchMarkdownPosts()

    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.meta?.date || '1970-01-01')
      const dateB = new Date(b.meta?.date || '1970-01-01')
      return dateB.getTime() - dateA.getTime()
    })

    console.log('Returning', sortedPosts.length, 'sorted posts')
    return json(sortedPosts)
  } catch (error) {
    console.error('Error in GET handler:', error)
    return json({ error: 'Failed to fetch blog posts', details: error.message }, { status: 500 })
  }
}