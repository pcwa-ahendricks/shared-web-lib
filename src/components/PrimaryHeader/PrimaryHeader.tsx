import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef
} from 'react'
// [TODO] Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  PopperProps,
  makeStyles,
  createStyles,
  useTheme,
  Theme,
  useScrollTrigger,
  useMediaQuery
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import MegaMenuLink from '@components/megaMenu/MegaMenuLink/MegaMenuLink'
import MegaMenuPopper from '@components/megaMenu/MegaMenuPopper/MegaMenuPopper'
import MMContent from '@components/MMContent/MMContent'
import NextLink from '@components/NextLink/NextLink'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import {ColumnBox, RowBox, ChildBox} from '@components/boxes/FlexBox'
import menuConfig from '@lib/menuConfig'
import colorAlpha from 'color-alpha'
import {useDebounce} from 'use-debounce'
import SearchInput from '@components/search/SearchInput/SearchInput'
import {SearchContext} from '@components/search/SearchStore'

const APP_BAR_HEIGHT = {
  dense: 48,
  regular: 56
}

export type ToolbarVariant = 'regular' | 'dense'

// The debounced isXS variant is used with the isXS variant to prevent the background-color transition from occurring when the window width resizes from XS to non-XS and vice-versa.
type UseStylesProps = {
  isXS: boolean
  isXS__: boolean
  stuck: boolean
  // parentFixed: Props['parentFixed']
  inputMobFocused: boolean
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    megaMenuLink: {
      textTransform: 'uppercase'
    },
    // Responsive font size for Mega Menu links. Default fontSize is 1rem.
    '@media screen and (max-width: 680px)': {
      megaMenuLink: {
        fontSize: '0.85rem'
      }
    },
    '@media screen and (min-width: 681px) and (max-width: 750px)': {
      megaMenuLink: {
        fontSize: '0.9rem'
      }
    },
    '@media screen and (min-width: 1400px)': {
      megaMenuLink: {
        fontSize: '1.05rem'
      }
    },
    toolbar: {
      height: '100%'
      // transition: 'min-height 200ms ease-out'
    },
    appBarRoot: ({isXS, isXS__, stuck}: UseStylesProps) => ({
      minHeight: stuck ? APP_BAR_HEIGHT.dense : APP_BAR_HEIGHT.regular,
      position: stuck ? 'fixed' : 'relative',
      top: 0, // We don't need top to toggle, but it does need set for 'fixed' positioning.
      backgroundColor: stuck
        ? !isXS
          ? colorAlpha(theme.palette.background.paper, 0.98)
          : theme.palette.primary.main
        : isXS
        ? theme.palette.primary.main
        : theme.palette.background.default,

      transition:
        !isXS__ && !isXS
          ? 'box-shadow 600ms ease-out, background-color 900ms ease-out'
          : 'none',
      borderTopColor: '#e6e6e6',
      borderTopStyle: 'solid',
      borderTopWidth: isXS || stuck ? 0 : 1,
      // Transition between Elevation 3 and 0. See <GlobalStyles/>
      boxShadow: stuck
        ? '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)'
        : '0px 1px 3px 0px rgba(0,0,0,0.0),0px 1px 1px 0px rgba(0,0,0,0),0px 2px 1px -1px rgba(0,0,0,0)'
    }),
    menuButton: {
      marginLeft: -12
    },

    popper: {
      zIndex: 1,
      '& $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '0 1em 1em 1em',
          borderColor: `transparent transparent ${theme.palette.primary.dark} transparent`
        }
      }
    },
    arrow: {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        transform: 'translate3d(-50%, 0, 0)', // Keep arrow centered.
        '-webkit-transform': 'translate3d(-50%, 0 ,0)'
      }
    },
    /*
      [HACK] Logo is pushing out the rest of the primary nav menu off the page for some reason in IE. This is the fix for IE.
    */
    fixIe: {
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
        /* IE10+ specific styles go here */
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        paddingLeft: theme.spacing(3)
      }
    },
    // Setting max width/height prevents strange jank'ing when toolbar variant changes.
    headerLogo: ({stuck}: UseStylesProps) => ({
      // maxWidth: isSM ? 100 : parentFixed ? 140 : 200
      maxHeight: stuck ? APP_BAR_HEIGHT.dense : APP_BAR_HEIGHT.regular,
      maxWidth: stuck ? 140 : 200,
      // transition: 'max-height 80ms ease-in, max-width 80ms ease-in',
      [theme.breakpoints.down('sm')]: {
        maxWidth: stuck ? 100 : 140
      }
    }),
    mobileLogo: ({inputMobFocused}: UseStylesProps) => ({
      '-webkit-transition': 'opacity 300ms ease-out',
      transition: 'opacity 300ms ease-out',
      opacity: inputMobFocused ? 0 : 1
    })
  })
})

const PrimaryHeader = () => {
  const phRef = useRef<HTMLDivElement>(null)
  const stuck = useScrollTrigger({
    threshold: phRef.current ? phRef.current.offsetTop : 9999,
    disableHysteresis: true // Prevent 'stuck' truthiness from disappearing when scrolling back up.
  })
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  // useMediaQuery always returns false on page load, regardless of device width. isSMUp is used to prevent the PCWA logo showing up real quickly on mobile devices by waiting for a truthy non-XS value.
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const [isXS__] = useDebounce(isXS, 100)
  // Custom width defined by point at which menu links overlap svg logo.
  const hideLogoQuery = useMediaQuery('@media screen and (max-width: 660px)')
  const [anchorEl, setAnchorEl] = useState<PopperProps['anchorEl']>(null)
  const [popperOpen, setPopperOpen] = useState<boolean>(false)
  const [activeKey, setActiveKey] = useState<number | null>(null)
  const [activeLinkEl, setActiveLinkEl] = useState<HTMLElement | null>(null)

  const {state, dispatch} = useContext(UiContext)
  const {state: searchState} = useContext(SearchContext)
  const {inputMobFocused} = searchState
  const classes = useStyles({isXS, isXS__, stuck: stuck, inputMobFocused})

  useEffect(() => {
    if (!popperOpen) {
      setAnchorEl(null)
      setActiveLinkEl(null)
      setActiveKey(null)
    }
  }, [popperOpen])

  const handleMenuButtonClick = useCallback(() => {
    dispatch(setDrawerViz(!state.drawerOpen))
  }, [dispatch, state])

  const enterMenuHandler = useCallback((event, el, key) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setActiveLinkEl(el)
    setActiveKey(key)
    setPopperOpen(true)
  }, [])

  const handleClick = useCallback(
    (event: any) => {
      const {currentTarget} = event
      setAnchorEl(currentTarget)
      setPopperOpen(!popperOpen)
    },
    [popperOpen]
  )

  const popperCloseHandler = useCallback(() => {
    setPopperOpen(false) // Comment this out to debug popup with Web Browser Devtools.
  }, [])

  const popperOpenHandler = useCallback(() => {
    setPopperOpen(true)
  }, [])

  const id = useMemo(() => (popperOpen ? 'mega-menu-popper' : null), [
    popperOpen
  ])

  const toolbarVariant = useMemo(() => (stuck ? 'dense' : 'regular'), [stuck])

  return (
    <div ref={phRef}>
      <AppBar
        // elevation={parentFixed ? 3 : 1}
        position="relative"
        classes={{
          root: classes.appBarRoot
        }}
      >
        <Toolbar variant={toolbarVariant} className={classes.toolbar}>
          <RowBox
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            display={isXS ? 'flex' : 'none'}
          >
            <ChildBox flex="1 0 auto">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={handleMenuButtonClick}
              >
                <MenuIcon />
              </IconButton>
            </ChildBox>
            <ChildBox flex="auto">
              <PcwaLogo
                className={classes.mobileLogo}
                height={24}
                // width="20%"
                preserveAspectRatio="xMidYMin meet"
                missionStatementFill="rgba(0,0,0,0)"
                brandFill={theme.palette.grey[200]}
                logoLeftFill={theme.palette.grey[200]}
                logoRightFill={theme.palette.grey[300]}
              />
            </ChildBox>
            <ChildBox flex="0 1 auto">{isXS ? <SearchInput /> : null}</ChildBox>
          </RowBox>
          {/* See media query above for class logoContainer. */}
          {/* <Hidden only="xs" implementation="css"> */}
          <ColumnBox
            display={hideLogoQuery ? 'none' : 'flex'}
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
            className={classes.fixIe}
          >
            {isSMUp ? (
              <PcwaLogo
                className={classes.headerLogo}
                height="70%"
                missionStatementFill="rgba(0,0,0,0)"
              />
            ) : null}
          </ColumnBox>
          {/* Should use js implementation here so that the flex layout doesn't break with child's alignSelf attribute. */}
          <Hidden only="xs" implementation="js">
            <RowBox
              flex="auto"
              alignSelf="stretch"
              width="100%"
              justifyContent="flex-end"
              alignItems="stretch"
            >
              <Box
                flex="0 0 auto"
                // Margin should match <MegaMenuLink/> linkMargin prop for consistency.
                ml="1vw"
                mr="1vw"
              >
                <ColumnBox justifyContent="center" height="100%">
                  <Box flex="0 0 auto">
                    <NextLink
                      href="/"
                      color="primary"
                      variant="button"
                      classes={{root: classes.megaMenuLink}}
                      underline="none"
                    >
                      Home
                    </NextLink>
                  </Box>
                </ColumnBox>
              </Box>
              {menuConfig.map((menuItem) => (
                <Box flex="0 0 auto" key={menuItem.key}>
                  <MegaMenuLink
                    // For type checking only.
                    describedbyId={id ?? undefined}
                    onLinkClick={handleClick}
                    onLinkEnter={(event, el) =>
                      enterMenuHandler(event, el, menuItem.key)
                    }
                    onLinkLeave={popperCloseHandler}
                    onBottomBunEnter={popperOpenHandler}
                    parentActiveEl={activeLinkEl}
                    typographyClass={classes.megaMenuLink}
                    linkMargin="1vw"
                  >
                    {menuItem.menuName}
                  </MegaMenuLink>
                </Box>
              ))}
            </RowBox>
          </Hidden>
        </Toolbar>
      </AppBar>
      <MegaMenuPopper
        // Logical Or for type checking only.
        id={id ?? undefined}
        open={popperOpen}
        toolbarVariant={toolbarVariant}
        anchorEl={anchorEl}
        onOpen={popperOpenHandler}
        onClose={popperCloseHandler}
      >
        <MMContent contentKey={activeKey} />
      </MegaMenuPopper>
    </div>
  )
}

export default PrimaryHeader
