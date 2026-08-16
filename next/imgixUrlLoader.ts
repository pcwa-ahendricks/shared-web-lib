'use client'

import {ImageLoader} from 'next/image'

/**
 * The `next/image` loader for imgix-backed sources.
 *
 * Pass it per image:
 *
 * ```tsx
 * import {imgixUrlLoader} from '@/share/next'
 *
 * <Image loader={imgixUrlLoader} src={imgixUrl} alt="" width={400} height={300} />
 * ```
 *
 * This works from Server Components. The `'use client'` directive above is
 * what makes that true: it turns the export into a client reference, which is
 * serializable across the RSC boundary, so a Server Component can pass it as a
 * prop without becoming a Client Component itself. (A plain, undirectivized
 * function could not — that is the rule this file is deliberately sidestepping,
 * and the reason a wrapper component is not needed.)
 *
 * It can also be wired app-wide via `images.loader: 'custom'` +
 * `images.loaderFile` in next.config.js, which drops the prop everywhere and
 * makes `remotePatterns` moot. That is fewer characters but much more implicit:
 * every image silently changes behaviour from one config line, and a reader at
 * the call site has no clue imgix is involved. Prefer the explicit prop unless
 * an app has so many images that the repetition genuinely hurts.
 *
 * Why bother instead of the built-in optimizer: imgix is already a CDN with
 * on-the-fly transforms. On the default loader, requests go to
 * `/_next/image?url=<imgix url>`, so the platform fetches an image imgix has
 * already transformed, decodes it, and re-encodes it — an extra hop and a
 * second optimizer for no benefit, billed as a source image.
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

  const {origin, pathname, searchParams, hostname} = new URL(src)

  // Only imgix understands the params below. Appending them to some other host
  // does not fail loudly -- the host just ignores the query string and serves
  // the full-size original at every srcSet width, so an unoptimised multi-MB
  // image ships while the markup claims to be responsive. Hand those back
  // untouched instead. Apps serving imgix from a custom domain rather than
  // *.imgix.net need to widen this check.
  if (!hostname.endsWith('.imgix.net')) {
    return src
  }

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
