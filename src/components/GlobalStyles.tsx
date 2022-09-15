// cspell:ignore polyfill'd
import {Theme, withStyles} from '@material-ui/core'
import alpha from 'color-alpha'

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
    // Kiperman font is a bit dense in italic form
    '.MuiTypography-root': {
      '&.MuiTypography-body1,.MuiTypography-body2': {
        '& em': {
          letterSpacing: '.1px'
        }
      }
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
    // Hide alt text when using <Image/>. See https://stackoverflow.com/questions/36305805/how-to-hide-alt-text-using-css-when-the-image-is-not-present for more info. text-indent, whitespace, overflow version didn't work for me when debugging this on Board Minutes page.
    img: {
      color: 'rgba(0, 0, 0, 0) !important',
      fontSize: 0
    },
    // The following specificity seem required.
    '.MuiTableHead-root .MuiTableCell-head': {
      color: alpha(theme.palette.common.black, 0.7) // Defaults to rgba(0,0,0,0.87) which is a bit too black for bold Kiperman font.
    },
    // Adjusting the  lineHeight in material-theme.ts seemed to effect the fontSize. Adjusting it here is the workaround.
    h1: {
      '&.MuiTypography-h1': {
        lineHeight: 1.1 // Defaults to 1 which is too cramped.
      }
    },
    h2: {
      '&.MuiTypography-h2': {
        lineHeight: '36px' // Defaults to 32 which is too cramped.
      }
    },
    h3: {
      '&.MuiTypography-h3': {
        lineHeight: 1.35 // Defaults to 1.04 which is too cramped.
      }
    },
    'strong.MuiTypography-root, .MuiTypography-root > strong': {
      fontWeight: 500 // <strong /> uses bold which is too bold for Kiperman font. Use 500 weight instead.
    },
    strong: {
      fontWeight: 500
    },
    b: {
      fontWeight: 500
    },
    // Fix issue where Dialog can't be scrolled (such as the <MediaDialogOnClick/> dialog on the projects page when the user clicks the project image).
    '.MuiDialog-container': {
      maxHeight: '100vh'
    },
    '.reset-a, .reset-a:hover, .reset-a:visited, .reset-a:focus, .reset-a:active':
      {
        textDecoration: 'none',
        color: 'inherit',
        outline: 0,
        cursor: 'auto'
      }
    // With most backgrounds the secondary color will be un-usable as a text color unless the darker version is used.
    // '.MuiTypography-colorSecondary, .MuiButton-textSecondary': {
    //   color: theme.palette.secondary.dark
    // }
    // '.MuiButton-containedSecondary': {
    //   backgroundColor: theme.palette.secondary.dark
    // }
    // Dona font is not centered vertically within buttons. These selectors help with centering.
    // '.MuiButton-label, .MuiFab-label': {
    //   paddingTop: '0.2rem'
    // },
    // '.MuiInputBase-input, .MuiInputBase-inputMarginDense': {
    //   paddingTop: '0.6rem'
    // },
    // '.MuiChip-root.MuiChip-sizeSmall .MuiChip-label': {
    //   paddingTop: '0.2rem'
    // }
  }
}))(() => null)

export default GlobalStyles
