/**
 * Returns a tiny imgix URL suitable for use as a CSS `background-image`
 * placeholder sitting behind a next/image. The real image loads on top and
 * hides it, so no load/unload state or opacity transition is needed.
 *
 * Why not `placeholder="blur"`? Next.js inlines `blurDataURL` into an SVG data
 * URI (see next/dist/shared/lib/image-blur-svg), and browsers block external
 * references from inside a data URI — so `blurDataURL` must be a base64 `data:`
 * string, which would mean precomputing and hardcoding one per image. A remote
 * URL there renders nothing.
 *
 * `auto=compress` is doing real work here: without it imgix preserves the
 * source EXIF/ICC metadata and a 16px wide image weighs ~3.3KB instead of
 * ~700 bytes.
 *
 * Pass the same query params used for the displayed image (eg. imgix aspect
 * ratio/crop params) so the placeholder matches the visible crop.
 *
 * Render it on its own layer with a CSS blur — scaled up so the blur doesn't
 * feather in the edges — otherwise the upscale just looks pixelated:
 *
 *   <div className="relative aspect-[5/4] overflow-hidden">
 *     <div
 *       aria-hidden
 *       className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-lg"
 *       style={{backgroundImage: `url("${imgixPlaceholderUrl(src)}")`}}
 *     />
 *     <Image fill className="object-cover" ... />
 *   </div>
 */
export default function imgixPlaceholderUrl(
  src: string,
  width = 24
): string | null {
  let parsed: URL
  try {
    parsed = new URL(src)
  } catch {
    // Relative or malformed src. A placeholder is decorative, so degrade to
    // none rather than throwing and taking the whole page down.
    return null
  }
  const {origin, pathname, searchParams} = parsed

  // Drop any sizing/format params already on the URL so ours win
  searchParams.delete('w')
  searchParams.delete('h')
  searchParams.delete('q')
  searchParams.delete('auto')
  searchParams.delete('fm')

  searchParams.append('auto', 'compress')
  searchParams.append('fm', 'webp')
  searchParams.append('w', width.toString())
  searchParams.append('q', '30')

  return `${origin}${pathname}?${searchParams.toString()}`
}
