/**
 * Checks if the given file extension corresponds to a supported Imgix input MIME type.
 *
 * This function takes a file extension as input, converts it to lowercase, and checks
 * if it matches any of the MIME types supported by Imgix. If the extension corresponds
 * to a supported MIME type, the function returns `true`; otherwise, it returns `false`.
 *
 * @param {string | null} [extension=''] - The file extension to check. Defaults to an empty string if `null` or not provided.
 * @returns {boolean} `true` if the extension corresponds to a supported Imgix MIME type, `false` otherwise.
 *
 * @see https://support.imgix.com/hc/en-us/articles/204280985-Supported-image-formats for more information on supported MIME types.
 *
 * @example
 * const isSupported = isImgixInputMimeType('jpg');
 * console.log(isSupported); // true
 *
 * @example
 * const isSupported = isImgixInputMimeType('heic');
 * console.log(isSupported); // true
 *
 * @example
 * const isSupported = isImgixInputMimeType('doc');
 * console.log(isSupported); // false
 *
 * @example
 * const isSupported = isImgixInputMimeType(null);
 * console.log(isSupported); // false
 */
export default function isImgixInputMimeType(
  extension: string | null = ''
): boolean {
  const mimeTypes: {[key: string]: string} = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    heic: 'image/heic',
    webp: 'image/webp',
    pdf: 'application/pdf',
    ai: 'application/postscript',
    icns: 'image/icns',
    pct: 'image/x-pict',
    pjpg: 'image/pjpeg',
    psd: 'image/vnd.adobe.photoshop'
  }

  // Ensure extension is a string in case null (or undefined) is explicitly passed
  const ext = extension?.toLowerCase() ?? ''

  return Boolean(mimeTypes[ext] || null)
}
