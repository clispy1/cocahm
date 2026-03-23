import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'
import { projectId, dataset } from './sanity/env'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'CoCAHM Content Studio',
  schema,
  plugins: [
    structureTool({ structure }),
  ],
})
