export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  const blogs = import.meta.glob('../*.md');

  let slugs = [];

  for (const path in blogs) {
    slugs.push({ slug: path.substring(path.lastIndexOf("/") + 1, path.length) });
  }

  return slugs;
}



export async function load({ params }) {
  const post = await import(`../${params.slug}.md`)
  const { title, date, author, category, headerImage } = post.metadata
  const content = post.default

  return {
    content,
    title,
    date,
    author,
    category,
    headerImage
  }
}