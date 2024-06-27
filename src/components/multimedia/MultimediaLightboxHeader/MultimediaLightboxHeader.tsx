import React, {useState, useCallback, useContext, useEffect} from 'react'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import DownloadIcon from '@mui/icons-material/GetApp'
import CloseIcon from '@mui/icons-material/Close'
// [TODO] why?
// eslint-disable-next-line import/named
import {CommonProps, ViewType} from 'react-images'
import {Box, IconButton, Tooltip, Menu, MenuItem} from '@mui/material'
import {MultimediaContext, setLvDownloadMenuOpen} from '../MultimediaStore'
import {PhotoLibraryMetadata} from '@lib/types/multimedia'
import slugify from 'slugify'
import {fileExtension} from '@lib/fileExtension'

const MultimediaLightboxHeader = ({
  innerProps,
  isModal,
  modalProps,
  currentView,
  interactionIsIdle
}: Omit<CommonProps, 'currentView'> & {
  currentView?: ViewType & {
    imgix_url?: string
    original_name?: string
    metadata?: PhotoLibraryMetadata
  }
}) => {
  const style = {
    header: {
      alignItems: 'center',
      display: 'flex ',
      flex: '0 0 auto',
      justifyContent: 'space-between',
      opacity: interactionIsIdle ? 0 : 1,
      padding: '10px',
      paddingBottom: '20px',
      position: 'absolute',
      transform: `translateY(${interactionIsIdle ? -10 : 0}px)`,
      transition: 'opacity 300ms, transform 300ms',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      '& *:focus': {
        outline: '1.5px solid orange'
      }
    },
    headerButton: {
      opacity: 0.7,
      '&:hover': {
        opacity: 1
      }
    },
    menuPaper: {
      minWidth: 125
    }
  }
  const {onClose = null, isFullscreen = false} = modalProps ? modalProps : {}
  const multimediaContext = useContext(MultimediaContext)
  const multimediaDispatch = multimediaContext.dispatch

  const {imgix_url, original_name, metadata} = currentView ?? {}
  const {caption} = metadata ?? {}
  const ext = fileExtension(original_name ?? '')
  const filename =
    caption && caption.toLowerCase() !== 'undefined'
      ? `${caption}.${ext}`
      : original_name ?? ''
  const downloadAs = slugify(filename)
  const downloadUrlBase = `${imgix_url}?dl=${downloadAs}`
  const origDownloadUrl = downloadUrlBase
  const largeDownloadUrl = `${downloadUrlBase}&w=1200&h=1200`
  const medDownloadUrl = `${downloadUrlBase}&w=900&h=900`
  const smallDownloadUrl = `${downloadUrlBase}&w=500&h=500`

  const downloadDisabled = !imgix_url || !original_name

  const closeHandler = useCallback(
    (event: any) => {
      const empty = () => undefined
      onClose ? onClose(event) : empty()
    },
    [onClose]
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const downloadPhotoClickHandler = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  useEffect(() => {
    const open = Boolean(anchorEl)
    multimediaDispatch(setLvDownloadMenuOpen(open))
  }, [anchorEl, multimediaDispatch])

  const menuCloseHandler = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return isModal ? (
    <Box sx={{...style.header}} {...innerProps}>
      <RowBox justifyContent="flex-end" width="100%">
        {/* Mobile users probably don't want to download images. */}
        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
          <ChildBox flex="0 1 auto">
            <Tooltip title="download photo" enterDelay={400}>
              <IconButton
                sx={{...style.headerButton}}
                disabled={downloadDisabled}
                onClick={downloadPhotoClickHandler}
                aria-controls="download-image-menu"
                aria-haspopup="true"
                size="large"
              >
                <DownloadIcon fontSize="large" sx={{fill: '#FFFFFF'}} />
              </IconButton>
            </Tooltip>
            <Menu
              id="download-image-menu"
              anchorEl={anchorEl}
              // Don't keep mounted cause it will block modal from closing when backdrop is clicked
              keepMounted={false}
              open={Boolean(anchorEl)}
              onClose={menuCloseHandler}
              slotProps={{
                paper: {
                  sx: {
                    ...style.menuPaper
                  }
                }
              }}
            >
              <MenuItem
                href={origDownloadUrl}
                component="a"
                // Downloading Imgix images using 'dl' query param appear to work better without opening the URL in a new tab
                // rel="noopener noreferrer"
                // target="_blank"
                onClick={menuCloseHandler}
              >
                Original
              </MenuItem>
              <MenuItem
                href={largeDownloadUrl}
                component="a"
                onClick={menuCloseHandler}
              >
                Large
              </MenuItem>
              <MenuItem
                href={medDownloadUrl}
                component="a"
                onClick={menuCloseHandler}
              >
                Medium
              </MenuItem>
              <MenuItem
                href={smallDownloadUrl}
                component="a"
                onClick={menuCloseHandler}
              >
                Small
              </MenuItem>
            </Menu>
          </ChildBox>
        </Box>

        {/* It's unclear if the fullscreen functionality works on mobile browsers. It didn't seem to work with mobile firefox. */}
        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
          <ChildBox flex="0 1 auto">
            <Tooltip title="fullscreen (f)" enterDelay={400}>
              <IconButton
                sx={{...style.headerButton}}
                onClick={modalProps?.toggleFullscreen}
                size="large"
              >
                {!isFullscreen ? (
                  <FullscreenIcon fontSize="large" sx={{fill: '#FFFFFF'}} />
                ) : (
                  <FullscreenExitIcon fontSize="large" sx={{fill: '#FFFFFF'}} />
                )}
              </IconButton>
            </Tooltip>
          </ChildBox>
        </Box>
        <ChildBox>
          <Tooltip title="close (esc)" enterDelay={400}>
            <IconButton
              sx={{...style.headerButton}}
              onClick={closeHandler}
              size="large"
            >
              <CloseIcon fontSize="large" sx={{fill: '#FFFFFF'}} />
            </IconButton>
          </Tooltip>
        </ChildBox>
      </RowBox>
    </Box>
  ) : null
}

export default MultimediaLightboxHeader
