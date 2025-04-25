import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams} : {
    searchParams: Promise<{query?: string }>
}) {
    const query = (await searchParams).query;
  return (
      <>  
        <section className="pink_container">
            <h1 className="heading">Warm Words and Gentle Wisdom for Life’s Journey</h1>
            <p className="sub-heading !max-w-3xl">Inspiring stories and soothing audio — for the heart, the mind, and the soul.</p>
            <SearchForm query={query}/>
        </section>
      </>
  );
}