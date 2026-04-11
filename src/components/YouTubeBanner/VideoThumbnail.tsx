// src/components/YouTubeBanner/VideoThumbnail.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  className?: string;
};

export function VideoThumbnail({ videoId, title, className }: Props) {
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );

  return (
    <Image
      src={src}
      alt={title}
      fill
      className={className}
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() =>
        setSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
      }
    />
  );
}