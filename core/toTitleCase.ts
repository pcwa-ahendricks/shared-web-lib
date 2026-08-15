/**
 * Converts a string to title case, where the first letter of each word is capitalized.
 *
 * This function takes a string and converts it to title case, meaning that the first letter
 * of each word is capitalized, and the rest of the word is in lowercase. You can optionally
 * provide a regular expression (`ignore`) to specify words that should not be capitalized.
 *
 * @param {string} [str=''] - The string to convert to title case. Defaults to an empty string if not provided.
 * @param {RegExp} [ignore] - An optional regular expression to match words that should not be capitalized.
 * @returns {string} The converted string in title case.
 *
 * @example
 * const titleCased = toTitleCase('hello world');
 * console.log(titleCased); // 'Hello World'
 *
 * @example
 * const titleCased = toTitleCase('HELLO WORLD');
 * console.log(titleCased); // 'Hello World'
 *
 * @example
 * const titleCased = toTitleCase('hello world', /\bworld\b/);
 * console.log(titleCased); // 'Hello world' (ignores 'world' due to the regex)
 */
const toTitleCase = (str = '', ignore?: RegExp): string =>
  str.replace(/\w\S*/g, (txt) =>
    ignore && ignore.test(txt)
      ? txt
      : `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()}`
  )

export default toTitleCase
