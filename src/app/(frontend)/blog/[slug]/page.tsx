import { client, sanityFetch } from '@/sanity/lib/client';
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from '@/components/Post';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import { Metadata } from 'next';

// Типи для кращої типізації
interface RouteProps {
  params: Promise<{ slug: string }>;
}

interface PostSEO {
  title: string;
  description: string;
  image?: any;
  noIndex?: boolean;
}

interface PostData {
  seo: PostSEO;
  [key: string]: any;
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  return slugs;
}

// Helper функція для отримання даних сторінки
const getPage = async (params: RouteProps["params"]) => {
  const resolvedParams = await params;
  return sanityFetch({
    query: POST_QUERY,
    params: resolvedParams,
  });
};

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const post = await getPage(params);

  if (!post) {
    return {};
  }

  const metadata: Metadata = {
    title: post.seo?.title || 'Blog Post',
    description: post.seo?.description || '',
  };

  if (post.seo?.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(post.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (post.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page({ params }: RouteProps) {
  // Очікуємо params перед використанням
  const resolvedParams = await params;
  
  const post = await sanityFetch({
    query: POST_QUERY,
    params: resolvedParams,
    revalidate: 3600,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}