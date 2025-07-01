import { PortableText } from "next-sanity";
import Image from "next/image";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { Button } from "../ui/button";
import Link from "next/link";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-30 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        {title ? (
          <h1 className="text-xl md:text-7xl font-bold mb-6 max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-teal-300 inline-block text-transparent bg-clip-text leading-[1.2]">
            {title}
          </h1>
        ) : null}
        <div className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
          {text ? <PortableText value={text} /> : null}
        </div>
        <Button asChild size="xl" className="bg-teal-700 mt-10">
          <Link href="https://www.youtube.com/@ElderlyWisdomDailyTop?sub_confirmation=1">🌟 Get Inspired – Watch Us on YouTube</Link>
        </Button>
      </div>
      {/* <div className="absolute inset-0 bg-teal-900 opacity-50 z-0">
        {image ? (
          <Image
            className="absolute inset-0 object-cover blur-sm w-full"
            src={urlFor(image).width(1600).height(800).url()}
            width={1600}
            height={800}
            alt=""
          />
        ) : null}
      </div> */}
    </section>
  );
}