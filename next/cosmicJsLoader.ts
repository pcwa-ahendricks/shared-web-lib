'use client'

import {type ImageLoader} from 'next/image'

/**
 * Custom ImageLoader for CosmicJS.
 *
 * This loader generates an Imgix URL for images hosted on CosmicJS. For more info see
 * https://nextjs.org/docs/app/api-reference/next-config-js/images#example-loader-configuration.
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

export default cosmicJsLoader
