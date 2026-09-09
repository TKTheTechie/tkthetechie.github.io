/* Shape of a blog post as returned by /blog/api/posts and consumed by the UI. */

export type PostMeta = {
  title: string;
  /** Date as written in frontmatter (M/D/YYYY or YYYY-MM-DD). */
  date: string;
  /** Normalised YYYY-MM-DD, used for canonical ordering and structured data. */
  dateIso: string;
  category: string;
  headerImage: string | null;
  /** Frontmatter `description`, or the first paragraph of the body. */
  description: string;
  author: string;
};

export type Post = {
  slug: string;
  path: string;
  meta: PostMeta;
};
