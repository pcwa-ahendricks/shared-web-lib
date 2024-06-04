// cspell:ignore supportsTouch
import React, {useState, useCallback, useMemo} from 'react'
import {Box, Button, Tooltip, useTheme, Typography as Type} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded'
import {DroppedFile, UploadedFileAttr} from './types'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import useUploadStatus from './useUploadStatus'
import useSupportsTouch from '@hooks/useSupportsTouch'
import {ColumnBox} from '@components/MuiSleazebox'
import {Theme} from '@lib/material-theme'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

type Props = {
  file: DroppedFile
  isUploading?: boolean
  onClick?: (file: DroppedFile) => void
  onRemoveUpload?: (file: DroppedFile) => void
  uploadedFiles?: UploadedFileAttr[]
}

const ThumbPreview = ({
  uploadedFiles = [],
  onRemoveUpload,
  file,
  onClick,
  isUploading = false
}: Props) => {
  // const [uploadSuccess, setUploadSuccess] = useState<boolean>()
  const [thumbHover, setThumbHover] = useState<string | null>()
  const supportsTouch = useSupportsTouch()

  const uploadStatus = useUploadStatus(uploadedFiles, file)
  const theme = useTheme<Theme>()
  const isLoading = uploadStatus === 'unknown'

  const clickHandler = useCallback(
    (file: DroppedFile) => () => {
      onClick?.(file)
    },
    [onClick]
  )

  const removeUploadHandler = useCallback(
    (file: DroppedFile) => () => {
      onRemoveUpload && onRemoveUpload(file)
    },
    [onRemoveUpload]
  )

  // const uploadSuccessHandler = useCallback(() => {
  // setUploadSuccess(true)
  // }, [])

  const style = useMemo(
    () => ({
      rightIcon: {
        marginLeft: theme.spacing(1)
      },
      buttonLabel: {
        color:
          uploadStatus === 'success'
            ? theme.palette.error.main
            : uploadStatus === 'unknown'
              ? theme.palette.text.disabled
              : theme.palette.text.primary
      },
      thumb: {
        display: 'inline-flex',
        borderRadius: 2,
        // border: '1px solid #eaeaea',
        width: 150,
        height: 150,
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: '4px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
          borderRadius: 1,
          width: 100,
          height: 100,
          marginBottom: '4px',
          marginRight: '4px',
          padding: '2px'
        }
      },
      thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
        width: '100%'
      },
      // fileNameOverlay: {
      //   position: 'absolute',
      //   zIndex: 11,
      //   color: theme.palette.common.white,
      //   wordWrap: 'anywhere',
      //   padding: '2px',
      //   fontSize: '0.65rem'
      // },
      removeUploadFabContainer: {
        position: 'absolute',
        zIndex: 12
      }
    }),
    [theme, uploadStatus]
  )

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
            sx={{...style.buttonLabel}}
          >
            {uploadStatus === 'failed'
              ? 'Remove Failed Upload'
              : 'Remove Upload'}
            <DeleteIcon sx={{...style.rightIcon}} color="inherit" />
          </Button>
        </Box>
      ) : null,
    [style, file, uploadStatus, supportsTouch, removeUploadHandler, isLoading]
  )

  return (
    <ColumnBox
      // Placing onMouseLeave here will prevent <RemoveUploadButton/> from disappearing before it can be selected.
      onMouseLeave={() => setThumbHover(null)}
    >
      <Box flexGrow={0} sx={{...style.thumb}}>
        <UploadStatusIndicator
          uploadedFiles={uploadedFiles}
          file={file}
          // onSuccess={uploadSuccessHandler}
          isUploading={isUploading}
        >
          <Tooltip title={file.originalName ?? ''} enterDelay={500}>
            {/* [TODO] - figure out what these eslint errors mean */}
            {/* eslint-disable-next-line */}
            {/^image\/.*/i.test(file.type) ? (
              <Box
                sx={{...style.thumbInner}}
                onMouseEnter={() => setThumbHover(file.name)}
                onClick={clickHandler(file)}
                role="dialog"
                // sx={{cursor: 'pointer'}}
              >
                {/* Old n/a comment - Using data-src="..." as a fallback shouldn't be necessary with
              IE11 if polyfill is used. See
              https://github.com/aFarkas/lazysizes/blob/gh-pages/README.md#responsive-image-support-picture-andor-srcset
              for more info. */}
                <img
                  object-fit="contain"
                  src={file.previewUrl}
                  alt={`Thumbnail for ${file.name} upload`}
                  style={{
                    display: 'block',
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center top' // Required for use w/ Safari.
                  }}
                  // src="/static/images/placeholder-camera.png"
                  // data-sizes="auto"
                  // srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  // data-srcset={file.previewUrl}
                />
              </Box>
            ) : (
              <Box
                sx={{...style.thumbInner}}
                onMouseEnter={() => setThumbHover(file.name)}
              >
                <Box display="flex" flexDirection="column" textAlign="center">
                  <DescriptionOutlinedIcon
                    sx={{fontSize: '48px'}}
                    color="primary"
                  />
                  <Type variant="h6" color="primary">
                    {file.ext}
                  </Type>
                </Box>
              </Box>
            )}
          </Tooltip>
          {/* <div className={classes.fileNameOverlay}>
              <Type color="inherit" variant="caption">
                {file.name}
              </Type>
            </div> */}
        </UploadStatusIndicator>
        <Box sx={{...style.removeUploadFabContainer}}>
          <RemoveUploadFab
            thumbName={file.name}
            thumbHover={thumbHover}
            onRemove={removeUploadHandler(file)}
            disabled={isLoading}
          />
        </Box>
      </Box>

      <RemoveUploadButton />
    </ColumnBox>
  )
}

export default ThumbPreview
