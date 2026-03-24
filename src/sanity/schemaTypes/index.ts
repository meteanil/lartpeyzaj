import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { applicationType } from './applicationType'
import { homePageType } from './homePageType'
import { aboutPageType } from './aboutPageType'
import { contactPageType } from './contactPageType'
import { teamMemberType } from './teamMemberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType, 
    applicationType, 
    homePageType, 
    aboutPageType, 
    contactPageType, 
    teamMemberType
  ],
}
