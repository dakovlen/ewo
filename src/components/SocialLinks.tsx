"use client";

import Link from "next/link";
import clsx from "clsx";

import { FacebookIcon } from "./icons/FacebookIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { EmailIcon } from "./icons/EmailIcon";
import { PinterestIcon } from "./icons/PinterestIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { AmazonIcon } from "./icons/AmazonIcon";

type Size = "sm" | "md" | "lg";

const socials = [
  {
    href: "https://www.facebook.com/groups/1286296679591129",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/@ElderlyWisdomDailyTop?sub_confirmation=1",
    icon: YoutubeIcon,
    label: "YouTube",
  },
   {
    href: "https://pinterest.com/SolanVossPro",
    icon: PinterestIcon,
    label: "Pinterest",
  },
   {
    href: "https://x.com/SolanVoss",
    icon: TwitterIcon,
    label: "Twitter",
  },
  {
    href: "https://www.amazon.de/stores/Solan-Voss/author/B0F8QWL2FP",
    icon: AmazonIcon,
    label: "Amazon KDP",
  },
  {
    href: "mailto:elderly.wisdom.daily@gmail.com",
    icon: EmailIcon,
    label: "elderly.wisdom.daily@gmail.com",
  },
  
];

export function SocialLinks({ size = "md" }: { size?: Size }) {
  const sizeClasses = {
    sm: { wrapper: "w-8 h-8", icon: "w-4 h-4" },
    md: { wrapper: "w-10 h-10", icon: "w-5 h-5" },
    lg: { wrapper: "w-12 h-12", icon: "w-6 h-6" },
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
          <Icon className={clsx(sizeClasses[size].icon)} />
        </Link>
      ))}
    </div>
  );
}
