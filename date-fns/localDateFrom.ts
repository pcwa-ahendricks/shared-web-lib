import {toZonedTime} from 'date-fns-tz'
import {TZ} from './options'

/**
 * Converts a provided date, string, or timestamp into a `Date` object adjusted to the configured time zone.
 *
 * If the input is invalid, `undefined` is returned.
 *
 * @param {Date | string | number} props - The date to be converted. This can be a `Date` object, a date string, or a timestamp.
 * @returns {Date | undefined} A `Date` object adjusted to the configured time zone, or `undefined` if the input is invalid.
 *
 * @throws {Error} Only if the date type is unsupported or if the input type is wrong.
 *
 * @example
 * const date = localDateFrom(new Date());
 * console.log(date); // Date object in the configured time zone
 */
export default function localDateFrom(
  props: Date | string | number | null | undefined
): Date | undefined {
  // Explicitly handle null or undefined
  if (props === null || props === undefined) {
    return undefined
  }

  // Ensure the input is of the correct type before constructing Date
  let date: Date
  if (
    typeof props === 'string' ||
    typeof props === 'number' ||
    props instanceof Date
  ) {
    date = new Date(props)
  } else {
    throw new Error(
      'Invalid date type provided. Must be Date, string, or number.'
    )
  }

  // Validate date after construction
  if (isNaN(date.getTime())) {
    return undefined // Return undefined instead of throwing for invalid date inputs
  }

  return toZonedTime(date, TZ)
}
