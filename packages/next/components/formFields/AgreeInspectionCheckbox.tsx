import React, {useCallback} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const AgreeInspectionCheckbox = ({
  field,
  form,
  // onChange,
  fullWidth = true,
  disabled = false,
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
    // setFieldValue
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched.
  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      setFieldTouched(name, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      error={fieldIsTouchedWithError}
      disabled={disabled || isSubmitting}
      component="fieldset"
      fullWidth={fullWidth}
      {...other}
    >
      <FormControlLabel
        required
        label="Check here to agree to an inspection"
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
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default AgreeInspectionCheckbox
