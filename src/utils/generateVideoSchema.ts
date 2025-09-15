// src/utils/generateVideoSchema.ts
import { siteConfig } from '@/lib/siteConfig';

export type VideoSchemaInput = {
  url: string;               // YouTube URL
  title: string;             // Назва відео
  canonicalUrl: string;      // Канонічна сторінка з відео
  description?: string;
  uploadDate?: string | Date;
  durationSeconds?: number;
  thumbnailUrl?: string;
  keywords?: string[];
};

export function generateVideoSchema(v: VideoSchemaInput) {
  const id = extractYouTubeId(v.url);
  const embedUrl = id ? `https://www.youtube.com/embed/${id}` : undefined;
  const thumbnail = v.thumbnailUrl || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined);

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    mainEntityOfPage: { '@type': 'WebPage', '@id': v.canonicalUrl },
    name: v.title,
    description: v.description || '',
    url: v.canonicalUrl,
    contentUrl: v.canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.baseUrl}/logo.svg` }, // зроби квадратний ≥112×112
    },
    potentialAction: { '@type': 'WatchAction', target: [v.url, v.canonicalUrl] },
  };

  if (v.uploadDate) schema.uploadDate = toIso(v.uploadDate);
  if (typeof v.durationSeconds === 'number') schema.duration = secondsToISO(v.durationSeconds);
  if (thumbnail) schema.thumbnailUrl = [thumbnail];
  if (embedUrl) schema.embedUrl = embedUrl;
  if (v.keywords?.length) schema.keywords = v.keywords.join(', ');

  return schema;
}

// — утиліти —
export function extractYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const iEmbed = parts.indexOf('embed');  if (iEmbed >= 0 && parts[iEmbed + 1]) return parts[iEmbed + 1];
      const iShorts = parts.indexOf('shorts'); if (iShorts >= 0 && parts[iShorts + 1]) return parts[iShorts + 1];
    }
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
  } catch {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/i);
    return m ? m[1] : '';
  }
  return '';
}

function toIso(d: string | Date) {
  return (d instanceof Date ? d : new Date(d)).toISOString();
}

function secondsToISO(total: number) {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${sec || (!h && !m) ? `${sec}S` : ''}`;
}
