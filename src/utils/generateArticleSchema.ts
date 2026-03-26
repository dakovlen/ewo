import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/siteConfig";

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
  const slug = post.slug?.current;
  const fullUrl = slug
    ? `${siteConfig.baseUrl}/blog/${slug}`
    : siteConfig.baseUrl;

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
    headline: post.title,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.publishedAt).toISOString(),
    ...(post.wordCount && { wordCount: post.wordCount }),
    ...(imageUrl && {
      image: { "@type": "ImageObject", url: imageUrl },
    }),
    // FIX: was `articleBody: post.seo?.description` — description ≠ body.
    // articleBody should be the full text. We omit it here since we don't
    // have plain-text body available in this function's scope.
    // To add it properly: pass plaintext body from PortableText serializer.
    description: post.seo?.description || "",
    author: {
      "@type": "Person",
      name: post.author?.name || siteConfig.creator,
      ...(post.author?.jobTitle && { jobTitle: post.author.jobTitle }),
      // FIX: added sameAs array for E-E-A-T signals (AI search + Google trust)
      sameAs: [
        siteConfig.amazonLink,
        siteConfig.youtubeLink,
        siteConfig.xLink,
      ].filter(Boolean),
      ...(post.author?.url && { url: post.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
      sameAs: siteConfig.sameAs,
    },
  };
}
