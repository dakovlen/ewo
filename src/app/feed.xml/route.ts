import RSS from 'rss';
import { client } from "@/sanity/lib/client";
import { getPostsQuery } from "@/sanity/lib/queries";
import { siteConfig } from '@/lib/siteConfig'; // Імпортуємо ваш конфіг
import { NextResponse } from 'next/server';
import { toPlainText } from '@portabletext/react';

export async function GET() {
  try {
    const { baseUrl, name, description: siteDescription, locale } = siteConfig;
    
    const posts = await client.fetch(getPostsQuery(0, 20));

    const feed = new RSS({
      title: name,
      description: siteDescription,
      site_url: baseUrl,
      feed_url: `${baseUrl}/feed.xml`,
      language: locale.split('_')[0],
      pubDate: new Date(),
      image_url: siteConfig.logo,
    });

    posts.forEach((post: any) => {
      const description = post.seo?.description || 
                          (post.body ? toPlainText(post.body).substring(0, 250) + '...' : '');

      feed.item({
        title: post.title,
        description: description,
        url: `${baseUrl}/blog/${post.slug.current}`,
        date: new Date(post.publishedAt),
        author: post.author?.name || name,
        guid: post._id,
        categories: post.categories?.map((c: any) => c.title) || [],
      });
    });

    return new NextResponse(feed.xml({ indent: true }), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("RSS Generation Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}