import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projeler',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Proje Başlığı',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Bağlantı Adresi (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Mekan / Lokasyon (Örn: Konya, Yaka)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Proje Yılı',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri (Diğer Fotoğraflar)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Proje Detaylı Açıklaması',
      type: 'text',
    }),
    defineField({
      name: 'youtubeVideos',
      title: 'YouTube Video Linkleri',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Eğer projeye ait YouTube videosu varsa YouTube linklerini (Örn: https://www.youtube.com/watch?v=...) buraya ekleyebilirsiniz.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'location',
    },
  },
})
