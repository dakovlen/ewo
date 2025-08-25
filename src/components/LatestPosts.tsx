"use client";

import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { Categories } from "./Categories";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  categories?: {
    _id: string;
    title: string;
    slug?: { current: string };
  }[];
};

type Props = {
  posts: Post[];
};

export function LatestPosts({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section className="my-12 container mx-auto px-4">
      <h2 className="title text-center">Latest Posts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
          >
            <Link
              className="relative w-full h-40 sm:h-56 md:h-64 lg:h-40 xl:h-45"
              href={`/blog/${post.slug.current}`}
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).height(300).url()}
                  alt={post.title}
                  className="rounded-md mb-4"
                />
              )}
            </Link>

            {post.categories && post.categories.length > 0 && (
              <div className="mb-2">
                <Categories categories={post.categories} />
              </div>
            )}

            <h3 className="text-xl font-bold mb-2">
              <Link href={`/blog/${post.slug.current}`}>
                {post.title}
              </Link>
            </h3>

            {post.excerpt && (
              <p className="text-base text-gray-700 mb-2">{post.excerpt}</p>
            )}

            <Link
              href={`/blog/${post.slug.current}`}
              className="text-teal-600 font-medium text-sm hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row my-10">
        <Button asChild size="xl" className="bg-teal-700">
          <Link href="/blog">All articles</Link>
        </Button>
      </div>
    </section>
  );
}
