import React, {useState, useCallback} from 'react'
import {Box, Button, Typography as Type, alpha} from '@mui/material'
import useTheme from '@hooks/useTheme'

/*
  [Note] outMaxHeight should show all the content on the small width device. But setting it too large will affect how the duration is timed with outDuration so it should not be set exceedingly high.
*/

type Props = {
  children: React.ReactNode
  inMaxHeight?: number // px
  outMaxHeight?: number // px
  outDuration?: number // ms
  inDuration?: number // ms,
  inShowMoreTitle?: string
  outShowMoreTitle?: string
  backgroundImage?: string
}

const ShowMore = ({
  children,
  inMaxHeight = 250,
  outMaxHeight = 10000,
  outDuration = 650,
  inDuration = 250,
  inShowMoreTitle = 'Show Me More',
  outShowMoreTitle = 'Show Me Less',
  backgroundImage: backgroundImageProp
}: Props) => {
  const theme = useTheme()
  const backgroundImage =
    backgroundImageProp ||
    `linear-gradient(
          to top,
          ${alpha(theme.palette.common.white, 1)} 5%,
          ${alpha(theme.palette.common.white, 0.75)} 15%,
          ${alpha(theme.palette.common.white, 0)} 80%
        )`

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const style = {
    root: {
      cursor: 'pointer'
    },
    expandContainer: {
      overflowY: 'hidden',
      maxHeight: isExpanded ? outMaxHeight : inMaxHeight,
      transition: `max-height ${
        isExpanded ? outDuration : inDuration
      }ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
      position: 'relative'
    },
    childrenContainer: {
      zIndex: 1
    },
    gradient: {
      opacity: isExpanded ? 0 : 1,
      zIndex: 2, // Higher than childrenContainer.
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      pointerEvents: 'none', // So the text is still selectable.
      transition: `opacity ${isExpanded ? outDuration : inDuration}ms ease-out`,
      backgroundImage
    }
  }

  const clickHandler = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <Box sx={{...style.root}} onClick={clickHandler}>
      <Box sx={{...style.expandContainer}}>
        <Box sx={{...style.gradient}} />
        <Box
          sx={{
            ...style.childrenContainer
          }}
        >
          {children}
        </Box>
      </Box>
      <Button
        // component="em"
        // variant="body1"
        color="primary"
        // sx={{fontSize: '1.1em'}}
      >
        {isExpanded ? outShowMoreTitle : inShowMoreTitle}
      </Button>
    </Box>
  )
}

export default ShowMore
