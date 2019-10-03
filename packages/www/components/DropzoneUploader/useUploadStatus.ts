import {useState, useEffect} from 'react'
import {UploadedFile, DroppedFile} from './types'

// Use nested type
type UploadStatus = UploadedFile['serverResponse']['status']

const useUploadStatus = (uploadedFiles: UploadedFile[], file: DroppedFile) => {
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

  return uploadStatus
}

export default useUploadStatus
