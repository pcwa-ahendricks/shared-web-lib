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
