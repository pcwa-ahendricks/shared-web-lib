// @flow
import React, {useState} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Sticky from 'react-sticky-el'
import HomeHeader from '../HomeHeader/HomeHeader'

type Props = {
  classes: any
}

type ToolbarVariant = 'regular' | 'dense'
type ToolbarVariantState = [ToolbarVariant, (v: ToolbarVariant) => void]

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

const Header = ({classes}: Props) => {
  const [toolbarVariant, setToolbarVariant]: ToolbarVariantState = useState(
    'regular'
  )

  const fixedToggleHandler = (wasFixed: boolean) => {
    if (wasFixed) {
      setToolbarVariant('regular')
    } else {
      setToolbarVariant('dense')
    }
  }

  return (
    <React.Fragment>
      <HomeHeader />
      <div className={classes.root}>
        <Sticky onFixedToggle={fixedToggleHandler} style={{zIndex: 1}}>
          <AppBar>
            <Toolbar variant={toolbarVariant}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Sticky>
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(Header)
