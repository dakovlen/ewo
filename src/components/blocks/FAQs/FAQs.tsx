import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { FAQPage, WithContext } from "schema-dts";
import styles from "./FAQs.module.css";

type FAQItem = {
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  text: string;
};

type FAQsProps = {
  _key?: string;
  title?: string;
  faqs?: FAQItem[];
};

function ptToPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return (block.children as { text?: string }[])
        .map((child) => child.text ?? "")
        .join("");
    })
    .join(" ")
    .trim();
}

function generateFaqSchema(faqs: FAQItem[] | undefined): WithContext<FAQPage> {
  const mainEntity = (faqs ?? [])
    .map((f) => {
      const name = f.title?.trim();
      const answer =
        f.text?.trim() || (f.body?.length ? ptToPlainText(f.body) : "");

      if (!name || !answer) return null;

      return {
        "@type": "Question" as const,
        name,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: answer,
        },
      };
    })
    .filter(Boolean) as NonNullable<WithContext<FAQPage>["mainEntity"]>;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function FAQs({ _key, title, faqs }: FAQsProps) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  const faqSchema = generateFaqSchema(faqs);

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className={styles.inner}>
        {title && (
          <div className={styles.head}>
            <span className={styles.eyebrow}>Frequently asked</span>
            <h2 id="faq-heading" className={styles.title}>
              {title}
            </h2>
          </div>
        )}

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <details
              key={faq._id}
              className={styles.item}
              name={_key}
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className={styles.question}>
                <span>{faq.title}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>

              <div className={styles.answer}>
                {faq.body && faq.body.length > 0 ? (
                  <PortableText value={faq.body} />
                ) : (
                  <p>{faq.text}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}