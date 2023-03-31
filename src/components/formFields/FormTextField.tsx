import React from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {useFormikContext, useField} from 'formik'

type Props = TextFieldProps

const FormTextField = ({
  fullWidth = true,
  disabled = false,
  variant = 'outlined',
  margin = 'normal',
  type = 'text',
  ...other
}: Props) => {
  // Deprecated implementation using FieldProps.
  // const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  // const currentError = errors[name]
  // const fieldHasError = Boolean(currentError)
  // const fieldWasTouched = Boolean(touched[name])
  // const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const {isSubmitting} = useFormikContext<any>()
  const [field, meta] = useField(other as any) // [HACK] Fix type.
  const {name, value, onBlur, onChange} = field
  const {touched, error} = meta
  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched

  return (
    <TextField
      type={type}
      name={name}
      value={value}
      variant={variant}
      margin={margin}
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

export default FormTextField
