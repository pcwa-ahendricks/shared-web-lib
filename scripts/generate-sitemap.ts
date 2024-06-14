import globby from 'globby'
import {writeFileSync} from 'fs'
import gages from '../src/lib/services/pi/gage-config'
import slugify from 'slugify'
import fetcher from '../src/lib/fetcher'
import {publicationUrl} from '../src/lib/types/publication'
import {
  fileNameUtil,
  CosmicObjectResponse
} from '../src/lib/services/cosmicService'
import {
  newsReleasesUrl,
  NewsReleaseMediaResponses,
  newsReleaseDateFrmt
} from '@lib/types/newsReleases'
import {agendasUrl, AgendaMetadata} from '@lib/types/agenda'
import {
  newsletterDateFrmt,
  NewsletterMediaResponses,
  newslettersUrl
} from '@lib/types/newsletters'
import {
  boardMinutesUrl,
  bodMinutesDateFrmt,
  bodMinutesMediaResponses
} from '@lib/types/bodMinutes'
import fileExtension from '@lib/fileExtension'
import groupBy from '@lib/groupBy'
import {
  MappedPhoto,
  multimediaUrl,
  PhotoList,
  PickedVideoResponse,
  PublicationList,
  VideoList
} from '@lib/types/multimedia'

export const spacesRe = /(\s|%20)+/g
// when using Next pages router, the nextjs BASE_URL env varible will now work here, work around is to set base url to prod
const baseUrl = 'https://www.pcwa.net'

function addPage(page: string, changefreq = 'daily') {
  const path = page
    .replace('src', '')
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('.mdx', '')
    .replace('//', '/') // finally, change double slash to single slash

  // homepage
  // const route = path === '/index' ? '' : path
  // Index page (including homepage)
  const route = path.replace(/^(.*)(\/index)$/, '$1')

  return `  <url>
    <loc>${`${baseUrl}${route}`}</loc>
    <changefreq>${changefreq}</changefreq>
  </url>`
}

async function generateSitemap() {
  const pages = await globby([
    'src/pages/**/*{.tsx,.mdx}',
    '!src/pages/_*.tsx', // ignore Next.js specific files (e.g., _app.tsx) and API routes
    '!src/pages/**/__*.tsx', // ignore debug pages
    '!src/pages/api', // ignore api routes
    '!src/pages/**/[*.tsx', // ignore dynamic pages (manually added below)
    '!src/pages/board-of-directors/meeting-dates-subject-to-change.tsx' // for internal use only
  ])

  const piPages = gages
    .filter((g) => !g.disabled) // No disabled gages.
    .map(({id = ''}) => id.toLowerCase().replace(spacesRe, '-')) // URL paths should be lowercase w/o spaces.
    .map((p) => `/recreation/flows/gages/${p}`)

  const bodPages = [
    'district-1',
    'district-2',
    'district-3',
    'district-4',
    'district-5'
  ].map((p) => `/board-of-directors/${p}`)

  const pubPages = [
    'newsletters',
    'fire-and-water',
    'year-end',
    'strategic-plans',
    'enews'
  ].map((p) => `/newsroom/publications/${p}`)

  const documents: PublicationList | undefined = await fetcher(
    `${baseUrl}${publicationUrl}`
  )

  const documentPages =
    documents && Array.isArray(documents)
      ? documents
          .map((doc) => ({
            ...doc,
            derivedFilenameAttr: fileNameUtil(doc.original_name)
          }))
          .filter((doc) => doc.derivedFilenameAttr.extension === 'pdf')
          .filter((doc) => !/(cover)/i.test(doc.original_name))
          .map((doc) => slugify(doc.derivedFilenameAttr?.base ?? ''))
          .map((p) => `/education-center/documents/${p}`)
      : []

  const agendas = await fetcher<CosmicObjectResponse<AgendaMetadata>>(
    `${baseUrl}${agendasUrl}`
  )

  const agendaPages =
    agendas && Array.isArray(agendas.objects)
      ? agendas.objects
          .filter((a) => !a.metadata.hidden)
          .filter((a) => a.title && a.metadata?.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
          // Note - Just date (not time) is used with route name.
          .map((a) => slugify(`${a.metadata.date} - ${a.title}`))
          .map((p) => `/board-of-directors/meeting-agendas/${p}`)
      : []

  const newsReleases: NewsReleaseMediaResponses | undefined = await fetcher(
    `${baseUrl}${newsReleasesUrl}`
  )

  const newsReleasesPages =
    newsReleases && Array.isArray(newsReleases)
      ? newsReleases
          .map((nr) => ({
            ...nr,
            derivedFilenameAttr: fileNameUtil(
              nr.original_name,
              newsReleaseDateFrmt
            )
          }))
          .filter((nr) => nr.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
          .map((nr) => nr.derivedFilenameAttr.date)
          .map((nr) => `/newsroom/news-releases/${nr}`)
      : []

  const newsletters: NewsletterMediaResponses | undefined = await fetcher(
    `${baseUrl}${newslettersUrl}`
  )
  const newslettersPages =
    newsletters && Array.isArray(newsletters)
      ? newsletters
          .map((nl) => ({
            ...nl,
            derivedFilenameAttr: fileNameUtil(
              nl.original_name,
              newsletterDateFrmt
            )
          }))
          .filter((nl) => nl.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
          .map((nl) => nl.derivedFilenameAttr.date)
          .map((nl) => `/newsroom/publications/newsletters/${nl}`)
      : []

  const data: bodMinutesMediaResponses | undefined = await fetcher(
    `${baseUrl}${boardMinutesUrl}`
  )
  const bodMinutesPages =
    data && Array.isArray(data)
      ? data
          .map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(
              bm.original_name,
              bodMinutesDateFrmt
            )
          }))
          .filter((bm) => bm.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
          .map((bm) => bm.derivedFilenameAttr.date)
          .map((bm) => `/board-of-directors/meeting-minutes/${bm}`)
      : []

  const multimedia: PhotoList | VideoList | undefined = await fetcher(
    `${baseUrl}${multimediaUrl}`
  )

  const filteredPhotoMultimedia =
    multimedia && Array.isArray(multimedia)
      ? (multimedia as PhotoList).filter(
          (p) =>
            fileExtension(p.name) !== 'mp4' && // No videos.
            p.metadata?.['video-poster'] !== 'true' && // No video posters
            p.metadata?.gallery // No photos w/o gallery metadata.
        )
      : []

  const multimediaPhotoPages = [
    ...groupBy<MappedPhoto, string>(filteredPhotoMultimedia, (a) =>
      a.metadata?.gallery?.toLowerCase().trim()
    )
  ]
    .map(([gallery, photos]) =>
      photos
        .map(
          (_, idx) => `/education-center/photos/${gallery}/${idx.toString()}`
        )
        .concat(`/education-center/photos/${gallery}`)
    )
    .reduce((prev, curVal) => [...prev, ...curVal])

  // Video Paths
  // Use the same filters used in <MultimediaPhotoGalleries/>.
  const filteredVideoMultimedia =
    multimedia && Array.isArray(multimedia)
      ? (multimedia as VideoList).filter(
          (p) =>
            fileExtension(p.name) === 'mp4' && // Only videos.
            p.metadata?.['video-poster'] !== 'true' && // No video posters
            p.metadata?.gallery // No videos w/o gallery metadata
        )
      : []

  const multimediaVideoPages = [
    ...groupBy<PickedVideoResponse, string>(
      filteredVideoMultimedia,
      (a) => a.metadata?.gallery
    )
  ]
    .map(([gallery]) => `/education-center/videos/${gallery}`)
    // manually added routes, due to solely added YouTube Multimedia files
    .concat([
      '/education-center/videos/historical',
      '/education-center/videos/construction',
      '/education-center/videos/water-in-action',
      '/education-center/videos/informational'
    ])

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => addPage(p))
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase())) // after page name is assigned sort alphabetically
  .sort((a, b) => a.length - b.length) // finally, sort by string length
  .join('\n')}
${piPages.map((p) => addPage(p, 'always')).join('\n')}
${bodPages.map((p) => addPage(p, 'monthly')).join('\n')}
${pubPages.map((p) => addPage(p, 'daily')).join('\n')}
${documentPages.map((p) => addPage(p, 'never')).join('\n')}
${newsReleasesPages.map((p) => addPage(p, 'never')).join('\n')}
${agendaPages.map((p) => addPage(p, 'never')).join('\n')}
${newslettersPages.map((p) => addPage(p, 'never')).join('\n')}
${bodMinutesPages.map((p) => addPage(p, 'never')).join('\n')}
${multimediaPhotoPages.map((p) => addPage(p, 'daily')).join('\n')}
${multimediaVideoPages.map((p) => addPage(p, 'daily')).join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
}

try {
  generateSitemap()
} catch (e) {
  console.log(e)
}
