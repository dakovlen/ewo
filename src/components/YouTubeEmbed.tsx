'use client'

import { useMemo, useState } from 'react'

type YouTubeEmbedProps = {
  url: string
  title?: string
  className?: string
}

/** Надійно витягуємо YouTube ID із різних форматів URL/ID */
function extractYouTubeId(input: string): string | null {
  try {
    const url = new URL(input)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') return url.pathname.slice(1) || null

    if (host.endsWith('youtube.com')) {
      const v = url.searchParams.get('v')
      if (v) return v
      const m1 = url.pathname.match(/\/embed\/([^/?#]+)/)
      if (m1) return m1[1]
      const m2 = url.pathname.match(/\/shorts\/([^/?#]+)/)
      if (m2) return m2[1]
    }

    const last = url.pathname.split('/').filter(Boolean).pop()
    return last && /^[a-zA-Z0-9_-]{6,}$/.test(last) ? last : null
  } catch {
    return /^[a-zA-Z0-9_-]{6,}$/.test(input) ? input : null
  }
}

export function YouTubeEmbed({ url, title, className }: YouTubeEmbedProps) {
  const id = useMemo(() => extractYouTubeId(url), [url])
  const [isPlaying, setPlaying] = useState(false)

  if (!id) {
    return <p className="text-red-600">Invalid YouTube URL or ID</p>
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}`
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

  return (
    <figure className={['not-prose w-full', className].filter(Boolean).join(' ')}>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {isPlaying ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title || 'YouTube video'}
            className="absolute inset-0 w-full h-full rounded-2xl"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition cursor-pointer"
            aria-label="Play YouTube video"
          >
            <img
              src={thumb}
              alt={title ? `${title} – thumbnail` : 'YouTube video thumbnail'}
              className="w-full h-full object-cover brightness-95 transition"
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
    </figure>
  )
}
