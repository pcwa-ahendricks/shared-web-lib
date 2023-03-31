import React, {useState} from 'react'
import {Fab, Theme, Grow as Transition, FabProps} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
// import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded'

type Props = {
  thumbName: string
  onRemove?: (event: any) => void
  thumbHover?: string | null
} & Partial<FabProps>

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

  const transIn = Boolean(thumbHover === thumbName ?? active)
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
