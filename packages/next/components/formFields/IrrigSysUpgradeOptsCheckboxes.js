// @flow
import React, {useCallback, useMemo} from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  withWidth
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  onChange?: (Array<any>) => void,
  fullWidth: boolean,
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = {
  fcXsLabel: {
    marginBottom: 2,
    marginTop: 2
  }
}

export const formControlItems = {
  'Conversion of existing high volume sprinkler systems to low volume drip irrigation systems': false,
  'Conversion of existing high volume sprinkler nozzles with low precipitation or rotary nozzles': false,
  'Installation of pressure regulating equipment or irrigation valves that reduce pressure to the irrigation system': false,
  'Removal of leaking or broken irrigation equipment and replace with new parts': false,
  'Installation of irrigation system flow sensor': false,
  'Install EPA WaterSense approved weather based irrigation controller(s)': false
}

export type IrrigSysUpgradeOpt = $Keys<typeof formControlItems>
export type IrrigSysUpgradeOpts = typeof formControlItems

const IrrigSysUpgradeOptsCheckboxes = ({
  field,
  form,
  fullWidth,
  width,
  classes,
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
  const fieldTouched = touched[name]

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched for entire formGroup (not individual check boxes).
  const handleChange = useCallback(
    (cbVal) => (event) => {
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
          classes={{root: width === 'xs' ? classes.fcXsLabel : null}}
        />
      )),
    [handleBlur, handleChange, value, classes, width]
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
      <FormLabel component="legend">Select all that apply</FormLabel>
      <FormGroup>
        <React.Fragment>{formControlItemsEl}</React.Fragment>
      </FormGroup>
      <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

IrrigSysUpgradeOptsCheckboxes.defaultProps = {
  fullWidth: true
}

export default withWidth()(withStyles(styles)(IrrigSysUpgradeOptsCheckboxes))
