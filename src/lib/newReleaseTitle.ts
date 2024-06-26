import toTitleCase from './toTitleCase'

// start with \s when you don't want to force lowercase/uppercase a work at the beginning of the sentence, and \b when you do
const forceLowercaseRe =
  /\sa\s|\sas\s|\son\s|\sat\s|\sin\s|\sof\s|\sthe\s|\sto\s|\sand\s|\sfor\s|\sits\s|\swith\s/gi
const forceUppercaseRe =
  /\bgm\s|\bu\.s\.\s|\bnid\s|\bpcwa\s|\bpg&e\s|\bpge\s|\bkvie\s|\bpbs\s|\bmfpfa\s/gi

export function getNewsReleaseTitle(input = ''): string {
  // Remove the file extension
  const withoutExtension = input.replace(/\.[^/.]+$/, '')

  // Remove all characters up to and including the first underscore
  const withoutPrefix = withoutExtension.substring(
    withoutExtension.indexOf('_') + 1
  )

  // Replace all remaining underscores with spaces
  const transformed = withoutPrefix.replace(/_/g, ' ')

  const titleCased = toTitleCase(transformed)

  return titleCased
    .replace(forceLowercaseRe, (match) => match.toLowerCase())
    .replace(forceUppercaseRe, (match) => match.toUpperCase())
    .replace(/\bpcwas\b/gi, "PCWA's")
    .replace(/\bpge\b/gi, 'PG&E')
    .replace(/\boped\b/gi, 'Op-Ed')
}
