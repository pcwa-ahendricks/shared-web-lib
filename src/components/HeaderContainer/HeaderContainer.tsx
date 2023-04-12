import React from 'react'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import {Box} from '@mui/material'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'

const HeaderContainer = () => {
  return (
    <>
      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
        <SecondaryHeader />
      </Box>
      <PrimaryHeader />
    </>
  )
}

export default HeaderContainer
