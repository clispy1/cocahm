import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Program Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'curriculum',
      title: 'Core Curriculum',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'careerOutcomes',
      title: 'Career Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
