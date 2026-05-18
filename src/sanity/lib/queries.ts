import { defineQuery } from "next-sanity";

export const getPostsQuery = (offset = 0, limit = 12) =>
  defineQuery(`*[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    publishedAt < now()
  ]
  | order(publishedAt desc, _createdAt desc)
  [${offset}...${offset + limit}]{
    _id,
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    "categories": coalesce(
      categories[]->{
        _id,
        slug,
        title
      },
      []
    ),
    author->{
      name,
      image
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }`);

export const POSTS_TOTAL_COUNT_QUERY = defineQuery(`count(*[
  _type == "post" &&
  defined(slug.current) &&
  !(_id in path("drafts.**")) &&
  publishedAt < now()
])`);

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key,
    ...@->{_id, title, slug}
  }
}`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
    "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->{
        _id,
        title,
        body,
        "text": pt::text(body)
      }
    }
  }
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      ...,
      "seo": {
        "title": coalesce(seo.title, title, ""),
        "description": coalesce(seo.description,  ""),
        "image": seo.image,
        "noIndex": seo.noIndex == true
      },
      content[]{
        ...,
        _type == "faqs" => {
          ...,
          faqs[]->{
            _id,
            title,
            body,
            "text": pt::text(body)
          }
        }
      }
    }
  }`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    "image": mainImage.asset->{
      url,
      metadata {
        palette
      }
    }
  }    
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "post", "author"] && defined(slug.current)] {
    "href": select(
      _type == "page" && slug.current == "/" => "/",
      _type == "page"   => "/" + slug.current,
      _type == "post"   => "/blog/" + slug.current,
      _type == "author" => "/authors/" + slug.current
    ),
    _updatedAt
  }
`);

export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    _createdAt,
    categories[]->{
      _id,
      title,
      slug
    }
  }
`;


// Категорія з описом + SEO
export const CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`);

// Всі пости в категорії (до 100)
export const CATEGORY_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    publishedAt < now() &&
    $slug in categories[]->slug.current
  ]
  | order(publishedAt desc, _createdAt desc)[0...100]{
    _id,
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    "categories": coalesce(
      categories[]->{
        _id,
        slug,
        title
      },
      []
    ),
    author->{
      name,
      image
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`);

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`);

export const HOMEPAGE_AUTHOR_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)] | order(_createdAt asc) [0] {
    _id,
    name,
    image,
    "role": coalesce(role, "Author · Content Creator")
  }
`);

// Всі автори для /authors
// defined(slug.current) — автори без slug не потрапляють на сторінку
export const AUTHORS_QUERY = defineQuery(`
  *[
    _type == "author" &&
    defined(slug.current) &&
    defined(name)
  ] | order(_createdAt asc) {
    _id,
    name,
    slug,
    role,
    image,
    shortBio,
    expertise,
    "postCount": count(*[
      _type == "post" &&
      references(^._id) &&
      defined(slug.current) &&
      publishedAt < now()
    ])
  }
`);

// Slug-и для generateStaticParams на /authors/[slug]
export const AUTHORS_SLUGS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)] {
    "slug": slug.current
  }
`);

// Один автор для /authors/[slug]
export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    image,
    shortBio,
    bio,
    pullquote,
    expertise,
    socialLinks,
    "seo": {
      "title": coalesce(seo.title, name, ""),
      "description": coalesce(seo.description, shortBio, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
    "featuredPosts": featuredPosts[]-> {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "excerpt": pt::text(body)[0..160]
      "categories": coalesce(categories[]->{ _id, slug, title }, [])
    },
    "allPosts": *[
      _type == "post" &&
      references(^._id) &&
      defined(slug.current) &&
      publishedAt < now()
    ] | order(publishedAt desc) [0...50] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "excerpt": array::join(string::split(pt::text(body), "")[0..120], ""),
      "categories": coalesce(categories[]->{ _id, slug, title }, [])
    }
  }
`);