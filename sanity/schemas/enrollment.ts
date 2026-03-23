import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'enrollment',
  title: 'Enrollment Application',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'course',
      title: 'Interested Course',
      type: 'reference',
      to: [{ type: 'course' }],
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Additional Message',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: ['New', 'Reviewed', 'Contacted', 'Enrolled', 'Rejected'],
      },
      initialValue: 'New',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'course.name',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `${title} - ${status}`,
        subtitle: subtitle,
      }
    }
  }
})
