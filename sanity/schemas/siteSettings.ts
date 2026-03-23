import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Additional Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'text',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
  ],
})
