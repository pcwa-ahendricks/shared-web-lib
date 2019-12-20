import {useState, useEffect} from 'react'
import {UploadedFileAttr, DroppedFile} from './types'

// Use nested type
type UploadStatus = UploadedFileAttr['serverResponse']['status']

const useUploadStatus = (
  uploadedFiles: UploadedFileAttr[],
  file: DroppedFile
) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('unknown')
  useEffect(() => {
    const matchingFile = uploadedFiles.find(
      (uploadedFile) => uploadedFile.name === file.name
    )
    if (!matchingFile?.serverResponse?.status) {
      setUploadStatus('unknown')
      return
    }
    setUploadStatus(matchingFile.serverResponse.status)
  }, [uploadedFiles, file])

  return uploadStatus
}

export default useUploadStatus
