import React, {useCallback, useMemo} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel
} from '@material-ui/core'
import {FieldProps} from 'formik'
import {FormControlProps} from '@material-ui/core/FormControl'
import {FormLabelProps} from '@material-ui/core/FormLabel'

type Props = {
  onChange?: (e: React.FormEvent<HTMLDivElement>) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

/**
 * This is used to correct Types so "legend" and "fieldset" can be used.
 */
interface MyFormControlProps extends FormControlProps {
  component?: any
}
interface MyFormLabelProps extends FormLabelProps {
  component?: any
}
const MyFormControl: React.ComponentType<MyFormControlProps> = FormControl
const MyFormLabel: React.ComponentType<MyFormLabelProps> = FormLabel

export const formControlItems = {
  'Front yard': false,
  'Back yard': false,
  'Side yard': false
}

export type IrrigUpgradeLocationOpts = typeof formControlItems
export type IrrigUpgradeLocationOpt = keyof IrrigUpgradeLocationOpts

const IrrigUpgradeLocationCheckboxes = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const {name, value = formControlItems} = field
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

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched for entire formGroup (not individual check boxes).
  const handleChange = useCallback(
    (cbVal) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = {...value, [cbVal]: event.target.checked}
      setFieldTouched(name, true)
      setFieldValue(name, newValue, true)
    },
    [setFieldTouched, setFieldValue, value, name]
  )

  const formControlItemsEl = useMemo(
    () =>
      Object.keys(formControlItems).map((val, idx) => (
        <FormControlLabel
          key={idx}
          // required
          label={val}
          control={
            <Checkbox
              checked={value[val]}
              onChange={handleChange(val)}
              value={val}
              onBlur={handleBlur}
            />
          }
        />
      )),
    [handleBlur, handleChange, value]
  )

  return (
    <MyFormControl
      required
      variant="outlined"
      margin="normal"
      error={fieldIsTouchedWithError}
      disabled={disabled || isSubmitting}
      component="fieldset"
      fullWidth={fullWidth}
      {...other}
    >
      <MyFormLabel component="legend">Select all that apply</MyFormLabel>
      <FormGroup>
        <React.Fragment>{formControlItemsEl}</React.Fragment>
      </FormGroup>
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </MyFormControl>
  )
}

export default IrrigUpgradeLocationCheckboxes
