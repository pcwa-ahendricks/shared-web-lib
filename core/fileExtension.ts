/**
 * Extracts and returns the file extension from a given filename.
 *
 * This function takes a filename as input, and if the filename contains a dot,
 * it extracts and returns the file extension (the part after the last dot) in lowercase.
 * If there is no extension, or the input is an empty string, it returns `null`.
 *
 * @param {string} [filename=''] - The name of the file from which to extract the extension.
 * @returns {string | null} The file extension in lowercase, or `null` if no extension is found.
 *
 * @example
 * const ext = fileExtension('document.txt');
 * console.log(ext); // 'txt'
 *
 * @example
 * const ext = fileExtension('archive.tar.gz');
 * console.log(ext); // 'gz'
 *
 * @example
 * const ext = fileExtension('filename');
 * console.log(ext); // null
 *
 * @example
 * const ext = fileExtension('');
 * console.log(ext); // null
 */
export default function fileExtension(filename = ''): string | null {
  filename = filename || ''
  // Extract the part after the last dot
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null
}
