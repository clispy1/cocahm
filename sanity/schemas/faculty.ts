import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faculty',
  title: 'Faculty Member',
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
      title: 'Role',
      type: 'string',
      description: 'e.g., "Executive Culinary Director"',
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
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
      name: 'awards',
      title: 'Awards & Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
