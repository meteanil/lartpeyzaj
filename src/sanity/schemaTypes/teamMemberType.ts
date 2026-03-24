import { defineType, defineField } from 'sanity';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Ekip Üyeleri',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Ünvan / Rol',
      type: 'string',
      description: 'Örn: Kurucu & Peyzaj Mimarı',
    }),
    defineField({
      name: 'desc',
      title: 'Hakkında (Kısa Açıklama)',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sıralama Numarası',
      type: 'number',
      description: 'Listedeki sırası (Örn: 1). Küçük rakamlar önce çıkar.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});
