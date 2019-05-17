import React, {useState} from 'react'
import {Fab, Theme, Grow as Transition} from '@material-ui/core'
import {FabProps} from '@material-ui/core/Fab'
import {makeStyles, createStyles} from '@material-ui/styles'
// import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'

type Props = {
  thumbName: string
  onRemove?: (event: any) => void
  thumbHover?: string | null
} & FabProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
)

const RemoveUploadFab = ({thumbHover, thumbName, onRemove, ...rest}: Props) => {
  const classes = useStyles()
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
          {...rest}
        >
          <DeleteIcon />
        </Fab>
      </Transition>
    </div>
  )
}

export default RemoveUploadFab
