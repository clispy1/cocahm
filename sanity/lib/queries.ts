import { groq } from 'next-sanity'

// Singletons
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`
export const homePageQuery = groq`*[_type == "homePage"][0]`
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`
export const studentLifePageQuery = groq`*[_type == "studentLifePage"][0]`

// Collections
export const featuredEventsQuery = groq`*[_type == "event" && featured == true] | order(date asc)`
export const upcomingEventsQuery = groq`*[_type == "event" && date >= now()] | order(date asc)`
export const allEventsQuery = groq`*[_type == "event"] | order(date desc)`

export const featuredPostsQuery = groq`*[_type == "post" && featured == true] | order(publishedAt desc) {
  ...,
  author->,
  "imageUrl": mainImage.asset->url
}`
export const latestPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
  ...,
  author->,
  "imageUrl": mainImage.asset->url
}`
export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  ...,
  author->,
  "imageUrl": mainImage.asset->url
}`

export const allCoursesQuery = groq`*[_type == "course"] | order(name asc)`
export const allCategoriesQuery = groq`*[_type == "category"] | order(title asc) {
  ...,
  "courses": *[_type == "course" && references(^._id)]
}`

export const allFacultyQuery = groq`*[_type == "faculty"] | order(name asc)`
export const allAlumniQuery = groq`*[_type == "alumni"] | order(name asc)`
export const allFaqsQuery = groq`*[_type == "faq"] | order(category asc)`
export const allGalleryImagesQuery = groq`*[_type == "gallery"] | order(_createdAt desc)`
