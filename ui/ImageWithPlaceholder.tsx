'use client'

import Image, {type ImageProps} from 'next/image'
import ImagePlaceholder from './ImagePlaceholder'
import useImageLoaded from '../hooks/useImageLoaded'
import {cn} from '../_classnames'

export type ImageWithPlaceholderProps = ImageProps & {
  /** Classes for the wrapper that the placeholder positions against. */
  containerClassName?: string
  /** Width of the fetched placeholder in px. Larger = more color detail. */
  placeholderWidth?: number
}

/**
 * next/image with a blurred placeholder behind it, for the common case: an
 * image that sizes itself and has no container of its own.
 *
 * Use [ImagePlaceholder] directly instead when the container already exists and
 * carries its own layout — an aspect box, a `fill` image, a card media slot.
 * This component owns its wrapper, so nesting it inside another positioned box
 * just adds a redundant div.
 *
 * For preloaded above-the-fold images prefer imgixBlurDataUrl with next/image's
 * own placeholder="blur"; the request this makes would compete with the
 * browser's head preload.
 */
export default function ImageWithPlaceholder({
  containerClassName,
  placeholderWidth,
  onLoad,
  src,
  ...rest
}: ImageWithPlaceholderProps) {
  const {ref, loaded, instant, onLoad: markLoaded} = useImageLoaded(
    typeof src === 'string' ? src : undefined
  )

  return (
    // overflow-hidden clips the placeholder, which is scaled up slightly so its
    // blur doesn't feather the edges inward
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <ImagePlaceholder
        // A non-string src is a static import, which next/image already
        // generates its own placeholder for
        src={typeof src === 'string' ? src : ''}
        width={placeholderWidth}
        loaded={loaded}
        instant={instant}
      />
      <Image
        ref={ref}
        src={src}
        onLoad={(e) => {
          markLoaded()
          onLoad?.(e)
        }}
        {...rest}
      />
    </div>
  )
}
