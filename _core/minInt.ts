/**
 * Returns the minimum integer in an array. If the array is empty, it returns `undefined`.
 *
 * @param {number[]} arr - The array of numbers to evaluate.
 * @returns {number | undefined} The minimum number in the array or `undefined` if the array is empty.
 *
 * @example
 * const numbers = [10, -5, 100, 0, 3];
 * console.log(minInt(numbers)); // -5
 *
 * @example
 * const emptyArray: number[] = [];
 * console.log(minInt(emptyArray)); // undefined
 */
export default function minInt(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined
  }

  return arr.reduce((min, current) => (current < min ? current : min), arr[0])
}
