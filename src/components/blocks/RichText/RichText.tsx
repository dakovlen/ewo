import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";
import styles from "./RichText.module.css";

type Props = {
  content?: Parameters<typeof PortableText>[0]["value"];
};

export function RichText({ content }: Props) {
  if (!content) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <PortableText value={content} components={components} />
      </div>
    </section>
  );
}