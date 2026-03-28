import Link from "next/link";
import styles from "./AnnouncementBar.module.css";
import { siteConfig } from "@/lib/siteConfig";

export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.hideOnMobile}>📚 New series: </span>
      <em className={styles.title}>The Parent's Blueprint</em>
      <span className={styles.hideOnMobile}>
        {" "}— 7 videos on staying close to your adult children.
      </span>
      <Link 
        href={siteConfig.AnnouncementBarLink}
        target="_blank"
        className={styles.link}
      >
        Watch now →
      </Link>
    </div>
  );
}