import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return ( 
    <div className="sticky top-0 px-4 w-full z-10 backdrop-blur bg-white">
      <header className="flex items-center justify-between p-6 rounded-lg container mx-auto shadow-teal-50">
        <Link
          className="text-teal-700 md:text-xl font-bold tracking-tight"
          href="/"
        >
          <Image
            src="./logo.svg"
            width={240}
            height={40}
            alt="Logo"
            className="main-logo" />
        </Link>
        <ul className="flex items-center gap-4 font-semibold text-slate-700">
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
      </header>
    </div>
  )
}