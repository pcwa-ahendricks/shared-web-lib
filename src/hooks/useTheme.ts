import {useTheme as useMuiTheme} from '@mui/material'
import {Theme} from '@lib/material-theme'

export default function useTheme() {
  return useMuiTheme<Theme>()
}
