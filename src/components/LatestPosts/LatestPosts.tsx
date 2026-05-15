import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import styles from "./LatestPosts.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = {
  _id: string;
  title: string | null;
  slug?: { current: string | null } | null;
};

type Post = {
  _id: string;
  title: string | null;
  slug: { current: string };
  excerpt?: string | null;
  mainImage?: any;
  categories?: Category[] | null;
};

type Props = {
  posts: Post[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export function LatestPosts({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section className={styles.section} aria-labelledby="latest-posts-heading">
      <div className={styles.container}>

        <header className={styles.header}>
          <h2 id="latest-posts-heading" className={styles.heading}>
            Latest Articles
          </h2>
          <p className={styles.lead}>
            Thoughtful reads on family, health, wisdom, and life after 60.
          </p>
        </header>

        <ol className={styles.grid} role="list">
          {posts.map((post) => (
            <li key={post._id} className={styles.card}>
              <article>
                {/* Image */}
                {post.mainImage && (
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className={styles.imageLink}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={urlFor(post.mainImage).width(600).height(360).url()}
                        alt={post.mainImage?.alt || post.title || ""}
                        fill
                        className={styles.image}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </Link>
                )}

                <div className={styles.body}>
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className={styles.categories}>
                      {post.categories.map((cat) => {
                        if (!cat.slug?.current || !cat.title) return null;
                        return (
                          <Link
                            key={cat._id}
                            href={`/category/${cat.slug.current}`}
                            className={styles.categoryTag}
                          >
                            {cat.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={styles.title}>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className={styles.titleLink}
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}</p>
                  )}

                  {/* Read more */}
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className={styles.readMore}
                    aria-label={`Read more: ${post.title}`}
                  >
                    Read more
                    <svg
                      width="14" height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/blog" className={styles.ctaButton}>
            All articles
          </Link>
        </div>

      </div>
    </section>
  );
}