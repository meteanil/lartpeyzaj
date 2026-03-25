import { defineType, defineField } from 'sanity';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'İletişim Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Merkez Ofis Adresi',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon Numarası',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-Posta Adresi',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Linki',
      type: 'url',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Numarası',
      type: 'string',
    }),
    defineField({
      name: 'mapLink',
      title: 'Google Haritalar Yol Tarifi Linki',
      type: 'url',
    }),
    defineField({
      name: 'workingHours',
      title: 'Çalışma Saatleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', type: 'string', title: 'Günler (Örn: Pzt - Cuma)' },
            { name: 'hours', type: 'string', title: 'Saatler (Örn: 09:00 - 18:30)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqTitle',
      title: 'SSS Başlığı',
      type: 'string',
      description: 'Örn: Sıkça Sorulan Sorular.',
    }),
    defineField({
      name: 'faqs',
      title: 'Sıkça Sorulan Sorular Listesi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'q', type: 'string', title: 'Soru' },
            { name: 'a', type: 'text', title: 'Cevap' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'İletişim Ayarları' };
    }
  }
});
