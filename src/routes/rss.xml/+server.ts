import { getPosts } from '$lib/server/posts';
import { AUTHOR_NAME, SITE_URL, absoluteUrl } from '$lib/config/site';

export const prerender = true;

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET = () => {
  const posts = getPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(post.path);
      const image = post.meta.headerImage
        ? `<enclosure url="${absoluteUrl(`/images/blog/headers/${post.meta.headerImage}`)}" type="image/png" length="0" />`
        : '';
      return `    <item>
      <title>${escape(post.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.meta.dateIso}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(post.meta.category)}</category>
      <description>${escape(post.meta.description)}</description>
      ${image}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(AUTHOR_NAME)} - Technical Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Event-driven architecture, agentic AI, and engineering leadership from the field.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
