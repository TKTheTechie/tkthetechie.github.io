export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  // const blogs = import.meta.glob('../*.md');

  // let slugs = [];

  // for (const path in blogs) {
  //   slugs.push({ slug: path.substring(path.lastIndexOf("/") + 1, path.length) });
  // }

  return [
    { slug: 'a-scalable-websocket-fanout-solution-for-your-high-performance-kafka-deployment' },
    { slug: 'build-a-proximity-detection-system-with-a-raspberry-pi-solace-pubsub-and-javascript' },
    { slug: 'creating-an-openfin-event-mesh-across-the-hybrid-cloud' },
    { slug: 'dapr-with-solace-pubsub' },
    { slug: 'event-driven-elixir' },
    { slug: 'event-driven-machine-learning' },
    { slug: 'event-driven-zinc-search-logging' },
    { slug: 'handling-openfin-inbound-events-from-the-hybrid-cloud' },
    { slug: 'how-to-use-rust-webassembly-javascript-and-pubsub-to-run-native-apps-in-your-browser' },
    { slug: 'linking-vuex-state-machines-across-your-vue-client-applications-with-solace-pubsub' },
    { slug: 'openfin-apps-need-more-than-just-rest' },
    { slug: 'rainbow-wallet-bringing-ethereum-to-the-masses' },
    { slug: 'solace-pubsub-queue-redelivery-delayer' },
    { slug: 'the-importance-of-message-settlement-for-event-driven-architectures' },
    { slug: 'using-graphql-to-query-the-state-of-your-event-mesh' },
    { slug: 'why-the-pyth-network-needs-an-event-mesh' }
  ];
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