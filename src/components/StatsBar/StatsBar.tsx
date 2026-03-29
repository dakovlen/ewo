import styles from "./StatsBar.module.css";

const stats = [
  { number: "60+",  label: "Articles published"  },
  { number: "5",    label: "Books on Amazon"      },
  { number: "12K+", label: "Monthly readers"      },
  { number: "3+",   label: "Years of wisdom"      },
];

export function StatsBar() {
  return (
    <section className={styles.section} aria-label="Site statistics">
      <div className={styles.inner}>
        {stats.map(({ number, label }, index) => (
          <>
            <div key={number} className={styles.stat}>
              <span className={styles.number}>{number}</span>
              <span className={styles.label}>{label}</span>
            </div>

            {/* Вертикальний розділювач між цифрами — не після останньої */}
            {index < stats.length - 1 && (
              <div className={styles.divider} aria-hidden="true" />
            )}
          </>
        ))}
      </div>
    </section>
  );
}