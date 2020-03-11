import React from 'react'
import {ParallaxBanner, ParallaxBannerProps} from 'react-scroll-parallax'
import ImgixFancy, {ImgixFancyProps} from '../ImgixFancy/ImgixFancy'
import {Box} from '@material-ui/core'

type Props = {
  imgixFancyProps: ImgixFancyProps
  children?: React.ReactNode
  amount?: number
} & Partial<ParallaxBannerProps>

const ImgixFancyParallaxBanner = ({
  amount = 0.1,
  imgixFancyProps,
  children,
  ...rest
}: Props) => {
  return (
    <ParallaxBanner
      layers={[
        {
          children: <ImgixFancy {...imgixFancyProps} />,
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

export default ImgixFancyParallaxBanner