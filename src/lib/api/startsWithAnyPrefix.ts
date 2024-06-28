export const startsWithAnyPrefix = (
  str: string,
  prefixes: string[],
  caseInsensitive?: boolean
): boolean => {
  if (caseInsensitive) {
    return prefixes.some((prefix) =>
      str.toLowerCase().startsWith(prefix?.toLowerCase())
    )
  }
  return prefixes.some((prefix) => str.startsWith(prefix))
}
