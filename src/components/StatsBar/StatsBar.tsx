import { Fragment } from "react";
import styles from "./StatsBar.module.css";

const stats = [
  { number: "Weekly",  label: "New content"       },
  { number: "Free",    label: "Articles & videos" },
  { number: "60+",     label: "Written for ages"  },
];

export function StatsBar() {
  return (
    <section className={styles.section} aria-label="Site statistics">
      <div className={styles.inner}>
        {stats.map(({ number, label }, index) => (
         <Fragment key={number}>
            <div className={styles.stat}>
              <span className={styles.number}>{number}</span>
              <span className={styles.label}>{label}</span>
            </div>

            {/* Вертикальний розділювач між цифрами — не після останньої */}
            {index < stats.length - 1 && (
              <div className={styles.divider} aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}