import React from 'react'
import {Box, Typography as Type, BoxProps, TypographyProps} from '@mui/material'
import useTheme from '@hooks/useTheme'

const Blockquote = ({
  children,
  italic = true,
  spacing,
  boxProps,
  sx,
  ...rest
}: {
  children: React.ReactNode
  italic?: boolean
  spacing?: number
  boxProps?: BoxProps
} & TypographyProps) => {
  const theme = useTheme()

  return (
    <Box
      paddingLeft={8}
      mt={spacing ?? 4}
      mb={spacing ?? 4}
      sx={{
        borderWidth: 0,
        borderLeftWidth: theme.spacing(1),
        borderRadius: 0,
        borderColor: theme.palette.grey['200'],
        borderStyle: 'solid'
      }}
      {...boxProps}
    >
      <Type
        component="blockquote"
        paragraph
        sx={{fontSize: '1.4rem', ...sx}}
        {...rest}
      >
        {italic ? (
          <Box component="em" sx={{fontSize: '1.4rem'}}>
            {children}
          </Box>
        ) : (
          children
        )}
      </Type>
    </Box>
  )
}

export default Blockquote
