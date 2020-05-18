import React, {useMemo} from 'react'
import {Box, Typography as Type, Divider} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import {createStyles, makeStyles} from '@material-ui/core/styles'

type Props = {
  subtitle?: string
  title: string
  hideDivider?: boolean
} & BoxProps

const useStyles = makeStyles(() =>
  createStyles({
    subtitle: {
      textTransform: 'uppercase'
    }
  })
)

const PageTitle = ({
  subtitle = '',
  title,
  hideDivider = false,
  ...rest
}: Props) => {
  const classes = useStyles()

  const subtitleEl = useMemo(
    () =>
      subtitle ? (
        <Type
          variant="subtitle2"
          color="primary"
          gutterBottom
          className={classes.subtitle}
        >
          {subtitle}
        </Type>
      ) : null,
    [subtitle, classes]
  )

  const dividerEl = useMemo(() => (hideDivider ? null : <Divider />), [
    hideDivider
  ])

  return (
    <Box {...rest}>
      {subtitleEl}
      <Type variant="h1" color="primary">
        {title}
      </Type>
      <Box my={4}>{dividerEl}</Box>
    </Box>
  )
}

export default PageTitle
