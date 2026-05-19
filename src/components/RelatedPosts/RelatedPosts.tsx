"use client";

import Link from "next/link";
import { createDataAttribute } from "next-sanity";
import { POST_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { useOptimistic } from "next-sanity/hooks";
import styles from "./RelatedPosts.module.css";

const { projectId, dataset, stega } = client.config();
const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

type Props = {
  relatedPosts: NonNullable<POST_QUERYResult>["relatedPosts"];
  documentId: string;
  documentType: string;
};

export function RelatedPosts({ relatedPosts, documentId, documentType }: Props) {
  const posts = useOptimistic<
    NonNullable<POST_QUERYResult>["relatedPosts"] | undefined,
    NonNullable<POST_QUERYResult>
  >(relatedPosts, (state, action) => {
    if (action.id === documentId && action?.document?.relatedPosts) {
      return action.document.relatedPosts.map(
        (post) => state?.find((p) => p._key === post._key) ?? post
      );
    }
    return state;
  });

  if (!posts || posts.length === 0) return null;

  return (
    <aside className={styles.aside} aria-labelledby="related-heading">
      <h2 id="related-heading" className={styles.heading}>
        Related Articles
      </h2>

      <ul
        className={styles.list}
        role="list"
        data-sanity={createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: "relatedPosts",
        }).toString()}
      >
        {posts.map((post) => (
          <li
            key={post._key}
            className={styles.item}
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `relatedPosts[_key=="${post._key}"]`,
            }).toString()}
          >
            <Link
              href={`/blog/${post?.slug?.current}`}
              className={styles.link}
            >
              {post.title}
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}