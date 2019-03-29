// @flow
// use of forwardRef doesn't support PropTypes or defaultProps.
'no babel-plugin-flow-react-proptypes'
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography as Type} from '@material-ui/core'
import {uploadFile} from '@lib/services/uploadService'
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined'
import CloudDoneIcon from '@material-ui/icons/CloudDoneOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import nanoid from 'nanoid'
import ConfirmRemoveUploadDialog from './ConfirmRemoveUploadDialog'
import ConfirmClearUploadsDialog from './ConfirmClearUploadsDialog'
import UploadRejectedDialog from './UploadRejectedDialog'
import ThumbPreviews from './ThumbPreviews'
import {useDropzone} from 'react-dropzone'
import Jimp from 'jimp'
import {type DroppedFile, type UploadedFile} from './types'

type Props = {
  classes: any,
  onUploadedChange?: (files: any) => void,
  height: number | string,
  width: number | string,
  allowClearUploads: boolean,
  uploadFolder: string,
  maxSize: number,
  disabled: boolean,
  accept: string,
  subtitle: string
}

const WIDTH_THRESHOLD = 1600

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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  disabled: {}
})

// use of forwardRef doesn't support PropTypes or defaultProps.
const DropzoneUploader = (
  {
    classes,
    onUploadedChange,
    // $FlowFixMe
    height = 'unset',
    // $FlowFixMe
    width = 'unset',
    allowClearUploads = false,
    uploadFolder = '',
    maxSize,
    accept,
    disabled,
    subtitle = 'your file(s) here or click to browse',
    ...rest
  }: Props,
  ref
) => {
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
    onUploadedChange && onUploadedChange(uploadedFiles)
  }, [uploadedFiles, onUploadedChange])

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

  const resizeHandler = useCallback((file, fileNamePrefix) => {
    const promise = new Promise<File>((resolve) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        try {
          const imgArrBuff = reader.result
          const resizedImgBuff =
            imgArrBuff instanceof ArrayBuffer
              ? await resizeImage(imgArrBuff, file.type)
              : null
          const resizedFile = new File(
            [resizedImgBuff || file],
            `${fileNamePrefix}${file.name}`,
            {
              type: file.type
            }
          )
          // Upload resized dropped files.
          resolve(resizedFile)
        } catch (error) {
          // Upload original file on error.
          console.log(error)
          const origFile = new File([file], `${fileNamePrefix}${file.name}`, {
            type: file.type
          })
          resolve(origFile)
        }
      }

      // reader.readAsBinaryString(file)
      reader.readAsArrayBuffer(file)
    })
    return promise
  }, [])

  const dropHandler = useCallback(
    (
      files: Array<any>
      // rejectedFiles: Array<any>
    ) => {
      const fileNamePrefix = nanoid(10)
      // console.log('accepted files: ', acceptedFiles)
      // console.log('rejected files: ', rejectedFiles)
      const sd = [...files]
      sd.forEach((file) => {
        const newFile = new File([file], `${fileNamePrefix}${file.name}`, {
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
      })
      const uf = [...files]
      uf.forEach(async (file) => {
        const resizedFile = await resizeHandler(file, fileNamePrefix)
        uploadFileHandler(resizedFile)
      })
    },
    [uploadFileHandler, resizeHandler]
  )

  const clearUploadsHandler = useCallback(() => {
    setShowConfirmClearUploads(false) // Hide dialog.
    setUploadedFiles([])
    // Resetting dropped files is required for removing thumbs previews.
    setDroppedFiles([])
  }, [])

  // clearUploads method is used by <AttachmentField/> for form resets.
  useImperativeHandle(
    ref,
    () => ({
      clearUploads: () => clearUploadsHandler()
    }),
    [clearUploadsHandler]
  )

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

  const showClearUploadsButton = Boolean(
    allowClearUploads && uploadedFiles.length >= 2
  )
  const showConfirmRemoveUpload = Boolean(confirmRemoveUpload)
  const showRejectedFilesDialog = Boolean(rejectedFiles.length > 0)
  // /* Mime types are also checked on the back-end. */
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: dropHandler,
    onDropRejected: rejectHandler,
    accept,
    maxSize,
    disabled,
    ...rest
  })
  // <PageLayout title="Irrigation Canal Information">
  return (
    <div>
      <div className={classes.root} style={{width: width}}>
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
                  variant="h3"
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
                  {disabled ? 'uploading has been disabled' : subtitle}
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
        // maxSize={maxSize}
      />
    </div>
  )
}
/* </PageLayout> */

export default withStyles(styles)(forwardRef(DropzoneUploader))

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
const supportedJimpTypes = [
  Jimp.MIME_BMP,
  Jimp.MIME_GIF,
  Jimp.MIME_JGD,
  Jimp.MIME_JPEG,
  Jimp.MIME_PNG,
  Jimp.MIME_TIFF,
  Jimp.MIME_X_MS_BMP
]

async function resizeImage(
  imageBuffer: ArrayBuffer,
  mimeType: string
): Promise<ArrayBuffer | Buffer> {
  try {
    const image = await getImage(imageBuffer, mimeType)
    const newImageBuffer = await image
      .resize(WIDTH_THRESHOLD, Jimp.AUTO)
      .getBufferAsync(Jimp.AUTO)
    return newImageBuffer
  } catch (error) {
    // Just abort processing all-together if image can't be read. Original (un-processed) image will be used.
    console.log('Uploading original attachment: ', error)
    return imageBuffer
  }
}

async function getImage(imageBuffer: ArrayBuffer, mimeType: string) {
  try {
    // Only resize images Jimp can load.
    if (
      supportedJimpTypes.findIndex(
        (supportedType) => supportedType === mimeType
      ) <= 0
    ) {
      throw `File type ${mimeType} not supported by Jimp.`
    }
    const image = await Jimp.read(imageBuffer)
    const width = image.getWidth()
    // Don't resize image if it's already smaller than the target dimension we are resizing to.
    if (width <= WIDTH_THRESHOLD) {
      throw 'Image resize not necessary'
    }
    return image
  } catch (error) {
    throw error
  }
}
