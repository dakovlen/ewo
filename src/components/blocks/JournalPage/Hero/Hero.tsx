import styles from "./Hero.module.css";

export function JournalHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>

        {/* Overline — дві золоті лінії, як на головній сторінці */}
        <div className={styles.overline} aria-hidden="true">
          <span className={styles.overlineLine} />
          <span className={styles.overlineText}>Free Gift for You</span>
          <span className={styles.overlineLine} />
        </div>

        <h1 id="hero-heading" className={styles.title}>
          7 Days Closer{" "}
          <em className={styles.titleAccent}>to Family</em>
        </h1>

        <p className={styles.lead}>
          A gentle journal that helps you start real conversations — and
          rediscover the joy of being truly present with the people you love
          most.
        </p>

        <p className={styles.body}>
          Seven short daily prompts covering presence, love, forgiveness, shared
          memories, listening, gratitude, and the legacy you want to leave.
          Print it at home. No login. No app. Just you and your family.
        </p>

        {/* CTA — стрілка вниз до форми */}
        <a href="#get-journal" className={styles.cta} aria-label="Scroll down to get the free journal">
          <span>Get the Free Journal</span>
          <svg
            width="18" height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>

      </div>

      {/* Хвиля-перехід */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" focusable="false" role="presentation">
          <path d="M0,28 Q360,0 720,28 Q1080,56 1440,28 L1440,56 L0,56 Z" fill="var(--ew-cream-mid)" />
        </svg>
      </div>
    </section>
  );
}