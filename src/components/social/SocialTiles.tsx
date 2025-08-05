"use client";

import Link from "next/link";
import { socialLinks } from "./socialLinksData";

export function SocialTiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {socialLinks.map(({ href, icon: Icon, label, description }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="border rounded-xl p-6 text-center bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
        >
          <div className="flex justify-center mb-4 text-teal-600">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800 dark:text-white">
            {label}
          </h3>
          {description && (
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
