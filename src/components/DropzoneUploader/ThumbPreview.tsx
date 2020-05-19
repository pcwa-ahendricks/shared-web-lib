// cspell:ignore supportsTouch
import React, {useState, useCallback} from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles'
import {Box, Button, Tooltip, Theme} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import {DroppedFile, UploadedFileAttr} from './types'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import {Document, Page} from 'react-pdf'
import useUploadStatus from './useUploadStatus'
import {UploadStatus} from '@lib/services/uploadService'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import useSupportsTouch from '@hooks/useSupportsTouch'

type Props = {
  file: DroppedFile
  isUploading?: boolean
  onClick: (file: DroppedFile) => void
  onRemoveUpload?: (file: DroppedFile) => void
  uploadedFiles?: UploadedFileAttr[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    buttonLabel: ({uploadStatus}: {uploadStatus?: UploadStatus}) => ({
      color:
        uploadStatus === 'success'
          ? theme.palette.error.main
          : uploadStatus === 'unknown'
          ? theme.palette.text.disabled
          : theme.palette.text.primary
    }),
    thumb: {
      display: 'inline-flex',
      borderRadius: 2,
      // border: '1px solid #eaeaea',
      width: 150,
      height: 150,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
      padding: 4,
      boxSizing: 'border-box',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 1,
        width: 100,
        height: 100,
        marginBottom: 4,
        marginRight: 4,
        padding: 2
      }
    },
    thumbInner: {
      display: 'flex',
      cursor: 'pointer',
      minWidth: 0,
      overflow: 'hidden',
      width: '100%'
    },
    // fileNameOverlay: {
    //   position: 'absolute',
    //   zIndex: 11,
    //   color: theme.palette.common.white,
    //   wordWrap: 'anywhere',
    //   padding: 2,
    //   fontSize: '0.65rem'
    // },
    removeUploadFabContainer: {
      position: 'absolute',
      zIndex: 12
    },
    thumbImg: {
      display: 'block',
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'center top' // Required for use w/ Safari.
    }
  })
)

const ThumbPreview = ({
  uploadedFiles = [],
  onRemoveUpload,
  file,
  onClick,
  isUploading = false
}: Props) => {
  // const [uploadSuccess, setUploadSuccess] = useState<boolean>()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const [thumbHover, setThumbHover] = useState<string | null>()
  const supportsTouch = useSupportsTouch()

  const uploadStatus = useUploadStatus(uploadedFiles, file)
  const classes = useStyles({uploadStatus})
  const isLoading = uploadStatus === 'unknown'

  const clickHandler = useCallback(
    (file: DroppedFile) => () => {
      onClick(file)
    },
    [onClick]
  )

  const removeUploadHandler = useCallback(
    (file: DroppedFile) => () => {
      onRemoveUpload && onRemoveUpload(file)
    },
    [onRemoveUpload]
  )

  const uploadSuccessHandler = useCallback(() => {
    // setUploadSuccess(true)
  }, [])

  // Just show Remove Upload Button on Mobile Devices since the Fab on hover will likely be impossible to click.
  const RemoveUploadButton = useCallback(
    () =>
      supportsTouch ? (
        <Box flexGrow={0}>
          <Button
            size="small"
            aria-label="Remove Upload"
            onClick={removeUploadHandler(file)}
            disabled={isLoading}
            classes={{label: classes.buttonLabel}}
          >
            {uploadStatus === 'failed'
              ? 'Remove Failed Upload'
              : 'Remove Upload'}
            <DeleteIcon className={classes.rightIcon} color="inherit" />
          </Button>
        </Box>
      ) : null,
    [classes, file, uploadStatus, supportsTouch, removeUploadHandler, isLoading]
  )

  return (
    <Box
      display="flex"
      flexDirection="column"
      // Placing onMouseLeave here will prevent <RemoveUploadButton/> from disappearing before it can be selected.
      onMouseLeave={() => setThumbHover(null)}
    >
      <Box flexGrow={0} className={classes.thumb}>
        <UploadStatusIndicator
          uploadedFiles={uploadedFiles}
          file={file}
          onSuccess={uploadSuccessHandler}
          isUploading={isUploading}
        >
          <Tooltip title={file.originalName ?? ''} enterDelay={500}>
            <div
              className={classes.thumbInner}
              onMouseEnter={() => setThumbHover(file.name)}
              onClick={clickHandler(file)}
            >
              {file.ext === 'pdf' ? (
                // <img src="/static/images/pdf.svg" />
                <Document file={file.previewUrl}>
                  {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
                  <Page pageNumber={1} width={isXS ? 64 : 110} scale={1} />
                </Document>
              ) : (
                // Using data-src="..." as a fallback shouldn't be necessary with IE11 if polyfill is used. See https://github.com/aFarkas/lazysizes/blob/gh-pages/README.md#responsive-image-support-picture-andor-srcset for more info.
                <img
                  data-sizes="auto"
                  src="/static/images/placeholder-camera.png"
                  srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  data-srcset={file.previewUrl}
                  className={clsx(['lazyload', classes.thumbImg])}
                  alt={`Thumbnail for ${file.name} upload`}
                />
              )}
            </div>
          </Tooltip>
          {/* <div className={classes.fileNameOverlay}>
              <Type color="inherit" variant="caption">
                {file.name}
              </Type>
            </div> */}
        </UploadStatusIndicator>
        <div className={classes.removeUploadFabContainer}>
          <RemoveUploadFab
            thumbName={file.name}
            thumbHover={thumbHover}
            onRemove={removeUploadHandler(file)}
            disabled={isLoading}
          />
        </div>
      </Box>

      <RemoveUploadButton />
    </Box>
  )
}

export default ThumbPreview