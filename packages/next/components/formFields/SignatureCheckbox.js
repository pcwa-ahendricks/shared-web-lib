// @flow
import React, {useCallback} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  onChange?: (Array<any>) => void
}

const AccountNoField = ({field, form, onChange, ...other}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      onChange && onChange(...args)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      error={currentError && fieldTouched}
      disabled={isSubmitting}
      component="fieldset"
      {...other}
    >
      <FormControlLabel
        required
        label="Check here to sign"
        control={
          <Checkbox
            checked={value}
            value="signed signature"
            color="primary"
            inputProps={{
              name: name
            }}
            onChange={changeHandler}
            onBlur={handleBlur}
          />
        }
      />
      <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default AccountNoField
