import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_SLUG_QUERY, AUTHORS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { AuthorPage } from "@/components/AuthorsPage/AuthorPage/AuthorPage";
import { siteConfig } from "@/lib/siteConfig";

// ── Static params ──────────────────────────────────────────────────────────────
// client напряму — sanityFetch з live.ts не працює поза request scope (білд)
export async function generateStaticParams() {
  const slugs = await client.fetch(AUTHORS_SLUGS_QUERY);

  return (slugs ?? [])
    .filter((s: { slug?: string | null }) => typeof s?.slug === "string")
    .map(({ slug }: { slug: string }) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: author } = await sanityFetch({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!author) return { title: "Author Not Found | ElderlyWisdom" };

  const title = author.seo?.title || `${author.name} | ElderlyWisdom`;
  const description = author.seo?.description || author.shortBio || "";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.baseUrl}/authors/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.baseUrl}/authors/${slug}`,
      type: "profile",
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function AuthorSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: author } = await sanityFetch({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!author) notFound();

  return <AuthorPage author={author} />;
}