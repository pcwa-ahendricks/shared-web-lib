import React, {useEffect} from 'react'
import {useFormikContext} from 'formik'

type Props = {
  children: React.ReactNode
}

const FormikValidate = ({children}: Props) => {
  const {values, validateForm} = useFormikContext<any>()
  useEffect(() => {
    // Validate the form values any time they are updated.
    validateForm()
  }, [values, validateForm])
  return <>{children}</>
}

export default FormikValidate
