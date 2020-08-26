import React from 'react'
import {Box, makeStyles} from '@material-ui/core'
import LazyImgix, {LazyImgixProps} from '@components/LazyImgix/LazyImgix'
import clsx from 'clsx'

type Props = {
  lqipSrc?: string // base64 string
  lqipWidth?: number
  paddingPercent?: string
  htmlAttributes?: any
}

export type ImgixFancyProps = Props & LazyImgixProps

interface UseStylesProps {
  paddingPercent: Props['paddingPercent']
}

const lightGrey =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACigAwAEAAAAAQAAABkAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABkAKAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/3QAEAAP/2gAMAwEAAhEDEQA/APUPDGlIkSfL2rtba1VVHFYXh4Dyk+ldPF0FAB5Ix0qrc2qsp4q/UUvSgDgfE+lI8T/L2rkf7GX+7+lei+IAvlP9K5jC0Af/0PVvDOpK8SfN2rsra4DKOa8v8Jf6tK9AsvuigDY80YqvcXAVTzTe1Ub37poA53xNqSpE/wA3auT/ALWX+9V7xZ/q3rjqAP/Z'

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
      objectFit: 'cover'
    },
    /* Scaling the blur up image prevents visible loading of lazy loaded image at edges of blur effect. */
    '& .ls-blur-up-img': {
      filter: 'blur(10px)',
      opacity: 1,
      // transition: 'opacity 1000ms, filter 1500ms', // Original
      transition: 'opacity 800ms, filter 1200ms',
      transform: 'scale(1.2)',
      '-webkit-transform': 'scale(1.6)'
    },
    '& .ls-blur-up-img.ls-inview.ls-original-loaded': {
      opacity: 0,
      filter: 'blur(5px)'
    },
    /*
      [HACK] Lazysizes blur-up plugin is not working with IE11. The low quality image src element keeps getting overwritten by another copy of the element that doesn't have the 'ls-original-loaded' class name. This CSS trick prevents the blur up image from requiring aforementioned class in IE10 and IE11.
      See https://stackoverflow.com/questions/18907131/detecting-ie11-using-css-capability-feature-detection for more info on targeting IE.
    */
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      /* IE10+ specific styles go here */
      '& .ls-blur-up-img.ls-inview': {
        opacity: 0,
        filter: 'blur(5px)'
      }
    }
  })
})

const ImgixFancy = ({
  src,
  className: classNameProp,
  lqipSrc = lightGrey,
  htmlAttributes,
  paddingPercent = '66.6667%', // Height / Width * 100 to calculate intrinsic ratio.
  sizes = 'auto', // Auto - This is a Lazysizes feature, not an react-imgix feature. Note - "sizes" is the Imgix prop while lazysizes uses "data-sizes".
  ...rest
}: ImgixFancyProps) => {
  const classes = useStyles({paddingPercent})
  return (
    <Box className={classes.mediabox}>
      <LazyImgix
        className={clsx([classNameProp, 'mediabox-img'])}
        src={src}
        sizes={sizes}
        htmlAttributes={{
          // 'data-expand': -400, // Debug
          'data-lowsrc': lqipSrc,
          ...htmlAttributes
        }}
        {...rest}
      />
    </Box>
  )
}

export default ImgixFancy
