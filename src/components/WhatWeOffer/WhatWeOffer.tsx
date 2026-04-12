import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./WhatWeOffer.module.css";

const items = [
  {
    icon: "📖",
    title: "Weekly Articles",
    description:
      "Thoughtful, long-form reads on family relationships, health, wisdom, and life after 60. Written with care for the generation that built this world.",
    href: "/blog",
    label: "Browse articles",
  },
  {
    icon: "▶",
    title: "YouTube Channel",
    description:
      "Real stories and gentle advice in short video format. New episodes every week on the ElderlyWisdom Mind channel — free, always.",
    href: siteConfig.youtubeLink,
    label: "Watch on YouTube",
    external: true,
  },
  {
    icon: "📚",
    title: "Word Search Books",
    description:
      "Calming, meaningful puzzle books designed for seniors. Large print, thoughtful themes, and a quiet hour well spent. Available on Amazon.",
    href: siteConfig.amazonLink,
    label: "Browse books",
    external: true,
  },
];

export function WhatWeOffer() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Section header */}
        <div className={styles.head}>
          <span className={styles.eyebrow}>What we offer</span>
          <h2 className={styles.title}>
            Three ways to find wisdom and joy
          </h2>
          <p className={styles.subtitle}>
            Whether you prefer reading, watching, or quiet time with a book —
            ElderlyWisdom meets you where you are.
          </p>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {items.map(({ icon, title, description, href, label, external }) => (
            <div key={title} className={styles.card}>

              <div className={styles.cardIcon} aria-hidden="true">
                {icon}
              </div>

              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{description}</p>

              <Link
                href={href}
                className={styles.cardLink}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={external ? `${label} — opens in new tab` : label}
              >
                {label}
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}