/**
 * A utility type that makes all properties of a given type nullable.
 *
 * This type takes an object type `T` and creates a new type where each property
 * can either be the original type or `null`.
 *
 * @template T - The type of the object whose properties will be made nullable.
 */
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

/**
 * Removes properties with `null` values from an object.
 *
 * This function takes an object of type `Nullable<T>`, where `T` is any object type,
 * and returns a new object of type `T` with all properties that had `null` values removed.
 *
 * @template T - The type of the input object.
 * @param {Nullable<T>} obj - The input object with potentially nullable properties.
 * @returns {T} A new object with all `null` properties removed.
 *
 * @example
 * const input = { a: 1, b: null, c: 3 };
 * const result = removeNulls(input);
 * console.log(result); // { a: 1, c: 3 }
 *
 * @example
 * const input = { name: 'Alice', age: null, email: 'alice@example.com' };
 * const result = removeNulls(input);
 * console.log(result); // { name: 'Alice', email: 'alice@example.com' }
 */
export default function removeNulls<T extends object>(obj: Nullable<T>): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  ) as T
}
