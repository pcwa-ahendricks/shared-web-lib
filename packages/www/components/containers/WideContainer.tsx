import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import {RowBox} from '@components/boxes/FlexBox'

type Props = {children: React.ReactNode; containerProps?: BoxProps} & BoxProps

const WideContainer = ({children, containerProps, ...rest}: Props) => {
  return (
    <RowBox justifyContent="space-around" {...containerProps}>
      <Box
        flex="auto"
        width="100%" // IE fix
        maxWidth={{xs: 723, sm: 723, md: 933, lg: 1127}}
        ml={{xs: 2, sm: 4, md: 8, lg: 16}}
        mr={{xs: 2, sm: 4, md: 8, lg: 16}}
        {...rest}
      >
        {children}
      </Box>
    </RowBox>
  )
}

export default WideContainer
