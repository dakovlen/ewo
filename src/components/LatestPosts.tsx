"use client";

import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
};

type Props = {
  posts: Post[];
};

export function LatestPosts({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section className="my-12 container mx-auto">
      <h2 className="title text-center">Latest Posts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
          >
            <Link
              href={`/blog/${post.slug.current}`}>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              {post.excerpt && (
                <p className="text-sm text-gray-700 mb-2">{post.excerpt}</p>
              )}
              <p className="text-teal-600 font-medium hover:underline">Read more → </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
