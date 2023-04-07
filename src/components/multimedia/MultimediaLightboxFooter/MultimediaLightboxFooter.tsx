import React from 'react'
// [TODO] why?
// eslint-disable-next-line import/named
import {CommonProps, ViewType} from 'react-images'
import {useTheme, useMediaQuery} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import {PhotoLibraryMetadata} from '@lib/types/multimedia'
import {RowBox, ChildBox} from '@components/MuiSleazebox'

type UseStylesProps = {
  interactionIsIdle?: boolean
  isModal?: boolean
  smallDevice: boolean
}
const useStyles = makeStyles(() =>
  createStyles({
    count: {
      /* Included with react-images source, but not needed for this custom implementation */
      // flexShrink: 0,
      // marginLeft: '1em'
      /* */
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    caption: {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    footer: ({interactionIsIdle, isModal, smallDevice}: UseStylesProps) => ({
      alignItems: 'top',
      bottom: isModal ? 0 : 'auto',
      color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
      display: 'flex ',
      flex: '0 0 auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 17,
      left: isModal ? 0 : 'auto',
      opacity: interactionIsIdle && isModal ? 0 : 1,
      position: isModal ? 'absolute' : 'relative',
      right: isModal ? 0 : 'auto',
      transform: isModal
        ? `translateY(${interactionIsIdle ? 10 : 0}px)`
        : 'none',
      transition: 'opacity 300ms, transform 300ms',
      zIndex: isModal ? 1 : 'auto',
      backgroundColor: isModal
        ? 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))'
        : 'transparent',
      padding: smallDevice
        ? isModal
          ? '20px 15px 15px'
          : '5px 0'
        : isModal
        ? '30px 20px 20px'
        : '10px 0',
      '& *:focus': {
        outline: '1.5px solid orange'
      }
    })
  })
)
const MultimediaLightboxFooter = ({
  innerProps,
  isModal,
  interactionIsIdle,
  currentView,
  currentIndex = 0,
  views
}: Omit<CommonProps, 'currentView'> & {
  currentView?: ViewType & {
    caption?: any
    imgix_url?: string
    original_name?: string
    metadata?: PhotoLibraryMetadata
  }
}) => {
  const theme = useTheme()
  const isXsDown = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles({interactionIsIdle, smallDevice: isXsDown, isModal})
  const {caption} = currentView || {}
  const activeView = currentIndex + 1
  const totalViews = views?.length

  return isModal ? (
    <RowBox className={classes.footer} {...innerProps}>
      <ChildBox className={classes.caption}>{caption}</ChildBox>
      <ChildBox className={classes.count}>
        {activeView} of {totalViews}
      </ChildBox>
    </RowBox>
  ) : null
}

export default MultimediaLightboxFooter
