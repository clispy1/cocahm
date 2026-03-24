import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Sub-headline',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL (MP4)',
      type: 'url',
      description: 'Optional: Provide a direct URL to an MP4 video to use as the hero background instead of an image.',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message (Quote)',
      type: 'text',
    }),
    defineField({
      name: 'fastFactsBackgroundImage',
      title: 'Fast Facts Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quoteBackgroundImage',
      title: 'Quote Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuresImage',
      title: 'Features Section Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
