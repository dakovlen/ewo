import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { FAQPage, WithContext } from "schema-dts";

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

/**
 * Extracts plain text from a PortableText block array.
 * Used as a fallback when `text` field is empty but `body` exists.
 */
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
      // FIX: was only using f.text — if body is filled but text is empty, schema was empty.
      // Now falls back to extracting plain text from PortableText body.
      const answer =
        f.text?.trim() ||
        (f.body?.length ? ptToPlainText(f.body) : "");

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
  const faqSchema = generateFaqSchema(faqs);

  return (
    <section className="container mx-auto flex flex-col gap-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {title && (
        <h2 className="text-xl mx-auto md:text-2xl lg:text-5xl font-semibold text-slate-800 text-pretty max-w-3xl">
          {title}
        </h2>
      )}

      {Array.isArray(faqs) && faqs.length > 0 && (
        <div className="border-b border-teal-600">
          {faqs.map((faq) => (
            <details
              key={faq._id}
              className="group [&[open]]:bg-teal-50 transition-colors duration-100 px-4 border-t border-teal-600"
              name={_key}
            >
              <summary className="text-xl font-semibold text-slate-800 list-none cursor-pointer py-4 flex items-center justify-between">
                {faq.title}
                <span className="transform origin-center rotate-90 group-open:-rotate-90 transition-transform duration-200">
                  &larr;
                </span>
              </summary>
              <div className="pb-4">
                {faq.body && faq.body.length > 0 ? (
                  <PortableText value={faq.body} />
                ) : (
                  <p>{faq.text}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
