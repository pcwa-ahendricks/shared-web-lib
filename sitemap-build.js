// cspell:ignore urlset frmt
const fs = require('fs')
const globby = require('globby')
const format = require('xml-formatter')

const frmtOpts = {
  indentation: '  '
}

async function build() {}
;(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*{.tsx,.mdx}',
    '!src/pages/_*.tsx',
    '!/src/pages/resource-library/[...multimedia]' // <- Exclude dynamic route
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('src/pages', '')
              .replace('.tsx', '')
              .replace('.mdx', '')
            const route = path === '/index' ? '' : path

            return `
              <url>
                  <loc>${`https://www.pcwa.net${route}`}</loc>
              </url>
            `
          })
          .join('')}
    </urlset>
  `

  fs.writeFileSync('sitemap.xml', format(sitemap, frmtOpts))
})()
