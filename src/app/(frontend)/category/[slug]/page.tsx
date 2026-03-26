import { sanityFetch } from "@/sanity/lib/client";
import { CATEGORY_QUERY, CATEGORY_POSTS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";
import { Hero } from "@/components/blocks/Hero";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;

  const category = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
    revalidate: 3600,
    tags: ["category"],
  });

  if (!category) return {};

  const canonicalUrl = `${siteConfig.baseUrl}/category/${slug}`;
  const title = category.seo?.title || category.title;
  const description = category.seo?.description || category.description || "";

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: category.seo?.image
        ? [{ url: category.seo.image, width: 1200, height: 630 }]
        : [{ url: `${siteConfig.baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
    },
    ...(category.seo?.noIndex && { robots: { index: false, follow: true } }),
  };
}

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;

  const [category, posts] = await Promise.all([
    sanityFetch({ query: CATEGORY_QUERY, params: { slug }, revalidate: 3600, tags: ["category"] }),
    sanityFetch({ query: CATEGORY_POSTS_QUERY, params: { slug }, revalidate: 3600, tags: ["post", "author", "category"] }),
  ]);

  if (!category || !posts || posts.length === 0) notFound();

  return (
    <>
      <Hero
        _key="hero-category"
        _type="hero"
        title={category.title}
        text={[
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            _key: "desc",
            children: [{ _type: "span", text: category.description || "", _key: "span1" }],
          },
        ]}
        image={undefined}
      />
      <main className="container mx-auto px-5 py-8 md:p-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
