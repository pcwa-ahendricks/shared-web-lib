import toTitleCase from './toTitleCase'

/**
 * Regulated title-case function that applies custom capitalization rules.
 *
 * This function processes an input string by first removing any file extension and prefix,
 * then converting the remaining text to title case while applying specific rules:
 * - Forces certain short words to lowercase (e.g., "a", "the", "and").
 * - Forces specific abbreviations and acronyms to uppercase (e.g., "GM", "U.S.").
 * - Applies special corrections for common terms (e.g., "PCWA's", "PG&E", "Op-Ed").
 *
 * @param {string} [input=''] - The input string to be converted to regulated title case.
 * @returns {string} The transformed string in regulated title case.
 *
 * @example
 * const result = regTitleCase('this_is_a_oped_report.txt');
 * console.log(result); // "This is a Op-Ed Report"
 */
export default function regTitleCase(input = ''): string {
  // Step 1: Remove the file extension from the input string (e.g., '.txt', '.pdf')
  const withoutExtension = input.replace(/\.[^/.]+$/, '')

  // Step 2: Remove all characters up to and including the first underscore
  // This is useful if the filename starts with a prefix separated by an underscore
  const withoutPrefix = withoutExtension.substring(
    withoutExtension.indexOf('_') + 1
  )

  // Step 3: Replace all remaining underscores with spaces
  // This transforms words that were separated by underscores into a more readable format
  const transformed = withoutPrefix.replace(/_/g, ' ')

  // Step 4: Convert the transformed string to title case
  const titleCased = toTitleCase(transformed)

  // Step 5: Apply specific casing rules using regex replacements
  return (
    titleCased
      // Force certain words to lowercase
      .replace(forceLowercaseRe, (match) => match.toLowerCase())
      // Force specific abbreviations and acronyms to uppercase
      .replace(forceUppercaseRe, (match) => match.toUpperCase())
      // Specific case corrections for common terms
      .replace(/\bpcwas\b/gi, "PCWA's")
      .replace(/\bpge\b/gi, 'PG&E')
      .replace(/\boped\b/gi, 'Op-Ed')
  )
}

// Regex to match common short words that should be forced to lowercase (e.g., "a", "the", "and")
// The \s ensures the word is preceded by a space, preventing force lowercase at the start of the string
const forceLowercaseRe =
  /\sa\s|\sas\s|\son\s|\sat\s|\sin\s|\sof\s|\sthe\s|\sto\s|\sand\s|\sfor\s|\sits\s|\swith\s/gi

// Regex to match specific abbreviations and acronyms that should be forced to uppercase
// The \b ensures the word is at a word boundary, allowing proper casing for acronyms regardless of position
const forceUppercaseRe =
  /\bgm\s|\bu\.s\.\s|\bnid\s|\bpcwa\s|\bpg&e\s|\bpge\s|\bkvie\s|\bpbs\s|\bmfpfa\s/gi
