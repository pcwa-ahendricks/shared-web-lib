import {toZonedTime} from 'date-fns-tz'
import {TZ} from './options'

/**
 * Returns the current date and time adjusted to the specified time zone (America/Los_Angeles).
 *
 * @returns {Date} The current date and time in the specified time zone.
 */
export default function localDate(): Date {
  return toZonedTime(new Date(), TZ)
}
