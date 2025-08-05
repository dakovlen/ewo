// components/social/SocialIconsRow.tsx

"use client";

import Link from "next/link";
import { socialLinks } from "./socialLinksData";

export function SocialIconsRow() {
  return (
    <div className="flex gap-4 justify-center items-center">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white bg-teal-700 rounded-full flex justify-center items-center w-10 h-10 transition-transform transform hover:scale-105"
        >
          <Icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
}
