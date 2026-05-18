import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/siteConfig";
import { AuthorSchema } from "@/components/schema_org/AuthorSchema";
import styles from "./Author.module.css";

const DEFAULT_IMAGE = "/solan_pinterest.png";
const DEFAULT_NAME = "Solan Voss";
const DEFAULT_ROLE = "Author · Content Creator";
const DEFAULT_SLUG = "solan-voss";

export async function Author() {
  let authorImageUrl: string | null = null;
  let authorName = DEFAULT_NAME;
  let authorRole = DEFAULT_ROLE;
  let authorSlug = DEFAULT_SLUG;

  try {
    const { data: author } = await sanityFetch({
      query: HOMEPAGE_AUTHOR_QUERY,
    });

    if (author?.name) authorName = author.name;
    if (author?.role) authorRole = author.role;
    if (author?.slug?.current) authorSlug = author.slug.current;

    if (author?.image?.asset) {
      authorImageUrl = urlFor(author.image)
        .width(760)
        .height(1013)
        .quality(90)
        .auto("format")
        .url();
    }
  } catch {
    // Sanity недоступний — fallback на defaults, сторінка не падає
  }

  const imageSrc = authorImageUrl ?? DEFAULT_IMAGE;
  const authorPageUrl = `/authors/${authorSlug}`;

  return (
    <section className={styles.section} aria-labelledby="author-heading">
      <AuthorSchema />

      <div className={styles.decorativeQuote} aria-hidden="true">"</div>

      <div className={styles.inner}>

        {/* ── Ліва колонка — фото ── */}
        <div className={styles.photoCol}>
          {/*
            Одне посилання охоплює фото.
            aria-label — повний опис для screen readers.
            bioTag — aria-hidden, бо це візуальний дублікат імені з aria-label.
            tabIndex не потрібен — <a> фокусується за замовчуванням.
          */}
          <Link
            href={authorPageUrl}
            className={styles.photoLink}
            rel="author"
            aria-label={`${authorName}, ${authorRole} — view author page`}
          >
            <div className={styles.photoFrame}>
              <Image
                src={imageSrc}
                alt=""
                width={380}
                height={507}
                className={styles.photo}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, calc(100vw - 80px)"
              />
            </div>

            {/* aria-hidden — інформація вже є в aria-label посилання */}
            <div className={styles.bioTag} aria-hidden="true">
              <strong className={styles.bioTagName}>{authorName}</strong>
              <span className={styles.bioTagRole}>{authorRole}</span>
            </div>
          </Link>
        </div>

        {/* ── Права колонка — текст ── */}
        <article
          className={styles.textCol}
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content={authorName} />
          <meta itemProp="url" content={`${siteConfig.baseUrl}${authorPageUrl}`} />
          <link itemProp="sameAs" href={siteConfig.youtubeLink} />
          <link itemProp="sameAs" href={siteConfig.amazonLink} />

          <div className={styles.overline} aria-hidden="true">
            <span className={styles.overlineLine} />
            <span className={styles.overlineText}>Meet the author</span>
          </div>

          <h2 id="author-heading" className={styles.title}>
            Written by someone who truly cares
          </h2>

          <p className={styles.bio} itemProp="description">
            Solan Voss is a thoughtful author and content creator dedicated
            to uplifting adults 60 and over. Through YouTube, Amazon books,
            and this blog, he shares practical wisdom, gentle encouragement,
            and timeless insights rooted in real life experience.
          </p>

          <blockquote className={styles.pullquote} itemProp="quote">
            <p>
              "My mission is simple: to remind you that your best years
              aren't behind you — they're unfolding right now."
            </p>
          </blockquote>

          <div className={styles.actions}>
            <Link
              href={siteConfig.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              aria-label="See Solan Voss books on Amazon — opens in new tab"
            >
              <span aria-hidden="true">📚</span>
              See Books on Amazon
            </Link>

            <Link
              href={siteConfig.youtubeLink}
              target="_blank"
              rel="noopener noreferrer author"
              className={styles.btnOutline}
              aria-label="Watch Solan Voss on YouTube — opens in new tab"
            >
              <span aria-hidden="true">▶</span>
              Watch on YouTube
            </Link>

            <Link
              href={authorPageUrl}
              className={styles.btnGhost}
              rel="author"
            >
              About {authorName} →
            </Link>
          </div>

        </article>
      </div>
    </section>
  );
}