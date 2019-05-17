import React, {useEffect, useState, useMemo} from 'react'
import {Badge, LinearProgress, Theme} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import {DroppedFile, UploadedFile} from './types'

type Props = {
  children: React.ReactNode
  uploadedFiles: UploadedFile[]
  file: DroppedFile
  onSuccess?: () => void
}

// Use nested type
type UploadStatus = UploadedFile['serverResponse']['status']

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2)
    },
    progress: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    }
  })
)

const UploadStatusIndicator = ({
  children,
  uploadedFiles,
  file,
  onSuccess
}: Props) => {
  const classes = useStyles()
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

  useEffect(() => {
    if (uploadStatus === 'success') {
      onSuccess && onSuccess()
    }
  }, [uploadStatus, onSuccess])

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

export default UploadStatusIndicator
