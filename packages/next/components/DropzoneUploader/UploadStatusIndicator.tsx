import React, {useEffect, useMemo} from 'react'
import {Box, Badge, LinearProgress} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import {DroppedFile, UploadedFile} from './types'
import useUploadStatus from './useUploadStatus'

type Props = {
  children: React.ReactNode
  uploadedFiles: UploadedFile[]
  file: DroppedFile
  isUploading?: boolean
  onSuccess?: () => void
}

const useStyles = makeStyles(() =>
  createStyles({
    badgeRoot: {
      maxWidth: '100%',
      display: 'flex', // defaults to inline-flex
      flexDirection: 'column',
      justifyContent: 'center'
    },
    badge: {
      width: 20,
      height: 20
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
  onSuccess,
  isUploading = false
}: Props) => {
  const classes = useStyles()

  const uploadStatus = useUploadStatus(uploadedFiles, file)

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
      isUploading ? (
        <LinearProgress className={classes.progress} color="secondary" />
      ) : null,
    [classes, isUploading]
  )

  return (
    <Box m={2}>
      <Badge
        classes={{root: classes.badgeRoot, badge: classes.badge}}
        badgeContent={fileStatusBadgeContentEl}
        color={uploadStatus === 'success' ? 'secondary' : 'error'}
        invisible={uploadStatus === 'unknown'}
      >
        <Box>
          {progressEl}
          {children}
        </Box>
      </Badge>
    </Box>
  )
}

export default UploadStatusIndicator
