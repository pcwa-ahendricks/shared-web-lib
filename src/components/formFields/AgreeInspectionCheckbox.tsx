import React, {useCallback} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import {FieldProps} from 'formik'
import {safeCastBooleanToStr, safeCastStrToBoolean} from '@lib/safeCastBoolean'

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
    // handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldTouched,
    setFieldValue
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched.
  const changeHandler = useCallback(
    (e: React.ChangeEvent<any>) => {
      const checked: boolean = e.target.checked
      const checkedStr = safeCastBooleanToStr(checked)
      setFieldValue(name, checkedStr, true)
      setFieldTouched(name, true)
    },
    [setFieldValue, setFieldTouched, name]
  )

  // Don't allow value to be undefined since that will cause an error message in the console. Indeterminate checkboxes use a different field if that functionality is needed.
  const isChecked = safeCastStrToBoolean(value) || false
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
        label="Check here to agree to an inspection"
        control={
          <Checkbox
            checked={isChecked}
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
