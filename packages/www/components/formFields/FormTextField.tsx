import React from 'react'
import {TextField} from '@material-ui/core'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const FormTextField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default FormTextField
