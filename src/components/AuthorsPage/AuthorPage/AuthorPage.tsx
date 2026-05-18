import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponents";
import { AuthorPostCard } from "@/components/AuthorsPage/AuthorPostCard/AuthorPostCard";
import { AuthorStructuredData } from "@/components/schema_org/AuthorStructuredData";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./AuthorPage.module.css";

type Post = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  mainImage?: unknown;
  publishedAt?: string | null;
  excerpt?: string | null;
  categories?: Array<{
    _id: string;
    slug?: { current?: string | null } | null;
    title?: string | null;
  }> | null;
};

type Author = {
  _id: string;
  name?: string | null;
  slug?: { current?: string | null } | null;
  role?: string | null;
  image?: {
    asset?: { _ref: string; _type: string } | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  shortBio?: string | null;
  bio?: unknown[] | null;
  pullquote?: string | null;
  expertise?: string[] | null;
  socialLinks?: {
    youtube?: string | null;
    amazon?: string | null;
    pinterest?: string | null;
    x?: string | null;
    facebook?: string | null;
  } | null;
  featuredPosts?: Post[] | null;
  recentPosts?: Post[] | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    noIndex?: boolean | null;
  } | null;
};

type Props = { author: Author };

export function AuthorPage({ author }: Props) {
  const slug = author.slug?.current ?? "";
  const authorUrl = `${siteConfig.baseUrl}/authors/${slug}`;

  const imageUrl = author.image?.asset
    ? urlFor(author.image).width(760).height(1013).quality(90).auto("format").url()
    : null;

  // Featured posts мають пріоритет
  // recentPosts — останні 6, показуємо ті що не в featured
  const featuredIds = new Set((author.featuredPosts ?? []).map((p) => p._id));
  const recentPosts = (author.recentPosts ?? []).filter((p) => !featuredIds.has(p._id));
  const hasFeatured = (author.featuredPosts ?? []).length > 0;
  const hasRecent = recentPosts.length > 0;

  const hasSocialLinks = !!(
    author.socialLinks?.youtube ||
    author.socialLinks?.amazon ||
    author.socialLinks?.pinterest ||
    author.socialLinks?.x ||
    author.socialLinks?.facebook
  );

  return (
    <>
      <AuthorStructuredData author={author} authorUrl={authorUrl} />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="author-name">
        <div className={styles.heroInner}>

          {/* Фото */}
          <div className={styles.photoCol}>
            <div className={styles.photoFrame}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${author.name ?? "Author"} — ${author.role ?? "ElderlyWisdom"}`}
                  width={380}
                  height={507}
                  className={styles.photo}
                  priority
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, calc(100vw - 80px)"
                />
              ) : (
                <div className={styles.photoPlaceholder} aria-hidden="true">🌿</div>
              )}
            </div>

            {/* Floating tag */}
            {author.name && (
              <div className={styles.bioTag}>
                <strong className={styles.bioTagName}>{author.name}</strong>
                {author.role && (
                  <span className={styles.bioTagRole}>{author.role}</span>
                )}
              </div>
            )}
          </div>

          {/* Текст */}
          <div className={styles.textCol}>
            <div className={styles.overline} aria-hidden="true">
              <span className={styles.overlineLine} />
              <span className={styles.overlineText}>Meet the author</span>
            </div>

            {author.name && (
              <h1 id="author-name" className={styles.name}>
                {author.name}
              </h1>
            )}

            {author.shortBio && (
              <p className={styles.shortBio}>{author.shortBio}</p>
            )}

            {author.pullquote && (
              <blockquote className={styles.pullquote}>
                <p>"{author.pullquote}"</p>
              </blockquote>
            )}

            {/* Expertise tags */}
            {author.expertise && author.expertise.length > 0 && (
              <div className={styles.expertiseWrap}>
                <span className={styles.expertiseLabel}>Writes about:</span>
                <ul className={styles.tags} role="list">
                  {author.expertise.map((tag) => (
                    <li key={tag} className={styles.tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social links */}
            {hasSocialLinks && (
              <nav className={styles.social} aria-label={`${author.name ?? "Author"} on social media`}>
                <ul className={styles.socialList} role="list">
                  {author.socialLinks?.youtube && (
                    <li>
                      <a href={author.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${author.name} on YouTube — opens in new tab`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
                        <span>YouTube</span>
                      </a>
                    </li>
                  )}
                  {author.socialLinks?.amazon && (
                    <li>
                      <a href={author.socialLinks.amazon} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${author.name} on Amazon — opens in new tab`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 0 1-.748.074c-1.051-.873-1.239-1.279-1.814-2.111-1.732 1.768-2.958 2.297-5.207 2.297-2.657 0-4.726-1.641-4.726-4.92 0-2.563 1.389-4.307 3.366-5.162 1.718-.756 4.115-.891 5.952-1.099v-.41c0-.756.059-1.649-.386-2.301-.385-.582-1.127-.823-1.784-.823-1.212 0-2.291.623-2.556 1.913-.054.285-.263.567-.549.582l-3.065-.33c-.258-.059-.545-.267-.47-.661.705-3.713 4.059-4.832 7.066-4.832 1.537 0 3.547.41 4.76 1.572 1.537 1.436 1.391 3.353 1.391 5.438v4.923c0 1.481.615 2.131 1.192 2.932.202.285.246.625-.01.836-.644.537-1.791 1.535-2.42 2.094l-.004-.012zM20.647 19.098c-2.549 1.894-6.247 2.9-9.431 2.9-4.459 0-8.473-1.649-11.511-4.395-.239-.216-.025-.511.262-.343 3.278 1.906 7.329 3.054 11.514 3.054 2.823 0 5.928-.586 8.786-1.8.432-.184.793.283.38.584zm1.086-1.237c-.325-.418-2.151-.198-2.972-.099-.249.03-.288-.187-.063-.345 1.454-1.023 3.843-.727 4.121-.385.278.345-.073 2.735-1.438 3.877-.209.175-.409.082-.316-.148.308-.767.997-2.484.668-2.9z"/></svg>
                        <span>Amazon</span>
                      </a>
                    </li>
                  )}
                  {author.socialLinks?.pinterest && (
                    <li>
                      <a href={author.socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${author.name} on Pinterest — opens in new tab`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                        <span>Pinterest</span>
                      </a>
                    </li>
                  )}
                  {author.socialLinks?.x && (
                    <li>
                      <a href={author.socialLinks.x} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${author.name} on X — opens in new tab`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        <span>X</span>
                      </a>
                    </li>
                  )}
                  {author.socialLinks?.facebook && (
                    <li>
                      <a href={author.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${author.name} on Facebook — opens in new tab`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <span>Facebook</span>
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* ── Full Bio ───────────────────────────────────────────────────────────── */}
      {author.bio && author.bio.length > 0 && (
        <section className={styles.bioSection} aria-labelledby="bio-heading">
          <div className={styles.bioInner}>
            <h2 id="bio-heading" className={styles.bioHeading}>
              About {author.name ?? "the Author"}
            </h2>
            <div className={styles.bioContent}>
              <PortableText
                value={author.bio as Parameters<typeof PortableText>[0]["value"]}
                components={components}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Articles ──────────────────────────────────────────────────────────── */}
      {(hasFeatured || hasRecent) && (
        <section className={styles.postsSection} aria-labelledby="posts-heading">
          <div className={styles.postsInner}>

            {/* Featured — завжди показуються повністю, їх максимум 6 */}
            {hasFeatured && (
              <>
                <h2 id="posts-heading" className={styles.postsHeading}>
                  Featured Articles
                </h2>
                <ul className={styles.postsGrid} role="list">
                  {(author.featuredPosts ?? []).map((post) => (
                    <li key={post._id}>
                      <AuthorPostCard post={post} featured />
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Recent — останні 6 (без дублікатів з featured) */}
            {hasRecent && (
              <>
                <h2
                  id={hasFeatured ? undefined : "posts-heading"}
                  className={hasFeatured ? styles.postsHeadingSecondary : styles.postsHeading}
                >
                  {hasFeatured ? "Latest Articles" : "Articles"}
                </h2>
                <ul className={styles.postsGrid} role="list">
                  {recentPosts.map((post) => (
                    <li key={post._id}>
                      <AuthorPostCard post={post} />
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* View All — посилання на окрему сторінку */}
            <div className={styles.viewAllWrap}>
              <Link
                href={`/authors/${slug}/articles`}
                className={styles.viewAllBtn}
              >
                View All Articles by {author.name ?? "this Author"}
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* ── Порожній стан ─────────────────────────────────────────────────────── */}
      {!hasFeatured && !hasRecent && (
        <section className={styles.postsSection}>
          <div className={styles.postsInner}>
            <p className={styles.noPosts}>
              Articles by {author.name ?? "this author"} are coming soon.
            </p>
          </div>
        </section>
      )}

      {/* ── Back link ─────────────────────────────────────────────────────────── */}
      <div className={styles.backWrap}>
        <Link href="/authors" className={styles.backLink}>
          ← All Authors
        </Link>
      </div>
    </>
  );
}