import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  TypographyProps,
  useTheme
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import FlexLink from '@components/FlexLink/FlexLink'
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
      <FlexLink
        scroll
        detectNext
        variant="subtitle2"
        color={titleColor}
        href={linkURL}
        underline="none"
        onMouseEnter={linkEnterHandler}
        onMouseLeave={linkLeaveHandler}
      >
        {title}
      </FlexLink>
      <Spacing size="x-small" />
      <Type paragraph variant="body2">
        {summary}{' '}
        <Link
          scroll
          variant="inherit"
          href={linkURL}
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
