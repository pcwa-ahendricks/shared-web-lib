/**
 * Converts a parameter to a string.
 *
 * This function takes an optional parameter that can be either a string or an array of strings.
 * If the parameter is an array, it joins the elements into a single string separated by commas.
 * If the parameter is a string, it returns the string as is.
 * If the parameter is undefined or an empty string, it returns an empty string.
 *
 * @param {string | string[]} [param] - The parameter to be converted to a string. It can be a single string or an array of strings.
 * @returns {string} A string representation of the parameter. If the input is an array, the elements are joined by commas.
 *
 * @example
 * paramToStr('hello'); // Returns 'hello'
 * paramToStr(['hello', 'world']); // Returns 'hello,world'
 * paramToStr(); // Returns ''
 */
export default function paramToStr(param?: string | string[]): string {
  return Array.isArray(param) ? param.join(',') : param || ''
}
