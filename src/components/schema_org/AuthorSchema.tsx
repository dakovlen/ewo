import { siteConfig } from "@/lib/siteConfig";
import { WithContext, Person } from "schema-dts";

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Solan Voss",
  url: `${siteConfig.baseUrl}/about`,
  image: `${siteConfig.baseUrl}/solan-voss.jpg`,
  jobTitle: "Author & Content Creator",
  description:
    "Solan Voss is an author and content creator dedicated to uplifting adults 60 and over through books, videos, and articles.",
  sameAs: siteConfig.sameAs,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  },
};

export function AuthorSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
}