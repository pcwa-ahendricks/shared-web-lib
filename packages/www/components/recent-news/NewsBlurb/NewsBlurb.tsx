import React from 'react'
import {
  Box,
  BoxProps,
  makeStyles,
  createStyles,
  Typography as Type
} from '@material-ui/core'
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

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      cursor: 'pointer'
    }
  })
)

const NewsBlurb = ({
  title,
  linkURL = '',
  summary,
  readMoreCaption,
  ...rest
}: Props) => {
  const classes = useStyles()

  return (
    <Box {...rest}>
      <FlexLink
        detectNext
        variant="subtitle2"
        color="primary"
        href={linkURL}
        className={classes.link}
      >
        {title}
      </FlexLink>
      <Spacing size="x-small" />
      <Type paragraph variant="body2">
        {summary}{' '}
        <FlexLink
          detectNext
          variant="inherit"
          href={linkURL}
          className={classes.link}
        >
          <em>{readMoreCaption}</em>
        </FlexLink>
      </Type>
    </Box>
  )
}

export default NewsBlurb
