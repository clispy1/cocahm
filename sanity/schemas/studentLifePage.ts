import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'studentLifePage',
  title: 'Student Life Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'sideImage1',
      title: 'Side Image 1 (Top)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sideImage2',
      title: 'Side Image 2 (Bottom)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
