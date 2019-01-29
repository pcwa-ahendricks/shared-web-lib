import {createMuiTheme} from '@material-ui/core/styles'
// import {indigo, green, red} from '@material-ui/core/colors'

const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
]

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    // fontFamily: ['Asap', ...systemFonts].join(','),
    fontFamily: ['Malva', ...systemFonts].join(','),
    body2: {
      // fontFamily: ['Open Sans', ...systemFonts].join(',')
      fontFamily: ['Kiperman', ...systemFonts].join(','),
      fontSize: '1.2rem' // Default: 0.875rem
    },
    body1: {
      // fontFamily: ['Open Sans', ...systemFonts].join(',')
      fontFamily: ['Kiperman', ...systemFonts].join(','),
      fontSize: '1.3rem' // Default: 1rem
    },
    button: {
      // fontFamily: ['Asap Condensed', ...systemFonts].join(','),
      // fontWeight: 600, // Default: 500
      fontFamily: ['Malva', ...systemFonts].join(','),
      fontSize: '1rem' // Default: 0.875rem
    }
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: 'rgba(242, 242, 242, 0.9)',
      default: 'rgba(250, 250, 250, 1)'
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
