import React, {useState, useCallback, useContext, useEffect} from 'react'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import DownloadIcon from '@material-ui/icons/GetApp'
import CloseIcon from '@material-ui/icons/Close'
// [TODO] why?
// eslint-disable-next-line import/named
import {CommonProps, ViewType} from 'react-images'
import {
  makeStyles,
  createStyles,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from '@material-ui/core'
import {MultimediaContext, setLvDownloadMenuOpen} from '../MultimediaStore'

type UseStylesProps = {
  interactionIsIdle?: boolean
}
const useStyles = makeStyles(() =>
  createStyles({
    header: ({interactionIsIdle}: UseStylesProps) => ({
      alignItems: 'center',
      display: 'flex ',
      flex: '0 0 auto',
      justifyContent: 'space-between',
      opacity: interactionIsIdle ? 0 : 1,
      padding: 10,
      paddingBottom: 20,
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
    }),
    headerButton: {
      opacity: 0.7,
      '&:hover': {
        opacity: 1
      }
    }
  })
)
const MultimediaLightboxHeader = ({
  innerProps,
  isModal,
  modalProps,
  currentView,
  interactionIsIdle
}: // ...rest
Omit<CommonProps, 'currentView'> & {
  currentView?: ViewType & {imgix_url?: string; original_name?: string}
}) => {
  const classes = useStyles({interactionIsIdle})
  const {onClose = null} = modalProps ? modalProps : {}
  const multimediaContext = useContext(MultimediaContext)
  const multimediaDispatch = multimediaContext.dispatch
  // console.log('cv', currentView)
  // console.log('rest', rest)

  /* eslint-disable @typescript-eslint/camelcase */
  const {imgix_url, original_name} = currentView ?? {}
  const downloadUrlBase = `${imgix_url}?dl=${original_name}`
  const origDownloadUrl = downloadUrlBase
  const largeDownloadUrl = `${downloadUrlBase}&w=1200&h=1200`
  const medDownloadUrl = `${downloadUrlBase}&w=900&h=900`
  const smallDownloadUrl = `${downloadUrlBase}&w=500&h=500`

  const downloadDisabled = !imgix_url || !original_name

  /* eslint-enable @typescript-eslint/camelcase */

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
    <Box className={classes.header} {...innerProps}>
      <RowBox justifyContent="flex-end" width="100%">
        <ChildBox flex="0 1 auto">
          <Tooltip title="download photo" enterDelay={400}>
            <IconButton
              className={classes.headerButton}
              disabled={downloadDisabled}
              onClick={downloadPhotoClickHandler}
            >
              <DownloadIcon fontSize="large" style={{fill: '#FFFFFF'}} />
            </IconButton>
          </Tooltip>
          <Menu
            id="download-image-menu"
            anchorEl={anchorEl}
            // Don't keep mounted cause it will block modal from closing when backdrop is clicked
            keepMounted={false}
            open={Boolean(anchorEl)}
            onClose={menuCloseHandler}
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
        <ChildBox flex="0 1 auto">
          <Tooltip title="fullscreen (f)" enterDelay={400}>
            <IconButton
              className={classes.headerButton}
              onClick={modalProps?.toggleFullscreen}
            >
              <FullscreenIcon fontSize="large" style={{fill: '#FFFFFF'}} />
            </IconButton>
          </Tooltip>
        </ChildBox>
        <ChildBox>
          <Tooltip title="close (esc)" enterDelay={400}>
            <IconButton className={classes.headerButton} onClick={closeHandler}>
              <CloseIcon fontSize="large" style={{fill: '#FFFFFF'}} />
            </IconButton>
          </Tooltip>
        </ChildBox>
      </RowBox>
    </Box>
  ) : null
}

export default MultimediaLightboxHeader
