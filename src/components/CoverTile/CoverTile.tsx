import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useTheme,
  TypographyProps
} from '@material-ui/core'
import ImgixFancy, {ImgixFancyProps} from '@components/ImgixFancy/ImgixFancy'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
import Spacing from '@components/boxes/Spacing'

export type CoverTileProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  imgixFancyProps?: Partial<ImgixFancyProps>
  flexLinkProps?: Partial<FlexLinkProps>
  typeProps?: Partial<TypographyProps>
} & BoxProps

const CoverTile = ({
  title,
  imgixURL,
  imageRatio = '11:7', // 220w / 140h = 1.57. Using 1.57*7=10.99, 11:7
  linkHref,
  imgixFancyProps,
  flexLinkProps,
  typeProps,
  ...rest
}: CoverTileProps) => {
  const theme = useTheme()
  const [hover, setHover] = useState<boolean>()

  const {imgixParams: imgixParamsProps, ...imgixFancyPropsRest} =
    imgixFancyProps ?? {}

  const buttonEnterHandler = useCallback(() => {
    setHover(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setHover(false)
  }, [])

  const titleColor: TypographyProps['color'] = hover ? 'secondary' : 'primary'

  return (
    <Box
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
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
          <ImgixFancy
            src={imgixURL}
            // In case imgix returns a partially transparent image use bg to background fill w/ white.
            // Instead of passing an image width and height we can pass the target Aspect Ratio which will work with fit=crop. See https://docs.imgix.com/apis/url/size/ar.
            imgixParams={{
              ar: imageRatio,
              fit: 'crop',
              bg: 'ffffff',
              ...imgixParamsProps
            }}
            paddingPercent={63.64} // Default ratio for a 140h x 220w image.
            {...imgixFancyPropsRest}
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
