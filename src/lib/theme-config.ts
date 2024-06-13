export const breakpoints = {
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

export const pxSpacing = 8 // mui default

export const spacing = (num = 1) => `${(pxSpacing * num).toFixed(2)}px`
