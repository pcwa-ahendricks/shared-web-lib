import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {FieldProps} from 'formik'
import InputAdornment from '@material-ui/core/InputAdornment'
import ShowMeAccountInfo from '@components/ShowMeAccountInfo/ShowMeAccountInfo'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const AccountNoField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const {name, value} = field
  const {
    errors,
    // handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldValue
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Trim whitespace.
  const changeHandler = useCallback(
    (evt) => {
      const {value = ''} = evt.target || {}
      setFieldValue(name, value.trim())
    },
    [name, setFieldValue]
  )

  return (
    <TextField
      type="text"
      required
      name={name}
      value={value}
      label="Account Number"
      // placeholder="XXXX-XXXXX"
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={changeHandler}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ShowMeAccountInfo />
          </InputAdornment>
        )
      }}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default AccountNoField
