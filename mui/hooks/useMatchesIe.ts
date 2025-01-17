import {useMediaQuery} from '@mui/material'

/**
 * A custom hook that detects if the user is using Internet Explorer by checking for specific media queries.
 *
 * This hook utilizes Material-UI's `useMediaQuery` to determine if the user's browser matches the criteria for Internet Explorer.
 * It checks for media queries that target Internet Explorer's unique high contrast modes.
 *
 * @returns {boolean} `true` if the user is using Internet Explorer, `false` otherwise.
 *
 * @example
 * const isIe = useMatchesIe();
 * if (isIe) {
 *   // Handle Internet Explorer-specific logic
 * }
 */
export default function useMatchesIe(): boolean {
  const matchesIe = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )
  return matchesIe
}
