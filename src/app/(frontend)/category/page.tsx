import { sanityFetch } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/blocks/Hero";
import Link from "next/link";
import type { Metadata } from "next";

import { DefaultIcon } from "@/components/icons/categories/DefaultIcon";
import { HealthIcon } from "@/components/icons/categories/Health";
import { NutritionIcon } from "@/components/icons/categories/Nutrition";
import { PuzzleBooksIcon } from "@/components/icons/categories/PuzzleBooks";
import { WisdomIcon } from "@/components/icons/categories/Wisdom";

export const metadata: Metadata = {
  title: "Categories | Elderly Wisdom",
  description: "Choose a category to explore articles on wisdom, health, inspiration, and life stories for seniors.",
};

const normalizeTitle = (title: string) => title.replace(/\s+/g, "").toLowerCase();

const categoryIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  default: DefaultIcon,
  health: HealthIcon,
  nutrition: NutritionIcon,
  puzzlebooks: PuzzleBooksIcon,
  wisdom: WisdomIcon,
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
          {categories.map((cat: any) => {
            const Icon = categoryIcons[normalizeTitle(cat.title)] || DefaultIcon;

            return (
              <Link
                href={`/category/${cat.slug.current}`}
                key={cat._id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow border-1"
              >
                <span className="flex items-center gap-3 mb-3">
                  <Icon className="w-12 h-12 text-teal-600" />
                  <h2 className="text-3xl font-semibold">{cat.title}</h2>
                </span>
                <span className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                  {cat.description || ""}
                </span>
                <span className="mt-auto inline-block text-center bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition">
                  View Category
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
