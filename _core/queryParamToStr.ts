/**
 * Converts a query parameter to a string.
 *
 * If the parameter is an array of strings, it joins the values with commas.
 * If it's a single string, it's returned as-is.
 * If the parameter is undefined, an empty string is returned.
 *
 * @param {string | string[] | undefined} param - The query parameter to convert.
 * @returns {string} A string representation of the parameter.
 *
 * @example
 * queryParamToStr("module1");
 * // returns "module1"
 *
 * @example
 * queryParamToStr(["module1", "module2"]);
 * // returns "module1,module2"
 *
 * @example
 * queryParamToStr(undefined);
 * // returns ""
 */
export default function queryParamToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    return param.join(',')
  }
  return param ?? ''
}
