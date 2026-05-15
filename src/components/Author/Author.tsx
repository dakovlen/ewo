import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { AuthorSchema } from "@/components/schema_org/AuthorSchema";
import styles from "./Author.module.css";

/*
  Author — блок про автора.

  Семантика:
  - <article> з itemScope/itemType Person — мікродані для Google
  - <h2> — заголовок секції
  - <blockquote> — цитата автора
  - rel="author" на посиланні — зв'язок сторінки з автором
  - AuthorSchema — JSON-LD для структурованих даних

  Дані захардкоджені — Solan Voss одна конкретна людина.
  Якщо знадобиться редагування через CMS — легко перейти
  на fetch з Sanity authorType.
*/

export function Author() {
  return (
    <section className={styles.section} aria-labelledby="author-heading">
      {/* JSON-LD Schema.org Person */}
      <AuthorSchema />

      {/* Декоративна лапка — aria-hidden бо декоративна */}
      <div className={styles.decorativeQuote} aria-hidden="true">"</div>

      <div className={styles.inner}>

        {/* ── Ліва колонка — фото ── */}
        <div className={styles.photoCol}>
          <div className={styles.photoFrame}>
            {/*
              Поки placeholder.
              Коли буде реальне фото — замінити на:*/
              <Image
                src="/solan-voss.jpeg"
                alt="Solan Voss — author of ElderlyWisdom"
                fill
                className={styles.photo}
                sizes="(min-width: 1024px) 380px, 100vw"
              />
            }
            {/* <div className={styles.photoPlaceholder} aria-hidden="true">
              <span>🌿</span>
            </div> */}
          </div>

          {/* Floating tag — видимий лейбл автора */}
          <div className={styles.bioTag}>
            <strong className={styles.bioTagName}>Solan Voss</strong>
            <span className={styles.bioTagRole}>
              Author · Content Creator
            </span>
          </div>
        </div>

        {/* ── Права колонка — текст ── */}
        <article
          className={styles.textCol}
          itemScope
          itemType="https://schema.org/Person"
        >
          {/* Приховані мікродані для Google */}
          <meta itemProp="name" content="Solan Voss" />
          <meta itemProp="url" content={`${siteConfig.baseUrl}/about`} />
          <link itemProp="sameAs" href={siteConfig.youtubeLink} />
          <link itemProp="sameAs" href={siteConfig.amazonLink} />

          {/* Overline */}
          <div className={styles.overline} aria-hidden="true">
            <span className={styles.overlineLine} />
            <span className={styles.overlineText}>Meet the author</span>
          </div>

          {/* Heading */}
          <h2 id="author-heading" className={styles.title}>
            Written by someone who truly cares
          </h2>

          {/* Bio */}
          <p className={styles.bio} itemProp="description">
            Solan Voss is a thoughtful author and content creator dedicated
            to uplifting adults 60 and over. Through YouTube, Amazon books,
            and this blog, he shares practical wisdom, gentle encouragement,
            and timeless insights rooted in real life experience.
          </p>

          {/* Pull quote — blockquote семантично правильний для цитати */}
          <blockquote className={styles.pullquote} itemProp="quote">
            <p>
              "My mission is simple: to remind you that your best years
              aren't behind you — they're unfolding right now."
            </p>
          </blockquote>

          {/* CTA */}
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
          </div>

        </article>
      </div>
    </section>
  );
}