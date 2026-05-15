import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: "1",
    title: "Enter Your Email",
    description:
      "Type your email address in the form below. Nothing else is needed — just your email.",
  },
  {
    number: "2",
    title: "Check Your Inbox",
    description:
      "Within a minute you will receive an email from ElderlyWisdom with a link to download your free PDF journal.",
  },
  {
    number: "3",
    title: "Print and Begin",
    description:
      "Print the journal at home — or read it on your tablet. Start Day 1 today, or whenever feels right.",
  },
] as const;

export function JournalHowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="how-heading" className={styles.heading}>
            How It Works
          </h2>
          <p className={styles.lead}>
            Getting your journal takes less than two minutes.
          </p>
        </header>

        <ol className={styles.steps} role="list">
          {STEPS.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {step.number}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}