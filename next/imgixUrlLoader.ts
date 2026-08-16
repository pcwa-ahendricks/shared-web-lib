'use client'

import {ImageLoader} from 'next/image'

/**
 * The `next/image` loader for imgix-backed sources.
 *
 * Wire it up once, app-wide, in next.config.js:
 *
 * ```js
 * images: {
 *   loader: 'custom',
 *   loaderFile: './src/share/next/imgixUrlLoader.ts'
 * }
 * ```
 *
 * Prefer that over `<Image loader={imgixUrlLoader} />`. A loader is a function,
 * and functions cannot cross the RSC boundary, so the per-call form forces
 * `'use client'` onto every component that renders an image. `loaderFile` is
 * resolved by the bundler, so Server Components keep working untouched.
 *
 * Why bypass Next's optimizer at all: imgix is already a CDN with on-the-fly
 * transforms. On the default loader, requests go to `/_next/image?url=<imgix
 * url>`, so the platform fetches an image imgix has already transformed,
 * decodes it, and re-encodes it — an extra hop and a second optimizer for no
 * benefit, billed as a source image. With this loader the transform is imgix's
 * alone, and `images.remotePatterns` becomes unnecessary since the built-in
 * optimizer never runs.
 *
 * `auto=compress` is worth having and is easy to leave off: measured on a
 * 1200px-wide PNG banner, `auto=format` alone returned 130,181 bytes while
 * `auto=compress` + `auto=format` returned 49,865 — 62% smaller for the same
 * request. imgix accepts the pair either as repeated `auto` params or as a
 * single comma-joined value, and returns byte-identical output for both.
 *
 * Any other imgix params already on the source URL (`fit`, `ar`, `crop`, …) are
 * deliberately preserved; only `w`, `q`, and `auto` are replaced so the values
 * Next asks for win.
 *
 * Note for callers: the exact string this returns is a contract, not an
 * implementation detail. `imgixPreloadUrl` reproduces it to warm the browser
 * cache, and the cache is keyed on the full URL — so changing the parameter
 * order or spelling here invalidates every cached image and silently breaks
 * preloading for anything that does not go through that helper.
 */
const imgixUrlLoader: ImageLoader = ({src, width, quality}) => {
  // Static imports and anything under /public arrive as a root-relative path,
  // which `new URL()` throws on. Returning those untouched is the correct
  // behaviour anyway — they are already served by the app, not by imgix — and
  // it turns a render-time crash into a no-op for apps that mix the two.
  if (!src.startsWith('http')) {
    return src
  }

  const {origin, pathname, searchParams} = new URL(src)

  // Drop any that came in on the source URL so the values below win.
  searchParams.delete('w')
  searchParams.delete('q')
  searchParams.delete('auto')

  searchParams.append('auto', 'compress')
  searchParams.append('auto', 'format')
  searchParams.append('w', width.toString())
  searchParams.append('q', (quality || 75).toString())

  return `${origin}${pathname}?${searchParams.toString()}`
}

export default imgixUrlLoader
