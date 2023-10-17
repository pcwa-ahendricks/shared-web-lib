import React, {useEffect, useMemo} from 'react'
import {Box, Badge, LinearProgress} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import BlockIcon from '@mui/icons-material/Block'
import {DroppedFile, UploadedFileAttr} from './types'
import useUploadStatus from './useUploadStatus'

type Props = {
  children: React.ReactNode
  uploadedFiles: UploadedFileAttr[]
  file: DroppedFile
  isUploading?: boolean
  onSuccess?: () => void
}

const UploadStatusIndicator = ({
  children,
  uploadedFiles,
  file,
  onSuccess,
  isUploading = false
}: Props) => {
  const style = useMemo(
    () => ({
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
    }),
    []
  )
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
        <LinearProgress
          sx={{
            ...style.progress
          }}
          color="secondary"
        />
      ) : null,
    [isUploading, style]
  )

  return (
    <Box m={2}>
      <Badge
        sx={{
          '& .MuiBadge-badge': {
            ...style.badge
          }
        }}
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
