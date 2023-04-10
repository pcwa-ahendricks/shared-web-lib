import React from 'react'
import {BoxProps} from '@mui/material'
import {ChildBox, RowBox} from '@components/MuiSleazebox'

type Props = {children: React.ReactNode; containerProps?: BoxProps} & BoxProps

const WideContainer = ({children, containerProps, ...rest}: Props) => {
  return (
    <RowBox justifyContent="space-around" {...containerProps}>
      <ChildBox
        flex
        width="100%" // IE fix
        maxWidth={{xs: 723, sm: 723, md: 933, lg: 1127}}
        ml={{xs: 2, sm: 4, md: 8, lg: 16}}
        mr={{xs: 2, sm: 4, md: 8, lg: 16}}
        sx={
          {
            // overflowX: 'scroll' // helps with debugging width issues. Added when debugging <AppBar/> for child <Tabs/> in [publication] Page.
          }
        }
        {...rest}
      >
        {children}
      </ChildBox>
    </RowBox>
  )
}

export default WideContainer
