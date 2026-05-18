import React from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "next-sanity";
import { components as baseComponents } from "@/sanity/portableTextComponents";
import { RelatedPosts } from "@/components/RelatedPosts/RelatedPosts";
import { Categories } from "@/components/Categories/Categories";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents";
import { PostAuthorCard } from "@/components/Post/PostAuthorCard/PostAuthorCard";
import { VideoSchema } from "@/components/schema_org/VideoSchema";
import { urlFor } from "@/sanity/lib/image";
import { generateArticleSchema } from "@/utils/generateArticleSchema";
import { extractHeadings, generateId } from "@/utils/extractHeadings";
import { siteConfig } from "@/lib/siteConfig";
import { POST_QUERYResult } from "@/sanity/types";
import styles from "./Post.module.css";

// ── Heading з anchor id ────────────────────────────────────────────────────────
type HeadingLevel = 2 | 3 | 4;

function HeadingWithId({
  children,
  level,
}: {
  children: React.ReactNode;
  level: HeadingLevel;
}) {
  function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) return extractText((node.props as { children?: React.ReactNode }).children);
    return "";
  }

  const text = extractText(children);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag id={generateId(text)}>{children}</Tag>;
}

// ── Extended PortableText components ──────────────────────────────────────────
const extendedComponents: PortableTextComponents = {
  ...baseComponents,
  types: {
    ...(baseComponents.types || {}),
    htmlBlock: ({ value }) => (
      <div dangerouslySetInnerHTML={{ __html: value.code }} />
    ),
  },
  block: {
    ...(baseComponents.block || {}),
    h2: (props) => <HeadingWithId level={2}>{props.children}</HeadingWithId>,
    h3: (props) => <HeadingWithId level={3}>{props.children}</HeadingWithId>,
    h4: (props) => <HeadingWithId level={4}>{props.children}</HeadingWithId>,
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function Post(props: NonNullable<POST_QUERYResult>) {
  const {
    _id,
    title,
    author,
    mainImage,
    body,
    publishedAt,
    categories,
    relatedPosts,
    slug,
    seo,
  } = props;

  const headings = extractHeadings(body as Parameters<typeof extractHeadings>[0]);

  const pageUrl = slug?.current
    ? `${siteConfig.baseUrl}/blog/${slug.current}`
    : undefined;

  const articleSchema = generateArticleSchema({
    _id,
    title: title ?? "",
    publishedAt: publishedAt ?? "",
    author: author as Parameters<typeof generateArticleSchema>[0]["author"],
    mainImage,
    slug: slug ?? undefined,
    seo: seo ?? undefined,
  });

  const mainImageUrl = mainImage
    ? urlFor(mainImage).width(1200).height(630).quality(90).auto("format").url()
    : null;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className={styles.article}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <VideoSchema
        body={body}
        pageUrl={pageUrl}
        defaultTitle={title}
        defaultDescription={seo?.description}
        defaultUploadDate={publishedAt}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>

          {/* Categories + Date */}
          <div className={styles.meta}>
            <Categories categories={categories} />
            {date && (
              <time className={styles.date} dateTime={publishedAt ?? ""}>
                {date}
              </time>
            )}
          </div>

          {/* Title */}
          {title && <h1 className={styles.title}>{title}</h1>}

          {/* Author byline */}
          {author?.name && (
            <div className={styles.byline}>
              {author.image && (
                <Image
                  src={urlFor(author.image).width(72).height(72).quality(85).url()}
                  alt=""
                  width={36}
                  height={36}
                  className={styles.bylinePhoto}
                />
              )}
              <span className={styles.bylineText}>
                By{" "}
                {(author as { slug?: { current?: string | null } | null }).slug?.current ? (
                  <a
                    href={`/authors/${(author as { slug?: { current?: string | null } | null }).slug?.current}`}
                    className={styles.bylineLink}
                    rel="author"
                  >
                    {author.name}
                  </a>
                ) : (
                  <span>{author.name}</span>
                )}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Hero image ────────────────────────────────────────────────────── */}
      {mainImageUrl && (
        <div className={styles.heroImage}>
          <Image
            src={mainImageUrl}
            alt={(mainImage as { alt?: string | null })?.alt ?? title ?? ""}
            width={1200}
            height={630}
            className={styles.heroImg}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </div>
      )}

      {/* ── Content grid: TOC + Body ───────────────────────────────────────── */}
      <div className={styles.contentGrid}>
        <TableOfContents headings={headings} />

        <div className={styles.body}>
          <PortableText value={body} components={extendedComponents} />

          {/* Author card після тексту */}
          {author && (
            <PostAuthorCard author={author as Parameters<typeof PostAuthorCard>[0]["author"]} />
          )}

          {/* Related posts */}
          <RelatedPosts
            relatedPosts={relatedPosts}
            documentId={_id}
            documentType="post"
          />
        </div>
      </div>
    </article>
  );
}