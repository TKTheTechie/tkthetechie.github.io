export class PortfolioItem {
  title: string;
  imgSrc: string;
  href: string;
  description: string;

  constructor(title: string, imgSrc: string, href: string, description: string) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.href = href;
    this.description = description;
  }
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  new PortfolioItem(
    'EDA Summit Talk - Jet Streams & Market Streams: Navigating EDA in Aviation and Proprietary Trading',
    '/images/portfolio/EDA-Summit-2024-Talk.jpeg',
    'https://edasummit.com/videos/jet-streams-market-streams/',
    'I was the moderator for a panel discussion at the EDA Summit 2024 conference where we discussed the challenges and solutions of EDA with CTC and United Airlines.'
  ),
  new PortfolioItem(
    'AWS FSI - Podcast - Innovation in Capital Markets',
    '/images/portfolio/aws-fsi-podcast.png',
    'https://pages.awscloud.com/FSI-Episode-Landing-Pages_Ep-2.html',
    'I was invited to speak on the AWS FSI podcast about how Solace is helping financial institutions innovate in capital markets.'
  ),
  new PortfolioItem(
    'Open Source Project - Solace PubSub+ Plugin for GraphQL',
    '/images/blog/headers/graphql-with-solace.png',
    'https://tkthetechie.io/blog/graphql-with-solace-pubsub',
    'I authored an open source plugin from GraphQL into Solace PubSub+'
  ),
  new PortfolioItem(
    'Open Source Project - Solace Plugin for DAPR',
    '/images/portfolio/solace-dapr.png',
    'https://docs.dapr.io/reference/components-reference/supported-pubsub/setup-solace-amqp/',
    'I authored the Solace PubSub+ plugin into DAPR'
  ),
  new PortfolioItem(
    'AWS re:Invent - How to Build a Kafka Mesh',
    '/images/portfolio/AWSKafkaMesh.png',
    'https://www.youtube.com/watch?v=8KibI-OoE0I',
    'I presented on stage at AWS:ReInvent 2022 on how to implement a Kafka Mesh topology using Solace PubSub+'
  ),
  new PortfolioItem(
    'Podcast - Event Driven Elixir',
    '/images/portfolio/ElixirMixPodcast.png',
    'https://podcasts.apple.com/no/podcast/event-driven-elixir-with-thomas-kunnumpurath-emx-166/id1379029137?i=1000553643549',
    'I was invited to speak on a podcast for Elixir Lang based on a blog post I wrote integrating Solace PubSub+ with Elixir'
  ),
  new PortfolioItem(
    'Open Source Project - Solace Redelivery Delayer',
    '/images/portfolio/SolaceRedeliveryDelayer.png',
    'https://github.com/solacecommunity/solace-redelivery-delayer',
    'I developed an open source micro-service that implements a delayed delivery pattern to a Solace Queue using Spring and Solace\'s New Java API. I also made use of Java Streams and Delayed Queues to get the required behavior efficiently.'
  ),
  new PortfolioItem(
    'Whitepaper - A Guide to Connectivity for OpenFin Architects and Developers',
    '/images/portfolio/OpenFin.jpeg',
    'https://solace.com/resources/white-papers/wp-download-openfin-guide-to-connectivity-lp',
    'I published a white paper that showed how the OpenFin Desktop Application can take advantage of the Solace PubSub+ platform to securely stream data using a variety of message exchange patterns.'
  ),
  new PortfolioItem(
    'Open Source Project - SolCharts',
    '/images/portfolio/SolCharts.png',
    'https://github.com/solacecommunity/sol-charts',
    'I created an opensource project that made extensive use of the Svelte JavaScript framework as well as Electron, to create a standalone application that is able to chart activity with the Solace PubSub+ broker.'
  ),
  new PortfolioItem(
    'Udemy Course - Battleship over Solace PubSub+',
    '/images/portfolio/BattleshipOverSolace.png',
    '',
    'I lead the design and development of a Udemy course that covered the fundamentals of Solace PubSub+ via building an interactive game with Solace and a JavaScript SPA using the Aurelia JS framework. I was also a featured guest blogger on the Aurelia.io site as a result of this initiative.'
  )
];