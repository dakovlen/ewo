import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./Hero.module.css";

type HeroProps = {
  title?: string;
  text?: PortableTextBlock[];
  image?: SanityImageSource;
};

const DEFAULT_TITLE = "Stories and wisdom for a life well lived";
const DEFAULT_TEXT  = "Inspiring articles and weekly content for Americans 65+ who seek meaning, connection, and joy in every chapter of life.";

export function Hero({ title, text }: HeroProps = {}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Overline з двома золотими лініями */}
        <div className={styles.overline} aria-hidden="true">
          <span className={styles.overlineLine} />
          <span className={styles.overlineText}>Wisdom for life after 60</span>
          <span className={styles.overlineLine} />
        </div>

        {/* Заголовок */}
        <h1 className={styles.title}>
          {title ?? DEFAULT_TITLE}
        </h1>

        {/* Текст */}
        {text ? (
          <div className={styles.text}>
            <PortableText value={text} />
          </div>
        ) : (
          <p className={styles.text}>{DEFAULT_TEXT}</p>
        )}

        {/* CTA кнопки */}
        <div className={styles.actions}>
          <Link
            href={siteConfig.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
            aria-label="Watch ElderlyWisdom on YouTube — opens in new tab"
          >
            <span aria-hidden="true">▶</span>
            Watch on YouTube
          </Link>

          {/* <Link href="/blog" className={styles.ctaSecondary}>
            Browse articles
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link> */}
        </div>

        {/* Статистика */}
        {/* <div className={styles.stats} aria-label="Site statistics">
          {[
            { number: "60+",  label: "Articles" },
            { number: "5",    label: "Books"    },
            { number: "12K+", label: "Readers"  },
          ].map(({ number, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNumber}>{number}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
}