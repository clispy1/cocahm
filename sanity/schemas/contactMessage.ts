export default {
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'name',
      date: 'createdAt',
    },
    prepare(selection: any) {
      const { title, subtitle, date } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
};
