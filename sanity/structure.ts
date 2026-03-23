import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .title('Student Life Page')
        .id('studentLifePage')
        .child(
          S.document()
            .schemaType('studentLifePage')
            .documentId('studentLifePage')
        ),
      S.divider(),
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'homePage', 'aboutPage', 'studentLifePage'].includes(
            listItem.getId() as string
          )
      ),
    ])
