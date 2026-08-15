/**
 * Checks if a given string starts with any of the specified prefixes.
 *
 * This function takes a string and an array of prefixes, and returns `true`
 * if the string starts with any of the prefixes in the array. The comparison
 * can be made case-insensitive by setting the `caseInsensitive` flag to `true`.
 *
 * @param {string} str - The string to check.
 * @param {string[]} prefixes - An array of prefixes to check against the string.
 * @param {boolean} [caseInsensitive=false] - Optional flag to perform a case-insensitive comparison. Defaults to `false`.
 * @returns {boolean} `true` if the string starts with any of the prefixes, otherwise `false`.
 *
 * @example
 * const result = startsWithAnyPrefix('HelloWorld', ['Hi', 'Hello']);
 * console.log(result); // true
 *
 * @example
 * const result = startsWithAnyPrefix('HelloWorld', ['hi', 'hello'], true);
 * console.log(result); // true
 *
 * @example
 * const result = startsWithAnyPrefix('HelloWorld', ['Hi', 'Hey']);
 * console.log(result); // false
 */
export default function startsWithAnyPrefix(
  str: string,
  prefixes: string[],
  caseInsensitive: boolean = false
): boolean {
  if (caseInsensitive) {
    return prefixes.some((prefix) =>
      str.toLowerCase().startsWith(prefix?.toLowerCase())
    )
  }
  return prefixes.some((prefix) => str.startsWith(prefix))
}
