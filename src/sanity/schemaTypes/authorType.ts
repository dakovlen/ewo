import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    // ── Основні ───────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL сторінки: /authors/[slug]",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: 'Наприклад: "Author & Content Creator"',
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Біо ───────────────────────────────────────────────────────
    defineField({
      name: "shortBio",
      title: "Short Bio",
      description: "1–2 речення. Показується в картці на /authors",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bio",
      title: "Full Bio",
      description: "Повна біографія для сторінки /authors/[slug]",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Em", value: "em" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "pullquote",
      title: "Pull Quote",
      description: "Коротка цитата — виділяється на сторінці автора",
      type: "text",
      rows: 2,
    }),

    // ── Expertise ─────────────────────────────────────────────────
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      description: 'Теги: "Senior Health", "Mindfulness"...',
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    // ── Social ────────────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "amazon", title: "Amazon", type: "url" }),
        defineField({ name: "pinterest", title: "Pinterest", type: "url" }),
        defineField({ name: "x", title: "X (Twitter)", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
      ],
    }),

    // ── Featured posts ────────────────────────────────────────────
    defineField({
      name: "featuredPosts",
      title: "Featured Articles",
      description: "До 6 вибраних статей — показуються першими",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (Rule) => Rule.max(6),
    }),

    // ── SEO ───────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});