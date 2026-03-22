import { type SchemaTypeDefinition } from 'sanity'

import category from './schemas/category'
import course from './schemas/course'
import event from './schemas/event'
import faculty from './schemas/faculty'
import alumni from './schemas/alumni'
import post from './schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, course, event, faculty, alumni, post],
}
