// @flow
import React, {useState, useEffect, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography as Type} from '@material-ui/core'
import {
  uploadFile,
  UPLOAD_SERVICE_BASE_URL
} from '../../lib/services/uploadService'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import DeleteIcon from '@material-ui/icons/Delete'
import nanoid from 'nanoid'
import ConfirmRemoveUploadDialog from './ConfirmRemoveUploadDialog'
import ConfirmClearUploadsDialog from './ConfirmClearUploadsDialog'
import UploadRejectedDialog from './UploadRejectedDialog'
import ThumbPreviews from './ThumbPreviews'
// import ThumbPreviewList from './ThumbPreviewList'
import {type UploadResponse} from '../../lib/services/uploadService'

type Props = {
  classes: any,
  onUploaded?: (files: any) => void,
  height: number | string,
  width: number | string,
  allowClearUploads: boolean,
  uploadFolder: string
}

const styles = (theme) => ({
  root: {},
  dropzone: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    border: {
      width: 2,
      style: 'dashed',
      color: 'grey'
    },
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
  },
  dropzoneTitle: {
    color: theme.palette.secondary.main,
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  dropzoneSubTitle: {
    color: theme.palette.text.secondary,
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  disabled: {}
})

const DropzoneUploader = ({
  classes,
  onUploaded,
  height,
  width,
  allowClearUploads,
  uploadFolder,
  ...rest
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
  // $FlowFixMe
  const {maxSize, disabled} = rest || {}

  useEffect(() => {
    onUploaded && onUploaded(uploadedFiles)
  }, [uploadedFiles])

  const dropHandler = useCallback((
    files: Array<any>
    // rejectedFiles: Array<any>
  ) => {
    // console.log('accepted files: ', acceptedFiles)
    // console.log('rejected files: ', rejectedFiles)
    files.forEach((file) => {
      const newFile = new File([file], uniqueFilename(file.name), {
        type: file.type
      })
      // Add image preview urls.
      setDroppedFiles((prevDroppedFiles) => [
        ...prevDroppedFiles,
        {
          name: newFile.name,
          type: newFile.type,
          size: newFile.size,
          originalName: file.name,
          lastModified: newFile.lastModified,
          previewUrl: URL.createObjectURL(newFile),
          ext: extension(newFile.name)
        }
      ])
      // Upload dropped files.
      uploadFileHandler(newFile)
    })
  }, [])

  const clearUploadsHandler = useCallback(() => {
    setShowConfirmClearUploads(false) // Hide dialog.
    setUploadedFiles([])
    // Resetting dropped files is required for removing thumbs previews.
    setDroppedFiles([])
  }, [])

  const tryRemoveUploadHandler = useCallback((file: DroppedFile) => {
    setConfirmRemoveUpload(file)
  }, [])

  const removeUploadHandler = useCallback(() => {
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
  }, [confirmRemoveUpload, uploadedFiles, droppedFiles])

  const uploadFileHandler = useCallback(
    async (file) => {
      try {
        const response = await uploadFile(file, uploadFolder)
        if (response) {
          // Destructuring File objects doesn't produce any properties. Need to specify those 4 explicitly.
          const uploadedFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            originalName: file.name.substring(12), // File prefix is 10 random characters + 2 underscores.
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
    },
    [uploadFolder]
  )

  /*
   * rejectedFiles doesn't contain all the rejected files. Just the files rejected since
   * last onRejected called.
   */
  const rejectHandler = useCallback((files: Array<DroppedFile>) => {
    setRejectedFiles([...files])
  }, [])

  const uploadRejectCloseHandler = useCallback(() => {
    setRejectedFiles([])
  }, [])

  // onFileDialogCancel property handler doesn't fire correctly in Firefox. Will avoid using this for now.
  // const cancelHandler = () => {
  //   alert('Canceling...')
  //   setFiles([])
  // }
  // const fileList = droppedFiles.map((file) => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //   </li>
  // ))

  const showClearUploadsButton = Boolean(
    allowClearUploads && uploadedFiles.length >= 2
  )
  const showConfirmRemoveUpload = Boolean(confirmRemoveUpload)
  const showRejectedFilesDialog = Boolean(rejectedFiles.length > 0)
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: dropHandler,
    onDropRejected: rejectHandler,
    ...rest
  })
  // <PageLayout title="Irrigation Canal Information">
  return (
    <React.Fragment>
      <div className={classes.root} style={{width: width}}>
        {/* Mime types are also checked on the back-end. */}
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
                {disabled ? (
                  <CloudDoneIcon fontSize="large" color="disabled" />
                ) : (
                  <CloudUploadIcon fontSize="large" color="action" />
                )}
                <Type
                  variant="h4"
                  className={classNames(classes.dropzoneTitle, {
                    [classes.disabled]: disabled
                  })}
                >
                  Drag & drop
                </Type>
                <Type
                  variant="subtitle1"
                  className={classNames(classes.dropzoneSubTitle, {
                    [classes.disabled]: disabled
                  })}
                >
                  {disabled
                    ? 'uploading has been disabled'
                    : 'your file(s) here or click to browse'}
                </Type>
              </React.Fragment>
            )}
          </div>
        </div>
        <aside className={classes.thumbsContainer}>
          <ThumbPreviews
            uploadedFiles={uploadedFiles}
            droppedFiles={droppedFiles}
            onRemoveUpload={tryRemoveUploadHandler}
          />
        </aside>
        {/* <aside className={classes.thumbsContainer}>
          <ThumbPreviewList
            uploadedFiles={uploadedFiles}
            droppedFiles={droppedFiles}
            onRemoveUpload={tryRemoveUploadHandler}
          />
        </aside> */}
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
        maxSize={maxSize}
      />
    </React.Fragment>
  )
}
/* </PageLayout> */

export default withStyles(styles)(DropzoneUploader)

DropzoneUploader.defaultProps = {
  height: 'unset',
  width: 'unset',
  allowClearUploads: false,
  uploadFolder: ''
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
  originalName?: string,
  ext?: string
}

// Marking ext and previewUrl as maybe null helps with prop type checking in <UploadRejectedDialog/>.
export type DroppedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  originalName?: string,
  ext: ?string,
  previewUrl: ?string
}

function uniqueFilename(fileName: string) {
  const fileNamePrefix = `${nanoid(10)}__`
  return `${fileNamePrefix}${fileName}`
}

function responseTempUrl(response: any) {
  return response.status && response.status.toLowerCase() === 'success'
    ? `${UPLOAD_SERVICE_BASE_URL}/${response.fileName}?folder=${
        response.fieldName
      }`
    : ''
}
