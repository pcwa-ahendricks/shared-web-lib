import React, {useState} from 'react'
import {Fab, Grow as Transition, FabProps, useTheme, Box} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded'
import {Theme} from '@lib/material-theme'

type Props = {
  thumbName: string
  onRemove?: (event: any) => void
  thumbHover?: string | null
} & Partial<FabProps>

const RemoveUploadFab = ({thumbHover, thumbName, onRemove, ...rest}: Props) => {
  const [active, setActive] = useState<boolean>(false)
  const theme = useTheme<Theme>()
  const style = {
    root: {
      position: 'absolute'
    },
    fab: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.grey[100],
      '&:hover': {
        backgroundColor: theme.palette.error.main
      }
    }
  }

  const transIn = Boolean(thumbHover === thumbName ?? active)
  return (
    <Box
      sx={{
        ...style.root
      }}
      onMouseLeave={() => setActive(false)}
      onMouseEnter={() => setActive(true)}
    >
      <Transition in={transIn}>
        <Fab
          size="small"
          sx={{
            ...style.fab
          }}
          onClick={onRemove}
          aria-label="Remove Upload"
          {...rest}
        >
          <DeleteIcon />
        </Fab>
      </Transition>
    </Box>
  )
}

export default RemoveUploadFab
