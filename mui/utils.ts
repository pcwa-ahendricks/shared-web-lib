// Re-exported by @mui/material, so consumers need not also install @mui/system.
import type {SxProps} from '@mui/material'

type PureSx<T extends object> = Exclude<SxProps<T>, ReadonlyArray<unknown>>
type SxAsArray<T extends object> = Array<PureSx<T>>

export const mergeSx = <T extends object>(
  ...styles: (SxProps<T> | false | undefined)[]
): SxProps<T> => {
  const capacitor: SxAsArray<T> = []
  for (const sx of styles) {
    if (sx) {
      if (Array.isArray(sx)) {
        for (const sub of sx as SxAsArray<T>) {
          capacitor.push(sub)
        }
      } else {
        capacitor.push(sx as PureSx<T>)
      }
    }
  }
  return capacitor
}
