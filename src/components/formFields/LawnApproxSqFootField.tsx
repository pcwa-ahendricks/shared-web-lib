import React from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {useField, useFormikContext} from 'formik'

type Props = TextFieldProps

const LawnApproxSqFootField = ({
  fullWidth = true,
  disabled = false,
  variant = 'outlined',
  margin = 'normal',
  ...other
}: Props) => {
  const {isSubmitting} = useFormikContext<any>()
  const [field, meta] = useField(other as any) // [TODO] Remove cast
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
      variant={variant}
      margin={margin}
      helperText={fieldIsTouchedWithError ? <>{error}</> : null}
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
