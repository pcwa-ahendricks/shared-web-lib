// @flow
import React, {useState, useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
// TODO - Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {AppBar, Hidden, IconButton, Toolbar, withWidth} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import {connect} from 'react-redux'
import {uiSetDrawerViz} from '../../store/actions'
import MegaMenuLink from '../MegaMenu/MegaMenuLink/MegaMenuLink'
import MegaMenuPopper from '../MegaMenu/MegaMenuPopper/MegaMenuPopper'
import MMContent from '../MMContent/MMContent'
import useDebounce from '../../hooks/useDebounce'
import MatNextLink from '../MatNextLink/MatNextLink'
import PcwaLogo from '../../components/PcwaLogo/PcwaLogo'

export type ToolbarVariant = 'regular' | 'dense'

type Props = {
  classes: any,
  parentFixed: boolean,
  drawerOpen: boolean,
  dispatch: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const menuLinkData = [
  {key: 1, caption: 'About', tabIndex: 1},
  {key: 2, caption: 'Customer Services', tabIndex: 2},
  {key: 3, caption: 'Doing Business With PCWA', tabIndex: 3},
  {key: 4, caption: 'Newsroom', tabIndex: 4}
]

const styles = (theme) => ({
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
    // Margin should match Overline and mmLink margin for consistency.
    margin: {
      left: '1vw',
      right: '1vw'
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

const PrimaryHeader = ({
  classes,
  parentFixed,
  dispatch,
  width,
  drawerOpen
}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [popperOpen, setPopperOpen] = useState(false)
  const debouncedPopperOpen = useDebounce(popperOpen, 100)
  const [activeKey, setActiveKey] = useState(null)
  const [activeLinkEl, setActiveLinkEl] = useState(null)

  useEffect(
    () => {
      if (!debouncedPopperOpen) {
        setAnchorEl(null)
        setActiveLinkEl(null)
        setActiveKey(null)
      }
    },
    [debouncedPopperOpen]
  )

  const handleMenuButtonClick = () => {
    dispatch(uiSetDrawerViz(!drawerOpen))
  }

  const enterMenuHandler = (event, el, key) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setActiveLinkEl(el)
    setActiveKey(key)
    setPopperOpen(true)
  }

  const handleClick = (event) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setPopperOpen(!popperOpen)
  }

  const popperCloseHandler = () => {
    setPopperOpen(false)
  }

  const popperOpenHandler = () => {
    setPopperOpen(true)
  }

  const id = debouncedPopperOpen ? 'mega-menu-popper' : null
  const toolbarVariant = parentFixed ? 'dense' : 'regular'
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar
          color={width === 'xs' ? 'primary' : 'default'}
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
                maxWidth={width === 'sm' ? 100 : parentFixed ? 140 : 200}
                missionStatementFill="rgba(0,0,0,0)"
              />
            </div>
            {/* </Hidden> */}
            {width === 'xs' ? null : (
              <div className={classes.menuLinks}>
                <div className={classes.homeLink}>
                  <MatNextLink
                    href="/"
                    typeProps={{variant: 'button', color: 'primary'}}
                  >
                    Home
                  </MatNextLink>
                </div>
                {menuLinkData.map((menuItem) => (
                  <div key={menuItem.key} className={classes.menuLink}>
                    <MegaMenuLink
                      describedbyId={id}
                      tabIdx={menuItem.tabIndex}
                      onLinkClick={handleClick}
                      onLinkEnter={(event, el) =>
                        enterMenuHandler(event, el, menuItem.key)
                      }
                      onLinkLeave={popperCloseHandler}
                      onBottomBunEnter={popperOpenHandler}
                      parentActiveEl={activeLinkEl}
                    >
                      {menuItem.caption}
                    </MegaMenuLink>
                  </div>
                ))}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <MegaMenuPopper
        id={id}
        open={debouncedPopperOpen}
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

PrimaryHeader.defaultProps = {
  parentFixed: false
}

const mapStateToProps = (state) => ({
  drawerOpen: state.ui.drawerOpen
})

export default connect(mapStateToProps)(
  withWidth()(withStyles(styles)(PrimaryHeader))
)
