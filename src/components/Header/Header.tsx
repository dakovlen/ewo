import Link from "next/link";
import Image from "next/image";
import { menuItems } from "@/lib/data/menu";
import { siteConfig } from "@/lib/siteConfig";
import { AnnouncementBar } from "./AnnouncementBar/AnnouncementBar";
import { NavCloser } from "./NavCloser/NavCloser";
import { SkipLink } from "./SkipLink/SkipLink";
import styles from "./Header.module.css";

export function Header() {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />

      <div className={styles.navWrapper}>
        <nav className={styles.nav} aria-label="Main navigation">

          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.svg"
              width={200}
              height={36}
              alt="ElderlyWisdom — home"
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Burger — client компонент з aria-expanded */}
          <NavCloser />

          {/* Nav links */}
          <ul
            id="main-nav-menu"
            className={styles.navLinks}
            role="list"
          >
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={siteConfig.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Watch on YouTube, opens in new tab"
          >
            <span aria-hidden="true">▶</span>
            <span className={styles.ctaLong}>Watch on </span>
            YouTube
          </Link>

        </nav>
      </div>
    </>
  );
}