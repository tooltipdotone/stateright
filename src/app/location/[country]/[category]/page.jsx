import { getLocationContent } from "../../../../data/blog";
import { DATA } from "../../../../data/content";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LanguageSwitcher from "../../../../components/LanguageSwitcher";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function generateStaticParams() {
  // Define your location-based pages here
  const locations = [
    { country: 'uzbekistan', category: 'used-cars' },
    { country: 'georgia', category: 'electronics' },
  ];
  
  const locales = ['en', 'ru', 'kk', 'uz'];
  const pages = [];
  
  for (const location of locations) {
    for (const locale of locales) {
      pages.push({
        country: location.country,
        category: location.category,
        locale: locale
      });
    }
  }
  
  return pages;
}

export async function generateMetadata({ params }) {
  const { country, category, locale = 'en' } = params;
  let content = await getLocationContent(country, category, locale);

  if (!content) {
    content = await getLocationContent(country, category, 'en');
  }

  if (!content) {
    return {};
  }

  let {
    title,
    description,
    publishedAt: publishedTime,
  } = content.metadata;
  
  let ogImage = `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/location/${country}/${category}`,
      images: [
        {
          url: ogImage,
        },
      ],
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocationPage({ params }) {
  const { country, category, locale = 'en' } = params;
  let content = await getLocationContent(country, category, locale);

  if (!content) {
    content = await getLocationContent(country, category, 'en');
  }

  if (!content) {
    notFound();
  }

  return (
    <section id="location-page" className="mb-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: content.metadata.title,
            description: content.metadata.description,
            url: `${DATA.url}/location/${country}/${category}`,
            inLanguage: locale,
            about: {
              "@type": "Place",
              name: country.charAt(0).toUpperCase() + country.slice(1)
            },
            author: {
              "@type": "Organization",
              name: DATA.name,
            },
          }),
        }}
      />
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
            {content.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-4 text-sm max-w-[650px]">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {content.metadata.publishedAt && formatDate(content.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
      
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content.source }}
      ></article>
    </section>
  );
}
