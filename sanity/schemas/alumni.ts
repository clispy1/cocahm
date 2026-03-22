import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'alumni',
  title: 'Alumni Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Current Role',
      type: 'string',
    }),
    defineField({
      name: 'graduationYear',
      title: 'Graduation Year',
      type: 'string',
    }),
    defineField({
      name: 'program',
      title: 'Program Completed',
      type: 'string',
    }),
    defineField({
      name: 'story',
      title: 'Success Story / Testimonial',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
