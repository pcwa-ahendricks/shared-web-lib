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

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
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
      borderStyle: 'solid'
    }
  },
  mmLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  mmLink: {
    flex: '0 0 auto'
  },
  mmLinkBun: {
    flex: '1 0 auto'
  }
})

const PrimaryHeader = ({
  classes,
  parentFixed,
  dispatch
}: // drawerOpen
Props) => {
  const [popperOpen, setPopperOpen] = useState(false)
  const debouncedPopperOpen = useDebounce(popperOpen, 10)
  const [popperTransCompleted, setPopperTransCompleted] = useState(true)
  const debouncedPopperTransCompleted = useDebounce(
    popperTransCompleted,
    POPOVER_TRAN_EXIT_DURATION
  )
  const [toolbarVariant, setToolbarVariant]: ToolbarVariantState = useState(
    'regular'
  )
  const [anchorEl, setAnchorEl] = useState(null)
  const arrowRef = useRef(null)
  useEffect(
    () => {
      fixedToggleHandler()
    },
    [parentFixed, debouncedPopperTransCompleted]
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

  const enterMenuHandler = (event) => {
    const {currentTarget} = event
    setAnchorEl(currentTarget)
    setPopperOpen(true)
  }

  const leaveMenuHandler = () => {
    setAnchorEl(null)
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
        <AppBar>
          <Toolbar variant={toolbarVariant}>
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
            <div className={classes.mmLinkContainer}>
              <div className={classes.mmLinkBun} />
              <Button
                className={classes.mmLink}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                onFocus={enterMenuHandler}
                onMouseEnter={enterMenuHandler}
                onMouseLeave={leaveMenuHandler}
                onBlur={leaveMenuHandler}
              >
                Toggle Popper
              </Button>
              <div
                className={classes.mmLinkBun}
                onMouseEnter={popperOpenHandler}
                onFocus={popperOpenHandler}
              />
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
            offset: `${toolbarVariant === 'dense' ? '0, 5' : '0, 13'}`
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
            offset: `${toolbarVariant === 'dense' ? '0, 5' : '0, 13'}`
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
