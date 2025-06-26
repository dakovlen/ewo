"use client";

import { FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

const socials = [
  {
    href: "https://facebook.com/elderlywisdomdailytop",
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    href: "https://youtube.com/@elderlywisdomdailytop",
    icon: FaYoutube,
    label: "YouTube",
  },
  {
    href: "mailto:your@email.com",
    icon: FaEnvelope,
    label: "Email",
  },
];

export function SocialLinks({ size = "md" }: { size?: Size }) {
  const sizeClasses = {
    sm: { wrapper: "w-8 h-8", icon: "text-sm" },
    md: { wrapper: "w-10 h-10", icon: "text-xl" },
    lg: { wrapper: "w-12 h-12", icon: "text-2xl" },
  };

  return (
    <div className="flex gap-4 items-center">
      {socials.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "text-white hover:text-white transition-colors bg-teal-700 rounded-full flex justify-center items-center",
            sizeClasses[size].wrapper
          )}
        >
          <Icon className={sizeClasses[size].icon} />
        </Link>
      ))}
    </div>
  );
}
