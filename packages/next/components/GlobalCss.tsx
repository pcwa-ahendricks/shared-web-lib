import {withStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const GlobalCss = withStyles((theme: Theme) => ({
  // @global is handled by jss-plugin-global.
  '@global': {
    article: {
      '& .MuiTypography-h3:not(:first-child)': {
        marginTop: theme.spacing(4)
      },
      '& .MuiTypography-h4:not(:first-child)': {
        marginTop: theme.spacing(3)
      },
      '& .MuiTypography-h5:not(:first-child)': {
        marginTop: theme.spacing(2)
      }
    }
  }
}))(() => null)

export default GlobalCss
