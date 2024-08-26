/**
 * Groups an array of items by a specified key.
 *
 * This function takes a list of items and a key getter function, and returns a Map where each key corresponds to the result of the key getter function,
 * and the value is an array of items that share the same key.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of the key returned by the key getter function.
 *
 * @param {T[]} list - The array of items to be grouped.
 * @param {(param: T) => U} keyGetter - A function that extracts the key for grouping from each item in the array.
 * @returns {Map<U, T[]>} A Map where each key corresponds to the result of the key getter function, and the value is an array of items that share that key.
 *
 * @example
 * const items = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 *
 * const grouped = groupBy(items, item => item.category);
 * console.log(grouped);
 * // Map {
 * //   'fruit' => [{ category: 'fruit', name: 'apple' }, { category: 'fruit', name: 'banana' }],
 * //   'vegetable' => [{ category: 'vegetable', name: 'carrot' }]
 * // }
 */
const groupBy = <T, U>(list: T[], keyGetter: (param: T) => any) => {
  const map = new Map<U, T[]>()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

export default groupBy
