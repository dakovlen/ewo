import { PortableText } from "next-sanity";
// import Image from "next/image";
// import { Title } from "@/components/Title";
// import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { Button } from "../ui/button";
import Link from "next/link";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="w-full relative overflow-hidden py-24 bg-gradient-to-br from-teal-100 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 opacity-20 w-[200%] h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#14b8a6"
            fillOpacity="0.3"
            d="M0,64L40,80C80,96,160,128,240,144C320,160,400,160,480,165.3C560,171,640,181,720,160C800,139,880,85,960,74.7C1040,64,1120,96,1200,117.3C1280,139,1360,149,1400,154.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-9">
        {title && (
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-7xl mx-auto bg-gradient-to-r from-teal-700 via-teal-500 to-emerald-400 inline-block text-transparent bg-clip-text leading-tight drop-shadow-md">
            {title}
          </h1>
        )}

        {text && (
          <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto leading-relaxed">
            <PortableText value={text} />
          </div>
        )}

        <Button
          asChild
          size="xl"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold mt-10 px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          <Link href="https://www.youtube.com/@ElderlyWisdomMind?sub_confirmation=1">
            🌟 Get Inspired – Watch Us on YouTube
          </Link>
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