import React from 'react'
import {Box, BoxProps, Typography as Type} from '@material-ui/core'
import ImgixFancy, {ImgixFancyProps} from '@components/ImgixFancy/ImgixFancy'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
import Spacing from '@components/boxes/Spacing'

export type CoverTileProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  imgixCropMode?: string
  imgixFancyProps?: Partial<ImgixFancyProps>
  flexLinkProps?: Partial<FlexLinkProps>
} & BoxProps

const CoverTile = ({
  title,
  imgixURL,
  imageRatio = '11:7', // 220w / 140h = 1.57. Using 1.57*7=10.99, 11:7
  imgixCropMode = 'top',
  linkHref,
  imgixFancyProps = {},
  flexLinkProps = {},
  ...rest
}: CoverTileProps) => {
  return (
    <Box {...rest}>
      <FlexLink href={linkHref} {...flexLinkProps}>
        <ImgixFancy
          src={imgixURL}
          // In case imgix returns a partially transparent image use bg to background fill w/ white.
          // Instead of passing an image width and height we can pass the target Aspect Ratio which will work with fit=crop. See https://docs.imgix.com/apis/url/size/ar.
          imgixParams={{
            ar: imageRatio,
            fit: 'crop',
            crop: imgixCropMode,
            bg: 'ffffff'
          }}
          paddingPercent="63.64%" // Default ratio for a 140h x 220w image.
          {...imgixFancyProps}
        />
        <Spacing size="small" />
        <Type variant="h6" color="primary">
          {title}
        </Type>
      </FlexLink>
    </Box>
  )
}

export default CoverTile
