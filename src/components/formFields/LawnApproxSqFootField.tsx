import React from 'react'
import {TextField} from '@material-ui/core'
import {useField, useFormikContext} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
  name: string
}

const LawnApproxSqFootField = ({
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const {isSubmitting} = useFormikContext<any>()
  const [field, meta] = useField(other)
  const {value, onBlur, name, onChange} = field
  const {touched, error} = meta

  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched

  return (
    <TextField
      type="string"
      required
      name={name}
      value={value}
      label="Approximate Sq. Feet of Existing Lawn"
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? error : null}
      error={fieldIsTouchedWithError}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default LawnApproxSqFootField
