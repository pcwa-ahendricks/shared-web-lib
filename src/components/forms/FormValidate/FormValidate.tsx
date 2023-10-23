import React, {useEffect, useRef} from 'react'
import {useFormikContext} from 'formik'
import equal from 'fast-deep-equal'

type Props = {
  children: React.ReactNode
}

const FormValidate = ({children}: Props) => {
  const {values, validateForm} = useFormikContext<any>()
  const prevValues = useRef(values)

  useEffect(() => {
    if (!equal(prevValues.current, values)) {
      // Validate the form values any time they are updated.
      // IMPORTANT! Need to wrap validateForm() in setTimeout or everything will lock up when text is input into a textfield
      setTimeout(() => validateForm())
    }
  }, [values, validateForm])
  return <>{children}</>
}

export default FormValidate
