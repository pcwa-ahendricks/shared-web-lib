import {toZonedTime, format} from 'date-fns-tz'

const isDev = process.env.NODE_ENV === 'development'

export function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}

export function dLog(...params: Parameters<(typeof console)['log']>) {
  isDev && console.log(params)
}

export const TZ = 'America/Los_Angeles'

export function localDate() {
  return toZonedTime(new Date(), TZ)
}
export function localDateFrom(props: Date | string | number) {
  return toZonedTime(new Date(props), TZ)
}

type FormatParameters = Parameters<typeof format>
export function localFormat(...args: FormatParameters) {
  const [date, formatStr, opts] = args
  return format(date, formatStr, {...opts, timeZone: TZ})
}

export const startsWithAnyPrefix = (
  str: string,
  prefixes: string[]
): boolean => {
  return prefixes.some((prefix) => str.startsWith(prefix))
}

// see https://support.imgix.com/hc/en-us/articles/204280985-Supported-image-formats for more info
export const isImgixInputMimeType = (extension?: string): Boolean => {
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

  return Boolean(mimeTypes[extension?.toLowerCase()] || null)
}

export const getFileExtension = (filename = ''): string | null => {
  // Extract the part after the last dot
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null
}
