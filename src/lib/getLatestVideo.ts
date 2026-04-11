export type LatestVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
};

export async function getLatestVideo(
  channelId: string
): Promise<LatestVideo | null> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // кеш на 1 годину
    });

    if (!res.ok) return null;

    const xml = await res.text();

    // Витягуємо перший запис — останнє відео
    const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
    if (!entryMatch) return null;

    const entry = entryMatch[1];

    // Video ID
    const idMatch = entry.match(
      /<yt:videoId>(.*?)<\/yt:videoId>/
    );
    // Назва
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    // Дата
    const publishedMatch = entry.match(
      /<published>(.*?)<\/published>/
    );

    if (!idMatch || !titleMatch) return null;

    const videoId = idMatch[1];

    return {
      id: videoId,
      title: titleMatch[1],
      url: `https://www.youtube.com/watch?v=${videoId}`,
      // Thumbnail доступний публічно без API
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      publishedAt: publishedMatch?.[1] ?? "",
    };
  } catch {
    return null;
  }
}