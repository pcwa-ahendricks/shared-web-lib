// @flow
import React, {type Node} from 'react'
import {ParallaxBanner} from 'react-scroll-parallax'
import ImgixFancy from '../ImgixFancy/ImgixFancy'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'

const styles: StyleRulesCallback = {
  root: {},
  parallaxChildren: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

type ImgixFancyProps = {
  src: string,
  lqipSrc?: string,
  sizes?: string, // has defaultProps
  htmlAttributesProps?: {}, // has defaultProps
  paddingPercent?: string // defaultProps
}

type Props = {
  classes: any,
  amount: number,
  imgixFancyProps: ImgixFancyProps,
  children?: Node,
  onImgLoad?: () => any
}

const ImgixFancyParallaxBanner = ({
  amount,
  imgixFancyProps,
  children,
  classes,
  onImgLoad,
  ...rest
}: Props) => {
  return (
    <ParallaxBanner
      className={classes.root}
      layers={[
        {
          children: <ImgixFancy {...imgixFancyProps} onLoad={onImgLoad} />,
          amount: amount,
          slowerScrollRate: false
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
      <div className={classes.parallaxChildren}>{children}</div>
    </ParallaxBanner>
  )
}

ImgixFancyParallaxBanner.defaultProps = {
  amount: 0.1
}

export default withStyles(styles)(ImgixFancyParallaxBanner)
