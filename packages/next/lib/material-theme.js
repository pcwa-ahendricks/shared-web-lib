import {createMuiTheme} from '@material-ui/core/styles'
import {brown, deepPurple, red} from '@material-ui/core/colors'

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: brown,
    // primary: {
    //   main: purple[400],
    //   light: purple[200],
    //   dark: purple[700]
    // },
    secondary: deepPurple,
    // secondary: {
    //   main: brown.A400,
    //   light: brown.A200,
    //   dark: brown.A700
    // },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

export default theme
