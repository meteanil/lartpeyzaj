import { defineType, defineField } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Ana Sayfa Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Ana Başlık (İlk Bölüm)',
      type: 'string',
      description: 'Örn: Doğayı Tasarlıyoruz.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Ana Başlık Alt Açıklaması',
      type: 'text',
      description: 'Sürdürülebilir Ekosistemler. Her projede...',
    }),
    defineField({
      name: 'stats',
      title: 'İstatistikler (Rakamlar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Metin (Örn: Tamamlanan Proje)' },
            { name: 'value', type: 'number', title: 'Değer (Örn: 20)' },
            { name: 'prefix', type: 'string', title: 'Önek (Örn: %)' },
            { name: 'suffix', type: 'string', title: 'Sonek (Örn: +)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Ana Sayfa Hizmetler Listesi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Numara (Örn: 01)' },
            { name: 'title', type: 'string', title: 'Başlık (Örn: Peyzaj Tasarımı)' },
            { name: 'desc', type: 'text', title: 'Kısa Açıklama' },
            { name: 'bg', type: 'string', title: 'Arka Plan CSS Rengi (Tercihe Bağlı, Örn: linear-gradient(...))' },
          ],
        },
      ],
    })
  ],
  preview: {
    prepare() {
      return { title: 'Ana Sayfa Ayarları' };
    }
  }
});
