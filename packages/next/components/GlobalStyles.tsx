import {withStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const GlobalStyles = withStyles((theme: Theme) => ({
  // @global is handled by jss-plugin-global.
  '@global': {
    html: {
      margin: 0,
      height: '100%'
    },
    body: {
      margin: 'inherit',
      height: 'inherit'
    },
    '#__next': {
      margin: 'inherit',
      height: 'inherit'
    },
    '.MuiTypography-gutterBottom': {
      marginBottom: '.5em' // Defaults to .35em which is a bit small.
    },
    article: {
      '& .MuiTypography-h1:not(:first-child)': {
        marginTop: theme.spacing(4)
      },
      '& .MuiTypography-h2:not(:first-child)': {
        marginTop: theme.spacing(4)
      },
      '& .MuiTypography-h3:not(:first-child)': {
        marginTop: theme.spacing(4)
      },
      '& .MuiTypography-h4:not(:first-child)': {
        marginTop: theme.spacing(3)
      },
      '& .MuiTypography-h5:not(:first-child)': {
        marginTop: theme.spacing(2)
      },
      '& .MuiTypography-h6:not(:first-child)': {
        marginTop: theme.spacing(1)
      }
    }
  }
}))(() => null)

export default GlobalStyles
