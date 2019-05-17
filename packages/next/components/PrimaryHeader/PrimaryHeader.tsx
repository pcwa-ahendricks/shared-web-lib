import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
// TODO - Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {AppBar, Hidden, IconButton, Toolbar, Theme} from '@material-ui/core'
import {PopperProps} from '@material-ui/core/Popper'
import {Menu as MenuIcon} from '@material-ui/icons'
import {useDispatch, useMappedState} from 'redux-react-hook'
import {uiSetDrawerViz} from '@store/actions'
import MegaMenuLink from '@components/megaMenu/MegaMenuLink/MegaMenuLink'
import MegaMenuPopper from '@components/megaMenu/MegaMenuPopper/MegaMenuPopper'
import MMContent from '@components/MMContent/MMContent'
import NextLink from '@components/NextLink/NextLink'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import {State} from '@store/index'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export type ToolbarVariant = 'regular' | 'dense'

type Props = {
  parentFixed?: boolean
}

const menuLinkData = [
  {key: 1, caption: 'About', tabIndex: 1},
  {key: 2, caption: 'Customer Services', tabIndex: 2},
  {key: 3, caption: 'Doing Business With PCWA', tabIndex: 3},
  {key: 4, caption: 'Newsroom', tabIndex: 4}
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    appBar: {},
    logoContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    // Custom width defined by point at which menu links overlap svg logo.
    '@media screen and (max-width: 660px)': {
      logoContainer: {
        display: 'none'
      }
    },
    homeLink: {
      flex: '0 0 auto',
      alignSelf: 'center',
      // Margin should match <MegaMenuLink/> linkMargin prop for consistency.
      marginLeft: '1vw',
      marginRight: '1vw'
    },
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
          borderColor: `transparent transparent ${
            theme.palette.primary.dark
          } transparent`
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
    menuLinks: {
      flex: 'auto',
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end'
    },
    menuLink: {
      flex: '0 0 auto'
    }
  })
)

const PrimaryHeader = ({parentFixed = false}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const [anchorEl, setAnchorEl] = useState<PopperProps['anchorEl']>(null)
  const [popperOpen, setPopperOpen] = useState<boolean>(false)
  const [activeKey, setActiveKey] = useState<number | null>(null)
  const [activeLinkEl, setActiveLinkEl] = useState<HTMLElement | null>(null)

  const uiState = useCallback(
    (state: State) => ({
      drawerOpen: state.ui.drawerOpen
    }),
    []
  )
  const {drawerOpen} = useMappedState(uiState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!popperOpen) {
      setAnchorEl(null)
      setActiveLinkEl(null)
      setActiveKey(null)
    }
  }, [popperOpen])

  const handleMenuButtonClick = useCallback(() => {
    dispatch(uiSetDrawerViz(!drawerOpen))
  }, [dispatch, drawerOpen])

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

  const id = popperOpen ? 'mega-menu-popper' : null
  const megaMenuLinksEl = useMemo(
    () =>
      isXS ? null : (
        <div className={classes.menuLinks}>
          <div className={classes.homeLink}>
            <NextLink
              href="/"
              color="primary"
              variant="button"
              classes={{root: classes.megaMenuLink}}
              underline="none"
            >
              Home
            </NextLink>
          </div>
          {menuLinkData.map((menuItem) => (
            <div key={menuItem.key} className={classes.menuLink}>
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
            </div>
          ))}
        </div>
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

  const toolbarVariant = parentFixed ? 'dense' : 'regular'
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar
          color={isXS ? 'primary' : 'default'}
          className={classes.appBar}
          position="relative"
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
            <div className={classes.logoContainer}>
              <PcwaLogo
                height="70%"
                // Setting max width/height prevents strange jank'ing when toolbar variant changes.
                maxHeight={parentFixed ? 48 : 64}
                maxWidth={isSM ? 100 : parentFixed ? 140 : 200}
                missionStatementFill="rgba(0,0,0,0)"
              />
            </div>
            {megaMenuLinksEl}
          </Toolbar>
        </AppBar>
      </div>
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
