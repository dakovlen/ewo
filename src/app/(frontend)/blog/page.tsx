import { sanityFetch } from "@/sanity/lib/client";
import { getPostsQuery, POSTS_TOTAL_COUNT_QUERY } from '@/sanity/lib/queries'
import { PostCard } from '@/components/PostCard'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";

const POSTS_PER_PAGE = 12;

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = parseInt((await searchParams)?.page || "1", 10);
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    sanityFetch({
      query: getPostsQuery(offset, POSTS_PER_PAGE),
      revalidate: 3600,
      tags: ['post', 'author', 'category'],
    }),
    sanityFetch({ query: POSTS_TOTAL_COUNT_QUERY }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  if (!posts || posts.length === 0) notFound();

  return (
    <>
      <section className="w-full bg-gray-100 dark:bg-gray-900 py-30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-teal-300 inline-block text-transparent bg-clip-text leading-[1.2]">
            Our blog
          </h1>
          <div className="text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto">
            Welcome to the ElderlyWisdom blog! Here you will find all of our best guides related to senior living.
          </div>
          <Button asChild size="xl" className="bg-teal-700 mt-10">
            <Link href="https://www.youtube.com/@ElderlyWisdomDailyTop?sub_confirmation=1">
              🌟 Get Inspired – Watch Us on YouTube
            </Link>
          </Button>
        </div>
      </section>

      <main className="container mx-auto px-5 py-8 md:p-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
      </main>
    </>
  );
}
