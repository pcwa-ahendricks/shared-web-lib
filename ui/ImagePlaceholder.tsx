// Imported directly rather than via ../next so this client component does not
// pull in imgixBlurDataUrl, which is server-only
import imgixPlaceholderUrl from '../next/imgixPlaceholderUrl'
import {cn} from '../_classnames'

export type ImagePlaceholderProps = {
  /**
   * The same imgix URL passed to the image this sits behind, including any
   * aspect-ratio/crop params, so the placeholder matches the visible crop.
   */
  src: string
  /** Width of the fetched placeholder in px. Larger = more color detail. */
  width?: number
  /**
   * Whether the image above has finished loading. Required, not optional: a
   * placeholder that is never told it can leave is a permanent layer, which
   * only looks hidden while the image happens to be opaque and exactly
   * covering. Wire it to next/image's onLoad — that fires for cached images
   * too, so there is no complete() special case to handle.
   */
  loaded: boolean
  /**
   * Skip the fade. Set when the image was already cached, so returning to a
   * page doesn't replay a blur for an image that was never missing.
   */
  instant?: boolean
  className?: string
}

/**
 * A cheap blurred stand-in shown while a next/image loads. Renders a ~700 byte
 * imgix version of the same image as a CSS background on its own layer, so the
 * browser can paint it straight from the server-rendered HTML with no
 * JavaScript.
 *
 * Deliberately does NOT wrap next/image — pass image props to next/image
 * directly. Wrapping it means forwarding its entire API forever, which is what
 * made HoverZoomImage (nee ImageFancier)/ImageBlur hard to change.
 *
 * The parent must be `relative` and should be `overflow-hidden`; the image goes
 * after it so it paints on top:
 *
 *   <div className="relative aspect-[5/4] overflow-hidden">
 *     <ImagePlaceholder src={imgixUrl} />
 *     <Image fill className="object-cover" ... />
 *   </div>
 *
 * Not for logos or images with transparency — the blur shows as a colored
 * smear around the artwork. For preloaded above-the-fold images prefer
 * imgixBlurDataUrl with next/image's placeholder="blur", since the request
 * this makes would compete with the browser's head preload.
 */
export default function ImagePlaceholder({
  src,
  width,
  loaded,
  instant,
  className
}: ImagePlaceholderProps) {
  const url = imgixPlaceholderUrl(src, width)

  if (!url) {
    return null
  }
  return (
    <div
      aria-hidden
      // scale-110 keeps the blur from feathering transparent edges inward —
      // the same trick Next's own blur placeholder uses
      className={cn(
        'pointer-events-none absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-lg transition-opacity duration-300',
        loaded && 'opacity-0',
        instant && 'transition-none',
        className
      )}
      style={{backgroundImage: `url("${url}")`}}
    />
  )
}
