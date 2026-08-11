import styles from "./Testimonials.module.css";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

/*
  ВАЖЛИВО: заміни на РЕАЛЬНІ відгуки перед деплоєм.
  Джерела: коментарі під YouTube відео, email від читачів,
  повідомлення в соцмережах. Fake відгуки шкодять AdSense
  і довірі — Google їх виявляє.
*/
const testimonials: Testimonial[] = [
  {
    quote:
      "I found this channel after my husband passed, and the videos gave me a reason to smile again. It feels like talking to a good friend who understands exactly what I'm going through.",
    name: "Margaret T.",
    detail: "Reader, age 71",
  },
  {
    quote:
      "The article on reconnecting with adult children changed something for me. I called my son that same evening. We talked for two hours — the first real conversation in years.",
    name: "Robert H.",
    detail: "Reader, age 68",
  },
  {
    quote:
      "Finally, content that treats us as capable, thoughtful people — not as fragile or forgetful. The word search books are wonderful, and the advice is genuinely useful.",
    name: "Dorothy K.",
    detail: "Reader, age 74",
  },
];

export function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>

        <div className={styles.head}>
          <span className={styles.eyebrow}>What readers say</span>
          <h2 id="testimonials-heading" className={styles.title}>
            Stories from our community
          </h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <figure key={item.name} className={styles.card}>
              <div className={styles.quoteMark} aria-hidden="true">"</div>

              <blockquote className={styles.quote}>
                {item.quote}
              </blockquote>

              <figcaption className={styles.author}>
                <span className={styles.authorName}>{item.name}</span>
                <span className={styles.authorDetail}>{item.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}