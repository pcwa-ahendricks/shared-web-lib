// cspell:ignore polyfill'd
import {withStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const GlobalStyles = withStyles((theme: Theme) => ({
  // @global is handled by jss-plugin-global.
  // "scrollBehavior and scrollPaddingTop" is used by anchor elements, like the one used in the Unclaimed Property page. <ScrollToTop/> uses the JS implementation for smooth scroll which is polyfill'd. See https://css-tricks.com/snippets/jquery/smooth-scrolling for more info.
  '@global': {
    html: {
      margin: 0,
      height: '100%',
      scrollBehavior: 'smooth',
      scrollPaddingTop: '55px' // Provide offset for sticky header. Works with most browsers. See https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/ and https://caniuse.com/#search=scroll-padding-top for more info.
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
    },
    // Hide alt text when using <ImgixFancy/>. See https://stackoverflow.com/questions/36305805/how-to-hide-alt-text-using-css-when-the-image-is-not-present for more info. text-indent, whitespace, overflow version didn't work for me when debugging this on Board Minutes page.
    img: {
      color: 'rgba(0, 0, 0, 0) !important',
      fontSize: 0
    }
  }
}))(() => null)

export default GlobalStyles
