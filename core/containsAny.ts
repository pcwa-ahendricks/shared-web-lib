/**
 * Checks if any of the values in the `values` array are present in the `array`.
 *
 * This function iterates over the `values` array and checks if at least one of the elements
 * exists in the `array`. If any value is found in the `array`, the function returns `true`.
 * Otherwise, it returns `false`.
 *
 * @template T - The type of the elements in the arrays.
 * @param {T[]} [array=[]] - The array to search within. Defaults to an empty array.
 * @param {T[]} [values=[]] - The array of values to search for. Defaults to an empty array.
 * @returns {boolean} `true` if any value from the `values` array is found in the `array`, otherwise `false`.
 *
 * @example
 * const result = containsAny([1, 2, 3], [2, 4]);
 * console.log(result); // true
 *
 * @example
 * const result = containsAny(['apple', 'banana'], ['cherry', 'banana']);
 * console.log(result); // true
 *
 * @example
 * const result = containsAny([1, 2, 3], [4, 5]);
 * console.log(result); // false
 */
export default function containsAny<T>(
  array: T[] = [],
  values: T[] = []
): boolean {
  return values.some((value) => array.includes(value))
}
