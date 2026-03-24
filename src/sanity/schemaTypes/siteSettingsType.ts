import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Genel Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Ana Sayfa Başlığı (Hero Title)',
      type: 'string',
      description: 'Örn: Peyzajda Sanatın ve Doğanın Mükemmel Uyumu.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Ana Sayfa Alt Başlığı (Hero Subtitle)',
      type: 'text',
      description: 'Örn: Doğanın sunduğu güzellikleri sanatla harmanlayarak...',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Hakkımızda Başlığı',
      type: 'string',
      description: 'Örn: Neden L\'art Peyzaj?',
    }),
    defineField({
      name: 'aboutText',
      title: 'Hakkımızda Paragrafı',
      type: 'text',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefon Numarası',
      type: 'string',
      description: 'Örn: +90 53X XXX XX XX',
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-Posta Adresi',
      type: 'string',
      description: 'Örn: info@lartpeyzaj.com',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Açık Adres',
      type: 'string',
      description: 'Örn: Konya, Türkiye',
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
      description: 'Örn: +9053XXXXXXXX (Boşluksuz)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site İçerikleri ve Ayarları',
        subtitle: 'Lütfen sadece 1 adet ayar dosyası oluşturun.',
      }
    },
  },
})
