import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
// TODO - Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Theme
} from '@material-ui/core'
import {PopperProps} from '@material-ui/core/Popper'
import {Menu as MenuIcon} from '@material-ui/icons'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import MegaMenuLink from '@components/megaMenu/MegaMenuLink/MegaMenuLink'
import MegaMenuPopper from '@components/megaMenu/MegaMenuPopper/MegaMenuPopper'
import MMContent from '@components/MMContent/MMContent'
import NextLink from '@components/NextLink/NextLink'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {ColumnBox, RowBox} from '@components/boxes/FlexBox'

export type ToolbarVariant = 'regular' | 'dense'

type Props = {
  parentFixed?: boolean
}

const menuLinkData = [
  {key: 1, caption: 'About', tabIndex: 1},
  {key: 2, caption: 'Customer Services', tabIndex: 2},
  {key: 3, caption: 'Business With PCWA', tabIndex: 3},
  {key: 4, caption: 'Newsroom', tabIndex: 4}
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    megaMenuLink: {
      fontWeight: 600,
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
      HACK - Logo is pushing out the rest of the primary nav menu off the page for some reason in IE. This is the fix for IE.
    */
    fixIe: {
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
        /* IE10+ specific styles go here */
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 'auto',
        marginLeft: theme.spacing(3)
      }
    }
  })
)

const PrimaryHeader = ({parentFixed = false}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
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
    setPopperOpen(false)
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
          {menuLinkData.map((menuItem) => (
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
                {menuItem.caption}
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

  const toolbarVariant = useMemo(() => (parentFixed ? 'dense' : 'regular'), [
    parentFixed
  ])

  return (
    <React.Fragment>
      <AppBar color={isXS ? 'primary' : 'default'} position="relative">
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
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
            className={classes.fixIe}
          >
            <PcwaLogo
              height="70%"
              // Setting max width/height prevents strange jank'ing when toolbar variant changes.
              style={{
                maxHeight: parentFixed ? 48 : 64,
                maxWidth: isSM ? 100 : parentFixed ? 140 : 200
              }}
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
    </React.Fragment>
  )
}

export default PrimaryHeader
