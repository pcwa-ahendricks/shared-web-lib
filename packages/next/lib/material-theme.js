import {createMuiTheme} from '@material-ui/core/styles'
// import {indigo, green, red} from '@material-ui/core/colors'

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#fafafa'
    },
    primary: {
      light: 'rgba(65, 131, 196, 1)',
      main: 'rgba(0, 55, 104, 1)',
      dark: 'rgba(1, 40, 73, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(126, 201, 80, 1)',
      main: 'rgba(114, 181, 73, 1)',
      dark: 'rgba(95, 150, 61, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  }
})

export default theme
