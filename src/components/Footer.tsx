import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (

    <footer className="bg-slate-900 pt-10 pb-6">
      <div className="container flex items-center justify-between rounded-lg mx-auto">
        <Link
          className="text-teal-900 md:text-xl font-bold tracking-tight"
          href="/"
        >
          <Image
            src="./logo-white.svg"
            width={240}
            height={60}
            alt="Logo"
            className="main-logo" />
        </Link>
        <ul className="flex items-center gap-4 font-semibold text-slate-100">
          <li>
            <Link
              className="hover:text-teal-700 transition-colors"
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-teal-700 transition-colors"
              href="/blog"
            >
              Blog
            </Link>
          </li>
          {/* <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/studio"
            >
              Sanity Studio
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="container mx-auto">
        <hr className="text-white my-5"/>

        <div className="flex flex-col">
          <p className="text-white">© All rights reserved. 
            {/* Made by D */}
          </p>
        </div>
      </div>
    </footer>
  )
}