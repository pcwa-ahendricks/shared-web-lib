import {toZonedTime, format} from 'date-fns-tz'
type FormatParameters = Parameters<typeof format>

export const TZ = 'America/Los_Angeles'

export function localDate() {
  return toZonedTime(new Date(), TZ)
}

export function localDateFrom(props: Date | string | number) {
  return toZonedTime(new Date(props), TZ)
}

export function localFormat(...args: FormatParameters) {
  const [date, formatStr, opts] = args
  return format(date, formatStr, {...opts, timeZone: TZ})
}
