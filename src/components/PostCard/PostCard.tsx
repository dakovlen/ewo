import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Categories } from "@/components/Categories/Categories";
import styles from "./PostCard.module.css";

// Використовуємо локальний тип поки typegen не оновиться
// Після `npx sanity typegen generate` можна замінити на POSTS_QUERYResult[0]
type PostCardProps = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  mainImage?: {
    asset?: unknown;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  publishedAt?: string | null;
  categories?: Array<{
    _id: string;
    slug?: { current?: string | null } | null;
    title?: string | null;
  }> | null;
  author?: {
    name?: string | null;
    slug?: { current?: string | null } | null;
    image?: {
      asset?: unknown;
      hotspot?: unknown;
      crop?: unknown;
    } | null;
  } | null;
};

export function PostCard({
  title,
  slug,
  mainImage,
  publishedAt,
  categories,
  author,
}: PostCardProps) {
  const postSlug = slug?.current;
  if (!postSlug || !title) return null;

  const imageUrl = mainImage?.asset
    ? urlFor(mainImage as Parameters<typeof urlFor>[0])
        .width(800)
        .height(450)
        .quality(80)
        .auto("format")
        .url()
    : null;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const authorSlug = author?.slug?.current;
  const authorImageUrl = author?.image?.asset
    ? urlFor(author.image as Parameters<typeof urlFor>[0])
        .width(80)
        .height(80)
        .quality(85)
        .url()
    : null;

  return (
    <article className={styles.card}>
      {/* Image */}
      {imageUrl && (
        <Link href={`/blog/${postSlug}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
          <div className={styles.imageWrap}>
            <Image
              src={imageUrl}
              alt={mainImage?.alt ?? title}
              width={800}
              height={450}
              className={styles.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        </Link>
      )}

      {/* Body */}
      <div className={styles.body}>
        {/* Categories */}
        <Categories categories={categories ?? []} />

        {/* Title */}
        <h2 className={styles.title}>
          <Link href={`/blog/${postSlug}`} className={styles.titleLink}>
            {title}
          </Link>
        </h2>

        {/* Footer — author + date */}
        <div className={styles.footer}>
          {author && (
            <div className={styles.author}>
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={author.name ?? ""}
                  width={36}
                  height={36}
                  className={styles.authorPhoto}
                />
              )}
              {/* Якщо є slug — посилання, якщо ні — просто текст */}
              {authorSlug ? (
                <Link
                  href={`/authors/${authorSlug}`}
                  className={styles.authorName}
                  rel="author"
                >
                  {author.name}
                </Link>
              ) : (
                <span className={styles.authorName}>{author.name}</span>
              )}
            </div>
          )}

          {date && (
            <time className={styles.date} dateTime={publishedAt ?? ""}>
              {date}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}