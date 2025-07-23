import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { LatestPosts } from "@/components/LatestPosts";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, LATEST_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from '@/lib/siteConfig';
import { StructuredDataHome } from "@/components/StructuredDataHome";

const getHomePage = () =>
  sanityFetch({
    query: HOME_PAGE_QUERY,
  });

const getLatestPosts = () =>
  sanityFetch({
    query: LATEST_POSTS_QUERY,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await getHomePage();
  const homePage = page?.homePage;

  if (!homePage) {
    return {};
  }

  const metadata: Metadata = {
    metadataBase: new URL("https://acme.com"),
    title: homePage.seo?.title || "Default title",
    description: homePage.seo?.description || "Default description",
    openGraph: {
      images: {
        url: homePage.seo?.image
          ? urlFor(homePage.seo.image).width(1200).height(630).url()
          : `/api/og?id=${homePage._id}`,
        width: 1200,
        height: 630,
      },
    },
    alternates: {
      canonical: siteConfig.baseUrl,
    },
  };

  if (homePage.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page() {
  const [homePageData, latestPostsData] = await Promise.all([
    getHomePage(),
    getLatestPosts(),
  ]);

  const homePage = homePageData?.data?.homePage;
  const latestPosts = latestPostsData?.data || [];

  if (!homePage?.content) {
    return null;
  }

  return (
    <>
      <StructuredDataHome />
      <PageBuilder
        documentId={homePage._id}
        documentType={homePage._type}
        content={homePage.content}
      />

      <LatestPosts posts={latestPosts} />
    </>
  );
}
