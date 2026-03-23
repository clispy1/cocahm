import { type SchemaTypeDefinition } from 'sanity'

import category from './schemas/category'
import course from './schemas/course'
import event from './schemas/event'
import faculty from './schemas/faculty'
import alumni from './schemas/alumni'
import post from './schemas/post'
import siteSettings from './schemas/siteSettings'
import homePage from './schemas/homePage'
import aboutPage from './schemas/aboutPage'
import studentLifePage from './schemas/studentLifePage'
import faq from './schemas/faq'
import gallery from './schemas/gallery'
import enrollment from './schemas/enrollment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    homePage,
    aboutPage,
    studentLifePage,
    category,
    course,
    event,
    faculty,
    alumni,
    post,
    faq,
    gallery,
    enrollment,
  ],
}
