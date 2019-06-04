// cspell:ignore touchevents
import React, {useState, useCallback, useMemo} from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
import {Box, Button, Tooltip, Theme} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import {DroppedFile, UploadedFile} from './types'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import {Document, Page} from 'react-pdf'
import clsx from 'clsx'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useModernizr from '@hooks/useModernizr'
import useUploadStatus from './useUploadStatus'

type Props = {
  file: DroppedFile
  onClick: (file: DroppedFile) => void
  onRemoveUpload?: (file: DroppedFile) => void
  uploadedFiles?: UploadedFile[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    buttonLabel: ({uploadSuccess}: {uploadSuccess?: boolean}) => ({
      color: uploadSuccess
        ? theme.palette.error.main
        : theme.palette.text.disabled
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
      '&$xs': {
        borderRadius: 1,
        width: 100,
        height: 100,
        marginBottom: 4,
        marginRight: 4,
        padding: 2
      }
    },
    xs: {},
    thumbInner: {
      display: 'flex',
      cursor: 'pointer',
      minWidth: 0,
      overflow: 'hidden',
      width: '100%',
      '& img': {
        display: 'block',
        width: '100%',
        objectFit: 'contain'
        // height: '100%'
      }
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
    }
  })
)

const ThumbPreview = ({
  uploadedFiles = [],
  onRemoveUpload,
  file,
  onClick
}: Props) => {
  const [uploadSuccess, setUploadSuccess] = useState<boolean>()
  const classes = useStyles({uploadSuccess})
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const [thumbHover, setThumbHover] = useState<string | null>()
  const {touchevents} = useModernizr()

  const uploadStatus = useUploadStatus(uploadedFiles, file)
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
    setUploadSuccess(true)
  }, [])

  // Just show Remove Upload Button on Mobile Devices since the Fab on hover will likely be impossible to click.
  const removeUploadButtonEl = useMemo(
    () =>
      touchevents ? (
        <Box flexGrow={0}>
          <Button
            size="small"
            aria-label="Remove Upload"
            onClick={removeUploadHandler(file)}
            disabled={isLoading}
            classes={{label: classes.buttonLabel}}
          >
            Remove Upload
            <DeleteIcon className={classes.rightIcon} color="inherit" />
          </Button>
        </Box>
      ) : null,

    [classes, file, uploadSuccess, touchevents, removeUploadHandler]
  )

  return (
    <Box display="flex" flexDirection="column">
      <Box
        flexGrow={0}
        className={clsx(classes.thumb, {
          [classes.xs]: isXS
        })}
      >
        <UploadStatusIndicator
          uploadedFiles={uploadedFiles}
          file={file}
          onSuccess={uploadSuccessHandler}
        >
          <Tooltip title={file.originalName} enterDelay={500}>
            <div
              className={classes.thumbInner}
              onMouseEnter={() => setThumbHover(file.name)}
              onMouseLeave={() => setThumbHover(null)}
              onClick={clickHandler(file)}
            >
              {file.ext === 'pdf' ? (
                // <img src="/static/images/pdf.svg" />
                <Document file={file.previewUrl}>
                  {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
                  <Page pageNumber={1} width={isXS ? 64 : 110} scale={1} />
                </Document>
              ) : (
                <img
                  data-sizes="auto"
                  src="/static/images/placeholder-camera.png"
                  data-srcset={file.previewUrl}
                  className="lazyload"
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

      {removeUploadButtonEl}
    </Box>
  )
}

export default ThumbPreview
