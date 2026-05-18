import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AuthorPostCard } from "@/components/AuthorsPage/AuthorPostCard/AuthorPostCard";
import { Pagination } from "@/components/Pagination/Pagination";
import styles from "./AuthorArticlesPage.module.css";

type Post = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  mainImage?: {
    asset?: { _ref: string; _type: string } | null;
    alt?: string | null;
  } | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  categories?: Array<{
    _id: string;
    slug?: { current?: string | null } | null;
    title?: string | null;
  }> | null;
};

type Author = {
  _id: string;
  name?: string | null;
  slug?: { current?: string | null } | null;
  role?: string | null;
};

type Props = {
  author: Author;
  posts: Post[];
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function AuthorArticlesPage({
  author,
  posts,
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const authorSlug = author.slug?.current ?? "";

  return (
    <main>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList} role="list">
              <li>
                <Link href="/authors" className={styles.breadcrumbLink}>
                  Authors
                </Link>
              </li>
              <li aria-hidden="true" className={styles.breadcrumbSep}>›</li>
              <li>
                <Link
                  href={`/authors/${authorSlug}`}
                  className={styles.breadcrumbLink}
                >
                  {author.name}
                </Link>
              </li>
              <li aria-hidden="true" className={styles.breadcrumbSep}>›</li>
              <li aria-current="page" className={styles.breadcrumbCurrent}>
                All Articles
              </li>
            </ol>
          </nav>

          <div className={styles.overline} aria-hidden="true">
            <span className={styles.overlineLine} />
            <span className={styles.overlineText}>Articles</span>
          </div>

          <h1 className={styles.title}>
            All Articles by{" "}
            <Link href={`/authors/${authorSlug}`} className={styles.authorLink}>
              {author.name}
            </Link>
          </h1>

          {author.role && (
            <p className={styles.role}>{author.role}</p>
          )}
        </div>
      </section>

      {/* ── Posts grid ──────────────────────────────────────────────────────── */}
      <section className={styles.postsSection} aria-label="Articles list">
        <div className={styles.postsInner}>

          {posts.length === 0 ? (
            <p className={styles.noPosts}>No articles found.</p>
          ) : (
            <>
              <ul className={styles.grid} role="list">
                {posts.map((post) => (
                  <li key={post._id}>
                    <AuthorPostCard post={post} />
                  </li>
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={basePath}
              />
            </>
          )}

        </div>
      </section>

      {/* ── Back link ───────────────────────────────────────────────────────── */}
      <div className={styles.backWrap}>
        <Link href={`/authors/${authorSlug}`} className={styles.backLink}>
          ← Back to {author.name}
        </Link>
      </div>
    </main>
  );
}