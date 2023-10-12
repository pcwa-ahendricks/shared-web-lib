import React, {useCallback, useMemo} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  FormControlProps,
  FormLabelProps
} from '@mui/material'
import {FieldProps} from 'formik'

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

type Props = {
  onChange?: (e: React.ChangeEvent<any>) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

export const formControlItems = {
  'I certify that I am a Placer County Water Agency treated water customer.':
    false,
  'I certify that I have read the Treated Water Leak Rebate Requirements.':
    false,
  'I certify that I have proof of the leak prior to repairs being made.': false,
  'I certify that I have receipts/invoices for the repairs.': false
}

export type LeakEligibleOpts = typeof formControlItems
export type LeakEligibleOpt = keyof LeakEligibleOpts

const WaterLeakRequireCheckboxes = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const style = useMemo(
    () => ({
      fcLabel: {
        marginBottom: '2px',
        marginTop: '2px'
      }
    }),
    []
  )
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
    (cbVal: string) => (event: React.ChangeEvent<any>) => {
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
              color="secondary"
              onBlur={handleBlur}
            />
          }
          sx={{...style.fcLabel}}
        />
      )),
    [handleBlur, handleChange, value, style]
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
      <MyFormLabel component="legend" style={{marginBottom: '0.5rem'}}>
        You must acknowledge the following requirements
      </MyFormLabel>
      <FormGroup>
        <>{formControlItemsEl}</>
      </FormGroup>

      {fieldIsTouchedWithError ? (
        <FormHelperText error={fieldIsTouchedWithError}>
          <>{currentError}</>
        </FormHelperText>
      ) : null}
    </MyFormControl>
  )
}

export default WaterLeakRequireCheckboxes
