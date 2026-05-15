import styles from "./Topics.module.css";

const TOPICS = [
  {
    day: "Day 1",
    theme: "Presence",
    emoji: "🌿",
    description:
      "Set aside distractions and simply be together. A shared moment, fully lived, can mean more than a hundred rushed conversations.",
  },
  {
    day: "Day 2",
    theme: "Love",
    emoji: "❤️",
    description:
      "When did you last say it clearly, without rushing? Today's prompts help you express what the heart so often keeps silent.",
  },
  {
    day: "Day 3",
    theme: "Forgiveness",
    emoji: "🕊️",
    description:
      "Old hurts can quietly grow between people who love each other. This day offers gentle words to begin letting them go.",
  },
  {
    day: "Day 4",
    theme: "Sharing Memories",
    emoji: "📷",
    description:
      "Your stories are irreplaceable. Walk through a cherished memory together and give it a second life in words.",
  },
  {
    day: "Day 5",
    theme: "Listening",
    emoji: "👂",
    description:
      "Truly listening — without fixing or advising — is one of the greatest gifts we can give. Today you practise just that.",
  },
  {
    day: "Day 6",
    theme: "Gratitude",
    emoji: "🌻",
    description:
      "Name what you are thankful for — in each other, in the life you have shared, and in today itself.",
  },
  {
    day: "Day 7",
    theme: "Legacy",
    emoji: "📖",
    description:
      "What do you want the people you love to remember? What wisdom, what values, what love do you wish to leave behind?",
  },
] as const;

export function JournalTopics() {
  return (
    <section className={styles.section} aria-labelledby="topics-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="topics-heading" className={styles.heading}>
            What&rsquo;s Inside the Journal
          </h2>
          <p className={styles.lead}>
            Seven days. Seven themes. Each one designed to open a door that may
            have been closed for a while.
          </p>
        </header>

        <ol className={styles.grid} role="list">
          {TOPICS.map((topic) => (
            <li key={topic.day} className={styles.card}>
              <span className={styles.emoji} aria-hidden="true" role="presentation">
                {topic.emoji}
              </span>
              <p className={styles.dayLabel}>{topic.day}</p>
              <h3 className={styles.theme}>{topic.theme}</h3>
              <p className={styles.description}>{topic.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}