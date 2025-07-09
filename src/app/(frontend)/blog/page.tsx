import { sanityFetch } from "@/sanity/lib/client";
import { getPostsQuery, POSTS_TOTAL_COUNT_QUERY } from '@/sanity/lib/queries'
import { PostCard } from '@/components/PostCard'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";

const POSTS_PER_PAGE = 12;

export async function generateMetadata() {
  return {
    title: 'ElderlyWisdom Blog – Insightful Articles & Inspiration for Seniors',
    description:
      'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
    alternates: {
      canonical: 'https://elderlywisdom.org/blog',
    },
    openGraph: {
      title: 'ElderlyWisdom Blog – Insightful Articles & Inspiration for Seniors',
      description:
        'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
      url: 'https://elderlywisdom.org/blog',
      siteName: 'ElderlyWisdom',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://elderlywisdom.org/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'ElderlyWisdom – A Blog for Seniors',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ElderlyWisdom Blog – Insightful Articles & Inspiration for Seniors',
      description:
        'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
      site: '@SolanVoss',
      images: ['https://elderlywisdom.org/og-image.jpg'],
    },
  };
}


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
            ElderlyWisdom Blog: Inspiring Reads for Seniors
          </h1>
          <h3 className="text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto">
            Discover a wealth of thoughtful articles dedicated to enriching life after 60. Explore engaging pieces on cultivating new hobbies and interests, fostering a sense of purpose, and finding joy in everyday moments. Delve into articles specifically designed to support brain health, with tips on maintaining cognitive vitality and sharpness. We believe in graceful aging and provide empowering perspectives that celebrate the wisdom and experience that comes with age. Our goal is to uplift, inform, and inspire, ensuring you feel empowered to live your fullest, most vibrant life.
          </h3>
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
