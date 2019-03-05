// @flow
import React, {useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography as Type} from '@material-ui/core'
import {
  uploadFile,
  UPLOAD_SERVICE_BASE_URL
} from '../../lib/services/uploadService'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import nanoid from 'nanoid'
import ConfirmRemoveUploadDialog from './ConfirmRemoveUploadDialog'
import ConfirmClearUploadsDialog from './ConfirmClearUploadsDialog'
import UploadRejectedDialog from './UploadRejectedDialog'
import ThumbPreviews from './ThumbPreviews'
import {type UploadResponse} from '../../lib/services/uploadService'

type Props = {
  classes: any,
  onUploaded?: (files: any) => void,
  height: number | string,
  allowClearUploads: boolean
}

const styles = (theme) => ({
  dropzoneContainer: {},
  dropzone: {
    backgroundColor: '#eee',
    borderRadius: 10,
    border: {
      width: 2,
      style: 'dashed',
      color: 'grey'
    },
    margin: theme.spacing.unit * 2,
    '&$isActive': {
      border: {
        width: 2,
        style: 'dashed',
        color: theme.palette.primary.light
      }
    }
  },
  isActive: {},
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  leftIcon: {
    marginLeft: theme.spacing.unit * 1
  },
  clearUploadsButton: {
    // margin & width: 100% won't play well together. Using padding w/ container instead.
    // margin: theme.spacing.unit * 1
    color: theme.palette.error.main
  },
  clearUploadsContainer: {
    padding: theme.spacing.unit * 2
  },
  primaryLight: {
    color: theme.palette.primary.light
  }
})

const responseTempUrl = (response: any) => {
  return response.status && response.status.toLowerCase() === 'success'
    ? `${UPLOAD_SERVICE_BASE_URL}/${response.fileName}?folder=${
        response.fieldName
      }`
    : ''
}

const DropzoneUploader = ({
  classes,
  onUploaded,
  height,
  allowClearUploads
}: Props) => {
  const [droppedFiles, setDroppedFiles] = useState<Array<DroppedFile>>([])
  const [rejectedFiles, setRejectedFiles] = useState<Array<DroppedFile>>([])
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>([])
  const [
    confirmRemoveUpload,
    setConfirmRemoveUpload
  ] = useState<DroppedFile | null>(null)
  const [
    showConfirmClearUploads,
    setShowConfirmClearUploads
  ] = useState<boolean>(false)
  useEffect(() => {
    onUploaded && onUploaded(uploadedFiles)
  }, [uploadedFiles])

  const clearUploadsHandler = () => {
    setShowConfirmClearUploads(false) // Hide dialog.
    setUploadedFiles([])
    // Resetting dropped files is required for removing thumbs previews.
    setDroppedFiles([])
  }

  const tryRemoveUploadHandler = (file: DroppedFile) => {
    setConfirmRemoveUpload(file)
  }

  const removeUploadHandler = () => {
    if (!confirmRemoveUpload) {
      return
    }
    const removeUploadWithName = confirmRemoveUpload.name
    setConfirmRemoveUpload(null)
    const newUploadedFiles = uploadedFiles.filter(
      (file) => file.name !== removeUploadWithName
    )
    const newDroppedFiles = droppedFiles.filter(
      (file) => file.name !== removeUploadWithName
    )
    setUploadedFiles(newUploadedFiles)
    setDroppedFiles(newDroppedFiles)
  }

  const dropHandler = async (
    files: Array<any>
    // rejectedFiles: Array<any>
  ) => {
    // console.log('accepted files: ', acceptedFiles)
    // console.log('rejected files: ', rejectedFiles)
    // Add image preview urls.
    files.forEach((file) => {
      const fileNamePrefix = `${nanoid(10)}__`
      const newFileName = `${fileNamePrefix}${file.name}`
      const newFile = new File([file], newFileName, {
        type: file.type
      })
      setDroppedFiles((prevDroppedFiles) => [
        ...prevDroppedFiles,
        {
          name: newFile.name,
          type: newFile.type,
          size: newFile.size,
          lastModified: newFile.lastModified,
          previewUrl: URL.createObjectURL(newFile),
          ext: extension(newFileName)
        }
      ])
      // Upload dropped files.
      uploadFileHandler(newFile)
    })
  }

  const uploadFileHandler = async (file) => {
    try {
      const response = await uploadFile(file, 'device-rebate')
      if (response) {
        // Destructuring File objects doesn't produce any properties. Need to specify those 4 explicitly.
        const uploadedFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          tempUrl: responseTempUrl({...response}),
          serverResponse: {...response},
          ext: extension(file.name)
        }
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          uploadedFile
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*
   * rejectedFiles doesn't contain all the rejected files. Just the files rejected since
   * last onRejected called.
   */
  const rejectHandler = (files: Array<DroppedFile>) => {
    setRejectedFiles([...files])
  }

  const uploadRejectCloseHandler = () => {
    setRejectedFiles([])
  }

  // onFileDialogCancel property handler doesn't fire correctly in Firefox. Will avoid using this for now.
  // const cancelHandler = () => {
  //   alert('Canceling...')
  //   setFiles([])
  // }
  const fileList = droppedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))
  const attachmentList = uploadedFiles.map((file) => (
    <li key={file.name}>{file.tempUrl}</li>
  ))

  const showClearUploadsButton = Boolean(
    allowClearUploads && uploadedFiles.length >= 2
  )
  const showConfirmRemoveUpload = Boolean(confirmRemoveUpload)
  const showRejectedFilesDialog = Boolean(rejectedFiles.length > 0)
  // <PageLayout title="Irrigation Canal Information">
  return (
    <div>
      <div className={classes.dropzoneContainer}>
        {/* Mime types are also checked on the back-end. */}
        <Dropzone
          onDrop={dropHandler}
          accept="image/*, application/pdf"
          onDropRejected={rejectHandler}
        >
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames(classes.dropzone, {
                  [classes.isActive]: isDragActive
                })}
                style={{height: height}}
              >
                <input {...getInputProps()} />
                <div className={classes.captionContainer}>
                  {isDragActive ? (
                    <Type variant="h4" className={classes.primaryLight}>
                      Drop files here...
                    </Type>
                  ) : (
                    <React.Fragment>
                      <CloudUploadIcon fontSize="large" color="action" />
                      <Type variant="h4" color="secondary">
                        Drag & drop
                      </Type>
                      <Type variant="subtitle1" color="textSecondary">
                        your file(s) here or click to browse
                      </Type>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )
          }}
        </Dropzone>
        <aside className={classes.thumbsContainer}>
          <ThumbPreviews
            uploadedFiles={uploadedFiles}
            droppedFiles={droppedFiles}
            onRemoveUpload={tryRemoveUploadHandler}
          />
        </aside>
        {showClearUploadsButton ? (
          <div className={classes.clearUploadsContainer}>
            <Button
              variant="outlined"
              fullWidth={true}
              className={classes.clearUploadsButton}
              onClick={() => setShowConfirmClearUploads(true)}
              size="small"
            >
              Clear Uploads
              <DeleteIcon className={classes.leftIcon} />
            </Button>
          </div>
        ) : null}
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{fileList}</ul>
        <h4>Attachments</h4>
        <ul>{attachmentList}</ul>
      </aside>
      <ConfirmRemoveUploadDialog
        open={showConfirmRemoveUpload}
        onClose={() => setConfirmRemoveUpload(null)}
        onRemove={removeUploadHandler}
      />
      <ConfirmClearUploadsDialog
        open={showConfirmClearUploads}
        onClose={() => setShowConfirmClearUploads(false)}
        onClear={clearUploadsHandler}
      />
      <UploadRejectedDialog
        open={showRejectedFilesDialog}
        rejectedFiles={rejectedFiles}
        onClose={uploadRejectCloseHandler}
      />
    </div>
  )
}
/* </PageLayout> */

export default withStyles(styles)(DropzoneUploader)

DropzoneUploader.defaultProps = {
  height: '100%',
  allowClearUploads: false
}

function extension(filename: string, lowercase = true) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const ext = filename
    .split('.')
    .pop()
    .trim()
  if (lowercase) {
    return ext.toLowerCase()
  } else {
    return ext
  }
}

export type UploadedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  tempUrl: string,
  serverResponse: UploadResponse,
  ext: string
}

// Marking ext and previewUrl as maybe null helps with prop type checking in <UploadRejectedDialog/>.
export type DroppedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  ext: ?string,
  previewUrl: ?string
}
