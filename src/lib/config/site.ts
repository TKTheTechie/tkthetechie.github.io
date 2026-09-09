/* Site-wide constants and helpers shared by pages, endpoints and the SEO component. */

export const SITE_URL = 'https://tkthetechie.io';
export const SITE_NAME = 'TKTheTechie';
export const AUTHOR_NAME = 'Thomas Kunnumpurath';
export const TWITTER_HANDLE = '@tkthetechie';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

/** Absolute URL for a site path (already-absolute URLs pass through). */
export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Normalise the two frontmatter date styles (M/D/YYYY and YYYY-MM-DD) to an
 * ISO calendar date. Returns '' when the value cannot be parsed.
 */
export const toIsoDate = (value: string | undefined): string => {
  if (!value) return '';
  const mdy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mdy) return `${mdy[3]}-${mdy[1].padStart(2, '0')}-${mdy[2].padStart(2, '0')}`;
  const ymd = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, '0')}-${ymd[3].padStart(2, '0')}`;
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};
