import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Course Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "6 Months", "2 Years"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Program Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Course Price',
      type: 'string',
      description: 'Optional: Enter the price of the course (e.g., "$500", "Free", "Contact us").',
    }),
    defineField({
      name: 'showPrice',
      title: 'Show Price on Website',
      type: 'boolean',
      description: 'Toggle this to display or hide the course price on the frontend.',
      initialValue: true,
    }),
  ],
})
