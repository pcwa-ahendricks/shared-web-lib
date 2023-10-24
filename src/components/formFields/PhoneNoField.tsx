import React from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  TextFieldProps

const PhoneNoField = ({
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
      type="tel"
      required
      name={name}
      value={value}
      label="Phone Number"
      // placeholder="jane.doe@pcwa.net"
      autoComplete="tel-national"
      variant="outlined"
      helperText={fieldIsTouchedWithError ? <>{currentError}</> : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default PhoneNoField
