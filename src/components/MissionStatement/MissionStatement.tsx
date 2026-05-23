// src/components/MissionStatement/MissionStatement.tsx
//
// Текстова секція: Місія + Цитата автора
// Розміщення: між <Author /> і <FreeJournalBanner /> на головній
//
// SEO-функція:
//   — Додає ~200 слів семантичного контенту на головну
//   — Підвищує text-to-HTML ratio (зараз 7.57% → ціль 15%+)
//   — Надає контекст для Google SGE та AI-пошуку (місія, аудиторія, цінності)
//   — Ключові слова природно вписані: "adults 65+", "life after 60",
//     "wisdom", "family", "senior", "meaning", "connection"

import styles from "./MissionStatement.module.css";

export function MissionStatement() {
  return (
    <section
      className={styles.section}
      aria-labelledby="mission-heading"
    >
      <div className={styles.inner}>

        {/* Overline — той самий паттерн що в Hero та Author */}
        <div className={styles.overline} aria-hidden="true">
          <span className={styles.overlineLine} />
          <span className={styles.overlineText}>Our mission</span>
          <span className={styles.overlineLine} />
        </div>

        {/* Місія */}
        <div className={styles.missionBlock}>
          <h2 id="mission-heading" className={styles.heading}>
            Why ElderlyWisdom exists
          </h2>

          <p className={styles.lead}>
            We believe that life after 60 is not a quiet ending — it is one of
            the richest, most meaningful chapters a person can live.
          </p>

          <p className={styles.body}>
            ElderlyWisdom was created for American adults 65 and older who are
            navigating the joys and complexities of this stage of life: staying
            close to grown children, finding purpose after retirement,
            maintaining health and vitality, and discovering that wisdom — real,
            hard-earned wisdom — becomes your greatest gift to the people you
            love.
          </p>

          <p className={styles.body}>
            Through thoughtful weekly articles, YouTube videos, and printable
            books, we offer a quiet place to reflect, learn, and feel seen.
            Every piece of content on this site is written with one reader in
            mind: someone who has lived a full life and knows there is still so
            much more ahead.
          </p>
        </div>

        <hr className={styles.divider} aria-hidden="true" />

        {/* Цитата автора */}
        <figure className={styles.quoteBlock} role="figure">
          <blockquote className={styles.quote}>
            "Getting older is not something that happens to you — it is
            something you get to do. Every year is an invitation to go deeper:
            deeper into relationships, deeper into faith, deeper into the person
            you have always been becoming. That is what I write about. That is
            what I believe."
          </blockquote>
          <figcaption className={styles.quoteFooter}>
            <span className={styles.quoteLine} aria-hidden="true" />
            <span className={styles.quoteAuthor}>
              Solan Voss — Author, ElderlyWisdom
            </span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
}