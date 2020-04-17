import React from 'react'
import {Fab, FabProps, Typography as Type} from '@material-ui/core'
import prettyBytes from 'pretty-bytes'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import {CosmicMedia} from '@lib/services/cosmicService'

type Props = {
  fileSize?: CosmicMedia['size']
  caption?: string
} & FabProps

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
