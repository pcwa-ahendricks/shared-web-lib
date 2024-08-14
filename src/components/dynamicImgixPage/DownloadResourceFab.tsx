import React from 'react'
import {Fab, FabProps, Typography as Type} from '@mui/material'
import prettyBytes from 'pretty-bytes'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import useTheme from '@hooks/useTheme'

type Props = {
  fileSize?: number
  caption?: string
  ext?: string
} & Partial<FabProps>

const DownloadResourceFab = ({
  fileSize,
  caption = 'Download Resource',
  ext,
  ...rest
}: Props) => {
  const theme = useTheme()
  const style = {
    // downloadIcon: ({trigger}: {trigger: boolean}) => ({
    //   marginRight: trigger ? 0 : theme.spacing(1)
    // })
    downloadIcon: {
      marginRight: theme.spacing(1)
    },
    muiFabSmall: {
      fontSize: '0.8rem' // Defaults to 0.92rem.
    }
  }

  return (
    <Fab
      // variant={trigger ? 'round' : 'extended'}
      variant="extended"
      sx={{
        '&.MuiFab-sizeSmall': {
          ...style.muiFabSmall
        }
      }}
      {...rest}
    >
      <>
        <DownloadIcon sx={{...style.downloadIcon}} />
        {caption}
        {fileSize ? (
          <Type
            component="span"
            variant="caption"
            color="textSecondary"
            sx={(theme) => ({
              paddingLeft: theme.spacing(1)
            })}
          >
            <Type component="span" variant="caption" color="textSecondary">
              ({ext ? <>{ext}, </> : null}
              {/* Don't use ?? here since it won't catch NaN parameter. */}
              {prettyBytes(Number(fileSize) || 0)})
            </Type>
          </Type>
        ) : ext ? (
          <Type
            component="span"
            variant="caption"
            color="textSecondary"
            sx={(theme) => ({
              paddingLeft: theme.spacing(1)
            })}
          >
            <Type component="span" variant="caption" color="textSecondary">
              ({ext})
            </Type>
          </Type>
        ) : null}
      </>
    </Fab>
  )
}

export default DownloadResourceFab
