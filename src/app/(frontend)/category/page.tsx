import { sanityFetch } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/blocks/Hero";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Elderly Wisdom",
  description: "Choose a category to explore articles on wisdom, health, inspiration, and life stories for seniors.",
};

export default async function Page() {
  const categories = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
    revalidate: 3600,
    tags: ["category"],
  });

  if (!categories || categories.length === 0) return null;

  return (
    <>
      <Hero
        _key="hero-categories"
        _type="hero"
        title="Categories"
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
                  "Browse all categories on Elderly Wisdom. Select a topic to discover inspiring stories, helpful advice, and thoughtful reflections tailored for seniors.",
                _key: "span1",
              },
            ],
          },
        ]}
        image={undefined}
      />

      <main className="container mx-auto px-5 py-8 md:p-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat: any) => (
            <Link
              href={`/category/${cat.slug.current}`}
              key={cat._id}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow border-1"
            >
              <span>
                <h2 className="text-2xl font-semibold mb-3">{cat.title}</h2>
                <span className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                  {cat.description || ""}
                </span>
              </span>
              <span className="mt-auto inline-block text-center bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition" >
                View Category
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
