import React, {useMemo} from 'react'
import {Box, BoxProps, Typography as Type} from '@material-ui/core'
import ImgixFancy, {ImgixFancyProps} from '@components/ImgixFancy/ImgixFancy'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'

export type CoverStoryProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  imgixCropMode?: string
  imgixFancyProps?: Partial<ImgixFancyProps>
  flexLinkProps?: Partial<FlexLinkProps>
  body?: string
} & BoxProps

const CoverStory = ({
  title,
  children,
  readMore = 'Read more...',
  imgixURL,
  imageRatio = '19:6', // 555w / 175h = 3.17. Roughly 3:1 or more accurately as 19:6
  imgixCropMode = 'top',
  linkHref,
  imgixFancyProps = {},
  flexLinkProps = {},
  body,
  ...rest
}: CoverStoryProps) => {
  const BodyEl = useMemo(
    () =>
      body ? (
        <Type variant="body2" paragraph>
          {body}
        </Type>
      ) : null,
    [body]
  )

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
          paddingPercent="31.53%" // Default ratio for a 175h x 555w image.
          {...imgixFancyProps}
        />
      </FlexLink>
      <Spacing />
      <Box textAlign="center">
        <FlexLink
          variant="h3"
          underline="none"
          href={linkHref}
          // gutterBottom
          color="primary"
        >
          {title}
        </FlexLink>
        <Spacing size="small" />
        {BodyEl}
        {children}
        <MuiNextLink variant="subtitle2" href={linkHref}>
          {readMore}
        </MuiNextLink>
      </Box>
    </Box>
  )
}

export default CoverStory
