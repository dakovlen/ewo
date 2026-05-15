import Link from "next/link";
import Image from "next/image";
import { menuItems }   from "@/lib/data/menu";
import { siteConfig }  from "@/lib/siteConfig";
import { socialLinks } from "@/lib/socialLinks";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { SubscribeForm } from "./SubscribeForm/SubscribeForm";
import styles from "./Footer.module.css";

type FooterCategory = {
  _id: string;
  title: string | null;
  slug: {
    current: string | null;
  } | null;
};

export async function Footer() {
  const categories = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
    revalidate: 3600,
    tags: ["category"],
  });

  const year = new Date().getFullYear();

  return (
    <>
      {/* <SubscribeForm /> */}

      <footer className={styles.footer} aria-label="Site footer">
        <div className={styles.inner}>
          <div className={styles.grid}>

            {/* Brand */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logoLink} aria-label="ElderlyWisdom — home">
                <Image
                  src="/logo-white.svg"
                  width={200}
                  height={40}
                  alt="ElderlyWisdom"
                  className={styles.logoImage}
                />
              </Link>

              <p className={styles.tagline}>
                {siteConfig.description}
              </p>

              <div className={styles.socials} role="list" aria-label="Social media links">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    role="listitem"
                    aria-label={`${label} — opens in new tab`}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className={styles.socialLink}
                  >
                    <Icon className={styles.socialIcon} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div className={styles.column}>
              <p className={styles.columnTitle}>Navigate</p>
              <ul className={styles.columnList} role="list">
                {menuItems.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={styles.columnLink}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {categories && categories.length > 0 && (
              <div className={styles.column}>
                <p className={styles.columnTitle}>Topics</p>
                <ul className={styles.columnList} role="list">
                  {(categories as FooterCategory[]).map((cat) => {
        
                    if (!cat.slug?.current || !cat.title) return null;

                    return (
                      <li key={cat._id}>
                        <Link
                          href={`/category/${cat.slug.current}`}
                          className={styles.columnLink}
                        >
                          {cat.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Connect */}
            <div className={styles.column}>
              <p className={styles.columnTitle}>Connect</p>
              <ul className={styles.columnList} role="list">
                {[
                  { label: "YouTube Channel", href: siteConfig.youtubeLink,   external: true  },
                  { label: "Amazon Books",    href: siteConfig.amazonLink,    external: true  },
                  { label: "Pinterest",       href: siteConfig.pinterestLink, external: true  },
                  { label: "Facebook Group",  href: siteConfig.fbLink,        external: true  },
                  { label: "Email Us",        href: `mailto:${siteConfig.mailLink}`, external: false },
                ].map(({ label, href, external }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={styles.columnLink}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <hr className={styles.divider} />

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              ElderlyWisdom.org © {year} · All rights reserved
            </p>
            <div className={styles.legal}>
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.legalLink}>Terms of Use</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}