import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { applicationType } from './applicationType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, applicationType, siteSettingsType],
}
