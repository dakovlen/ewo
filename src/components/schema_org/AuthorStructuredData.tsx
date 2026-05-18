import { siteConfig } from "@/lib/siteConfig";

type Author = {
  name?: string | null;
  role?: string | null;
  shortBio?: string | null;
  socialLinks?: {
    youtube?: string | null;
    amazon?: string | null;
    pinterest?: string | null;
    x?: string | null;
    facebook?: string | null;
  } | null;
};

type Props = {
  author: Author;
  authorUrl: string;
};

export function AuthorStructuredData({ author, authorUrl }: Props) {
  const sameAs = [
    author.socialLinks?.youtube,
    author.socialLinks?.amazon,
    author.socialLinks?.pinterest,
    author.socialLinks?.x,
    author.socialLinks?.facebook,
  ].filter(Boolean) as string[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name ?? "",
      "url": authorUrl,
      "jobTitle": author.role ?? "",
      "description": author.shortBio ?? "",
      "worksFor": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.baseUrl,
      },
      ...(sameAs.length > 0 && { "sameAs": sameAs }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}