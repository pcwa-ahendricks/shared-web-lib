import React from 'react'
import {BoxProps, Box} from '@mui/material'

type Props = {children: React.ReactNode; containerProps?: BoxProps} & BoxProps

const NarrowContainer = ({children, containerProps, ...rest}: Props) => {
  return (
    <Box display="flex" justifyContent="space-around" {...containerProps}>
      <Box
        flex="auto"
        width="100%" // IE fix
        maxWidth={700} // Ported from original pcwa.net website (Semantic-UI).
        ml={2}
        mr={2}
        sx={
          {
            // overflowX: 'scroll' // helps with debugging width issues. Added when debugging <AppBar/> for child <Tabs/> in [publication] Page, which uses <WideContainer/> and not this component. Duplicated here for consistency.
          }
        }
        {...rest}
      >
        {children}
      </Box>
    </Box>
  )
}

export default NarrowContainer
