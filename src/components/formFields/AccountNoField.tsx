import React, {useCallback} from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {useField, useFormikContext} from 'formik'
import InputAdornment from '@mui/material/InputAdornment'
import ShowMeAccountInfo from '@components/ShowMeAccountInfo/ShowMeAccountInfo'

type Props = TextFieldProps

const AccountNoField = ({
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const {isSubmitting} = useFormikContext<any>()
  const [field, meta, helpers] = useField(other as any) // [TODO] Remove cast
  const {value, onBlur, name} = field
  const {touched, error} = meta
  const {setValue} = helpers

  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched

  // Trim whitespace.
  const changeHandler = useCallback(
    (evt?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {value = ''} = evt?.target ?? {}
      setValue(value.trim())
    },
    [setValue]
  )

  return (
    <TextField
      type="text"
      required
      name={name}
      value={value}
      inputProps={{...field}} // Is this necessary? Not sure but included just in case. Used in Formik useField docs, see https://jaredpalmer.com/formik/docs/api/useField for more info.
      label="Account Number"
      // placeholder="XXXX-XXXXX"
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? <>{error}</> : null}
      error={fieldIsTouchedWithError}
      onChange={changeHandler}
      onBlur={onBlur}
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
