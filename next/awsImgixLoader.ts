'use client'

import {ImageLoader} from 'next/image'

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

export default awsImgixLoader
