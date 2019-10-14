import React, {useCallback, useMemo, useContext, useEffect} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles()

  const {state, dispatch} = useContext(UiContext)
  const theme = useTheme<Theme>()
  const notXS = useMediaQuery(theme.breakpoints.up('sm'))

  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(setDrawerViz(openDrawer))
    },
    [dispatch]
  )

  const sideList = useMemo(
    () => (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    ),
    [classes]
  )

  // Close the drawer if it's open and window is resized larger.
  useEffect(() => {
    if (notXS && state.drawerOpen) {
      dispatch(setDrawerViz(false))
    }
  }, [notXS, toggleDrawer, state, dispatch])

  return (
    <div>
      {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
      <SwipeableDrawer
        open={state.drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default SwipeableTemporaryDrawer
