import React from 'react'
import {ParallaxBanner, ParallaxBannerProps} from 'react-scroll-parallax'
import {Box} from '@material-ui/core'
import Image, {ImageProps} from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'

type Props = {
  ImageProps: Partial<ImageProps>
  children?: React.ReactNode
  amount?: number
  marginTop?: any
} & Partial<ParallaxBannerProps>

const ImageParallaxBanner = ({
  amount = 0.1,
  ImageProps,
  marginTop,
  children,
  ...rest
}: Props) => {
  const {alt = '', src} = ImageProps
  if (!src) {
    return null
  }
  return (
    <ParallaxBanner
      layers={[
        {
          children: (
            <Box
              style={{
                marginTop: marginTop
              }}
            >
              <Image
                src={src}
                alt={alt}
                loader={imgixUrlLoader}
                layout="responsive"
                {...ImageProps}
              />
            </Box>
          ),
          amount: amount
        }
      ]}
      /**
        With a 1800x1200 image, 56vw seems to be the max height
        when using an amount of 0.1 and 49vw when amount is 0.2.
        Debugging can be done with devtools by making the window
        extremely wide (helps visualize differences) and scroll
        down so that image bottom is barely visible at the top of
        the window. There should be no whitespace in bottom of.
        If a larger height is required consider creating a separate
        image on Imgix with a aspect ratio that is not a wide.
       */
      {...rest}
    >
      <Box>{children}</Box>
    </ParallaxBanner>
  )
}

export default ImageParallaxBanner
