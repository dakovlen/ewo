import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from '@/lib/siteConfig';

interface Author {
  name: string;
  image?: any;
  jobTitle?: string;
  url?: string;
}

interface PostForSchema {
  _id: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  seo?: {
    description?: string;
  };
  mainImage?: any;
  slug?: { current: string };
  wordCount?: number;
}

export function generateArticleSchema(post: PostForSchema) {
  const baseUrl = "https://elderlywisdom.org";
  const slug = post.slug?.current;
  const fullUrl = slug ? `${baseUrl}/blog/${slug}` : baseUrl;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    url: fullUrl,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.publishedAt).toISOString(),
    headline: post.title,
    wordCount: post.wordCount || undefined,
    image: imageUrl
      ? {
          "@type": "ImageObject",
          url: imageUrl,
        }
      : undefined,
    articleBody: post.seo?.description || "",
    author: {
      "@type": "Person",
      name: post.author?.name || "Unknown",
      jobTitle: post.author?.jobTitle || undefined,
      url: post.author?.url || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.baseUrl}/logo.svg` // Замінити на фактичне посилання
      },
    },
  };
}
