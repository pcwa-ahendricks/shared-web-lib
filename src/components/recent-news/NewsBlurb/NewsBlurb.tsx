import React, {useCallback, useState} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  TypographyProps,
  Theme
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Spacing from '@components/boxes/Spacing'
import FlexLink from '@components/FlexLink/FlexLink'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'

type Props = {
  linkURL?: string
  // releaseDate: string
  title: string
  summary: string
  // hide: boolean
  readMoreCaption: string
} & Partial<BoxProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    readMoreCaption: {
      color: theme.palette.primary.light
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
        <FlexLink
          scroll
          detectNext
          variant="inherit"
          href={linkURL}
          className={classes.readMoreCaption}
        >
          <StrongEmphasis>{readMoreCaption}</StrongEmphasis>
        </FlexLink>
      </Type>
    </Box>
  )
}

export default NewsBlurb
