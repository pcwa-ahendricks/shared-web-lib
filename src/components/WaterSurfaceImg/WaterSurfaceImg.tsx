// cspell:ignore imgix's
import React from 'react'
import {buildURL} from 'react-imgix'
import {makeStyles, Box} from '@material-ui/core'

/**
 * Notes:
 * <ImgixFancy/> doesn't work too well here due to the width property used in said components mediabox style.
 * Use of react-imgix's <Background /> is a bit fuzzy, and doesn't work well with SSR. See https://github.com/imgix/react-imgix#background-mode for more info.
 * <Imgix/> and display the image twice, which appears to only call a single network request, caused strange behavior with mega menu.
 * Using background-image with buildURL option worked the best. buildURL adds auto=format by default, as well as ixlib=react... param. Lazy loading doesn't really
 * apply here since this image will always be visible due to it's position at the top and using a responsive image here is not needed since it's absolutely positioned.
 */

const IMAGE_URL =
  '//cosmic-s3.imgix.net/80212870-8e98-11e8-b9a6-bb6cb34bfd65-bg-water-surface_80.jpg'
const HEIGHT = 100

const useStyles = makeStyles({
  root: {
    backgroundPosition: 'top left',
    backgroundRepeat: 'repeat-x',
    backgroundImage: `url(${buildURL(IMAGE_URL, {h: HEIGHT})})`,
    overflow: 'hidden'
  }
})

const WaterSurfaceImg = () => {
  const classes = useStyles()
  return <Box className={classes.root} height={HEIGHT} minHeight={HEIGHT} />
}

export default WaterSurfaceImg
