import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  AUTHOR_META_QUERY,
  AUTHOR_POSTS_COUNT_QUERY,
  getAuthorPostsQuery,
} from "@/sanity/lib/queries";
import { AuthorArticlesPage } from "@/components/AuthorsPage/AuthorArticlesPage/AuthorArticlesPage";
import { siteConfig } from "@/lib/siteConfig";

const POSTS_PER_PAGE = 12;

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await client.fetch(AUTHOR_META_QUERY, { slug });

  if (!author) return { title: "Author Not Found | ElderlyWisdom" };

  const title = `All Articles by ${author.name} | ElderlyWisdom`;
  const description = `Browse all articles written by ${author.name} on ElderlyWisdom.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.baseUrl}/authors/${slug}/articles`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.baseUrl}/authors/${slug}/articles`,
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function AuthorArticlesPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const page = parseInt((await searchParams)?.page || "1", 10);
  if (isNaN(page) || page < 1) notFound();

  // Спочатку отримуємо автора — якщо нема, 404
  const author = await client.fetch(AUTHOR_META_QUERY, { slug });
  if (!author) notFound();

  const offset = (page - 1) * POSTS_PER_PAGE;

  // Паралельно тягнемо пости і загальну кількість
  const [posts, totalCount] = await Promise.all([
    client.fetch(
      getAuthorPostsQuery(offset, POSTS_PER_PAGE),
      { authorId: author._id }
    ),
    client.fetch(AUTHOR_POSTS_COUNT_QUERY, { authorId: author._id }),
  ]);

  // Якщо сторінка не існує (наприклад ?page=999) → 404
  if (page > 1 && (!posts || posts.length === 0)) notFound();

  const totalPages = Math.ceil((totalCount ?? 0) / POSTS_PER_PAGE);

  return (
    <AuthorArticlesPage
      author={author}
      posts={posts ?? []}
      currentPage={page}
      totalPages={totalPages}
      basePath={`/authors/${slug}/articles`}
    />
  );
}