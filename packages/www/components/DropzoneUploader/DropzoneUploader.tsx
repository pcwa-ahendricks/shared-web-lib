import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import clsx from 'clsx'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {Button, Typography as Type, Theme} from '@material-ui/core'
import {uploadFile} from '@lib/services/uploadService'
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined'
import CloudDoneIcon from '@material-ui/icons/CloudDoneOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import {generate} from 'shortid'
import ConfirmRemoveUploadDialog from './ConfirmRemoveUploadDialog'
import ConfirmClearUploadsDialog from './ConfirmClearUploadsDialog'
import UploadRejectedDialog from './UploadRejectedDialog'
import ThumbPreviews from './ThumbPreviews'
import {useDropzone} from 'react-dropzone'
import {DroppedFile, UploadedFileAttr} from './types'
import extension from '@lib/fileExtension'
import {sequenceArray} from '@lib/util'
import slugify from 'slugify'

type Props = {
  onUploadedChange?: (files: any) => void
  onIsUploadingChange?: (isUploading: boolean) => void
  height: number | string
  width: number | string
  uploadRoute: string
  maxSize: number
  disabled: boolean
  accept: string
  subtitle: string
  allowClearUploads?: boolean
}

export interface DropzoneUploaderHandles {
  clearUploads(): void
}

const IMG_PX_THRESHOLD = 1600

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    dropzone: {
      padding: 20,
      backgroundColor: '#eee',
      borderRadius: 10,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: 'grey',
      '&$isActive': {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: theme.palette.primary.light
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
      marginLeft: theme.spacing(1)
    },
    clearUploadsButton: {
      // margin & width: 100% won't play well together. Using padding w/ container instead.
      // margin: theme.spacing( 1)
      color: theme.palette.error.main
    },
    clearUploadsContainer: {
      padding: theme.spacing(2)
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
)

const DropzoneUploader: React.RefForwardingComponent<
  DropzoneUploaderHandles,
  Props
> = (
  {
    onUploadedChange,
    onIsUploadingChange,
    height = '100%',
    width = '100%',
    allowClearUploads = false,
    uploadRoute = '',
    maxSize,
    accept,
    disabled,
    subtitle = 'your file(s) here or click to browse',
    ...rest
  },
  ref
) => {
  const classes = useStyles()
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([])
  const [rejectedFiles, setRejectedFiles] = useState<DroppedFile[]>([])
  const [uploadDroppedFiles, setUploadDroppedFiles] = useState<DroppedFile[]>()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileAttr[]>([])
  const [
    confirmRemoveUpload,
    setConfirmRemoveUpload
  ] = useState<DroppedFile | null>(null)
  const [showConfirmClearUploads, setShowConfirmClearUploads] = useState<
    boolean
  >(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploadingFileNames, setIsUploadingFileNames] = useState<string[]>([])

  useEffect(() => {
    onUploadedChange && onUploadedChange(uploadedFiles)
  }, [uploadedFiles, onUploadedChange])

  useEffect(() => {
    onIsUploadingChange && onIsUploadingChange(isUploading)
  }, [isUploading, onIsUploadingChange])

  const resizeHandler = useCallback((file: DroppedFile) => {
    const promise = new Promise<DroppedFile>((resolve) => {
      // new File() constructor doesn't work in IE11 or Edge. See https://developer.mozilla.org/en-US/docs/Web/API/File/File for more info.
      // const origFile = new File([file], renamedFileName, {
      //   type: file.type
      // })
      const origFile: Partial<DroppedFile> = new Blob([file], {type: file.type})
      origFile.name = file.name
      origFile.ext = file.ext
      origFile.lastModified = file.lastModified
      origFile.originalName = file.originalName

      // Only resolve origFile after it gets assign the 'name' property above.
      // Don't attempt to resize a pdf. Just images.
      if (!/image\//i.test(file.type)) {
        resolve(origFile as DroppedFile)
        return
      }

      const reader = new FileReader()
      reader.onabort = () => {
        // console.log('reading aborted')
        // reject('file reading was aborted')
        resolve(origFile as DroppedFile)
      }
      reader.onerror = () => {
        // console.log('reading error')
        // reject('file reading has failed')
        resolve(origFile as DroppedFile)
      }
      reader.onload = () => {
        const img = new Image()
        img.src = typeof reader.result === 'string' ? reader.result : ''
        img.onload = () => {
          const elem = document.createElement('canvas')
          let resizeHeight: number
          let resizeWidth: number
          if (img.width > IMG_PX_THRESHOLD) {
            resizeWidth = IMG_PX_THRESHOLD
            const scaleFactor = IMG_PX_THRESHOLD / img.width
            resizeHeight = img.height * scaleFactor
          } else if (img.height > IMG_PX_THRESHOLD) {
            resizeHeight = IMG_PX_THRESHOLD
            const scaleFactor = IMG_PX_THRESHOLD / img.height
            resizeWidth = img.width * scaleFactor
          } else {
            resizeHeight = img.height
            resizeWidth = img.width
          }
          // Follow up in case the image width was larger than the threshold and the height was A LOT larger than the height (Hi-Res portrait images).
          if (resizeHeight > IMG_PX_THRESHOLD) {
            resizeHeight = IMG_PX_THRESHOLD
            const scaleFactor = IMG_PX_THRESHOLD / img.height
            resizeWidth = img.width * scaleFactor
          }
          elem.width = resizeWidth
          elem.height = resizeHeight
          const ctx = elem.getContext('2d')
          if (!ctx) {
            resolve(origFile as DroppedFile)
            return
          }
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight)
          ctx.canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(origFile as DroppedFile)
                return
              }
              // const canvasFile = new File([blob], renamedFileName, {
              //   type: file.type
              //   // lastModified: Date.now()
              // })
              const canvasFile: Partial<DroppedFile> = new Blob([blob], {
                type: file.type
              })
              canvasFile.lastModified = file.lastModified
              canvasFile.name = file.name
              canvasFile.originalName = file.name
              canvasFile.previewUrl = file.previewUrl
              canvasFile.ext = file.previewUrl
              resolve(canvasFile as DroppedFile)
            },
            file.type,
            1
          )
        }
      }

      // reader.readAsArrayBuffer(file)
      reader.readAsDataURL(file)
    })
    return promise
  }, [])

  const uploadFileHandler = useCallback(
    async (file: DroppedFile) => {
      try {
        const response = await uploadFile(file, uploadRoute)
        if (response) {
          // Destructuring File objects doesn't produce any properties. Need to specify those 4 explicitly.
          const uploadedFile: UploadedFileAttr = {
            name: file.name,
            type: file.type,
            size: file.size,
            originalName: file.originalName,
            previewUrl: file.previewUrl,
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
    [uploadRoute]
  )

  const removeIsUploadingFiles = useCallback((fileName: string) => {
    setIsUploadingFileNames((values) => [
      ...values.slice(0, values.indexOf(fileName)),
      ...values.slice(values.indexOf(fileName) + 1)
    ])
  }, [])

  useEffect(() => {
    const asyncFn = async () => {
      try {
        if (!uploadDroppedFiles) {
          return
        }
        setIsUploading(true)
        setIsUploadingFileNames((values) => [
          ...values,
          ...uploadDroppedFiles.map((file) => file.name)
        ])
        // These are the original File objects.
        const processFileUpload = async (file: DroppedFile) => {
          const fileName = file.name
          try {
            const resizedFile = await resizeHandler(file)
            const uploadedFile = await uploadFileHandler(resizedFile)
            removeIsUploadingFiles(fileName)
            return uploadedFile
          } catch (error) {
            console.log('error', error)
            removeIsUploadingFiles(fileName)
            return
          }
        }
        await sequenceArray(uploadDroppedFiles, processFileUpload)
        setIsUploading(false)
        // setIsUploadingFileNames([])
      } catch (error) {
        setIsUploading(false)
        // setIsUploadingFileNames([])
      }
    }

    asyncFn()
    return () => {}
  }, [
    uploadDroppedFiles,
    resizeHandler,
    uploadFileHandler,
    removeIsUploadingFiles
  ])

  const dropHandler = useCallback((
    files: File[]
    // rejectedFiles: Array<any>
  ) => {
    const fileNamePrefix = slugify(generate())
    // console.log('accepted files: ', acceptedFiles)
    // console.log('rejected files: ', rejectedFiles)
    const sd = [...files]
    const newDroppedBlobFiles: DroppedFile[] = sd.map((file) => {
      const newBlobFile: Partial<DroppedFile> = new Blob([file], {
        type: file.type
      })
      // Use slugify to remove any unusual characters from the filename making the Cosmic URL compatible in all cases.
      const fileName = slugify(file.name)
      newBlobFile.lastModified = file.lastModified
      newBlobFile.name = `${fileNamePrefix}${fileName}` ?? ''
      newBlobFile.originalName = file.name
      // Add image preview urls.
      newBlobFile.previewUrl = URL.createObjectURL(newBlobFile)
      newBlobFile.ext = extension(newBlobFile.name)
      return newBlobFile as DroppedFile
    })

    setDroppedFiles((prevDroppedBlobFiles) => [
      ...prevDroppedBlobFiles,
      ...newDroppedBlobFiles
    ])

    // Setting upload dropped files to original dropped File objects.
    setUploadDroppedFiles(newDroppedBlobFiles)
  }, [])

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
  const rejectHandler = useCallback((files: any[]) => {
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
          className={clsx(classes.dropzone, {
            [classes.isActive]: isDragActive
          })}
          style={{height: height}}
        >
          <input type="text" {...getInputProps()} />
          <div className={classes.captionContainer}>
            {isDragActive ? (
              <Type variant="h4" className={classes.primaryLight}>
                Drop files here...
              </Type>
            ) : (
              <>
                {disabled ? (
                  <CloudDoneIcon fontSize="large" color="disabled" />
                ) : (
                  <CloudUploadIcon fontSize="large" color="action" />
                )}
                <Type
                  variant="h3"
                  className={clsx(classes.dropzoneTitle, {
                    [classes.disabled]: disabled
                  })}
                >
                  Drag & drop
                </Type>
                <Type
                  variant="subtitle1"
                  className={clsx(classes.dropzoneSubTitle, {
                    [classes.disabled]: disabled
                  })}
                >
                  {disabled ? 'uploading has been disabled' : subtitle}
                </Type>
              </>
            )}
          </div>
        </div>
        <aside className={classes.thumbsContainer}>
          <ThumbPreviews
            isUploading={isUploading}
            isUploadingFileNames={isUploadingFileNames}
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

// use of forwardRef doesn't support propTypes or defaultProps. babel-plugin-typescript-to-proptypes package is adding them for us automatically. Remove them here to prevent a console warning.
delete DropzoneUploader['propTypes']
export default forwardRef(DropzoneUploader)
