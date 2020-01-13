import React from 'react'
import {Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import LazyImgix, {LazyImgixProps} from '@components/LazyImgix/LazyImgix'
import clsx from 'clsx'

type Props = {
  lqipSrc?: string
  lqipWidth?: number
  paddingPercent?: string
  htmlAttributes?: any
}

export type ImgixFancyProps = Props & LazyImgixProps

interface UseStylesProps {
  paddingPercent: Props['paddingPercent']
}

/* Lazysizes and ls.blur-up plugin styles. See https://github.com/aFarkas/lazysizes/tree/master/plugins/blur-up. */
const useStyles = makeStyles({
  mediabox: ({paddingPercent}: UseStylesProps) => ({
    position: 'relative',
    display: 'block',
    height: 0,
    width: '100%',
    overflow: 'hidden',
    '-webkit-transform': 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)',
    paddingBottom: paddingPercent,
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
    },
    /*
      [HACK] Lazysizes blur-up plugin is not working with IE11. The low quality image src element keeps getting overwritten by another copy of the element that doesn't have the 'ls-original-loaded' class name. This CSS trick prevents the blur up image from showing in IE10 and IE11.
      See https://stackoverflow.com/questions/18907131/detecting-ie11-using-css-capability-feature-detection for more info on targeting IE.
    */
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      /* IE10+ specific styles go here */
      '& .ls-blur-up-img': {
        display: 'none'
      }
    }
  })
})

const ImgixFancy = ({
  src,
  className: classNameProp,
  lqipSrc: lqipSrcProp,
  lqipWidth = 40,
  htmlAttributes,
  paddingPercent = '66.6667%', // Height / Width * 100 to calculate intrinsic ratio.
  sizes = 'auto', // Auto - This is a Lazysizes feature, not an react-imgix feature. Note - "sizes" is the Imgix prop while lazysizes uses "data-sizes".
  ...rest
}: ImgixFancyProps) => {
  const classes = useStyles({paddingPercent})
  const dataLowsrc = lqipSrcProp ?? `${src}?fm=jpg&w=${lqipWidth}` // low quality image
  return (
    <Box className={classes.mediabox}>
      <LazyImgix
        className={clsx([classNameProp, 'mediabox-img'])}
        src={src}
        sizes={sizes}
        htmlAttributes={{
          // 'data-expand': -400, // Debug
          'data-lowsrc': dataLowsrc,
          ...htmlAttributes
        }}
        {...rest}
      />
    </Box>
  )
}

export default ImgixFancy
