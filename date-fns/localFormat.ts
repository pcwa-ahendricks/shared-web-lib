import {format} from 'date-fns-tz'
import {TZ} from './options'

// Define a type alias for the parameters of the format function from date-fns-tz
type FormatParameters = Parameters<typeof format>

/**
 * Formats a date according to the given format string and options, ensuring that the date is displayed in the specified time zone (America/Los_Angeles).
 *
 * @param {...FormatParameters} args - The parameters for formatting, including the date, format string, and optional settings.
 * @returns {string} The formatted date string in the specified time zone.
 */
export default function localFormat(...args: FormatParameters): string {
  const [date, formatStr, opts] = args
  return format(date, formatStr, {...opts, timeZone: TZ})
}
