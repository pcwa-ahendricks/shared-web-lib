import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles'
// [TODO] Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Theme
} from '@material-ui/core'
import {PopperProps} from '@material-ui/core/Popper'
import MenuIcon from '@material-ui/icons/Menu'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import MegaMenuLink from '@components/megaMenu/MegaMenuLink/MegaMenuLink'
import MegaMenuPopper from '@components/megaMenu/MegaMenuPopper/MegaMenuPopper'
import MMContent from '@components/MMContent/MMContent'
import NextLink from '@components/NextLink/NextLink'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {ColumnBox, RowBox} from '@components/boxes/FlexBox'
import menuConfig from '@lib/menuConfig'
import colorAlpha from 'color-alpha'
import Sticky from 'react-sticky-el'

export type ToolbarVariant = 'regular' | 'dense'

// type Props = {}

// type UseStylesProps = {
//   parentFixed: Props['parentFixed']
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    megaMenuLink: {
      textTransform: 'capitalize'
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
        fontSize: '1.1rem'
      }
    },
    toolbar: {
      height: '100%'
      // transition: 'min-height 200ms ease-out'
    },
    appBarRoot: {
      backgroundColor: theme.palette.background.default,
      transition: 'box-shadow 600ms ease-out, background-color 900ms ease-out',
      borderTopColor: '#e6e6e6',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      // Transition between Elevation 3 and 0. See <GlobalStyles/>
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.0),0px 1px 1px 0px rgba(0,0,0,0),0px 2px 1px -1px rgba(0,0,0,0)',
      '&.sticky': {}
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
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
    headerLogo: {
      // maxHeight: parentFixed ? 48 : 64,
      // maxWidth: isSM ? 100 : parentFixed ? 140 : 200
      maxHeight: 64,
      maxWidth: 200,
      // transition: 'max-height 80ms ease-in, max-width 80ms ease-in',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 140
      }
    },
    sticky: {
      zIndex: 4, // Needs to be higher than one so Material-UI components don't overlap.
      '&.fixed': {
        '& $headerLogo': {
          maxHeight: 48,
          maxWidth: 140,
          [theme.breakpoints.down('sm')]: {
            maxWidth: 100
          }
        },
        '& $appBarRoot': {
          backgroundColor: colorAlpha(theme.palette.background.paper, 0.98),
          borderTopWidth: 0,
          boxShadow:
            '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)'
        }
      }
    }
  })
)

const PrimaryHeader = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  // const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  // Custom width defined by point at which menu links overlap svg logo.
  const hideLogoQuery = useMediaQuery('@media screen and (max-width: 660px)')
  const [anchorEl, setAnchorEl] = useState<PopperProps['anchorEl']>(null)
  const [popperOpen, setPopperOpen] = useState<boolean>(false)
  const [activeKey, setActiveKey] = useState<number | null>(null)
  const [activeLinkEl, setActiveLinkEl] = useState<HTMLElement | null>(null)

  const {state, dispatch} = useContext(UiContext)

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

  const megaMenuLinksEl = useMemo(
    () =>
      isXS ? null : (
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
                // Logical Or for type checking only.
                describedbyId={id || undefined}
                tabIdx={menuItem.tabIndex}
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
      ),
    [
      activeLinkEl,
      classes,
      handleClick,
      enterMenuHandler,
      popperOpenHandler,
      popperCloseHandler,
      id,
      isXS
    ]
  )

  const [parentFixed, setParentFixed] = useState<boolean>()
  const fixedToggleHandler = useCallback((wasFixed: boolean) => {
    if (wasFixed) {
      setParentFixed(false)
    } else {
      setParentFixed(true)
    }
  }, [])

  const toolbarVariant = useMemo(() => (parentFixed ? 'dense' : 'regular'), [
    parentFixed
  ])

  return (
    <Sticky
      onFixedToggle={fixedToggleHandler}
      className={classes.sticky}
      stickyClassName="fixed"
    >
      <AppBar
        // color={isXS ? 'primary' : 'default'}
        // elevation={parentFixed ? 3 : 1}
        position="relative"
        classes={{root: classes.appBarRoot}}
      >
        <Toolbar variant={toolbarVariant} className={classes.toolbar}>
          <Hidden smUp implementation="css">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={handleMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* See media query above for class logoContainer. */}
          {/* <Hidden only="xs" implementation="css"> */}
          <ColumnBox
            display={hideLogoQuery ? 'none' : 'flex'}
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
            className={classes.fixIe}
          >
            <PcwaLogo
              className={classes.headerLogo}
              height="70%"
              missionStatementFill="rgba(0,0,0,0)"
            />
          </ColumnBox>
          {megaMenuLinksEl}
        </Toolbar>
      </AppBar>
      <MegaMenuPopper
        // Logical Or for type checking only.
        id={id || undefined}
        open={popperOpen}
        toolbarVariant={toolbarVariant}
        anchorEl={anchorEl}
        onOpen={popperOpenHandler}
        onClose={popperCloseHandler}
      >
        <MMContent contentKey={activeKey} />
      </MegaMenuPopper>
    </Sticky>
  )
}

export default PrimaryHeader
