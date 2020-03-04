import React, {useState, useCallback} from 'react'
import {Box, Button} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {ButtonProps} from '@material-ui/core/Button'
import NativeListener from 'react-native-listener'

export type FancyButtonProps = {
  children: React.ReactNode
  hoverText?: string
  transition?: 'fade' | 'slideUp'
  transitionDuration?: string
} & ButtonProps<'a'>

type UseStylesProps = {
  isHovering: boolean
  transition: FancyButtonProps['transition']
  transitionDuration: FancyButtonProps['transitionDuration']
}

const useStyles = makeStyles(() =>
  createStyles({
    root: ({transition}: UseStylesProps) => ({
      overflow: transition === 'slideUp' ? 'hidden' : 'visible' // Hide translated content with slideUp button.
    }),
    hoverText: ({
      isHovering,
      transition,
      transitionDuration
    }: UseStylesProps) => ({
      opacity: transition !== 'fade' ? 1 : isHovering ? 1 : 0,
      transform:
        transition !== 'slideUp'
          ? 'none'
          : isHovering
          ? 'translateY(0)'
          : 'translateY(50px)',
      transition: `all ${transitionDuration} ease`,
      transitionProperty: 'opacity, transform'
    }),
    children: ({
      isHovering,
      transition,
      transitionDuration
    }: UseStylesProps) => ({
      opacity: transition !== 'fade' ? 1 : isHovering ? 0 : 1,
      transform:
        transition !== 'slideUp'
          ? 'none'
          : isHovering
          ? 'translateY(-50px)'
          : 'translateY(0)',
      transition: `all ${transitionDuration} ease`,
      transitionProperty: 'opacity, transform'
    })
  })
)

const FancyButton = ({
  hoverText,
  transition = 'fade',
  children,
  transitionDuration = '150ms',
  href,
  ...rest
}: FancyButtonProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const classes = useStyles({isHovering, transition, transitionDuration})

  // [HACK] Next <Link/> will block React's synthetic events, such as onMouseEnter and onMouseLeave. Use react-native-listener as a workaround for this behavior.
  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <NativeListener
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Button component="a" href={href} className={classes.root} {...rest}>
        <Box
          component="span"
          position="absolute"
          zIndex="2"
          className={classes.hoverText}
        >
          {hoverText ?? children}
        </Box>
        <Box component="span" zIndex="1" className={classes.children}>
          {children}
        </Box>
      </Button>
    </NativeListener>
  )
}

export default FancyButton
