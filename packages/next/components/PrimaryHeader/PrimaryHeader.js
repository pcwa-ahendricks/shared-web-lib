// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography as Type
} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import {connect} from 'react-redux'
import {uiSetDrawerViz} from '../../store/actions'
import type {ToolbarVariant} from '../HeaderContainer/HeaderContainer'

type Props = {
  classes: any,
  toolbarVariant: ToolbarVariant,
  open: boolean,
  dispatch: any
}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const PrimaryHeader = ({classes, toolbarVariant, dispatch, open}: Props) => {
  const handleMenuButtonClick = () => {
    dispatch(uiSetDrawerViz(!open))
  }

  return (
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  open: state.ui.drawerOpen
})

export default connect(mapStateToProps)(withStyles(styles)(PrimaryHeader))
