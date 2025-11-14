import {defineType, defineField} from "sanity";

export const htmlBlock = defineType({
  name: "htmlBlock",
  title: "HTML Block",
  type: "object",
  fields: [
    defineField({
      name: "code",
      title: "HTML Code",
      type: "text",
      description: "Paste custom HTML here",
    }),
  ],
  preview: {
    select: {code: "code"},
    prepare({code}) {
      return {
        title: "HTML Block",
        subtitle: code ? code.substring(0, 60) : "",
      };
    },
  },
});
