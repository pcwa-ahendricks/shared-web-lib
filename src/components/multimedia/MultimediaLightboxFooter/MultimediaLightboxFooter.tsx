import React from 'react'
// [TODO] why?
// eslint-disable-next-line import/named
import {CommonProps, ViewType} from 'react-images'
import {useMediaQuery} from '@mui/material'
import {PhotoLibraryMetadata} from '@lib/types/multimedia'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import useTheme from '@hooks/useTheme'

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
  const style = {
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
    footer: {
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
      padding: isXsDown
        ? isModal
          ? '20px 15px 15px'
          : '5px 0'
        : isModal
        ? '30px 20px 20px'
        : '10px 0',
      '& *:focus': {
        outline: '1.5px solid orange'
      }
    }
  }
  const {caption} = currentView || {}
  const activeView = currentIndex + 1
  const totalViews = views?.length

  return isModal ? (
    <RowBox sx={{...style.footer}} {...innerProps}>
      <ChildBox sx={{...style.caption}}>{caption}</ChildBox>
      <ChildBox sx={{...style.count}}>
        {activeView} of {totalViews}
      </ChildBox>
    </RowBox>
  ) : null
}

export default MultimediaLightboxFooter
