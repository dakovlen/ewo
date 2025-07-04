import React from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "next-sanity";
import { components as baseComponents } from "@/sanity/portableTextComponents";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Categories } from "@/components/Categories";
import { Author } from "@/components/Author";
import { PublishedAt } from "@/components/PublishedAt";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";

import { extractHeadings, generateId } from "@/utils/extractHeadings";
import { TableOfContents } from "@/components/TableOfContents";

type HeadingLevel = 2 | 3 | 4;

interface HeadingWithIdProps {
  children: React.ReactNode;
  level: HeadingLevel;
}

function HeadingWithId({ children, level }: HeadingWithIdProps) {
  // Функція для вилучення тексту з children рекурсивно, щоб коректно працювати з React-елементами
  function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) return extractText(node.props.children);
    return "";
  }

  const text = extractText(children);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag id={generateId(text)}>{children}</Tag>;
}

// Визначимо тип extended components строго, щоб не втрачати підказки IDE
const createExtendedComponents = (base: PortableTextComponents) => ({
  ...base,
  block: {
    ...base.block,
    h2: (props: { children: React.ReactNode }) => <HeadingWithId level={2} {...props} />,
    h3: (props: { children: React.ReactNode }) => <HeadingWithId level={3} {...props} />,
    h4: (props: { children: React.ReactNode }) => <HeadingWithId level={4} {...props} />,
  },
});

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
  } = props;

  const headings = extractHeadings(body);
  const extendedComponents = createExtendedComponents(baseComponents);

  return (
    <article className="mx-auto p-4 space-y-8">
      <header className="flex flex-col gap-4 items-start">
        <div className="flex flex-wrap gap-4 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>

      {mainImage && (
        <figure className="w-full">
          <Image
            src={urlFor(mainImage).width(800).height(400).url()}
            width={800}
            height={400}
            alt={title}
            className="rounded-lg object-center w-full"
            priority
          />
        </figure>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <TableOfContents headings={headings} />
        <section className="lg:col-span-9 prose lg:prose-lg">
          <PortableText value={body} components={extendedComponents} />
          <RelatedPosts
            relatedPosts={relatedPosts}
            documentId={_id}
            documentType="post"
          />
        </section>
      </div>
    </article>
  );
}
