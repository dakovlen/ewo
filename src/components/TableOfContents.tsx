'use client';

import React from 'react';
import { Heading } from '@/utils/extractHeadings';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of Contents"
      className="hidden lg:block lg:col-span-3 sticky top-20 self-start max-w-xs prose p-4 border border-gray-200 rounded-md bg-white shadow-md max-h-[80vh] overflow-auto"
    >
      <h3 className="font-semibold mb-2">Contents</h3>
      <ul className="list-none p-0 m-0">
        {headings.map(({ text, level, id }) => (
          <li
            key={id}
            className={`ml-${(level - 2) * 4} mb-1`} // h2 — ml-0, h3 — ml-4, h4 — ml-8
          >
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className="block rounded px-2 py-1 text-gray-700 hover:bg-teal-700/20 transition-colors"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
