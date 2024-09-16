/**
 * Executes an asynchronous function sequentially on each element of an array.
 * The function waits for each promise to resolve before proceeding to the next item.
 *
 * @template T - The type of the elements in the input array.
 * @template U - The type of the resolved value returned by the function `fn` (defaults to `T`).
 * @param {T[]} array - The array of elements to process sequentially.
 * @param {(args: T) => Promise<U>} fn - An asynchronous function that takes an element of type `T`
 * and returns a promise resolving to a value of type `U`.
 * @returns {Promise<U[]>} A promise that resolves to an array of results (of type `U[]`) after all
 * the asynchronous operations have completed.
 *
 * @example
 * const items = [1, 2, 3];
 * const asyncFn = async (n) => {
 *   return n * 2;
 * };
 * const result = await sequenceArray(items, asyncFn);
 * console.log(result); // [2, 4, 6]
 *
 * @example
 * // Example with filtering out null or undefined values:
 * const items = ['apple', 'banana', 'cherry'];
 * const asyncFn = async (fruit) => {
 *   return fruit.length > 5 ? fruit : null;
 * };
 * const result = await sequenceArray(items, asyncFn);
 * console.log(result); // ['banana', 'cherry']
 */
export default async function sequenceArray<T, U = T>(
  array: T[],
  fn: (args: T) => Promise<U>
): Promise<U[]> {
  const results: U[] = []
  for (const item of array) {
    const r = await fn(item)
    if (r !== null && r !== undefined) {
      results.push(r)
    }
  }
  return results
}
