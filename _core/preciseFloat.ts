/**
 * Rounds a number to a specified number of decimal places and returns it as a floating-point number.
 *
 * This function takes a number, rounds it to the specified precision, and then converts it
 * to a floating-point number. By default, the precision is set to 2 decimal places.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} [precision=2] - The number of decimal places to round to. Default is 2.
 * @returns {number} The rounded number as a floating-point value.
 *
 * @example
 * const result = preciseFloat(123.456789);
 * console.log(result); // 123.46
 *
 * @example
 * const result = preciseFloat(123.456789, 4);
 * console.log(result); // 123.4568
 */
export function preciseFloat(num: number, precision: number = 2): number {
  return parseFloat(num.toFixed(precision))
}
