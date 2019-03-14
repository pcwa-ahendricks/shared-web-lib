// @flow
import React, {useState} from 'react'
import {Fab, Grow as Transition} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
// import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'

type Props = {
  classes: any,
  thumbHover: string | null,
  thumbName: string,
  onRemove: (event: any) => void
}

const styles = (theme) => ({
  root: {
    position: 'absolute'
  },
  fab: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.grey[100],
    '&:hover': {
      backgroundColor: theme.palette.error.main
    }
  },
  active: {}
})

const RemoveUploadFab = ({classes, thumbHover, thumbName, onRemove}: Props) => {
  const [active, setActive] = useState<boolean>(false)

  const transIn = Boolean(thumbHover === thumbName || active)
  return (
    <div
      className={classes.root}
      onMouseLeave={() => setActive(false)}
      onMouseEnter={() => setActive(true)}
    >
      <Transition in={transIn}>
        <Fab
          size="small"
          className={classes.fab}
          onClick={onRemove}
          aria-label="Remove Upload"
        >
          <DeleteIcon />
        </Fab>
      </Transition>
    </div>
  )
}

RemoveUploadFab.defaultProps = {
  thumbHover: false,
  onRemove: () => {}
}

export default withStyles(styles)(RemoveUploadFab)
