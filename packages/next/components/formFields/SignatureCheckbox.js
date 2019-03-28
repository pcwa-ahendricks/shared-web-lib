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
  onChange?: (Array<any>) => void,
  fullWidth: boolean
}

const AccountNoField = ({
  field,
  form,
  onChange,
  fullWidth,
  ...other
}: Props) => {
  const {name, value} = field
  const {
    errors,
    handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldTouched
  } = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  // Checkbox is not setting touched on handleChange. Touched will be triggered explicitly using this custom change handler which additionally calls handleChange.
  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      setFieldTouched(name, true)
      onChange && onChange(...args)
    },
    [handleChange, onChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      error={currentError && fieldTouched}
      disabled={isSubmitting}
      component="fieldset"
      fullWidth={fullWidth}
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
              name
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

AccountNoField.defaultProps = {
  fullWidth: true
}

export default AccountNoField
