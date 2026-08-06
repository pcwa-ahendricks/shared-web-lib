import imgixPlaceholderUrl from './imgixPlaceholderUrl'

/**
 * Server-only. Fetches a tiny imgix version of an image and returns it as a
 * base64 `data:` URI suitable for next/image's `blurDataURL` prop.
 *
 * Use this for above-the-fold images — anything with `preload`. Those get a
 * `<link rel="preload" as="image">` in the head, so the browser starts the real
 * image before it parses the body; a placeholder that needs its own request
 * (see [imgixPlaceholderUrl]) is discovered later and can lose that race. A
 * data URI has no request at all and paints with the first frame.
 *
 * For everything else prefer imgixPlaceholderUrl — it costs no payload and
 * needs no build-time fetch.
 *
 * Not for logos or images with transparency: the blur shows as a colored smear
 * around the artwork.
 *
 * Returns null rather than throwing, so a slow or broken imgix response
 * degrades to no placeholder instead of failing the build. Callers should pass
 * `placeholder={blurDataURL ? 'blur' : 'empty'}`. Null (not undefined) because
 * getStaticProps cannot serialize undefined.
 *
 * Usage, in getStaticProps:
 *   const blurDataURL = await imgixBlurDataUrl(HERO_SRC)
 *   return {props: {blurDataURL}}
 */
export default async function imgixBlurDataUrl(
  src: string,
  width = 24,
  timeoutMs = 5000
): Promise<string | null> {
  const url = imgixPlaceholderUrl(src, width)
  try {
    const res = await fetch(url, {signal: AbortSignal.timeout(timeoutMs)})
    if (!res.ok) {
      throw new Error(`imgix responded ${res.status}`)
    }
    const mime = res.headers.get('content-type') ?? 'image/webp'
    const base64 = Buffer.from(await res.arrayBuffer()).toString('base64')
    return `data:${mime};base64,${base64}`
  } catch (error) {
    console.log(`Could not build a blur placeholder for ${src}`, error)
    return null
  }
}
