import React from 'react'
import {Box, BoxProps} from '@mui/material'
import {Form} from 'formik'

type Props = {children: React.ReactNode} & BoxProps

const FormBox = ({children, ...rest}: Props) => {
  return (
    <Box component={Form} {...rest}>
      {children}
    </Box>
  )
}

export default FormBox
