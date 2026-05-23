import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import styles from "./PostAuthorCard.module.css";

type Author = {
  name?: string | null;
  slug?: { current?: string | null } | null;
  image?: {
    asset?: unknown;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
};

type Props = {
  author: Author;
};

export function PostAuthorCard({ author }: Props) {
  if (!author?.name) return null;

  const slug = author.slug?.current;
  const imageUrl = author.image?.asset
    ? urlFor(author.image as Parameters<typeof urlFor>[0])
        .width(96)
        .height(96)
        .quality(85)
        .url()
    : null;

  const inner = (
    <>
      <span className={styles.label}>Written by</span>

      <div className={styles.identity}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={author.name ?? ""}
            width={48}
            height={48}
            className={styles.photo}
            style={{ width: 48, height: 48 }}
          />
        )}
        <span className={styles.name}>{author.name}</span>
      </div>

      {slug && (
        <span className={styles.cta} aria-hidden="true">
          View full profile →
        </span>
      )}
    </>
  );

  return (
    <aside className={styles.aside}>
      {slug ? (
        <Link
          href={`/authors/${slug}`}
          className={styles.card}
          rel="author"
          aria-label={`${author.name} — view author profile`}
        >
          {inner}
        </Link>
      ) : (
        <div className={styles.card}>{inner}</div>
      )}
    </aside>
  );
}