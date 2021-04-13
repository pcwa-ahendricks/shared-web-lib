import React, {useMemo} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  TypographyProps
} from '@material-ui/core'
import ImgixFancy, {ImgixFancyProps} from '@components/ImgixFancy/ImgixFancy'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
// import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'

export type CoverStoryProps = {
  title: string
  linkHref: string
  imgixURL: string
  readMore?: string
  imageRatio?: string | number | boolean // Expressed as W:H
  paddingPercent?: number
  imgixFancyProps?: Partial<ImgixFancyProps>
  flexLinkProps?: Partial<FlexLinkProps>
  body?: TypographyProps['children']
} & BoxProps

const CoverStory = ({
  title,
  children,
  readMore = 'Read more...',
  imgixURL,
  imageRatio = '19:6', // 555w / 175h = 3.17. Roughly 3:1 or more accurately as 19:6
  // imageRatio = '37:12', // 555w / 180h = 3.0833. More accurately as 37:12
  // imageRatio = '3:1', // 555w / 185h = 3. 3:1
  // imageRatio = '73:25', // 555w / 190h = 2.921052632. Or 73:25
  // imageRatio = '32:13', // 555w / 225h = 2.466666667. Or 32:13
  paddingPercent = 31.53, // Default ratio for a 175h x 555w image.
  // paddingPercent="32.43%", // Default ratio for a 180h x 555w image.
  // paddingPercent="33.33%", // Default ratio for a 185h x 555w image.
  // paddingPercent="34.23%", // Default ratio for a 190h x 555w image.
  // paddingPercent = '40.54%', // Default ratio for a 225h x 555w image.
  linkHref,
  imgixFancyProps,
  flexLinkProps,
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
  const {imgixParams: imgixParamsProps, ...imgixFancyPropsRest} =
    imgixFancyProps ?? {}

  return (
    <Box {...rest}>
      <FlexLink href={linkHref} aria-label={title} {...flexLinkProps}>
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
          paddingPercent={paddingPercent}
          {...imgixFancyPropsRest}
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
          aria-label={title}
          {...flexLinkProps}
        >
          {title}
        </FlexLink>
        <Spacing size="small" />
        {BodyEl}
        {children}
        <FlexLink
          variant="subtitle2"
          href={linkHref}
          aria-label={title}
          {...flexLinkProps}
        >
          {readMore}
        </FlexLink>
      </Box>
    </Box>
  )
}

export default CoverStory
