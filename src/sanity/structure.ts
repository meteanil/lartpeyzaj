import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('L\'art Yöneticisi')
    .items([
      // SAYFALAR (Singletons)
      S.listItem()
        .title('Sayfa Ayarları')
        .child(
          S.list()
            .title('Hangi Sayfayı Düzenlemek İstersiniz?')
            .items([
              S.listItem()
                .title('Ana Sayfa')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('Hakkımızda')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('İletişim & Footer')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
            ])
        ),
      
      S.divider(),

      // İÇERİKLER (Collections)
      S.listItem()
        .title('Portfolyo İçerikleri')
        .child(
          S.list()
            .title('Katalog')
            .items([
              S.documentTypeListItem('project').title('Projeler'),
              S.documentTypeListItem('application').title('Uygulamalar'),
            ])
        ),
      
      S.divider(),
      
      // EKİP (Collections)
      S.documentTypeListItem('teamMember').title('Ekip Üyeleri'),
    ])
