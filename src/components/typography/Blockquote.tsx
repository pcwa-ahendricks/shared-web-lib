import React from 'react'
import {
  Box,
  Typography as Type,
  BoxProps,
  TypographyProps,
  useTheme
} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles(() =>
  createStyles({
    type: {
      fontSize: 'inherit'
    }
  })
)

const Blockquote = ({
  children,
  italic = true,
  spacing,
  boxProps,
  ...rest
}: {
  children: React.ReactNode
  italic?: boolean
  spacing?: number
  boxProps?: BoxProps
  rest?: TypographyProps
}) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <Box
      fontSize="1.2em"
      paddingLeft={8}
      borderLeft={theme.spacing(1)}
      borderColor={theme.palette.grey['200']}
      mt={spacing ?? 4}
      mb={spacing ?? 4}
      {...boxProps}
    >
      <Type component="blockquote" paragraph className={classes.type} {...rest}>
        {italic ? <em>{children}</em> : {children}}
      </Type>
    </Box>
  )
}

export default Blockquote
