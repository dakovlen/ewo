import type { Metadata } from "next";
import { client, sanityFetch } from '@/sanity/lib/client';
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from '@/components/Post';
import { notFound } from 'next/navigation';
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  return slugs
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) {
    return {}
  }

  const metadata: Metadata = {
    title: page.seo.title,
    description: page.seo.description,
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const post = await sanityFetch({
    query: POST_QUERY,
    params,
    revalidate: 3600,
  })

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12 ">
      <Post {...post} />
    </main>
  )

}