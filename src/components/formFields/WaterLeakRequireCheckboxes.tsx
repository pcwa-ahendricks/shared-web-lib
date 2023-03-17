import React, {useCallback, useMemo} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  Theme,
  makeStyles
} from '@material-ui/core'
import {FieldProps} from 'formik'
import {FormControlProps} from '@material-ui/core/FormControl'
import {FormLabelProps} from '@material-ui/core/FormLabel'

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

const useStyles = makeStyles((_theme: Theme) => ({
  fcLabel: {
    marginBottom: 2,
    marginTop: 2
    // [theme.breakpoints.down('xs')]: {
    //   marginBottom: 2,
    //   marginTop: 2
    // }
  }
}))

export const formControlItems = {
  'I certify that I am a Placer County Water Agency treated water customer.':
    false,
  'I certify that I have read the Treated Water Leak Rebate Requirements.':
    false,
  'I certify that I have proof of the leak prior to repairs being made.': false,
  'I certify that I have receipts/Invoices for the repairs.': false
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
  const classes = useStyles()
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
    (cbVal) => (event: React.ChangeEvent<any>) => {
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
              // color="primary"
              onBlur={handleBlur}
            />
          }
          classes={{root: classes.fcLabel}}
        />
      )),
    [handleBlur, handleChange, value, classes]
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
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </MyFormControl>
  )
}

export default WaterLeakRequireCheckboxes
