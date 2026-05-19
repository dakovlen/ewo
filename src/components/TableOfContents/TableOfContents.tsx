"use client";

import React from "react";
import { Heading } from "@/utils/extractHeadings";
import styles from "./TableOfContents.module.css";

type Props = {
  headings: Heading[];
};

export function TableOfContents({ headings }: Props) {
  if (headings.length === 0) return null;

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className={styles.nav}
      aria-label="Table of Contents"
    >
      <p className={styles.heading}>Contents</p>
      <ul className={styles.list} role="list">
        {headings.map(({ text, level, id }) => (
          <li
            key={id}
            className={styles.item}
            style={{ paddingInlineStart: `${(level - 2) * 12}px` }}
          >
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className={styles.link}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}