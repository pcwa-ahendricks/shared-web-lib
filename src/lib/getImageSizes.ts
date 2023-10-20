/**
 * Each breakpoint (a key) matches with a fixed screen width (a value).
 * @default {
 *    // extra-small
 *    xs: 0,
 *    // small
 *    sm: 600,
 *    // medium
 *    md: 900,
 *    // large
 *    lg: 1200,
 *    // extra-large
 *    xl: 1536,
 * }
 */
const SM_BP = 600
const MD_BP = 900
const LG_BP = 1200
const XL_BP = 1536

export default function getImageSizes(props?: {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  columns?: number
}) {
  const {
    xs,
    sm,
    md,
    lg,
    columns = 12 // default number of columns
  } = props || {}

  // if no props were specified default to 'full bleed'
  if (!xs && !sm && !md && !lg) {
    return '100vw'
  }

  let sizes: string[] = []
  if (xs) {
    sizes.push(
      `(max-width: ${SM_BP}px) ${parseFloat(
        ((xs / columns) * 100).toFixed(2)
      )}vw`
    )
  }
  if (sm) {
    sizes.push(
      `(max-width: ${MD_BP}px) ${parseFloat(
        ((sm / columns) * 100).toFixed(2)
      )}vw`
    )
  }
  if (md) {
    sizes.push(
      `(max-width: ${LG_BP}px) ${parseFloat(
        ((md / columns) * 100).toFixed(2)
      )}vw`
    )
  }
  if (lg) {
    sizes.push(
      `(max-width: ${XL_BP}px) ${parseFloat(
        ((lg / columns) * 100).toFixed(2)
      )}vw`
    )
  }

  // add the last value as a default value
  sizes.push([...sizes].at(-1).split(' ').at(-1))

  return sizes.join(', ')
}
