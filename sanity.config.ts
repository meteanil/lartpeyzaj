'use client'

/**
 * Bu ana yapılandırma dosyası, `/app/studio/[[...tool]]/page.tsx`
 * içindeki Studio için gerekli olan konfigürasyonu barındırır.
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// 'vision' Sanity Studio içinden GROQ sorguları atmaya yarayan harika bir test aracıdır
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
