import { Metadata } from 'next';

const siteUrl = 'https://thomaskelly281.github.io';
const siteName = 'Thomas Kelly - Product Designer';
const defaultDescription = 'Product Designer working @ Sitecore, based in Dublin, Ireland. Specializing in design systems, AI/ML product design, and user experience.';

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/thumbs/bathumb.webp',
  type = 'website',
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const url = `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${image}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'Product Designer',
      'UX Designer',
      'UI Designer',
      'Design Systems',
      'Sitecore',
      'Dublin',
      'Ireland',
      'Portfolio',
      'Case Studies',
      'AI Product Design',
      'Design Leadership',
    ],
    authors: [{ name: 'Thomas Kelly' }],
    creator: 'Thomas Kelly',
    publisher: 'Thomas Kelly',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: 'en_IE',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      creator: '@thomaskelly281',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}


