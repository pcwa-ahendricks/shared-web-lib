import React from 'react'
import {Box} from '@material-ui/core'
import {Form} from 'formik'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children: React.ReactNode} & BoxProps

const FormBox = ({children, ...rest}: Props) => {
  return (
    <Box component={Form} {...rest}>
      {children}
    </Box>
  )
}

export default FormBox
