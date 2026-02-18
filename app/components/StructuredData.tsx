import Script from 'next/script';

interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  worksFor: {
    '@type': 'Organization';
    name: string;
  };
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
}

interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
  };
}

export function StructuredData() {
  const personSchema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Kelly',
    jobTitle: 'Product Designer',
    url: 'https://thomaskelly281.github.io',
    sameAs: [
      'https://www.linkedin.com/in/thomaskelly281/',
      'https://github.com/thomaskelly281',
      'https://twitter.com/thomaskelly281',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Sitecore',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dublin',
      addressCountry: 'IE',
    },
  };

  const websiteSchema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thomas Kelly - Product Designer',
    url: 'https://thomaskelly281.github.io',
    description: 'Product Designer working @ Sitecore, based in Dublin, Ireland. Specializing in design systems, AI/ML product design, and user experience.',
    author: {
      '@type': 'Person',
      name: 'Thomas Kelly',
    },
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}


