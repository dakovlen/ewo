import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const getHomePage = async () =>
  sanityFetch({
    query: HOME_PAGE_QUERY,
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
  };

  metadata.openGraph = {
    images: {
      url: homePage.seo?.image
        ? urlFor(homePage.seo.image).width(1200).height(630).url()
        : `/api/og?id=${homePage._id}`,
      width: 1200,
      height: 630,
    },
  };

  if (homePage.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page() {
  const { data: page } = await getHomePage();
  const homePage = page?.homePage;

  return homePage?.content ? (
    <PageBuilder
      documentId={homePage._id}
      documentType={homePage._type}
      content={homePage.content}
    />
  ) : null;
}
