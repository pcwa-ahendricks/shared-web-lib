import React from 'react'
import {TextField, TextFieldProps} from '@material-ui/core'
import {useFormikContext, useField} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
  name: string
} & TextFieldProps

const FormTextField = ({
  fullWidth = true,
  disabled = false,
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
      type="text"
      name={name}
      value={value}
      variant={'outlined' as any} // [HACK] Fix type.
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

export default FormTextField
