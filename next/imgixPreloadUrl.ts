import imgixUrlLoader from './imgixUrlLoader'

// Must match Next.js default deviceSizes (no custom config in next.config.js)
const NEXT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

/**
 * Returns the imgix URL that Next.js will actually request for an image on
 * the current device, given the CSS width it renders at. Pass this as
 * `preloadSrc` on ImageDialog so the browser preloads the exact same URL it'll
 * use when the dialog opens — the two must match byte-for-byte, since the
 * browser cache is keyed on the full URL, not on "close enough".
 *
 * `maxWidth` must mirror the `sizes` the target <Image> actually uses. Passing
 * none assumes the image spans the full viewport (`sizes="100vw"`); if the
 * real image is capped narrower than that (e.g. ImageDialog's `size="base"`
 * caps at 900px), the preload silently warms the wrong URL and the hover
 * preload does nothing — this is what regressed when explicit `sizes` values
 * were added across the site without updating this assumption.
 *
 * Usage:
 *   <ImageDialog preloadSrc={() => imgixPreloadUrl(src, 75, 900)} ...>
 */
export default function imgixPreloadUrl(
  src: string,
  quality = 75,
  maxWidth?: number
): string {
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  const viewportWidth =
    typeof window !== 'undefined' ? window.innerWidth : 1200
  const cssWidth = maxWidth ? Math.min(viewportWidth, maxWidth) : viewportWidth
  const pixelWidth = Math.round(cssWidth * dpr)
  const width =
    NEXT_DEVICE_SIZES.find((s) => s >= pixelWidth) ??
    NEXT_DEVICE_SIZES[NEXT_DEVICE_SIZES.length - 1]
  return imgixUrlLoader({src, width, quality})
}
