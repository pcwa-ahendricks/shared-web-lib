// @flow
import React from 'react'
import Imgix from 'react-imgix'
import {withStyles} from '@material-ui/core/styles'

type Props = {
  classes: any,
  src: string,
  lqipSrc?: string,
  sizes: string,
  htmlAttributesProps: {},
  paddingPercent: string
}

const styles = {
  mediabox: {
    position: 'relative',
    display: 'block',
    height: 0,
    width: '100%',
    overflow: 'hidden',
    '-webkit-transform': 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)'
  }
}

const ImgixFancy = ({
  src,
  lqipSrc,
  sizes,
  htmlAttributesProps,
  paddingPercent,
  classes,
  ...rest
}: Props) => {
  return (
    <div className={classes.mediabox} style={{paddingBottom: paddingPercent}}>
      <Imgix
        className="lazyload mediabox-img"
        src={src}
        sizes={sizes}
        attributeConfig={{
          src: 'data-src',
          srcSet: 'data-srcset',
          sizes: 'data-sizes'
        }}
        htmlAttributes={{
          // 'data-expand': -400, //debug
          'data-lowsrc':
            lqipSrc || `${src}?auto=format&fit=crop&ixlib=react-8.5.1&w=40`, // low quality image here
          style: {width: '100%'},
          ...htmlAttributesProps
        }}
        {...rest}
      />
    </div>
  )
}

ImgixFancy.defaultProps = {
  sizes: 'auto',
  htmlAttributesProps: {},
  paddingPercent: '66.6667%'
}

export default withStyles(styles)(ImgixFancy)
