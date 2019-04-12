// @flow
import React, {useState, useEffect, useCallback, type Node} from 'react'
import {type StyleRulesCallback} from '@material-ui/core/styles'
import injectStyles from 'react-jss'
import classNames from 'classnames'

type Props = {
  classes: any,
  useFullHeight: boolean,
  children?: Node,
  visible: boolean,
  transitionDuration: number,
  lineHeight: number,
  lineMargin: number | string
}

// See https://github.com/IanLunn/Hover/blob/5c9f92d2bcd6414f54b4f926fd4bb231e4ce9fd5/css/hover.css#L2264
const styles: StyleRulesCallback = (theme) => ({
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
  overline: {
    content: '',
    position: 'absolute',
    zIndex: -1,
    left: '51%',
    right: '51%',
    top: 0,
    background: theme.palette.secondary.main,
    height: ({lineHeight}) => lineHeight,
    '-webkit-transition-property': 'left, right',
    transitionProperty: 'left, right',
    '-webkit-transition-duration': ({transitionDuration}) => transitionDuration,
    transitionDuration: ({transitionDuration}) => transitionDuration,
    '-webkit-transition-timing-function': 'ease-out',
    transitionTimingFunction: 'ease-out',
    marginLeft: ({lineMargin}) => lineMargin,
    marginRight: ({lineMargin}) => lineMargin
  }
})

const Overline = (props: Props) => {
  /* eslint-disable no-unused-vars */
  const {
    children,
    visible,
    classes,
    useFullHeight,
    transitionDuration,
    lineHeight,
    lineMargin,
    ...rest
  } = props
  /* eslint-enable no-unused-vars */
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

  const height = useFullHeight ? '100%' : 'unset'
  return (
    <div
      className={classNames(classes.root, {overlineVisible})}
      style={{height}}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={classes.overline} />
      <div {...rest} style={{height}}>
        {children}
      </div>
    </div>
  )
}

Overline.defaultProps = {
  useFullHeight: false,
  visible: null,
  transitionDuration: 300,
  lineHeight: 3,
  lineMargin: 0
}

export default injectStyles(styles)(Overline)
