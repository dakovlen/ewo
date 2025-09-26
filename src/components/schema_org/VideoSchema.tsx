// без 'use client' — це серверний компонент
import React from "react";

type PTBlock = {
  _type?: string;
  url?: string;
  title?: string;
  description?: string;
  uploadDate?: string | Date;
};

function extractYouTubeId(input: string): string | null {
  try {
    const u = new URL(input);
    const h = u.hostname.replace(/^www\./, "");
    if (h === "youtu.be") return u.pathname.slice(1) || null;
    if (h.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m1 = u.pathname.match(/\/embed\/([^/?#]+)/);
      if (m1) return m1[1];
      const m2 = u.pathname.match(/\/shorts\/([^/?#]+)/);
      if (m2) return m2[1];
    }
    const last = u.pathname.split("/").filter(Boolean).pop();
    return last && /^[a-zA-Z0-9_-]{6,}$/.test(last) ? last : null;
  } catch {
    return /^[a-zA-Z0-9_-]{6,}$/.test(input) ? input : null;
  }
}

function toISO(d?: string | Date) {
  if (!d) return undefined;
  const date = typeof d === "string" ? new Date(d) : d;
  return isNaN(date.getTime()) ? undefined : date.toISOString();
}

function buildVideoObject(args: {
  url: string;            // будь-який YouTube URL або ID
  pageUrl?: string;       // канонічна сторінка вашого сайту
  title: string;
  description: string;
  uploadDate?: string | Date;
}) {
  const id = extractYouTubeId(args.url);
  if (!id) return null;

  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
  const thumbs = [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": watchUrl,
    url: args.pageUrl,                          // сторінка на вашому сайті
    name: args.title,
    description: args.description,              // важливо для GSC
    uploadDate: toISO(args.uploadDate),         // важливо для GSC
    thumbnailUrl: thumbs,
    embedUrl,
    contentUrl: watchUrl,
    potentialAction: { "@type": "WatchAction", target: watchUrl },
    width: 1280,
    height: 720,
  };
}

export function VideoSchema(props: {
  body: unknown;
  pageUrl?: string;
  defaultTitle: string;
  defaultDescription?: string;
  defaultUploadDate?: string | Date;
}) {
  const { body, pageUrl, defaultTitle, defaultDescription, defaultUploadDate } = props;

  const blocks: PTBlock[] = Array.isArray(body) ? (body as PTBlock[]) : [];
  const raw = blocks
    .filter((b) => b?._type === "youtubeEmbed" && b.url)
    .map((b) =>
      buildVideoObject({
        url: b.url!,
        pageUrl,
        title: b.title || defaultTitle,
        description: b.description || defaultDescription || defaultTitle,
        uploadDate: b.uploadDate || defaultUploadDate,
      })
    )
    .filter(Boolean) as Record<string, unknown>[];

  // невелика дедуплікація по @id (watchUrl)
  const seen = new Set<string>();
  const items = raw.filter((obj) => {
    const id = (obj as any)["@id"];
    if (!id) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  if (items.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(items.length === 1 ? items[0] : items),
      }}
    />
  );
}
