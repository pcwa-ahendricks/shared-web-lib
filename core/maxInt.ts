/**
 * Returns the maximum integer in an array. If the array is empty, it returns `undefined`.
 *
 * @param {number[]} arr - The array of numbers to evaluate.
 * @returns {number | undefined} The maximum number in the array or `undefined` if the array is empty.
 *
 * @example
 * const numbers = [10, -5, 100, 0, 3];
 * console.log(maxInt(numbers)); // 100
 *
 * @example
 * const emptyArray: number[] = [];
 * console.log(maxInt(emptyArray)); // undefined
 */
export default function maxInt(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined
  }

  return arr.reduce((max, current) => (current > max ? current : max), arr[0])
}
