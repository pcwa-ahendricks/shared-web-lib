import React from 'react'
import {Box, BoxProps, Typography as Type} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import FlexLink from '@components/FlexLink/FlexLink'

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
  return (
    <Box {...rest}>
      <FlexLink
        scroll
        detectNext
        variant="subtitle2"
        color="primary"
        href={linkURL}
      >
        {title}
      </FlexLink>
      <Spacing size="x-small" />
      <Type paragraph variant="body2">
        {summary}{' '}
        <FlexLink scroll detectNext variant="inherit" href={linkURL}>
          <em>{readMoreCaption}</em>
        </FlexLink>
      </Type>
    </Box>
  )
}

export default NewsBlurb
