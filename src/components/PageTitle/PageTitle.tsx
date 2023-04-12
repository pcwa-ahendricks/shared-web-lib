import React, {useMemo} from 'react'
import {
  Box,
  Typography as Type,
  Divider,
  BoxProps,
  TypographyProps
} from '@mui/material'

type Props = {
  subtitle?: string
  title: string
  hideDivider?: boolean
  titleProps?: Partial<TypographyProps>
} & BoxProps

const PageTitle = ({
  subtitle = '',
  title,
  hideDivider = false,
  titleProps,
  ...rest
}: Props) => {
  const subtitleEl = useMemo(
    () =>
      subtitle ? (
        <Type
          variant="subtitle2"
          color="primary"
          gutterBottom
          sx={{
            textTransform: 'uppercase'
          }}
        >
          {subtitle}
        </Type>
      ) : null,
    [subtitle]
  )

  const dividerEl = useMemo(
    () => (hideDivider ? null : <Divider />),
    [hideDivider]
  )

  return (
    <Box {...rest}>
      {subtitleEl}
      <Type variant="h1" color="primary" {...titleProps}>
        {title}
      </Type>
      <Box my={4}>{dividerEl}</Box>
    </Box>
  )
}

export default PageTitle
