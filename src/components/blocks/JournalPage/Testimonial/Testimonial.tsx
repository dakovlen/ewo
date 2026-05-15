import styles from "./Testimonial.module.css";

export function JournalTestimonial() {
  return (
    <section className={styles.section} aria-label="Reader testimonial">
      <div className={styles.container}>
        <figure className={styles.figure}>
          <span className={styles.decorativeQuote} aria-hidden="true">&ldquo;</span>

          <blockquote className={styles.quote} cite="">
            <p>
              My daughter and I hadn&rsquo;t talked — really talked — in years.
              We sat down with Day&nbsp;4 of this journal on a Sunday afternoon
              and ended up going through old photo albums together. She cried. I
              cried. It was the best afternoon we&rsquo;ve had since her father
              passed. I didn&rsquo;t expect a little PDF to do that.
            </p>
          </blockquote>

          <figcaption className={styles.attribution}>
            <strong className={styles.name}>Margaret, 71</strong>
            <span className={styles.location}>Columbus, Ohio</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}