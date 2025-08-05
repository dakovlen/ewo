import Link from "next/link";
import Image from "next/image";
import { SocialIconsRow } from "./social/SocialIconsRow";
import SubscribeForm from "./SubscribeForm";
import { menuItems } from "@/lib/data/menu";

export function Footer() {
  return (
    <>
      <SubscribeForm />
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

          <ul className="flex flex-wrap justify-center md:justify-start gap-4 font-semibold text-slate-100">
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="hover:text-teal-600 transition-colors"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialIconsRow />
        </div>

        <div className="container mx-auto px-4 mt-6">
          <hr className="border-slate-700 my-5" />
          <p className="text-slate-400 text-center text-sm">
            ElderlyWisdom.org © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
