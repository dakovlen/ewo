import { sanityFetch } from "@/sanity/lib/client";
import { getPostsQuery, POSTS_TOTAL_COUNT_QUERY } from '@/sanity/lib/queries'
import { PostCard } from '@/components/PostCard'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { Hero } from "@/components/blocks/Hero";


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
                text:
                  "Discover a wealth of thoughtful articles dedicated to enriching life after 60. Explore engaging pieces on cultivating new hobbies and interests, fostering a sense of purpose, and finding joy in everyday moments. Delve into articles specifically designed to support brain health, with tips on maintaining cognitive vitality and sharpness. Our goal is to uplift, inform, and inspire, ensuring you feel empowered to live your fullest, most vibrant life.",
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

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
      </main>
    </>
  );
}
