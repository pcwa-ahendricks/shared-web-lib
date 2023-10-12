import React from 'react'
import {TextField} from '@mui/material'
import {FieldProps} from 'formik'

type Props = {
  disabled?: boolean
  fullWidth?: boolean
} & FieldProps<any>

const OtherHowDidYouHearField = ({
  field,
  form,
  disabled,
  fullWidth = true,
  ...other
}: Props) => {
  const {name, value} = field
  // const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const {errors, handleChange, isSubmitting, handleBlur} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  // const fieldWasTouched = Boolean(touched[name])
  // const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="Tell Us How You Heard About this Rebate Program"
      variant="outlined"
      margin="normal"
      helperText={fieldHasError ? <>{currentError}</> : null}
      // error={fieldIsTouchedWithError}
      error={fieldHasError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default OtherHowDidYouHearField
