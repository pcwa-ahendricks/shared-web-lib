import React, {useState, useCallback} from 'react'
import {Box, BoxProps, useTheme} from '@mui/material'
import {Theme} from '@lib/material-theme'

type Props = {
  children?: React.ReactNode
  lineHeight?: number
  lineMargin?: number | string
  visible?: boolean | null
  useFullHeight?: boolean
  transitionDuration?: string
  color?: string | number
  underline?: boolean
} & BoxProps

// See https://github.com/IanLunn/Hover/blob/5c9f92d2bcd6414f54b4f926fd4bb231e4ce9fd5/css/hover.css#L2264

const Overline = ({
  children,
  lineHeight = 3,
  lineMargin = 0,
  transitionDuration = '300ms',
  visible: visibleProp = null,
  color,
  useFullHeight = false,
  underline = false,
  sx,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()
  const [overlineVisible, setOverlineVisible] = useState(false)
  /**
   * visible prop is essentially a manual override to the hover functionality. If it's not specified (ie. null) then component falls back to overline on hover. If it's specified (ie. true or false) then hover functionality is ignored.
   */
  const visible =
    visibleProp === null || visibleProp === undefined
      ? overlineVisible
      : visibleProp // Can't use OR operator here due to how false is evaluated.

  const mouseEnterHandler = useCallback(() => {
    setOverlineVisible(true)
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setOverlineVisible(false)
  }, [])

  return (
    <Box
      sx={{
        display: 'inline-block',
        verticalAlign: 'middle',
        '-webkit-transform': 'perspective(1px) translate3d(0, 0, 0)',
        transform: 'perspective(1px) translate3d(0, 0, 0)',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0)',
        position: 'relative',
        overflow: 'hidden',
        // dynamic height
        height: useFullHeight ? '100%' : 'auto'
      }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          left: visible ? 0 : '51%',
          right: visible ? 0 : '51%',
          backgroundColor: color ?? theme.palette.secondary.main,
          '-webkit-transition-property': 'left, right',
          transitionProperty: 'left, right',
          '-webkit-transition-timing-function': 'ease-out',
          transitionTimingFunction: 'ease-out',
          height: lineHeight,
          marginRight: lineMargin,
          marginLeft: lineMargin,
          transitionDuration,
          // Conditional CSS Properties
          ...(!underline && {
            top: 0
          }),
          ...(underline && {
            bottom: 0
          })
        }}
      />
      <Box
        sx={{
          ...sx,
          // dynamic height
          height: useFullHeight ? '100%' : 'auto'
        }}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Overline
