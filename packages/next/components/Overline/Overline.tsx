import React, {useState, useEffect, useCallback} from 'react'
import {createStyles, makeStyles} from '@material-ui/styles'
import {Box, Theme} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import clsx from 'clsx'

type Props = {
  children?: React.ReactNode
  lineHeight?: number
  lineMargin?: number | string
  visible?: boolean | null
  useFullHeight?: boolean
  transitionDuration?: string
} & BoxProps

type UseStylesProps = {
  overlineVisible: boolean
} & Partial<Props>

// See https://github.com/IanLunn/Hover/blob/5c9f92d2bcd6414f54b4f926fd4bb231e4ce9fd5/css/hover.css#L2264
const useStyles = makeStyles((theme: Theme) =>
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
      lineHeight,
      lineMargin,
      transitionDuration,
      overlineVisible
    }: UseStylesProps) => ({
      content: '',
      position: 'absolute',
      zIndex: -1,
      left: overlineVisible ? 0 : '51%',
      right: overlineVisible ? 0 : '51%',
      top: 0,
      background: theme.palette.secondary.main,
      '-webkit-transition-property': 'left, right',
      transitionProperty: 'left, right',
      '-webkit-transition-timing-function': 'ease-out',
      transitionTimingFunction: 'ease-out',
      height: lineHeight,
      marginRight: lineMargin,
      marginLeft: lineMargin,
      transitionDuration
    }),
    dynamicHeight: ({useFullHeight}: Props) => ({
      height: useFullHeight ? '100%' : 'unset'
    })
  })
)

const Overline = ({
  children,
  lineHeight = 3,
  lineMargin = 0,
  transitionDuration = '300ms',
  visible = null,
  useFullHeight = false,
  ...rest
}: Props) => {
  const [overlineVisible, setOverlineVisible] = useState(false)
  const classes = useStyles({
    lineHeight,
    lineMargin,
    transitionDuration,
    useFullHeight,
    overlineVisible
  })
  /**
   * visible prop is essentially a manual override to the hover functionality. If it's not specified (ie. null) then component falls back to overline on hover. If it's specified (ie. true or false) then hover functionality is ignored.
   */
  useEffect(() => {
    if (visible !== null) {
      setOverlineVisible(visible)
    }
  }, [visible])

  const mouseEnterHandler = useCallback(() => {
    if (visible === null) {
      setOverlineVisible(true)
    }
  }, [visible])

  const mouseLeaveHandler = useCallback(() => {
    if (visible === null) {
      setOverlineVisible(false)
    }
  }, [visible])

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
