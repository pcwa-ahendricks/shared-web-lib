// see https://support.imgix.com/hc/en-us/articles/204280985-Supported-image-formats for more info
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
