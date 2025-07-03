import { getPage, getPages } from "../../data/blog";
import { DATA } from "../../../content";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function generateStaticParams() {
  const locales = ['en', 'ru', 'kk', 'uz'];
  const pages = [];
  
  for (const locale of locales) {
    const localizedPages = await getPages(locale);
    pages.push(...localizedPages.map(page => ({ 
      slug: page.category,
      locale: locale 
    })));
  }
  
  return pages;
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  let page = await getPage(params.slug, locale);

  if (!page) {
    // Fallback to English if page doesn't exist in requested locale
    page = await getPage(params.slug, 'en');
  }

  if (!page) {
    return {};
  }

  let {
    title,
    publishedAt: publishedTime,
    description,
  } = page.metadata;
  
  let ogImage = `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/${params.slug}`,
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
    alternates: {
      languages: {
        'en': `${DATA.url}/en/${params.slug}`,
        'ru': `${DATA.url}/ru/${params.slug}`,
        'kk': `${DATA.url}/kk/${params.slug}`,
        'uz': `${DATA.url}/uz/${params.slug}`,
      }
    }
  };
}

export default async function Page({ params }) {
  const { locale = 'en' } = params;
  let page = await getPage(params.slug, locale);

  if (!page) {
    // Fallback to English if page doesn't exist in requested locale
    page = await getPage(params.slug, 'en');
  }

  if (!page) {
    notFound();
  }

  return (
    <section id="page" className="mb-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.metadata.title,
            description: page.metadata.description,
            url: `${DATA.url}/${params.slug}`,
            inLanguage: locale,
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
            {page.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-4 text-sm max-w-[650px]">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {page.metadata.publishedAt && formatDate(page.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
      
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: page.source }}
      ></article>
    </section>
  );
}
