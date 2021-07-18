import globby from 'globby'
import {writeFileSync} from 'fs'
import gages from '../src/lib/services/pi/gage-config'
import slugify from 'slugify'
import fetcher from '../src/lib/fetcher'
import {publicationUrl} from '../src/lib/types/publication'
import {fileNameUtil} from '../src/lib/services/cosmicService'
import {PublicationList} from '../src/components/multimedia/MultimediaStore'

export const spacesRe = /(\s|%20)+/g
const websiteUrl = 'https://www.pcwa.net'
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
    <loc>${`${websiteUrl}${route}`}</loc>
    <changefreq>${changefreq}</changefreq>
  </url>`
}

async function generateSitemap() {
  const pages = await globby([
    'src/pages/**/*{.tsx,.mdx}',
    '!src/pages/_*.tsx', // ignore Next.js specific files (e.g., _app.tsx) and API routes
    '!src/pages/**/__*.tsx', // ignore debug pages
    '!src/pages/api', // ignore api routes
    '!src/pages/**/[*.tsx' // ignore dynamic pages (manually added below)
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

  const pubPages = ['newsletters', 'fire-and-water', 'year-end', 'enews'].map(
    (p) => `/newsroom/publications/${p}`
  )

  const documents: PublicationList | undefined = await fetcher(
    `${apiBaseUrl}${publicationUrl}`
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
          .map((p) => `/resource-library/documents/${p}`)
      : []

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
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
}

try {
  generateSitemap()
} catch (e) {
  console.log(e)
}
