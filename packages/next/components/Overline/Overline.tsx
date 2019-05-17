import React, {useState, useEffect, useCallback} from 'react'
import {createStyles, makeStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  children?: React.ReactNode
  lineHeight?: number
  lineMargin?: number | string
  visible?: boolean | null
  useFullHeight?: boolean
  transitionDuration?: string
}

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
      overflow: 'hidden',
      '&.overlineVisible': {
        '& $overline': {
          left: 0,
          right: 0
        }
      }
    },
    overline: ({lineHeight, lineMargin, transitionDuration}: Props) => ({
      content: '',
      position: 'absolute',
      zIndex: -1,
      left: '51%',
      right: '51%',
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
  const classes = useStyles({
    lineHeight,
    lineMargin,
    transitionDuration,
    useFullHeight
  })
  const [overlineVisible, setOverlineVisible] = useState(false)
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
    <div
      className={clsx(classes.root, classes.dynamicHeight, {overlineVisible})}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={classes.overline} />
      <div {...rest} className={classes.dynamicHeight}>
        {children}
      </div>
    </div>
  )
}

export default Overline
