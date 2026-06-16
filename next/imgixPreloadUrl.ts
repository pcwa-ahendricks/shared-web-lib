import imgixUrlLoader from './imgixUrlLoader'

// Must match Next.js default deviceSizes (no custom config in next.config.js)
const NEXT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

/**
 * Returns the imgix URL that Next.js will actually request for a full-viewport
 * image on the current device. Pass this as `preloadSrc` on ImageDialog so the
 * browser preloads the exact same URL it'll use when the dialog opens.
 *
 * Usage:
 *   <ImageDialog preloadSrc={() => imgixPreloadUrl(src)} ...>
 */
export default function imgixPreloadUrl(src: string, quality = 75): string {
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  const cssWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const pixelWidth = Math.round(cssWidth * dpr)
  const width =
    NEXT_DEVICE_SIZES.find((s) => s >= pixelWidth) ??
    NEXT_DEVICE_SIZES[NEXT_DEVICE_SIZES.length - 1]
  return imgixUrlLoader({src, width, quality})
}
