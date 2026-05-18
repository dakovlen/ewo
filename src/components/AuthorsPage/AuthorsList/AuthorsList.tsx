import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import styles from "./AuthorsList.module.css";

type Author = {
  _id: string;
  name?: string | null;
  slug?: { current?: string | null } | null;
  role?: string | null;
  image?: {
    asset?: { _ref: string; _type: string } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  shortBio?: string | null;
  expertise?: string[] | null;
  postCount?: number | null;
};

type Props = {
  authors: Author[];
};

export function AuthorsList({ authors }: Props) {
  // ── Порожній стан ─────────────────────────────────────────────
  if (authors.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Our authors are coming soon. Stay tuned!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="authors-heading">
      <div className={styles.inner}>
        <h2 id="authors-heading" className={styles.srOnly}>
          All Authors
        </h2>

        <ul className={styles.grid} role="list">
          {authors.map((author) => {
            const slug = author.slug?.current;

            // Пропускаємо автора без slug або імені — не рендеримо broken картку
            if (!slug || !author.name) return null;

            const imageUrl = author.image?.asset
              ? urlFor(author.image)
                  .width(400)
                  .height(500)
                  .quality(85)
                  .auto("format")
                  .url()
              : null;

            const postCount = author.postCount ?? 0;

            return (
              <li key={author._id}>
                <Link
                  href={`/authors/${slug}`}
                  className={styles.card}
                  aria-label={`Read more about ${author.name}`}
                >
                  {/* Photo */}
                  <div className={styles.photoWrap}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${author.name}${author.role ? ` — ${author.role}` : ""}`}
                        width={400}
                        height={500}
                        className={styles.photo}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className={styles.photoPlaceholder} aria-hidden="true">
                        🌿
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.info}>
                    {author.role && (
                      <span className={styles.role}>{author.role}</span>
                    )}

                    <strong className={styles.name}>{author.name}</strong>

                    {author.shortBio && (
                      <p className={styles.bio}>{author.shortBio}</p>
                    )}

                    {author.expertise && author.expertise.length > 0 && (
                      <ul
                        className={styles.tags}
                        role="list"
                        aria-label="Areas of expertise"
                      >
                        {author.expertise.slice(0, 3).map((tag) => (
                          <li key={tag} className={styles.tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className={styles.cta} aria-hidden="true">
                      {postCount > 0
                        ? `${postCount} article${postCount === 1 ? "" : "s"} →`
                        : "View profile →"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}