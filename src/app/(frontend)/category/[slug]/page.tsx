import { sanityFetch } from "@/sanity/lib/client";
import { CATEGORY_QUERY, CATEGORY_POSTS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";
import { Hero } from "@/components/blocks/Hero";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const category = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
    revalidate: 3600,
    tags: ["category"],
  });

  if (!category) return {};

  return {
    title: category.seo?.title || category.title,
    description: category.seo?.description || category.description,
    openGraph: {
      title: category.seo?.title || category.title,
      description: category.seo?.description || category.description,
      images: category.seo?.image ? [{ url: category.seo.image }] : undefined,
    },
    robots: category.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const [category, posts] = await Promise.all([
    sanityFetch({
      query: CATEGORY_QUERY,
      params: { slug },
      revalidate: 3600,
      tags: ["category"],
    }),
    sanityFetch({
      query: CATEGORY_POSTS_QUERY,
      params: { slug },
      revalidate: 3600,
      tags: ["post", "author", "category"],
    }),
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
            children: [
              {
                _type: "span",
                text: category.description || "",
                _key: "span1",
              },
            ],
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