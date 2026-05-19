import { defineField, defineType, defineArrayMember } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const richTextType = defineType({
  name: "richText",
  title: "Rich Text",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }) {
      const firstBlock = content?.[0];
      const text = firstBlock?.children
        ?.filter((c: { _type: string }) => c._type === "span")
        ?.map((c: { text: string }) => c.text)
        ?.join("");
      return {
        title: text ? `${text.slice(0, 60)}…` : "Rich Text",
        subtitle: "Rich Text",
        media: BlockContentIcon,
      };
    },
  },
});