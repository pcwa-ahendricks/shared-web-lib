import {toZonedTime} from 'date-fns-tz'
import {TZ} from './options'

/**
 * Converts a given date, string, or timestamp into a Date object adjusted to the specified time zone (America/Los_Angeles).
 *
 * @param {Date | string | number} props - The date, string, or timestamp to be converted.
 * @returns {Date} The converted date object in the specified time zone.
 * @throws {Error} If the provided date, string, or number cannot be converted to a valid date.
 */
export default function localDateFrom(props: Date | string | number): Date {
  const date = new Date(props)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided')
  }
  return toZonedTime(date, TZ)
}
