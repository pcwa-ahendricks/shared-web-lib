import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useTheme,
  TypographyProps
} from '@material-ui/core'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
import Spacing from '@components/boxes/Spacing'
import Image, {ImageProps} from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'

export type CoverTileProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  flexLinkProps?: Partial<FlexLinkProps>
  imgixParams?: any
  typeProps?: Partial<TypographyProps>
  // imageProps?: Partial<
  //   Omit<ImageProps, 'layout' | 'placeholder' | 'dataBlurURL'>
  // >
  imageProps?: any
  alt?: ImageProps['alt']
} & Partial<BoxProps>

const CoverTile = ({
  alt,
  width,
  title,
  imgixURL: imgixUrlProp,
  imageRatio = '11:7', // 220w / 140h = 1.57. Using 1.57*7=10.99, 11:7
  linkHref,
  flexLinkProps,
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

  return (
    <Box
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
      width={width}
      {...rest}
    >
      <FlexLink
        href={linkHref}
        underline="none"
        aria-label={title}
        {...flexLinkProps}
      >
        <Box
          borderRadius={4}
          overflow="hidden"
          borderColor={theme.palette.grey['300']}
          border={1}
        >
          <Image
            loader={imgixUrlLoader}
            src={imgixUrl}
            alt={alt}
            layout="responsive"
            sizes="(min-width: 1000px) 20vw, (min-width: 640px) 30vw, 50vw"
            width={width}
            height="100%"
            {...imageProps}
          />
        </Box>
        <Spacing size="small" />
        <Type variant="subtitle1" color={titleColor} {...typeProps}>
          {title}
        </Type>
      </FlexLink>
    </Box>
  )
}

export default CoverTile
