// @flow
import React, {useState, useRef} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Collapse,
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
import type {ToolbarVariant} from '../HeaderContainer/HeaderContainer'

type Props = {
  classes: any,
  toolbarVariant: ToolbarVariant,
  // drawerOpen: boolean,
  dispatch: any
}

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
  mmLink: {}
})

const PrimaryHeader = ({
  classes,
  toolbarVariant,
  dispatch
}: // drawerOpen
Props) => {
  const [popperOpen, setPopperOpen] = useState(false)
  const debouncedPopperOpen = useDebounce(popperOpen, 10)
  const [anchorEl, setAnchorEl] = useState(null)
  const arrowRef = useRef(null)

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
            <div
              className={classes.mmLinkContainer}
              onMouseLeave={leaveMenuHandler}
              onBlur={leaveMenuHandler}
              onMouseEnter={popperOpenHandler}
              onFocus={popperOpenHandler}
            >
              <Button
                className={classes.mmLink}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                onFocus={enterMenuHandler}
                onMouseEnter={enterMenuHandler}
              >
                Toggle Popper
              </Button>
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
          <Collapse {...TransitionProps} timeout={{enter: 100, exit: 200}}>
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
            enabled: true,
            element: arrowRef.current
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse {...TransitionProps} timeout={{enter: 100, exit: 200}}>
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

// const mapStateToProps = (state) => ({
//   drawerOpen: state.ui.drawerOpen
// })

export default connect()(withStyles(styles)(PrimaryHeader))
