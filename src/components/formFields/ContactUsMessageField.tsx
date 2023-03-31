import React from 'react'
import {TextField} from '@mui/material'
import {TextFieldProps} from '@mui/material/TextField'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  TextFieldProps

const ContactUsMessageField = ({
  field,
  form,
  required = true,
  fullWidth = true,
  disabled = false,
  variant = 'outlined',
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
      required={required}
      name={name}
      value={value}
      label="Message"
      autoComplete="name"
      variant={variant}
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      multiline
      rows={4}
      maxRows={10}
      {...other}
    />
  )
}

export default ContactUsMessageField
