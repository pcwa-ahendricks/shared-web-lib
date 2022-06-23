import {utcToZonedTime, format} from 'date-fns-tz'

const isDev = process.env.NODE_ENV === 'development'

export function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}

export function dLog(...params: Parameters<typeof console['log']>) {
  isDev && console.log(params)
}

export const TZ = 'America/Los_Angeles'

export function localDate() {
  return utcToZonedTime(new Date(), TZ)
}
export function localDateFrom(props: Date | string | number) {
  return utcToZonedTime(new Date(props), TZ)
}

type FormatParameters = Parameters<typeof format>
export function localFormat(...args: FormatParameters) {
  const [date, formatStr, opts] = args
  return format(date, formatStr, {...opts, timeZone: TZ})
}
