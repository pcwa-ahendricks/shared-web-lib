import React, {useState, useCallback} from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  BoxProps,
  useTheme
} from '@material-ui/core'
import clsx from 'clsx'

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

type UseStylesProps = {
  color: string | number
  underline: boolean
  overlineVisible: boolean
} & Partial<Props>

// See https://github.com/IanLunn/Hover/blob/5c9f92d2bcd6414f54b4f926fd4bb231e4ce9fd5/css/hover.css#L2264
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-block',
      verticalAlign: 'middle',
      '-webkit-transform': 'perspective(1px) translate3d(0, 0, 0)',
      transform: 'perspective(1px) translate3d(0, 0, 0)',
      boxShadow: '0 0 1px rgba(0, 0, 0, 0)',
      position: 'relative',
      overflow: 'hidden'
    },
    overline: ({
      underline,
      lineHeight,
      lineMargin,
      transitionDuration,
      overlineVisible,
      color
    }: UseStylesProps) => ({
      position: 'absolute',
      zIndex: -1,
      left: overlineVisible ? 0 : '51%',
      right: overlineVisible ? 0 : '51%',
      backgroundColor: color,
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
    }),
    dynamicHeight: ({useFullHeight}: Props) => ({
      height: useFullHeight ? '100%' : 'auto'
    })
  })
)

const Overline = ({
  children,
  lineHeight = 3,
  lineMargin = 0,
  transitionDuration = '300ms',
  visible = null,
  color,
  useFullHeight = false,
  underline = false,
  ...rest
}: Props) => {
  const theme = useTheme()
  const [overlineVisible, setOverlineVisible] = useState(false)
  /**
   * visible prop is essentially a manual override to the hover functionality. If it's not specified (ie. null) then component falls back to overline on hover. If it's specified (ie. true or false) then hover functionality is ignored.
   */
  const classes = useStyles({
    underline,
    color: color ?? theme.palette.secondary.main,
    lineHeight,
    lineMargin,
    transitionDuration,
    useFullHeight,
    overlineVisible:
      visible === null || visible === undefined ? overlineVisible : visible // Can't use OR operator here due to how false is evaluated.
  })

  const mouseEnterHandler = useCallback(() => {
    setOverlineVisible(true)
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setOverlineVisible(false)
  }, [])

  return (
    <Box
      className={clsx(classes.root, classes.dynamicHeight)}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Box className={classes.overline} />
      <Box {...rest} className={classes.dynamicHeight}>
        {children}
      </Box>
    </Box>
  )
}

export default Overline
