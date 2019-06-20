// cspell:ignore touchevents
import React, {useState, useMemo, useCallback} from 'react'
import {DroppedFile, UploadedFile} from './types'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import ThumbPreview from './ThumbPreview'

type Props = {
  onRemoveUpload?: (file: DroppedFile) => void
  isUploading?: boolean
  droppedFiles?: DroppedFile[]
  uploadedFiles?: UploadedFile[]
}

const ThumbPreviews = ({
  droppedFiles = [],
  uploadedFiles = [],
  onRemoveUpload,
  isUploading = false
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

  return (
    <React.Fragment>
      {droppedFiles.map((file) => (
        <ThumbPreview
          key={file.name}
          file={file}
          uploadedFiles={uploadedFiles}
          onClick={clickHandler}
          onRemoveUpload={removeUploadHandler}
          isUploading={isUploading}
        />
      ))}

      {thumbDialogMemo}
    </React.Fragment>
  )
}

export default ThumbPreviews
