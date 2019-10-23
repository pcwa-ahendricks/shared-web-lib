// cspell:ignore touchevents
import React, {useState, useMemo, useCallback} from 'react'
import {DroppedFile, UploadedFileAttr} from './types'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import ThumbPreview from './ThumbPreview'

type Props = {
  onRemoveUpload?: (file: DroppedFile) => void
  isUploading?: boolean
  isUploadingFileNames?: string[]
  droppedFiles?: DroppedFile[]
  uploadedFiles?: UploadedFileAttr[]
}

const ThumbPreviews = ({
  droppedFiles = [],
  uploadedFiles = [],
  onRemoveUpload,
  isUploading = false,
  isUploadingFileNames = []
}: Props) => {
  const [showThumbDialog, setShowThumbDialog] = useState<boolean>(false)
  const [showThumbDialogFile, setShowThumbDialogFile] = useState<DroppedFile>()

  const thumbDialogMemo = useMemo(
    () =>
      showThumbDialogFile ? (
        <MediaPreviewDialog
          url={showThumbDialogFile.previewUrl}
          name={showThumbDialogFile.name}
          ext={showThumbDialogFile.ext}
          open={showThumbDialog}
          onClose={() => setShowThumbDialog(false)}
        />
      ) : null,
    [showThumbDialogFile, showThumbDialog]
  )

  const removeUploadHandler = useCallback(
    (file: DroppedFile) => {
      onRemoveUpload && onRemoveUpload(file)
    },
    [onRemoveUpload]
  )

  const clickHandler = useCallback((file: DroppedFile) => {
    setShowThumbDialog(true)
    setShowThumbDialogFile(file)
  }, [])

  const thumbIsUploading = useCallback(
    (fileName = '') =>
      isUploading && isUploadingFileNames.indexOf(fileName) >= 0,
    [isUploading, isUploadingFileNames]
  )

  return (
    <>
      {droppedFiles.map((file) => (
        <ThumbPreview
          key={file.name}
          file={file}
          uploadedFiles={uploadedFiles}
          onClick={clickHandler}
          onRemoveUpload={removeUploadHandler}
          isUploading={thumbIsUploading(file.name)}
        />
      ))}

      {thumbDialogMemo}
    </>
  )
}

export default ThumbPreviews
