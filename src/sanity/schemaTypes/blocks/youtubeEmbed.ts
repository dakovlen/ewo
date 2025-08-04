import { defineType } from 'sanity';

export const youtubeEmbed = defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
          allowRelative: false,
        }).regex(/(youtube\.com\/watch\?v=|youtu\.be\/)/, {
          name: 'YouTube URL',
          invert: false,
          message: 'Must be a valid YouTube video URL',
        }),
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      return {
        title: 'YouTube Video',
        subtitle: selection.url,
      };
    },
  },
});
