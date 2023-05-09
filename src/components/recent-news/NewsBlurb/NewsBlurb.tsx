import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  TypographyProps,
  useTheme
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import {Theme} from '@lib/material-theme'
import Link from '@components/Link'

type Props = {
  linkURL?: string
  // releaseDate: string
  title: string
  summary: string
  // hide: boolean
  readMoreCaption: string
} & Partial<BoxProps>

const NewsBlurb = ({
  title,
  linkURL = '',
  summary,
  readMoreCaption,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()
  const [hover, setHover] = useState<boolean>()

  const linkEnterHandler = useCallback(() => {
    setHover(true)
  }, [])

  const linkLeaveHandler = useCallback(() => {
    setHover(false)
  }, [])

  const titleColor: TypographyProps['color'] = hover ? 'secondary' : 'primary'
  return (
    <Box {...rest}>
      <Link
        paragraph={false}
        scroll
        variant="subtitle2"
        href={linkURL}
        underline="none"
        onMouseEnter={linkEnterHandler}
        onMouseLeave={linkLeaveHandler}
        color={titleColor}
        // inline-block fixes line-spacing with anchor tag link. See https://stackoverflow.com/a/22816831 for more info.
        display="inline-block"
      >
        {title}
      </Link>
      <Spacing size="x-small" />
      <Type paragraph variant="body2">
        {summary}{' '}
        <Link
          scroll
          variant="inherit"
          href={linkURL}
          underline="hover"
          sx={{
            color: theme.palette.primary.light
          }}
        >
          <StrongEmphasis>{readMoreCaption}</StrongEmphasis>
        </Link>
      </Type>
    </Box>
  )
}

export default NewsBlurb
