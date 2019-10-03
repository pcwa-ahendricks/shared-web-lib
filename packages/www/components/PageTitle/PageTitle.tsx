import React from 'react'
import {Box, Typography as Type, Divider, Theme} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import {createStyles, makeStyles} from '@material-ui/styles'

type Props = {
  subtitle: string
  title: string
} & BoxProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitle: {
      textTransform: 'uppercase'
    },
    divider: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    }
  })
)

const PageTitle = ({subtitle, title, ...rest}: Props) => {
  const classes = useStyles()
  return (
    <Box {...rest}>
      <Type
        variant="subtitle2"
        color="primary"
        gutterBottom
        className={classes.subtitle}
      >
        {subtitle}
      </Type>
      <Type variant="h1" color="primary">
        {title}
      </Type>
      <Divider className={classes.divider} />
    </Box>
  )
}

export default PageTitle
