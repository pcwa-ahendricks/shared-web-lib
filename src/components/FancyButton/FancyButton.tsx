import React, {useState, useCallback} from 'react'
import {Box, Button, ButtonProps} from '@mui/material'
import NativeListener from 'react-native-listener'

export type FancyButtonProps = {
  children: React.ReactNode
  hoverText?: string
  transition?: 'fade' | 'slideUp'
  transitionDuration?: string
} & ButtonProps<'a'>

const FancyButton = ({
  hoverText,
  transition = 'fade',
  children,
  transitionDuration = '150ms',
  href,
  sx,
  ...rest
}: FancyButtonProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

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
      <Button
        color="inherit"
        component="a"
        href={href}
        sx={{
          ...sx,
          overflow: transition === 'slideUp' ? 'hidden' : 'visible' // Hide translated content with slideUp button.
        }}
        {...rest}
      >
        <Box
          component="span"
          position="absolute"
          zIndex="2"
          sx={{
            opacity: transition !== 'fade' ? 1 : isHovering ? 1 : 0,
            transform:
              transition !== 'slideUp'
                ? 'none'
                : isHovering
                ? 'translateY(0)'
                : 'translateY(50px)',
            transition: `all ${transitionDuration} ease`,
            transitionProperty: 'opacity, transform'
          }}
        >
          {hoverText ?? children}
        </Box>
        <Box
          component="span"
          zIndex="1"
          sx={{
            opacity: transition !== 'fade' ? 1 : isHovering ? 0 : 1,
            transform:
              transition !== 'slideUp'
                ? 'none'
                : isHovering
                ? 'translateY(-50px)'
                : 'translateY(0)',
            transition: `all ${transitionDuration} ease`,
            transitionProperty: 'opacity, transform'
          }}
        >
          {children}
        </Box>
      </Button>
    </NativeListener>
  )
}

export default FancyButton
