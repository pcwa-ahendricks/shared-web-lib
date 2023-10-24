// cspell:ignore addtl
import React, {useCallback} from 'react'
import {TextField} from '@mui/material'
import {FieldProps} from 'formik'

type Props = {
  onChange?: (e: React.ChangeEvent<any>) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const IrrigCntrlAddtlField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  onChange,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const changeHandler = useCallback(
    (evt: React.ChangeEvent) => {
      handleChange(evt)
      onChange && onChange(evt)
    },
    [handleChange, onChange]
  )

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="Additional Sensor / Outdoor Cover"
      variant="outlined"
      helperText={fieldIsTouchedWithError ? <>{currentError}</> : null}
      error={fieldIsTouchedWithError}
      onChange={changeHandler}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default IrrigCntrlAddtlField
