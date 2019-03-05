// @flow
import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography as Type
} from '@material-ui/core'
import {
  uploadFile,
  UPLOAD_SERVICE_BASE_URL
} from '../../lib/services/uploadService'
import {Document, Page} from 'react-pdf'
import UploadStatusIndicator from './UploadStatusIndicator'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveUploadFab from './RemoveUploadFab'
import Slide from '@material-ui/core/Slide'
import nanoid from 'nanoid'
import {type UploadResponse} from '../../lib/services/uploadService'

type Props = {
  classes: any,
  onUploaded?: (files: any) => void,
  onClearUploads?: () => void,
  height: number | string
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
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    // border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    width: '100%',
    '& img': {
      display: 'block',
      width: '100%',
      objectFit: 'cover'
      // height: '100%'
    }
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
  onClearUploads,
  height
}: Props) => {
  const [droppedFiles, setDroppedFiles] = useState<Array<DroppedFile>>([])
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>([])
  const [thumbHover, setThumbHover] = useState<string | null>(null)
  const [
    confirmRemoveUpload,
    setConfirmRemoveUpload
  ] = useState<DroppedFile | null>(null)

  // const confirmRemoveUploadHandler = () => {
  // setConfirmRemoveUpload(true)
  // }

  const clearUploadsHandler = () => {
    setUploadedFiles([])
    // Resetting dropped files is required for removing thumbs previews.
    setDroppedFiles([])
    onClearUploads && onClearUploads()
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
        onUploaded && onUploaded({...uploadedFile})
      }
    } catch (error) {
      console.log(error)
    }
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

  const thumbs = droppedFiles.map((file) => {
    return (
      <div className={classes.thumb} key={file.name}>
        <UploadStatusIndicator uploadedFiles={uploadedFiles} file={file}>
          <div
            className={classes.thumbInner}
            onMouseEnter={() => setThumbHover(file.name)}
            onMouseLeave={() => setThumbHover(null)}
          >
            {file.ext === 'pdf' ? (
              // <img src="/static/images/pdf.svg" />
              <Document file={file.previewUrl}>
                {/* Since Border-box sizing is used width needs to be calculated. */}
                <Page pageNumber={1} width={110} scale={1} />
              </Document>
            ) : (
              <img src={file.previewUrl} />
            )}
          </div>
        </UploadStatusIndicator>
        <div style={{zIndex: 11, position: 'absolute'}}>
          <RemoveUploadFab
            thumbName={file.name}
            thumbHover={thumbHover}
            onRemove={() => tryRemoveUploadHandler(file)}
          />
        </div>
      </div>
    )
  })

  const showClearUploadsButton = Boolean(
    uploadedFiles.length > 0 && onClearUploads
  )
  const showConfirmRemoveUpload = Boolean(confirmRemoveUpload)
  // <PageLayout title="Irrigation Canal Information">
  return (
    <div>
      <div className={classes.dropzoneContainer}>
        {/* Mime types are also checked on the back-end. */}
        <Dropzone onDrop={dropHandler} accept="image/*, application/pdf">
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
        <aside className={classes.thumbsContainer}>{thumbs}</aside>
        {showClearUploadsButton ? (
          <div className={classes.clearUploadsContainer}>
            <Button
              variant="outlined"
              fullWidth={true}
              className={classes.clearUploadsButton}
              onClick={clearUploadsHandler}
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
      <Dialog
        open={showConfirmRemoveUpload}
        onClose={() => setConfirmRemoveUpload(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this upload?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemoveUpload(null)}>Cancel</Button>
          <Button onClick={removeUploadHandler}>Remove</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
/* </PageLayout> */

export default withStyles(styles)(DropzoneUploader)

DropzoneUploader.defaultProps = {
  height: '100%'
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

function Transition(props) {
  return <Slide direction="up" {...props} />
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

export type DroppedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  previewUrl: string,
  ext: string
}
