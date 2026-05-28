import { sanityFetch } from "@/sanity/lib/client";
import { getPostsQuery, POSTS_TOTAL_COUNT_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/PostCard/PostCard";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination/Pagination";
import { Hero } from "@/components/blocks/Hero/Hero";
import { blogMetadata } from "@/lib/metadata/blogMetadata";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

const POSTS_PER_PAGE = 12;

type Props = {
  searchParams?: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1", 10);

  /*
    Сторінка 1 — повний metadata з blogMetadata.
    Сторінки 2+ — noindex щоб Google не вважав їх дублікатами.
    follow: true — Google все одно слідує посиланням і знаходить статті.
    canonical завжди вказує на /blog (перша сторінка).
  */
  if (currentPage > 1) {
    return {
      ...blogMetadata,
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: `${siteConfig.baseUrl}/blog`,
      },
    };
  }

  return blogMetadata;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1", 10);
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    sanityFetch({
      query: getPostsQuery(offset, POSTS_PER_PAGE),
      revalidate: 3600,
      tags: ["post", "author", "category"],
    }),
    sanityFetch({ query: POSTS_TOTAL_COUNT_QUERY }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  if (!posts || posts.length === 0) notFound();

  return (
    <>
      <Hero
        _key="hero-section"
        _type="hero"
        title="ElderlyWisdom Blog: Inspiring Reads for Seniors"
        text={[
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            _key: "block1",
            children: [
              {
                _type: "span",
                text: "Discover a wealth of thoughtful articles dedicated to enriching life after 60. Explore engaging pieces on cultivating new hobbies and interests, fostering a sense of purpose, and finding joy in everyday moments.",
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </main>
    </>
  );
}