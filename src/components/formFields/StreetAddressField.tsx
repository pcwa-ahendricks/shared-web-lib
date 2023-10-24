import React from 'react'
import {TextField} from '@mui/material'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const StreetAddressField = ({
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
      required
      name={name}
      value={value}
      label="Address (as it appears on bill)"
      autoComplete="billing street-address"
      variant="outlined"
      helperText={fieldIsTouchedWithError ? <>{currentError}</> : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      InputProps={{style: {minWidth: 275}}}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default StreetAddressField
