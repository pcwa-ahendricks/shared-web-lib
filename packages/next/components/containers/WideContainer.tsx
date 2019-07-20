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
        maxWidth={{xs: 723, sm: 723, md: 933}}
        ml={{xs: '1rem', sm: '2rem', md: '4rem'}}
        mr={{xs: '1rem', sm: '2rem', md: '4rem'}}
        {...rest}
      >
        {children}
      </Box>
    </RowBox>
  )
}

export default WideContainer
