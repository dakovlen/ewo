import { POST_QUERYResult } from '@/sanity/types'
import Link from 'next/link'

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>['categories']
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const slug = category?.slug?.current
        if (!slug) return null // пропускаємо, якщо немає slug

        return (
          <Link
            key={category._id}
            href={`/category/${slug}`}
            className="bg-cyan-50 rounded-full px-3 py-1 text-sm font-semibold text-cyan-700 hover:bg-cyan-100 transition"
          >
            {category.title}
          </Link>
        )
      })}
    </div>
  )
}
