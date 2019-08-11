import React, {useState, useCallback} from 'react'
import {Box, Typography as Type} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'

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
}

type UseStylesProps = {
  isExpanded: boolean
  inMaxHeight: Props['inMaxHeight']
  outMaxHeight: Props['outMaxHeight']
  outDuration: Props['outDuration']
  inDuration: Props['inDuration']
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      cursor: 'pointer'
    },
    expandContainer: ({
      isExpanded,
      inMaxHeight,
      outMaxHeight,
      outDuration,
      inDuration
    }: UseStylesProps) => ({
      overflowY: 'hidden',
      maxHeight: isExpanded ? outMaxHeight : inMaxHeight,
      transition: `max-height ${
        isExpanded ? outDuration : inDuration
      }ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
      position: 'relative'
    }),
    childrenContainer: {
      zIndex: 1
    },
    gradient: ({isExpanded, outDuration, inDuration}: UseStylesProps) => ({
      opacity: isExpanded ? 0 : 1,
      zIndex: 2, // Higher than childrenContainer.
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      pointerEvents: 'none', // So the text is still selectable.
      transition: `opacity ${isExpanded ? outDuration : inDuration}ms ease-out`,
      backgroundImage: `linear-gradient(
          to top,
          rgba(250, 250, 250, 1) 5%,
          rgba(250, 250, 250, 0.75) 15%,
          rgba(250, 250, 250, 0) 80%
        )`
    })
  })
)

const ShowMore = ({
  children,
  inMaxHeight = 250,
  outMaxHeight = 10000,
  outDuration = 650,
  inDuration = 250,
  inShowMoreTitle = 'Show Me More',
  outShowMoreTitle = 'Show Me Less'
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const classes = useStyles({
    isExpanded,
    inMaxHeight,
    outDuration,
    inDuration,
    outMaxHeight
  })

  const clickHandler = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <Box className={classes.root} onClick={clickHandler}>
      <Box className={classes.expandContainer}>
        <Box className={classes.gradient}></Box>
        <Box className={classes.childrenContainer}>{children}</Box>
      </Box>
      <Type variant="body1" color="primary">
        <span style={{fontStyle: 'italic', fontSize: '1.1em'}}>
          {isExpanded ? outShowMoreTitle : inShowMoreTitle}
        </span>
      </Type>
    </Box>
  )
}

export default ShowMore
