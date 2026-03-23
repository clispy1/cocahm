import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'enrollment',
  title: 'Enrollment Application',
  type: 'document',
  fields: [
    defineField({ name: 'surname', title: 'Surname', type: 'string', readOnly: true }),
    defineField({ name: 'firstName', title: 'First Name', type: 'string', readOnly: true }),
    defineField({ name: 'otherNames', title: 'Other Names', type: 'string', readOnly: true }),
    defineField({ name: 'dob', title: 'Date of Birth', type: 'string', readOnly: true }),
    defineField({ name: 'pob', title: 'Place of Birth', type: 'string', readOnly: true }),
    defineField({ name: 'gender', title: 'Gender', type: 'string', readOnly: true }),
    defineField({ name: 'nationality', title: 'Nationality', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', readOnly: true }),
    defineField({ name: 'address', title: 'Residential Address', type: 'string', readOnly: true }),
    defineField({ name: 'emergencyContact', title: 'Emergency Contact', type: 'string', readOnly: true }),
    defineField({ name: 'passportPicture', title: 'Passport Picture', type: 'image', readOnly: true }),
    
    defineField({ name: 'guardianName', title: 'Guardian Name', type: 'string', readOnly: true }),
    defineField({ name: 'guardianPhone', title: 'Guardian Phone', type: 'string', readOnly: true }),
    defineField({ name: 'guardianResidence', title: 'Guardian Residence', type: 'string', readOnly: true }),
    
    defineField({ name: 'lastSchool', title: 'Last School Attended', type: 'string', readOnly: true }),
    defineField({ name: 'educationLevel', title: 'Level of Education', type: 'string', readOnly: true }),
    
    defineField({
      name: 'course',
      title: 'Interested Course',
      type: 'reference',
      to: [{ type: 'course' }],
      readOnly: true,
    }),
    defineField({ name: 'accommodation', title: 'Requires Accommodation', type: 'string', readOnly: true }),
    
    defineField({ name: 'experience', title: 'Prior Experience', type: 'string', readOnly: true }),
    defineField({ name: 'experienceDetails', title: 'Experience Details', type: 'text', readOnly: true }),
    
    defineField({ name: 'disability', title: 'Has Disability', type: 'string', readOnly: true }),
    defineField({ name: 'disabilityDetails', title: 'Disability Details', type: 'text', readOnly: true }),
    
    defineField({ name: 'allergies', title: 'Has Allergies', type: 'string', readOnly: true }),
    defineField({ name: 'allergyDetails', title: 'Allergy Details', type: 'text', readOnly: true }),

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
    defineField({
      name: 'paymentReference',
      title: 'Payment Reference',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      surname: 'surname',
      courseName: 'course.name',
      status: 'status',
    },
    prepare({ firstName, surname, courseName, status }) {
      return {
        title: `${firstName} ${surname} - ${status}`,
        subtitle: courseName,
      }
    }
  }
})
