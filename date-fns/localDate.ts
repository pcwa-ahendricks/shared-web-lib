import {toZonedTime, format} from 'date-fns-tz'

// Define a type alias for the parameters of the format function from date-fns-tz
type FormatParameters = Parameters<typeof format>

// Constant for the target time zone
export const TZ = 'America/Los_Angeles'

/**
 * Returns the current date and time adjusted to the specified time zone (America/Los_Angeles).
 *
 * @returns {Date} The current date and time in the specified time zone.
 */
export function localDate(): Date {
  return toZonedTime(new Date(), TZ)
}

/**
 * Converts a given date, string, or timestamp into a Date object adjusted to the specified time zone (America/Los_Angeles).
 *
 * @param {Date | string | number} props - The date, string, or timestamp to be converted.
 * @returns {Date} The converted date object in the specified time zone.
 * @throws {Error} If the provided date, string, or number cannot be converted to a valid date.
 */
export function localDateFrom(props: Date | string | number): Date {
  const date = new Date(props)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided')
  }
  return toZonedTime(date, TZ)
}

/**
 * Formats a date according to the given format string and options, ensuring that the date is displayed in the specified time zone (America/Los_Angeles).
 *
 * @param {...FormatParameters} args - The parameters for formatting, including the date, format string, and optional settings.
 * @returns {string} The formatted date string in the specified time zone.
 */
export function localFormat(...args: FormatParameters): string {
  const [date, formatStr, opts] = args
  return format(date, formatStr, {...opts, timeZone: TZ})
}
