export const seoConfig = {
  siteName: 'TKTheTechie - Thomas Kunnumpurath',
  siteUrl: 'https://tkthetechie.io',
  defaultTitle: 'Thomas Kunnumpurath - VP Systems Engineering & Technical Leader',
  defaultDescription: 'VP of Systems Engineering at Solace with 15+ years experience in technical leadership, event-driven architecture, cloud solutions, and scaling engineering teams. Open source contributor and public speaker.',
  defaultKeywords: [
    'Thomas Kunnumpurath',
    'Systems Engineering',
    'Event Driven Architecture',
    'Solace',
    'Technical Leadership',
    'Cloud Solutions',
    'Open Source',
    'GraphQL',
    'DAPR',
    'Microservices',
    'AWS',
    'Public Speaking',
    'Software Engineering',
    'VP Engineering',
    'Technical Strategy'
  ],
  author: 'Thomas Kunnumpurath',
  twitterHandle: '@TKTheTechie',
  linkedinProfile: 'https://www.linkedin.com/in/thomas-kunnumpurath/',
  githubProfile: 'https://github.com/TKTheTechie',
  defaultImage: '/profile-pic.png',
  themeColor: '#0ea5e9',
  backgroundColor: '#0f172a'
};

export const generateMetaTags = (options: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}) => {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    keywords = seoConfig.defaultKeywords,
    image = seoConfig.defaultImage,
    url = seoConfig.siteUrl,
    type = 'website'
  } = options;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical: url,
    openGraph: {
      type,
      url,
      title,
      description,
      image: `${seoConfig.siteUrl}${image}`,
      siteName: seoConfig.siteName
    },
    twitter: {
      card: 'summary_large_image',
      creator: seoConfig.twitterHandle,
      title,
      description,
      image: `${seoConfig.siteUrl}${image}`
    }
  };
};