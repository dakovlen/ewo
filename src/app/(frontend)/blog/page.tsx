import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { PostCard } from '@/components/PostCard'
import { Title } from '@/components/Title'

export default async function Page() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    revalidate: 3600,
    tags: ['post', 'author', 'category'],
  })

  return (
    <>
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">

          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-teal-300 inline-block text-transparent bg-clip-text leading-[1.2]">
            Our blog
          </h1>
          
          <div className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            Welcome to the ElderlyWisdom blog! Here you will find all of our best guides related to senior living.
          </div>
        </div>
      </section>
      <main className="container mx-auto grid grid-cols-1 gap-6 p-12 flex-1">
      
      <div className="flex flex-col gap-24 py-12">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
    </>
  )
}