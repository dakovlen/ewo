import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/Post";
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

const getPost = async (params: RouteProps["params"]) => {
  const resolvedParams = await params;
  return sanityFetch({ query: POST_QUERY, params: resolvedParams });
};

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const post = await getPost(params);

  if (!post) return {};

  const { slug } = await params;
  const canonicalUrl = `${siteConfig.baseUrl}/blog/${slug}`;
  const ogImageUrl = post.seo?.image
    ? urlFor(post.seo.image).width(1200).height(630).url()
    : `${siteConfig.baseUrl}/og-image.jpg`;

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || "",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || "",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    // FIX: Twitter cards were missing entirely on blog posts
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title || post.title,
      description: post.seo?.description || "",
      site: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
    ...(post.seo?.noIndex && { robots: "noindex" }),
  };
}

export default async function Page({ params }: RouteProps) {
  const resolvedParams = await params;

  const post = await sanityFetch({
    query: POST_QUERY,
    params: resolvedParams,
    revalidate: 3600,
  });

  if (!post) notFound();

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 py-3 md:py-10">
      <Post {...post} />
    </main>
  );
}
