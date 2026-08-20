export const prerender = true;

/*
  SSR stays on so the prerendered HTML contains real content and a
  <link rel="stylesheet"> in <head>. With ssr = false the build emitted an
  empty shell: crawlers saw nothing, and the stylesheet only arrived after
  hydration, so every visit flashed unstyled markup first.
*/
export const ssr = true;
