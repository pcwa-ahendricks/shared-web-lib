import globby from 'globby'
import {writeFileSync} from 'fs'
import gages from '../src/lib/services/pi/gage-config'

export const spacesRe = /(\s|%20)+/g
const websiteUrl = 'https://www.pcwa.net'

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

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => addPage(p))
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase())) // after page name is assigned sort alphabetically
  .sort((a, b) => a.length - b.length) // finally, sort by string length
  .join('\n')}
${piPages.map((p) => addPage(p, 'always')).join('\n')}
${bodPages.map((p) => addPage(p)).join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
}

try {
  generateSitemap()
} catch (e) {
  console.log(e)
}
