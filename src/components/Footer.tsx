import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-10 pb-6">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-4">
        {/* Логотип */}
        <Link
          className="text-teal-900 md:text-xl font-bold tracking-tight"
          href="/"
        >
          <Image
            src="/logo-white.svg"
            width={240}
            height={60}
            alt="Logo"
            className="main-logo"
          />
        </Link>

        {/* Навігація */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 font-semibold text-slate-100">
          <li>
            <Link
              className="hover:text-teal-400 transition-colors"
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-teal-400 transition-colors"
              href="/blog"
            >
              Blog
            </Link>
          </li>
        </ul>

        <SocialLinks size="sm" />
      </div>

      <div className="container mx-auto px-4 mt-6">
        <hr className="border-slate-700 my-5" />
        <p className="text-slate-400 text-center text-sm">
          ElderlyWisdom.org © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
