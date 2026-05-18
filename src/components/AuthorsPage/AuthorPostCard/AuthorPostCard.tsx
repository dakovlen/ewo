import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import styles from "./AuthorPostCard.module.css";

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

type Props = {
  post: Post;
  featured?: boolean;
};

export function AuthorPostCard({ post, featured = false }: Props) {
  const slug = post.slug?.current;
  if (!slug || !post.title) return null;

  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(600).height(380).quality(80).auto("format").url()
    : null;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const firstCategory = post.categories?.[0];

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      {/* Image */}
      <Link href={`/blog/${slug}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrap}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              width={600}
              height={380}
              className={styles.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true">📖</div>
          )}
          {featured && (
            <span className={styles.featuredBadge}>Featured</span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className={styles.body}>
        {firstCategory?.title && firstCategory.slug?.current && (
          <Link href={`/category/${firstCategory.slug.current}`} className={styles.category}>
            {firstCategory.title}
          </Link>
        )}

        <h3 className={styles.title}>
          <Link href={`/blog/${slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}

        {date && (
          <time className={styles.date} dateTime={post.publishedAt ?? ""}>
            {date}
          </time>
        )}
      </div>
    </article>
  );
}