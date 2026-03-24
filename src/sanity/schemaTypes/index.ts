import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { applicationType } from './applicationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, applicationType],
}
