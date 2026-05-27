// src/components/MissionStatement/MissionStatement.tsx
//
// Текстова секція: Місія + Цитата автора
// Розміщення: між <Author /> і <FreeJournalBanner /> на головній
//
// SEO-функція:
//   — Додає ~400 слів семантичного контенту на головну
//   — Підвищує text-to-HTML ratio (зараз 7.57% → ціль 15%+)
//   — Надає контекст для Google SGE та AI-пошуку (місія, аудиторія, цінності)
//   — Ключові слова природно вписані: "adults 65+", "life after 60",
//     "wisdom", "family", "senior", "meaning", "connection", "health",
//     "retirement", "purpose", "books", "YouTube", "articles"

import styles from "./MissionStatement.module.css";

export function MissionStatement() {
  return (
    <section
      className={styles.section}
      aria-labelledby="mission-heading"
    >
      <div className={styles.inner}>

        {/* Overline */}
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
            the richest, most meaningful chapters a person can live. The years
            after retirement carry a depth of experience, perspective, and love
            that only time can build.
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
            We know that the questions you carry at this stage are not small
            ones. How do I stay connected to my adult children when life pulls
            everyone in different directions? How do I find meaning now that my
            role has changed? How do I take care of my body and mind so I can
            be present for the people who matter most? These are the questions
            ElderlyWisdom is built to help you explore — with honesty, warmth,
            and the kind of practical wisdom that actually fits your life.
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

        {/* Три цінності */}
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon} aria-hidden="true">📖</span>
            <h3 className={styles.valueTitle}>Honest writing</h3>
            <p className={styles.valueText}>
              Every article is written with care and grounded in real
              experience. We do not chase trends — we write about what
              genuinely matters to people in their sixties, seventies, and
              beyond: family, faith, health, purpose, and joy.
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon} aria-hidden="true">🤝</span>
            <h3 className={styles.valueTitle}>Real connection</h3>
            <p className={styles.valueText}>
              We believe that the relationships you invest in today — with
              your children, grandchildren, and community — are the legacy
              that outlasts everything else. Our content helps you nurture
              those bonds at every stage.
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon} aria-hidden="true">🌿</span>
            <h3 className={styles.valueTitle}>Quiet wisdom</h3>
            <p className={styles.valueText}>
              There is no noise here. ElderlyWisdom is a calm, thoughtful
              corner of the internet designed for people who value depth over
              distraction — and who know that the best insights often come
              slowly, with age.
            </p>
          </div>
        </div>

        <hr className={styles.divider} aria-hidden="true" />

        {/* Цитата автора */}
        <figure className={styles.quoteBlock}>
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