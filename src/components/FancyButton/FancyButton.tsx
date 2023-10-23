import React, {useState, useCallback} from 'react'
import {Box, Button, ButtonProps} from '@mui/material'
import {LinkProps} from '@components/Link'
import useLinkComponent from '@hooks/useLinkComponent'

export type FancyButtonProps = {
  hoverText?: string
  transition?: 'fade' | 'slideUp'
  transitionDuration?: string
  slotProps?: {
    nextLink?: Partial<LinkProps>
  }
} & ButtonProps<any>

const FancyButton = ({
  hoverText,
  transition = 'fade',
  children,
  transitionDuration = '150ms',
  href,
  slotProps,
  sx,
  ...rest
}: FancyButtonProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  const LinkComponent = useLinkComponent({
    ...slotProps?.nextLink
  })

  return (
    // <NativeListener>
    <Button
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      LinkComponent={LinkComponent}
      href={href}
      color="inherit"
      sx={{
        '&.MuiButton-contained:hover': {
          backgroundColor: '#d5d5d5' // not sure why this is explicitly needed to fix color="inherit" prop with <Button/>.
        },
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
    // </NativeListener>
  )
}

export default FancyButton
