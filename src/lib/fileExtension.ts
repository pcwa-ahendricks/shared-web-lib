export const fileExtension = (filename: string | null = ''): string | null => {
  // Extract the part after the last dot
  const parts = filename?.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null
}
