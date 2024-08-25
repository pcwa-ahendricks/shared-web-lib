/**
 * Extracts and returns the initials from a given full name.
 *
 * This function takes a full name as input, splits it by spaces, and returns
 * the initials of each part in uppercase. If the input is `null` or an empty string,
 * it returns an empty string.
 *
 * @param {string | null} [fullName=''] - The full name from which to extract initials.
 * @returns {string} The initials extracted from the full name, returned as an uppercase string.
 *
 * @example
 * const initials = getInitials('John Doe');
 * console.log(initials); // 'JD'
 *
 * @example
 * const initials = getInitials('Alice Bob Carol');
 * console.log(initials); // 'ABC'
 *
 * @example
 * const initials = getInitials('');
 * console.log(initials); // ''
 *
 * @example
 * const initials = getInitials(null);
 * console.log(initials); // ''
 */
export default function getInitials(fullName: string | null = ''): string {
  if (!fullName) {
    fullName = ''
  }
  // Split the full name by spaces
  const nameParts = fullName.trim().split(' ')

  // Map each part to its first character and join them
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials
}
