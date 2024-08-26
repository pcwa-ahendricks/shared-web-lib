import {preciseFloat} from '../_core'

export interface MediaBreakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export interface GridSizes {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

const defaultBreakpoints: MediaBreakpoints = {
  // values: {
  // mui defaults
  // extra-small
  xs: 0,
  // small
  sm: 600,
  // medium
  md: 900,
  // large
  lg: 1200,
  // extra-large
  xl: 1536
  // }
}

/**
 * Generates a responsive sizes attribute for images based on the Material-UI grid sizes and breakpoints.
 *
 * @param {GridSizes} gridSizes - The grid sizes for different breakpoints (xs, sm, md, lg, xl) as defined by Material-UI.
 * @param {number | string} [maxWidth='100vw'] - The maximum width for the image. Can be a number (in pixels) or a string.
 * @param {typeof defaultBreakpoints} [breakpoints=defaultBreakpoints] - The breakpoints to use for the responsive sizes. Defaults to Material-UI breakpoints.
 * @returns {string} A string that can be used as the `sizes` attribute in an HTML `<img>` tag.
 *
 * @example
 * const sizes = muiImgSizes({ xs: 6, sm: 4, md: 3 }, 1200);
 * console.log(sizes);
 * // Outputs: "(max-width: 600px) 50vw, (min-width: 600px) 33.33vw, (min-width: 900px) 25vw, min(1200px, 25vw)"
 */
export default function muiImgSizes(
  gridSizes: GridSizes,
  maxWidth: number | string = '100vw', // can be a string or number as pixels
  breakpoints = defaultBreakpoints
): string {
  const {xs, sm, md, lg, xl} = gridSizes

  const sizeArray: string[] = []

  if (typeof maxWidth === 'string') {
    if (maxWidth.toLowerCase() === 'xs') {
      maxWidth = breakpoints.xs
    } else if (maxWidth.toLowerCase() === 'sm') {
      maxWidth = breakpoints.sm
    } else if (maxWidth.toLowerCase() === 'md') {
      maxWidth = breakpoints.md
    } else if (maxWidth.toLowerCase() === 'lg') {
      maxWidth = breakpoints.lg
    } else if (maxWidth.toLowerCase() === 'xl') {
      maxWidth = breakpoints.xl
    }
  }
  // cast AFTER if block above
  if (typeof maxWidth === 'number') {
    maxWidth = `${maxWidth}px`
  }

  let lastSize: string = '100vw'

  const flag = '|END|'

  if (xs) {
    const targetSize = `${preciseFloat((xs / 12) * 100)}vw`
    sizeArray.push(`(max-width: ${breakpoints.sm}px) ${targetSize}`)
    lastSize = targetSize
  } else {
    if (!sm && !md && !lg && !xl) {
      sizeArray.push(`min(${maxWidth}, ${lastSize})`)
      sizeArray.push(flag)
    } else {
      sizeArray.push(`(max-width: ${breakpoints.sm}px) ${lastSize}`)
    }
  }
  if (sm) {
    const targetSize = `${preciseFloat((sm / 12) * 100)}vw`
    sizeArray.push(`(min-width: ${breakpoints.sm}px) ${targetSize}`)
    lastSize = targetSize
  } else {
    if (!md && !lg && !xl) {
      sizeArray.push(`min(${maxWidth}, ${lastSize})`)
      sizeArray.push(flag)
    } else {
      sizeArray.push(`(min-width: ${breakpoints.sm}px) ${lastSize}`)
    }
  }
  if (md) {
    const targetSize = `${preciseFloat((md / 12) * 100)}vw`
    sizeArray.push(`(min-width: ${breakpoints.md}px) ${targetSize}`)
    lastSize = targetSize
  } else {
    if (!lg && !xl) {
      sizeArray.push(`min(${maxWidth}, ${lastSize})`)
      sizeArray.push(flag)
    } else {
      sizeArray.push(`(min-width: ${breakpoints.md}px) ${lastSize}`)
    }
  }
  if (lg) {
    const targetSize = `${preciseFloat((lg / 12) * 100)}vw`
    sizeArray.push(`(min-width: ${breakpoints.lg}px) ${targetSize}`)
    lastSize = targetSize
  } else {
    if (!xl) {
      sizeArray.push(`min(${maxWidth}, ${lastSize})`)
      sizeArray.push(flag)
    } else {
      sizeArray.push(`(min-width: ${breakpoints.lg}px) ${lastSize}`)
    }
  }
  if (xl) {
    const targetSize = `${preciseFloat((xl / 12) * 100)}vw`
    sizeArray.push(`(min-width: ${breakpoints.xl}px) ${targetSize}`)
    lastSize = targetSize
  } else {
    sizeArray.push(`min(${maxWidth}, ${lastSize})`)
    sizeArray.push(flag)
  }
  // Return the sizes string, joining with commas up until the first missing flag
  const sizesStr = getSubstringBeforePipe(sizeArray.join(', '))

  // dLog(sizesStr)
  return sizesStr
}

/**
 * Returns the substring of the input string that appears before a specified flag (in this case, "|END|").
 *
 * @param {string} input - The input string to process.
 * @returns {string} The substring before the flag, or the original string if the flag is not found.
 */
function getSubstringBeforePipe(input: string): string {
  const pipeIndex = input.indexOf(', |END|')
  if (pipeIndex !== -1) {
    return input.slice(0, pipeIndex)
  }
  return input
}
