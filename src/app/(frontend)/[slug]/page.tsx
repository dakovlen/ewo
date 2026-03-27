import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getPage = async (params: RouteProps["params"]) =>
  sanityFetch({ query: PAGE_QUERY, params: await params });

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) notFound();

  const { slug } = await params;
  const canonicalUrl = `${siteConfig.baseUrl}/${slug}`;
  const ogImageUrl = page.seo.image
    ? urlFor(page.seo.image).width(1200).height(630).url()
    : `${siteConfig.baseUrl}/api/og?id=${page._id}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    // FIX: Twitter cards were missing entirely
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      site: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
    ...(page.seo.noIndex && { robots: "noindex" }),
  };
}

export default async function Page({ params }: RouteProps) {
  const { data: page } = await getPage(params);

  return page?.content ? (
    <PageBuilder
      documentId={page._id}
      documentType={page._type}
      content={page.content}
    />
  ) : null;
}
