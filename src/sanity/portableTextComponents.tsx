import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width={600}
          height={400}
        />
      ) : null,

    youtubeEmbed: ({ value }) =>
      value?.url ? (
        <YouTubeEmbed url={value.url} />
      ) : (
        <p>Invalid YouTube URL</p>
      ),
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    emailLink: ({ children, value }) =>
      value?.email ? (
        <a href={`mailto:${value.email}`}>
          {children}
        </a>
      ) : (
        <>{children}</>
      ),
  },
};