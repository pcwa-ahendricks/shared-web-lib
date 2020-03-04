import React from 'react'
import {TextField} from '@material-ui/core'
import {OutlinedTextFieldProps} from '@material-ui/core/TextField'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  OutlinedTextFieldProps

const ContactUsSubjectField = ({
  field,
  form,
  required = true,
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
      required={required}
      name={name}
      value={value}
      label="Subject"
      autoComplete="name"
      variant="outlined"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      multiline
      {...other}
    />
  )
}

export default ContactUsSubjectField
