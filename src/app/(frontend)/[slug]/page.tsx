import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { siteConfig } from '@/lib/siteConfig';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getPage = async (params: RouteProps["params"]) =>
  sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) {
    notFound();
  }
  
  const resolvedParams = await params;
  const canonicalUrl = `${siteConfig.baseUrl}/${resolvedParams.slug}`;

  const metadata: Metadata = {
    metadataBase: new URL('https://acme.com'),
    title: page.seo.title,
    description: page.seo.description,
     alternates: {
      canonical: canonicalUrl,
    },
  };

  metadata.openGraph = {
    images: {
      url: page.seo.image
        ? urlFor(page.seo.image).width(1200).height(630).url()
        : `/api/og?id=${page._id}`,
      width: 1200,
      height: 630,
    },
  };

  if (page.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
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