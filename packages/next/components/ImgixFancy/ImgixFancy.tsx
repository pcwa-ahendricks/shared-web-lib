import React from 'react'
import Imgix from 'react-imgix'
import {makeStyles} from '@material-ui/styles'
import clsx from 'clsx'

export type ImgixFancyProps = {
  src: string
  lqipSrc?: string
  alt: string
  htmlAttributesProps?: any
  paddingPercent?: string
  title?: string
  width?: number
  height?: number
  sizes?: string
  onLoad?: () => any
  imgixParams?: any
}

/* Lazysizes and ls.blur-up plugin styles. See https://github.com/aFarkas/lazysizes/tree/master/plugins/blur-up. */
const useStyles = makeStyles({
  mediabox: {
    position: 'relative',
    display: 'block',
    height: 0,
    width: '100%',
    overflow: 'hidden',
    '-webkit-transform': 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)',

    '& .mediabox-img.ls-blur-up-is-loading, .mediabox-img.lazyload:not([src])': {
      visibility: 'hidden'
    },

    '& .ls-blur-up-img, .mediabox-img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      /* only if you want to change the blur-up option from always to auto or want to use blur up effect without a lowsrc image. */
      // font-family: "blur-up: auto", "object-fit: cover";
      objectFit: 'cover'
    },
    /* Scaling the blur up image prevents visible loading of lazy loaded image at edges of blur effect. */
    '& .ls-blur-up-img': {
      filter: 'blur(10px)',
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
})

const ImgixFancy = ({
  src,
  lqipSrc,
  width,
  height,
  htmlAttributesProps = {},
  alt,
  title,
  onLoad,
  paddingPercent = '66.6667%', // Height / Width * 100 to calculate intrinsic ratio.
  sizes = 'auto', // This is a Lazysizes feature, not an react-imgix feature.
  ...rest
}: ImgixFancyProps) => {
  const classes = useStyles()
  return (
    <div className={classes.mediabox} style={{paddingBottom: paddingPercent}}>
      <Imgix
        className={clsx({['lazyload']: true, ['mediabox-img']: true})}
        src={src}
        sizes={sizes}
        width={width}
        height={height}
        attributeConfig={{
          src: 'data-src',
          srcSet: 'data-srcset',
          sizes: 'data-sizes'
        }}
        htmlAttributes={{
          // 'data-expand': -400, // Debug
          onLoad: onLoad,
          alt: alt,
          title: title,
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

export default ImgixFancy
