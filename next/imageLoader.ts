import {ImageLoader} from 'next/image'

/**
 * Custom ImageLoader for CosmicJS.
 *
 * This loader generates an Imgix URL for images hosted on CosmicJS.
 *
 * @param {object} params - The parameters for the image loader.
 * @param {string} params.src - The source path of the image.
 * @param {number} params.width - The desired width of the image.
 * @param {number} [params.quality=75] - The quality of the image (defaults to 75 if not provided).
 * @returns {string} The URL to the image with the appropriate transformations applied.
 */
const cosmicJsLoader: ImageLoader = ({src, width, quality}) => {
  return `https://imgix.cosmicjs.com/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

/**
 * Custom ImageLoader for AWS Imgix, hosted on Digital Ocean Spaces.
 *
 * This loader generates an Imgix URL for images hosted on AWS and processed by Imgix.
 *
 * @param {object} params - The parameters for the image loader.
 * @param {string} params.src - The source path of the image.
 * @param {number} params.width - The desired width of the image.
 * @param {number} [params.quality=75] - The quality of the image (defaults to 75 if not provided).
 * @returns {string} The URL to the image with the appropriate transformations applied.
 */
const awsImgixLoader: ImageLoader = ({src, width, quality}) => {
  return `https://pcwa.imgix.net/pcwa-net/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

/**
 * Custom ImageLoader for Imgix URLs.
 *
 * This loader modifies existing Imgix URLs, removing any existing width, quality, or auto parameters,
 * and applies the desired transformations.
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
  searchParams.append('auto', 'format')
  searchParams.append('w', width.toString())
  searchParams.append('q', (quality || 75).toString())

  const url = `${origin}${pathname}?${searchParams.toString()}`
  return url
}

export default cosmicJsLoader
export {imgixUrlLoader, awsImgixLoader}
