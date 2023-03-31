import React, {useMemo} from 'react'
import {
  Box,
  BoxProps,
  Link,
  LinkProps,
  Typography as Type,
  TypographyProps
} from '@mui/material'
// import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'

export type CoverStoryProps = {
  title: string
  linkHref: string
  readMore?: string
  aspectRatio?: string // Expressed as W:H
  linkProps?: Partial<LinkProps>
  body?: TypographyProps['children']
  imgixParams?: any
} & BoxProps

export default function CoverStoryVideo({
  title,
  children,
  readMore = 'Watch now',
  imgixParams,
  aspectRatio = '19/6', // 555w / 175h = 3.17. Roughly 3:1 or more accurately as 19:6
  // imageRatio = '37:12', // 555w / 180h = 3.0833. More accurately as 37:12
  // imageRatio = '3:1', // 555w / 185h = 3. 3:1
  // imageRatio = '73:25', // 555w / 190h = 2.921052632. Or 73:25
  // imageRatio = '32:13', // 555w / 225h = 2.466666667. Or 32:13
  // paddingPercent = 31.53, // Default ratio for a 175h x 555w image.
  // paddingPercent="32.43%", // Default ratio for a 180h x 555w image.
  // paddingPercent="33.33%", // Default ratio for a 185h x 555w image.
  // paddingPercent="34.23%", // Default ratio for a 190h x 555w image.
  // paddingPercent = '40.54%', // Default ratio for a 225h x 555w image.
  linkHref,
  linkProps,
  body,
  ...rest
}: CoverStoryProps) {
  const BodyEl = useMemo(
    () =>
      body ? (
        <Type variant="body2" paragraph>
          {body}
        </Type>
      ) : null,
    [body]
  )

  // 16:9 Ratio (9 / 16 * 100 = 56.25)
  const playerAspectRatio =
    aspectRatio
      .split('/')
      .reverse()
      .map((v) => parseFloat(v))
      .reduce((p, c) => p / c) * 100

  return (
    <Box {...rest}>
      <Box style={{aspectRatio}} overflow="hidden" position="relative">
        <ResponsiveYouTubePlayer
          aspectRatio={playerAspectRatio}
          controls
          url={linkHref}
          config={{
            youtube: {
              playerVars: {showinfo: 1}
            }
          }}
        />
      </Box>
      <Spacing />
      <Box textAlign="center">
        <Link
          variant="h3"
          underline="none"
          href={linkHref}
          // gutterBottom
          color="primary"
          aria-label={title}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {title}
        </Link>
        <Spacing size="small" />
        {BodyEl}
        {children}
        <Link
          variant="subtitle2"
          href={linkHref}
          aria-label={title}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          {...linkProps}
        >
          {readMore}
        </Link>
      </Box>
    </Box>
  )
}
