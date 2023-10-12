import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo
} from 'react'
import {Box, Button, Typography as Type, useTheme} from '@mui/material'
import {uploadFile} from '@lib/services/uploadService'
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined'
import CloudDoneIcon from '@mui/icons-material/CloudDoneOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import {generate} from 'shortid'
import ConfirmRemoveUploadDialog from './ConfirmRemoveUploadDialog'
import ConfirmClearUploadsDialog from './ConfirmClearUploadsDialog'
import UploadRejectedDialog from './UploadRejectedDialog'
import ThumbPreviews from './ThumbPreviews'
import {useDropzone, DropzoneOptions, FileRejection} from 'react-dropzone'
import {DroppedFile, UploadedFileAttr} from './types'
import extension from '@lib/fileExtension'
import {sequenceArray} from '@lib/util'
import slugify from 'slugify'
import {Theme} from '@lib/material-theme'

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

const DropzoneUploader: React.ForwardRefRenderFunction<
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
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([])
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([])
  const [uploadDroppedFiles, setUploadDroppedFiles] = useState<DroppedFile[]>()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileAttr[]>([])
  const [confirmRemoveUpload, setConfirmRemoveUpload] =
    useState<DroppedFile | null>(null)
  const [showConfirmClearUploads, setShowConfirmClearUploads] =
    useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploadingFileNames, setIsUploadingFileNames] = useState<string[]>([])

  useEffect(() => {
    onUploadedChange && onUploadedChange(uploadedFiles)
  }, [uploadedFiles, onUploadedChange])

  useEffect(() => {
    onIsUploadingChange && onIsUploadingChange(isUploading)
  }, [isUploading, onIsUploadingChange])

  const theme = useTheme<Theme>()

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

  const dropHandler: DropzoneOptions['onDrop'] = useCallback(
    (
      acceptedFiles: File[]
      // rejectedFiles: Array<any>
    ) => {
      const fileNamePrefix = slugify(generate())
      // console.log('accepted files: ', acceptedFiles)
      // console.log('rejected files: ', rejectedFiles)
      const sd = [...acceptedFiles]
      const newDroppedBlobFiles: DroppedFile[] = sd.map((file) => {
        // Use slugify to remove any unusual characters from the filename making the Cosmic URL compatible in all cases.
        const fileName = slugify(file.name)
        const newBlobFile: Partial<DroppedFile> = new Blob([file], {
          type: file.type
        })
        newBlobFile.lastModified = file.lastModified
        // no need to separate with an underscore since an underscore might be generated via generate()
        newBlobFile.name = `${fileNamePrefix}${fileName}` ?? ''
        newBlobFile.originalName = file.name
        // Add image preview urls.
        // [TODO] - Confirm this works in IE 11 and remove eslint comment
        newBlobFile.previewUrl = URL.createObjectURL(newBlobFile as any)
        newBlobFile.ext = extension(newBlobFile.name)
        return newBlobFile as DroppedFile
      })

      setDroppedFiles((prevDroppedBlobFiles) => [
        ...prevDroppedBlobFiles,
        ...newDroppedBlobFiles
      ])

      // Setting upload dropped files to original dropped File objects.
      setUploadDroppedFiles(newDroppedBlobFiles)
    },
    []
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
  const rejectHandler: DropzoneOptions['onDropRejected'] = useCallback(
    (fileRejections: FileRejection[]) => {
      setRejectedFiles([...fileRejections])
    },
    []
  )

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

  const style = useMemo(
    () => ({
      dropzone: {
        padding: 3,
        backgroundColor: '#eee',
        borderRadius: '10px',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'grey',
        ...(isDragActive && {
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: theme.palette.primary.light
        })
      },
      thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 2
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
        ...(disabled && {
          color: theme.palette.text.disabled
        })
      },
      dropzoneSubTitle: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...(disabled && {
          color: theme.palette.text.disabled
        })
      }
    }),
    [theme, disabled, isDragActive]
  )

  // <PageLayout title="Irrigation Canal Information">
  return (
    <div>
      <Box
        sx={{
          width
        }}
      >
        <Box
          {...getRootProps()}
          className={`${isDragActive ? 'isActive' : ''}`}
          sx={{
            ...style.dropzone,
            height
          }}
        >
          <input type="text" {...getInputProps()} />
          <Box sx={{...style.captionContainer}}>
            {isDragActive ? (
              <Type variant="h4" sx={{...style.primaryLight}}>
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
                  sx={{
                    ...style.dropzoneTitle
                  }}
                >
                  Drag & drop
                </Type>
                <Type
                  variant="subtitle1"
                  sx={{
                    ...style.dropzoneSubTitle
                  }}
                >
                  {disabled ? 'uploading has been disabled' : subtitle}
                </Type>
              </>
            )}
          </Box>
        </Box>
        <Box component="aside" sx={{...style.thumbsContainer}}>
          <ThumbPreviews
            isUploading={isUploading}
            isUploadingFileNames={isUploadingFileNames}
            uploadedFiles={uploadedFiles}
            droppedFiles={droppedFiles}
            onRemoveUpload={tryRemoveUploadHandler}
          />
        </Box>
        {/* <aside className={classes.thumbsContainer}>
          <ThumbPreviewList
            uploadedFiles={uploadedFiles}
            droppedFiles={droppedFiles}
            onRemoveUpload={tryRemoveUploadHandler}
          />
        </aside> */}
        {showClearUploadsButton ? (
          <Box
            sx={{
              ...style.clearUploadsContainer
            }}
          >
            <Button
              variant="outlined"
              fullWidth={true}
              sx={{
                ...style.clearUploadsButton
              }}
              onClick={() => setShowConfirmClearUploads(true)}
              size="small"
            >
              Clear Uploads
              <DeleteIcon
                sx={{
                  ...style.leftIcon
                }}
              />
            </Button>
          </Box>
        ) : null}
      </Box>
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
