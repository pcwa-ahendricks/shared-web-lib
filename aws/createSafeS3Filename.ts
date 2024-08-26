import filenamify from 'filenamify'

/**
 * Creates a sanitized and safe filename for S3 by removing invalid characters and trimming to fit within S3's filename length limits.
 *
 * @param {string} input - The original filename to be sanitized.
 * @returns {string} The sanitized and safe filename.
 * @throws {Error} If the filename becomes empty after sanitization.
 */
export default function createSafeS3Filename(input: string): string {
  // Sanitize the input to make it a safe filename
  let safeFilename = filenamify(input, {
    replacement: '_' // Replace invalid characters with underscores
  })

  // Trim the filename to ensure it's within S3's limits
  const MAX_S3_KEY_LENGTH = 1024
  if (safeFilename.length > MAX_S3_KEY_LENGTH) {
    safeFilename = safeFilename.substring(0, MAX_S3_KEY_LENGTH)
  }

  // Ensure the filename is not empty
  if (safeFilename.length === 0) {
    throw new Error('Filename is invalid after sanitization.')
  }

  return safeFilename
}
