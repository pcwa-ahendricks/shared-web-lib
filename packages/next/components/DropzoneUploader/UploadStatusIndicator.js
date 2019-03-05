// @flow
import React, {useEffect, useState, type Node} from 'react'
import {Badge, LinearProgress} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import {type DroppedFile, type UploadedFile} from './DropzoneUploader'

type Props = {
  children: Node,
  classes: any,
  uploadedFiles: Array<UploadedFile>,
  file: DroppedFile
}

// Use nested type
type UploadStatus = $PropertyType<
  $PropertyType<UploadedFile, 'serverResponse'>,
  'status'
>

const styles = (theme) => ({
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

  const fileStatusBadgeContent = () => {
    return uploadStatus === 'success' ? (
      <CheckIcon fontSize="inherit" />
    ) : uploadStatus === 'failed' ? (
      <BlockIcon fontSize="inherit" />
    ) : (
      <span />
    )
  }

  return (
    <Badge
      className={classes.margin}
      badgeContent={fileStatusBadgeContent()}
      color={uploadStatus === 'success' ? 'secondary' : 'error'}
      invisible={uploadStatus === 'unknown'}
    >
      {uploadStatus === 'unknown' ? (
        <LinearProgress className={classes.progress} color="secondary" />
      ) : null}
      {children}
    </Badge>
  )
}

export default withStyles(styles)(UploadStatusIndicator)
