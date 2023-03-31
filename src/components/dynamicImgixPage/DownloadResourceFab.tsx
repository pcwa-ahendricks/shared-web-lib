import React from 'react'
import {Theme, useTheme, Fab, FabProps, Typography as Type} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import prettyBytes from 'pretty-bytes'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import {CosmicMedia} from '@lib/services/cosmicService'

type Props = {
  fileSize?: CosmicMedia['size']
  caption?: string
} & Partial<FabProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // downloadIcon: ({trigger}: {trigger: boolean}) => ({
    //   marginRight: trigger ? 0 : theme.spacing(1)
    // })
    downloadIcon: {
      marginRight: theme.spacing(1)
    },
    muiFabSmall: {
      fontSize: '0.8rem' // Defaults to 0.92rem.
    }
  })
)

const DownloadResourceFab = ({
  fileSize,
  caption = 'Download Resource',
  ...rest
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Fab
      // variant={trigger ? 'round' : 'extended'}
      variant="extended"
      classes={{sizeSmall: classes.muiFabSmall}}
      {...rest}
    >
      <>
        <DownloadIcon className={classes.downloadIcon} />
        {caption}
        {fileSize ? (
          <Type
            component="span"
            variant="caption"
            color="textSecondary"
            style={{paddingLeft: theme.spacing(1)}}
          >
            {/* Don't use ?? here since it won't catch NaN parameter. */}(
            {prettyBytes(Number(fileSize) || 0)})
          </Type>
        ) : null}
      </>
    </Fab>
  )
}

export default DownloadResourceFab
