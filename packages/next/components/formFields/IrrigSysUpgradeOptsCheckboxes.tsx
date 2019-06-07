import React, {useCallback, useMemo} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  Theme
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
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

const useStyles = makeStyles((theme: Theme) => ({
  fcLabel: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 2,
      marginTop: 2
    }
  }
}))

export const formControlItems = {
  'Conversion of existing high volume sprinkler systems to low volume drip irrigation systems': false,
  'Conversion of existing high volume sprinkler nozzles with low precipitation or rotary nozzles': false,
  'Installation of pressure regulating equipment or irrigation valves that reduce pressure to the irrigation system': false,
  'Removal of leaking or broken irrigation equipment and replace with new parts': false,
  'Installation of irrigation system flow sensor': false,
  'Install EPA WaterSense approved weather based irrigation controller(s)': false
}

export type IrrigSysUpgradeOpts = typeof formControlItems
export type IrrigSysUpgradeOpt = keyof IrrigSysUpgradeOpts

const IrrigSysUpgradeOptsCheckboxes = ({
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

export default IrrigSysUpgradeOptsCheckboxes
