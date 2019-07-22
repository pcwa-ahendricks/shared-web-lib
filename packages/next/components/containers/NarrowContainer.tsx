import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import {RowBox} from '@components/boxes/FlexBox'

type Props = {children: React.ReactNode; containerProps?: BoxProps} & BoxProps

const NarrowContainer = ({children, containerProps, ...rest}: Props) => {
  return (
    <RowBox justifyContent="space-around" {...containerProps}>
      <Box
        flex="auto"
        maxWidth={700} // Ported from original pcwa.net website (Semantic-UI).
        ml={2}
        mr={2}
        {...rest}
      >
        {children}
      </Box>
    </RowBox>
  )
}

export default NarrowContainer
