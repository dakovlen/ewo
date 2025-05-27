import SearchForm from "@/components/SearchForm";
import PostCard, { PostTypeCard } from "@/components/PostCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {POSTS_QUERY} from "@/sanity/lib/queries";

export default async function Home({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const { data: posts } = await sanityFetch({query:POSTS_QUERY, params});

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Warm Words and Gentle Wisdom for Life’s Journey</h1>
                <p className="sub-heading !max-w-3xl">Inspiring stories and soothing audio — for the heart, the mind,
                    and the soul.</p>
                <SearchForm query={query}/>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : 'All posts'}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: PostTypeCard) => (
                            <PostCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No post found</p>
                    )}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
}