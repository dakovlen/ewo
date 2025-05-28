import Link from "next/link";

export default async function Page() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">123Home</h1>
      <hr />
      <Link href="/blog">123Posts index &rarr;</Link>
    </section>
  );
}