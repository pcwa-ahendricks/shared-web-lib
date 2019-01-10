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

/* Lazysizes and ls.blur-up plugin styles. See https://github.com/aFarkas/lazysizes/tree/master/plugins/blur-up. */
const styles = {
  mediabox: {
    position: 'relative',
    display: 'block',
    height: 0,
    width: '100%',
    overflow: 'hidden',
    '-webkit-transform': 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)',
    ' & .ls-blur-up-img, .mediabox-img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      /* only if you want to change the blur-up option from auto to always */
      fontFamily: "'blur-up: always', 'object-fit: cover'",
      objectFit: 'cover'
    },
    /* Scaling the blur up image prevents visible loading of lazy loaded image at edges of blur effect. */
    '& .ls-blur-up-img': {
      filter: 'blur(15px)',
      opacity: 1,
      transition: 'opacity 1000ms, filter 1500ms',
      transform: 'scale(1.2)',
      '-webkit-transform': 'scale(1.2)'
    },

    '& .ls-blur-up-img.ls-inview.ls-original-loaded': {
      opacity: 0,
      filter: 'blur(5px)'
    }
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
          // 'data-expand': -400, // Debug
          'data-lowsrc':
            lqipSrc || `${src}?auto=format&fit=crop&ixlib=react-8.5.1&w=40`, // low quality image
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
