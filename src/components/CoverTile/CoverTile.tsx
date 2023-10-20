import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useTheme,
  TypographyProps
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'
import ImageBlur, {ImageBlurProps} from '@components/imageBlur/ImageBlur'
import Link, {LinkProps} from '@components/Link'
import getImageSizes from '@lib/getImageSizes'

export type CoverTileProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  linkProps?: Partial<LinkProps>
  imgixParams?: any
  typeProps?: Partial<TypographyProps>
  // imageProps?: Partial<
  //   Omit<ImageProps, 'layout' | 'placeholder' | 'dataBlurURL'>
  // >
  imageProps?: any
  alt?: ImageBlurProps['alt']
} & Partial<BoxProps>

const CoverTile = ({
  alt,
  title,
  imgixURL: imgixUrlProp,
  // imageRatio = '11:7', // 220w / 140h = 1.57. Using 1.57 * 7=10.99, 11:7
  imageRatio = '18:10', // 360w / 200h = 1.8.     Using 1.8  * 10=18,   18:10
  linkHref,
  linkProps,
  typeProps,
  imgixParams,
  imageProps,
  ...rest
}: CoverTileProps) => {
  const theme = useTheme()
  const [hover, setHover] = useState<boolean>()

  const buttonEnterHandler = useCallback(() => {
    setHover(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setHover(false)
  }, [])

  const titleColor: TypographyProps['color'] = hover ? 'secondary' : 'primary'

  // In case imgix returns a partially transparent image use bg to background fill w/ white.
  // Instead of passing an image width and height we can pass the target Aspect Ratio which will work with fit=crop. See https://docs.imgix.com/apis/url/size/ar.
  const imgixQs = stringify(
    {
      ar: imageRatio,
      fit: 'crop',
      bg: 'ffffff',
      ...imgixParams
    },
    true
  )
  const imgixUrl = `${imgixUrlProp}${imgixQs}`
  const imageSizes = getImageSizes({xs: 6, sm: 4, md: 3}) // using <Grid xs={6} sm={4} md={3} /> specified on homepage

  return (
    <Box
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
      // width={width}
      {...rest}
    >
      <Link href={linkHref} underline="none" aria-label={title} {...linkProps}>
        <Box
          borderRadius="4px"
          overflow="hidden"
          borderColor={theme.palette.grey['300']}
          border={1}
        >
          <ImageBlur
            loader={imgixUrlLoader}
            src={imgixUrl}
            alt={alt}
            layout="responsive"
            sizes={imageSizes}
            width={360}
            height={200}
            {...imageProps}
          />
        </Box>
        <Spacing size="small" />
        <Type variant="subtitle1" color={titleColor} {...typeProps}>
          {title}
        </Type>
      </Link>
    </Box>
  )
}

export default CoverTile
