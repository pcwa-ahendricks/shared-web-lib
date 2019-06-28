import React, {useCallback, useMemo, useContext} from 'react'
import {makeStyles} from '@material-ui/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {Mail as MailIcon, Inbox as InboxIcon} from '@material-ui/icons'
import {uiSetDrawerViz, UiContext} from '@components/ui/UiStore'

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles()

  const {state, dispatch} = useContext(UiContext)

  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(uiSetDrawerViz(openDrawer))
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
