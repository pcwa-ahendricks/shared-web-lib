'use client'

import {ImageLoader} from 'next/image'

/**
 * Custom ImageLoader for Imgix URLs.
 *
 * This loader modifies existing Imgix URLs, removing any existing width, quality, or auto parameters,
 * and applies the desired transformations. For more info see
 * https://nextjs.org/docs/app/api-reference/next-config-js/images#example-loader-configuration.
 *
 * @param {object} params - The parameters for the image loader.
 * @param {string} params.src - The source URL of the image.
 * @param {number} params.width - The desired width of the image.
 * @param {number} [params.quality=75] - The quality of the image (defaults to 75 if not provided).
 * @returns {string} The modified URL with the appropriate transformations applied.
 */
const imgixUrlLoader: ImageLoader = ({src, width, quality}) => {
  const srcUrl = new URL(src)
  const {origin, pathname, searchParams} = srcUrl

  // Remove existing width, quality, and auto parameters from the URL
  searchParams.delete('w')
  searchParams.delete('q')
  searchParams.delete('auto')

  // Add the desired transformations
  searchParams.append('auto', 'compress')
  searchParams.append('auto', 'format')
  searchParams.append('w', width.toString())
  searchParams.append('q', (quality || 75).toString())

  const url = `${origin}${pathname}?${searchParams.toString()}`
  return url
}

export default imgixUrlLoader
