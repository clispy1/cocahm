import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'storyImage1',
      title: 'Story Image 1 (Top)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'storyImage2',
      title: 'Story Image 2 (Bottom)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
})
