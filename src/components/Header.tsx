"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 w-full z-10 backdrop-blur bg-white/80 shadow-md">
      <header className="flex items-center justify-between px-4 py-4 container mx-auto gap-2">
        <Link
          className="text-teal-700 text-lg font-bold tracking-tight"
          href="/"
        >
          <Image
            src="/logo.svg"
            width={240}
            height={40}
            alt="Logo"
            className="main-logo"
          />
        </Link>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <ul
          className={`
            flex flex-col items-center font-semibold text-slate-700 transition-all duration-300
            absolute top-full left-0 w-full bg-white/80
            md:static md:flex-row md:gap-6 md:bg-transparent md:w-auto md:p-0 md:py-0 md:items-center
            ${menuOpen ? "flex" : "hidden md:flex"}
          `}
        >
          <li className="w-full text-center border-b border-t border-slate-700 py-4 md:border-0 md:py-0">
            <Link
              className="text-2xl md:text-lg hover:text-teal-700 transition-colors"
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="w-full text-center border-b border-slate-700 py-4 md:border-0 md:py-0">
            <Link
              className="text-2xl md:text-lg hover:text-teal-700 transition-colors"
              href="/blog"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          {/* <li>
            <Link className="hover:text-pink-500 transition-colors" href="/studio">
              Studio
            </Link>
          </li> */}
        </ul>
      </header>
    </div>
  );
}
