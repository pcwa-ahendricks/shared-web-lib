// @flow
import React, {useState, useRef, useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
// TODO - Preferred <Collapse/> onEnter transition is not working/firing. All other transition components enter as expected. In future updates to Material-UI I will revisit this.
import {
  AppBar,
  Button,
  Fade as Collapse,
  Hidden,
  IconButton,
  Toolbar,
  Popper,
  Typography as Type
} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import {connect} from 'react-redux'
import {uiSetDrawerViz} from '../../store/actions'
import MegaMenuContent from '../MegaMenu/MegaMenuContent'
import MegaMenuLink from '../MegaMenuLink/MegaMenuLink'
import useDebounce from '../../hooks/useDebounce'

type ToolbarVariant = 'regular' | 'dense'
type ToolbarVariantState = [ToolbarVariant, (v: ToolbarVariant) => void]
type Props = {
  classes: any,
  parentFixed: boolean,
  // drawerOpen: boolean,
  dispatch: any
}

const POPOVER_TRAN_EXIT_DURATION = 150

const menuLinkData = [
  {key: 1, seq: 1, caption: 'About'},
  {key: 2, seq: 2, caption: 'Customer Services'},
  {key: 3, seq: 3, caption: 'Doing Business With PCWA'}
]

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appBar: {},
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
      transform: 'translateX(-50%)', // Keep arrow centered.
      '-webkit-transform': 'translateX(-50%)'
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
    // marginLeft: '2vw',
    flex: '0 0 auto'
  }
})

const PrimaryHeader = ({
  classes,
  parentFixed,
  dispatch
}: // drawerOpen
Props) => {
  const [popperOpen, setPopperOpen] = useState(false)
  const debouncedPopperOpen = useDebounce(popperOpen, 150)
  const [popperTransCompleted, setPopperTransCompleted] = useState(true)
  const debouncedPopperTransCompleted = useDebounce(
    popperTransCompleted,
    POPOVER_TRAN_EXIT_DURATION
  )
  const [toolbarVariant, setToolbarVariant]: ToolbarVariantState = useState(
    'regular'
  )
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeLinkEl, setActiveLinkEl] = useState(null)
  const arrowRef = useRef(null)
  useEffect(
    () => {
      fixedToggleHandler()
    },
    [parentFixed, debouncedPopperTransCompleted]
  )
  useEffect(
    () => {
      if (!debouncedPopperOpen) {
        setAnchorEl(null)
        setActiveLinkEl(null)
      }
    },
    [debouncedPopperOpen]
  )

  const fixedToggleHandler = () => {
    if (!debouncedPopperTransCompleted) {
      return
    }
    if (parentFixed) {
      setToolbarVariant('dense')
    } else {
      setToolbarVariant('regular')
    }
  }

  const handleMenuButtonClick = () => {
    dispatch(uiSetDrawerViz(!open))
  }

  const handleClick = (event) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setPopperOpen(!popperOpen)
  }

  const enterMenuHandler = (event, el) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setActiveLinkEl(el)
    setPopperOpen(true)
  }

  const leaveMenuHandler = () => {
    setPopperOpen(false)
  }
  const transitionExitHandler = () => {
    setPopperTransCompleted(true)
  }

  const transitionEnterHandler = () => {
    setPopperTransCompleted(false)
  }

  const popperOpenHandler = () => {
    setPopperOpen(true)
  }

  const id = debouncedPopperOpen ? 'mega-menu-popper' : null
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar color="default" className={classes.appBar} position="relative">
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
            <Type variant="h6" color="inherit" className={classes.grow}>
              News
            </Type>
            <div className={classes.menuLinks}>
              {menuLinkData.map((menuItem) => (
                <div key={menuItem.key} className={classes.menuLink}>
                  <MegaMenuLink
                    describedbyId={id}
                    onLinkClick={handleClick}
                    onLinkEnter={enterMenuHandler}
                    onLinkLeave={leaveMenuHandler}
                    onBottomBunEnter={popperOpenHandler}
                    parentActiveEl={activeLinkEl}
                  >
                    {menuItem.caption}
                  </MegaMenuLink>
                </div>
              ))}
            </div>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>

      <Popper
        id={id}
        className={classes.popper}
        open={debouncedPopperOpen}
        anchorEl={anchorEl}
        transition
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 14'}`
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
            padding: 0
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={{enter: 100, exit: POPOVER_TRAN_EXIT_DURATION}}
            onExit={transitionExitHandler}
            onEntered={transitionEnterHandler}
          >
            <div
              onMouseLeave={leaveMenuHandler}
              onBlur={leaveMenuHandler}
              onMouseEnter={popperOpenHandler}
              onFocus={popperOpenHandler}
            >
              <MegaMenuContent />
            </div>
          </Collapse>
        )}
      </Popper>
      <Popper
        id={id}
        open={debouncedPopperOpen && toolbarVariant === 'regular'}
        className={classes.popper}
        transition
        anchorEl={anchorEl}
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 14'}`
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
            padding: 0
          },
          arrow: {
            enabled: arrowRef.current, // Check prevents popper.js console.log() msg.
            element: arrowRef.current
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={{enter: 100, exit: POPOVER_TRAN_EXIT_DURATION}}
          >
            <span
              className={classes.arrow}
              ref={arrowRef}
              onMouseEnter={popperOpenHandler}
              onFocus={popperOpenHandler}
            />
          </Collapse>
        )}
      </Popper>
    </React.Fragment>
  )
}

PrimaryHeader.defaultProps = {
  parentFixed: false
}

// const mapStateToProps = (state) => ({
//   drawerOpen: state.ui.drawerOpen
// })

export default connect()(withStyles(styles)(PrimaryHeader))
