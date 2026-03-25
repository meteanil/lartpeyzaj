import { defineType, defineField } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hakkımızda Ana Başlık',
      type: 'string',
      description: 'Örn: Doğanın İzini Şehre Kazıyoruz.',
    }),
    defineField({
      name: 'heroText',
      title: 'Hakkımızda Ana Kısa Metin (Paragraf)',
      type: 'text',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Misyon Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'missionText',
      title: 'Misyon Metni',
      type: 'text',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vizyon Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'visionText',
      title: 'Vizyon Metni',
      type: 'text',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hakkımızda Ayarları' };
    }
  }
});
