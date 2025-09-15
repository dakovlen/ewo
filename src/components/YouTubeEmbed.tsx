'use client'
import { useEffect, useMemo, useState } from 'react'
import { generateVideoSchema, extractYouTubeId, type VideoSchemaInput } from '@/utils/generateVideoSchema'

type YouTubeEmbedProps = {
  url: string
  schema?: Partial<VideoSchemaInput> // опційно: щоб перекинути title/description/contentUrl тощо
}

export function YouTubeEmbed({ url, schema }: YouTubeEmbedProps) {
  const id = useMemo(() => extractYouTubeId(url), [url])
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  const embed = `https://www.youtube.com/embed/${id}?autoplay=1`

  const [isLoaded, setLoaded] = useState(false)
  const [contentUrl, setContentUrl] = useState<string | undefined>(schema?.contentUrl)

  // Якщо contentUrl не передали — візьмемо поточну адресу (клієнт)
  useEffect(() => {
    if (!schema?.contentUrl && typeof window !== 'undefined') {
      setContentUrl(window.location.href)
    }
  }, [schema?.contentUrl])

  const videoSchema = useMemo(() => {
    if (!contentUrl) return null
    return generateVideoSchema({
      url,
      title: schema?.title || 'YouTube video',
      description: schema?.description || '',
      contentUrl,
      uploadDate: schema?.uploadDate,
      durationSeconds: schema?.durationSeconds,
      thumbnailUrl: schema?.thumbnailUrl || thumbnail,
      keywords: schema?.keywords,
    })
  }, [url, schema, contentUrl, thumbnail])

  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-lg border border-gray-200">
      {/* JSON-LD */}
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {isLoaded ? (
        <iframe
          src={embed}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full rounded-2xl"
          title={schema?.title || 'YouTube video'}
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full flex justify-center items-center bg-black/30 hover:bg-black/40 transition cursor-pointer"
          aria-label="Play YouTube video"
        >
          <img
            src={thumbnail}
            alt="YouTube video thumbnail"
            className="w-full h-full object-cover brightness-95 transition duration-300 ease-in-out"
            loading="lazy"
          />
          <div className="absolute flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:scale-105 transition">
            <svg className="w-8 h-8 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  )
}
