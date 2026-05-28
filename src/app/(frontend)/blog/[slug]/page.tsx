import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/Post/Post";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) return {};

  const canonicalUrl = `${siteConfig.baseUrl}/blog/${slug}`;
  const ogImageUrl = post.seo?.image
    ? urlFor(post.seo.image).width(1200).height(630).url()
    : post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${siteConfig.baseUrl}/og-image.jpg`;

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.title || "",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.title || "",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.title || "",
      site: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
    ...(post.seo?.noIndex && { robots: "noindex" }),
  };
}

export default async function PostPage({ params }: RouteProps) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) notFound();

  return <Post {...post} />;
}