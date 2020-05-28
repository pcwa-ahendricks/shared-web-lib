import React from 'react'
// [TODO] why?
// eslint-disable-next-line import/named
import {CommonProps, ViewType} from 'react-images'
import {makeStyles, createStyles, Box} from '@material-ui/core'
import {PhotoLibraryMetadata} from '../MultimediaStore'

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
    },
    menuPaper: {
      minWidth: 125
    }
  })
)
const MultimediaLightboxHeader = ({
  innerProps,
  isModal,
  interactionIsIdle
}: Omit<CommonProps, 'currentView'> & {
  currentView?: ViewType & {
    imgix_url?: string
    original_name?: string
    metadata?: PhotoLibraryMetadata
  }
}) => {
  const classes = useStyles({interactionIsIdle})

  return isModal ? (
    <Box className={classes.header} {...innerProps}>
      Foobar
    </Box>
  ) : null
}

export default MultimediaLightboxHeader
