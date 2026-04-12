import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import type { LatestVideo } from "@/lib/getLatestVideo";
import { VideoThumbnail } from "./VideoThumbnail";

import styles from "./YouTubeBanner.module.css";

type Props = {
  video?: LatestVideo | null;
};

export function YouTubeBanner({ video }: Props) {
  return (
    <section className={styles.section} aria-label="YouTube channel">
      <div className={styles.decoRight} aria-hidden="true" />
      <div className={styles.decoLeft}  aria-hidden="true" />

      <div className={styles.inner}>

        <div className={styles.content}>
          <div className={styles.playCircle} aria-hidden="true">
            <div className={styles.playTriangle} />
          </div>

          <div className={styles.overline} aria-hidden="true">
            <span className={styles.overlineLine} />
            <span className={styles.overlineText}>
              ElderlyWisdom on YouTube
            </span>
          </div>

          <h2 className={styles.title}>
            New videos every week — free, warm, and made for you
          </h2>

          <p className={styles.text}>
            Real stories, gentle advice, and practical wisdom for life
            after 60. Subscribe and never miss a new episode from the
            ElderlyWisdom Mind channel.
          </p>

          <div className={styles.actions}>
            <Link
              href={siteConfig.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              aria-label="Subscribe to ElderlyWisdom on YouTube — opens in new tab"
            >
              <span aria-hidden="true">▶</span>
              Subscribe to channel
            </Link>

            <Link
              href={video?.url ?? siteConfig.announcementBarLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
              aria-label="Watch latest video — opens in new tab"
            >
              Watch latest video →
            </Link>
          </div>
        </div>

        {/* Права колонка */}
        <div className={styles.rightCol}>
          <Link
            href={video?.url ?? siteConfig.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoThumb}
            aria-label={
              video
                ? `Watch: ${video.title} — opens in new tab`
                : "Watch on YouTube — opens in new tab"
            }
          >
            {video ? (
              /*
                Реальний thumbnail з YouTube.
                Next.js Image оптимізує його автоматично.
                Додай img.youtube.com в next.config images.domains.
              */
              <VideoThumbnail
                videoId={video.id}
                title={video.title}
                className={styles.videoImage}
              />
            ) : (
              /* Fallback якщо RSS недоступний */
              <div className={styles.videoFallback}>
                <div className={styles.videoPlay}>
                  <div className={styles.videoTriangle} />
                </div>
                <span className={styles.videoLabel}>Watch on YouTube</span>
              </div>
            )}

            {/* Play overlay поверх thumbnail */}
            {video && (
              <div className={styles.videoOverlay} aria-hidden="true">
                <div className={styles.videoPlay}>
                  <div className={styles.videoTriangle} />
                </div>
              </div>
            )}

            {/* Назва відео внизу */}
            {video && (
              <div className={styles.videoTitle}>
                {video.title}
              </div>
            )}
          </Link>

          {/* <div className={styles.subsPill}>
            <span className={styles.subsDot} />
            <span className={styles.subsText}>Join</span>
            <span className={styles.subsNum}>12K+</span>
            <span className={styles.subsText}>subscribers</span>
          </div> */}
        </div>

      </div>
    </section>
  );
}