import {createTheme, responsiveFontSizes} from '@mui/material'
import localFont from 'next/font/local'
// import {indigo, green, red} from '@mui/material/colors'

const dona = localFont({
  src: [
    {
      path: '../fonts/Dona/Dona-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/Dona/Dona-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/Dona/Dona-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    }
  ]
})

export const kiperman = localFont({
  src: [
    {
      path: '../fonts/Kiperman/Kiperman-Regular-c63eb9630d.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/Kiperman/Kiperman-Bold-ebe3ff3bb7.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/Kiperman/Kiperman-Italic-8c53b21454.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../fonts/Kiperman/Kiperman-BoldItalic-cae179df5e.woff2',
      weight: '500',
      style: 'italic'
    }
  ]
})

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

/*
Note - specificity for css font-size prop is required when using sx with typography since responsiveFontSizes is used with this Mui theme.
     <Type
        component="span"
        variant="body1"
        sx={{'&.MuiTypography-root': {fontSize: '12.34rem'}}}
      >
        Example Text
      </Type>
*/
const theme = responsiveFontSizes(
  createTheme({
    typography: {
      // Use the system font instead of the default Roboto font.
      // fontFamily: ['Asap', ...systemFonts].join(','),
      // fontFamily: ['Dona', ...systemFonts].join(','),
      fontFamily: [dona.style.fontFamily, ...systemFonts].join(','),
      h1: {
        fontSize: '2.6rem' // Default: 6rem
      },
      h2: {
        fontSize: '1.95rem' // Default: 3.75rem
        // fontWeight: 400 // Default: 300
      },
      h3: {
        fontSize: '1.55rem' // Default: 3rem
        // fontWeight: 300 // Default: 400
      },
      h4: {
        fontSize: '1.23rem' // Default: 2.125rem
        // fontWeight: 400 // Default: 400
      },
      h5: {
        fontSize: '1.15rem' // Default: 1.5rem
        // fontWeight: 400 // Default: 400
      },
      h6: {
        fontSize: '1.1rem' // Default: 1.25rem
        // fontWeight: 500 // Default: 500
      },
      caption: {
        fontSize: '0.9rem' // Default: 0.75rem
        // fontWeight: xxx // Default: 400
      },
      body2: {
        // fontFamily: ['Open Sans', ...systemFonts].join(',')
        // fontFamily: ['Kiperman', ...systemFonts].join(','),
        fontFamily: [kiperman.style.fontFamily, ...systemFonts].join(','),
        fontSize: '1.15rem' // Default: 0.875rem
      },
      body1: {
        // fontFamily: ['Open Sans', ...systemFonts].join(',')
        // fontFamily: ['Kiperman', ...systemFonts].join(','),
        fontFamily: [kiperman.style.fontFamily, ...systemFonts].join(','),
        fontSize: '1.22rem' // Default: 1rem
      },
      button: {
        // fontFamily: ['Asap Condensed', ...systemFonts].join(','),
        // fontWeight: 600, // Default: 500
        // fontFamily: ['Dona', ...systemFonts].join(','),
        fontFamily: [dona.style.fontFamily, ...systemFonts].join(','),
        fontSize: '0.92rem' // Default: 0.875rem
      },
      overline: {
        fontSize: '0.85rem', // Default: 0.75rem
        lineHeight: '1.66' // Default: 2.66
      },
      subtitle1: {
        fontSize: '1.1rem', // Default: 1rem
        lineHeight: 1.5 // default: 1.75
      },
      subtitle2: {
        fontSize: '1rem', // Default: 0.875rem
        // fontWeight: 400 // Default: 500
        lineHeight: 1.4 // default: 1.57
      }
    },
    palette: {
      common: {
        black: '#000',
        white: '#fff'
      },
      background: {
        paper: 'rgba(242, 242, 242, 1)',
        default: 'rgba(250, 250, 250, 1)'
      },
      primary: {
        // V2:
        // light: 'rgba(65, 131, 196, 1)',
        // main: 'rgba(0, 55, 104, 1)',
        // dark: 'rgba(1, 40, 73, 1)',
        // V3:
        dark: '#2e394e',
        main: '#435270',
        light: '#68748c',
        contrastText: '#fff'
      },
      secondary: {
        // V1:
        // light: 'rgba(126, 201, 80, 1)',
        // main: 'rgba(114, 181, 73, 1)',
        // dark: 'rgba(95, 150, 61, 1)',
        // V2:
        // light: 'rgba(143, 199, 106, 1)',
        // main: 'rgba(95, 150, 61, 1)',
        // dark: 'rgba(48, 104, 14, 1)',
        // V3:
        dark: '#3e6f31',
        main: '#599F46',
        light: '#7ab26b',
        contrastText: '#fff'
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff'
      }
      // text: {
      //   primary: 'rgba(0, 0, 0, 0.87)',
      //   secondary: 'rgba(0, 0, 0, 0.54)',
      //   disabled: 'rgba(0, 0, 0, 0.38)',
      //   hint: 'rgba(0, 0, 0, 0.38)'
      // }
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          /* There is a specificity issue with using <Typography sx={{fontSize: 0.9rem}} .../> with responsizeFontSizes used in theme.
          Instead of using !important, use class specificity here. See https://github.com/mui/material-ui/issues/31078 for more info */
          root: (props) => {
            const {ownerState} = props
            const sx: any = ownerState.sx || {}
            return {
              ...(Boolean(sx?.fontSize) && {
                '&.MuiTypography-root': {
                  fontSize: sx.fontSize
                }
              })
            }
          }
        }
      },
      MuiLink: {
        defaultProps: {
          underline: 'hover' // this was the old default in material v4, which is what this site was build with
        },
        styleOverrides: {
          underlineAlways: {
            textDecorationColor: 'inherit' // defaults to primary w/ alpha
          },
          /* There is a specificity issue with using <Link sx={{fontSize: 0.9rem}} .../> with responsizeFontSizes used in theme.
          Instead of using !important, use class specificity here. See https://github.com/mui/material-ui/issues/31078 for more info */
          root: (props) => {
            const {ownerState} = props
            const sx: any = ownerState.sx || {}
            return {
              ...(Boolean(sx?.fontSize) && {
                '&.MuiTypography-root&.MuiLink-root': {
                  fontSize: sx.fontSize
                }
              })
            }
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          margin: 'normal' // defaults to 'none'
        }
      },
      MuiFormControl: {
        defaultProps: {
          margin: 'normal' // defaults to 'none'
        }
      }
    }
  })
)

type Theme = typeof theme

export default theme
export type {Theme}
