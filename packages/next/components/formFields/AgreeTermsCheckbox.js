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
  // onChange?: (Array<any>) => void,
  fullWidth: boolean
}

const AgreeTermsCheckbox = ({
  field,
  form,
  // onChange,
  fullWidth,
  ...other
}: Props) => {
  const {name, value} = field
  const {
    errors,
    // handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldTouched,
    setFieldValue
  } = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched.
  const changeHandler = useCallback(
    (evt) => {
      setFieldValue(name, evt.target.checked, true)
      setFieldTouched(name, true)
      // onChange && onChange(...args)
    },
    [setFieldValue, setFieldTouched, name]
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
        label="Check here to acknowledge terms and conditions"
        control={
          <Checkbox
            checked={value}
            value="acknowledgement"
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

AgreeTermsCheckbox.defaultProps = {
  fullWidth: true
}

export default AgreeTermsCheckbox
