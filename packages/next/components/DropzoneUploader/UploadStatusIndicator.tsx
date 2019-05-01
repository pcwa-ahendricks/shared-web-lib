import React, {useEffect, useState, useMemo} from 'react'
import {Badge, LinearProgress} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import {DroppedFile, UploadedFile} from './types'

type Props = {
  children: React.ReactNode
  classes: any
  uploadedFiles: Array<UploadedFile>
  file: DroppedFile
}

// Use nested type
type UploadStatus = UploadedFile['serverResponse']['status']

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit * 2
    },
    progress: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    }
  })

const UploadStatusIndicator = ({
  classes,
  children,
  uploadedFiles,
  file
}: Props) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('unknown')
  useEffect(() => {
    const matchingFile = uploadedFiles.find(
      (uploadedFile) => uploadedFile.name === file.name
    )
    if (
      !matchingFile ||
      !matchingFile.serverResponse ||
      !matchingFile.serverResponse.status
    ) {
      setUploadStatus('unknown')
      return
    }
    setUploadStatus(matchingFile.serverResponse.status)
  }, [uploadedFiles, file])

  const fileStatusBadgeContentEl = useMemo(
    () =>
      uploadStatus === 'success' ? (
        <CheckIcon fontSize="inherit" />
      ) : uploadStatus === 'failed' ? (
        <BlockIcon fontSize="inherit" />
      ) : (
        <span />
      ),
    [uploadStatus]
  )

  const progressEl = useMemo(
    () =>
      uploadStatus === 'unknown' ? (
        <LinearProgress className={classes.progress} color="secondary" />
      ) : null,
    [uploadStatus, classes]
  )

  return (
    <Badge
      className={classes.margin}
      badgeContent={fileStatusBadgeContentEl}
      color={uploadStatus === 'success' ? 'secondary' : 'error'}
      invisible={uploadStatus === 'unknown'}
    >
      <React.Fragment>
        {progressEl}
        {children}
      </React.Fragment>
    </Badge>
  )
}

export default withStyles(styles)(UploadStatusIndicator)
