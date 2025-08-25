import { Author } from '@/components/Author'
import { Categories } from '@/components/Categories'
import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/PublishedAt'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, slug } = props

  return (
    <div className="group block rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
      <article className="flex flex-col h-full">
        {mainImage && (
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-56">
            <Link href={`/blog/${slug!.current}`}>
              <Image
                src={urlFor(mainImage).width(800).height(400).url()}
                alt={mainImage.alt || title || ''}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority
              />
            </Link>
          </div>
        )}

        <div className="p-5 flex flex-col flex-1 justify-between">
          <div className="mb-4">
            <Categories categories={categories} />
            <Link href={`/blog/${slug!.current}`}>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors leading-snug mt-2">
                {title}
              </h2>
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>
      </article>
    </div>
  )
}
