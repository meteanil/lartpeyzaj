import { defineType, defineField } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutTitle',
      title: 'Ana Başlık',
      type: 'string',
      description: 'Form ile Fonksiyonu Birleştiriyoruz.',
    }),
    defineField({
      name: 'aboutText1',
      title: 'Hakkımızda 1ci Paragraf',
      type: 'text',
    }),
    defineField({
      name: 'aboutText2',
      title: 'Hakkımızda 2ci Paragraf',
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
