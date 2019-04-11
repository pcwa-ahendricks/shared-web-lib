// @flow
import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  classes: any,
  fullWidth?: boolean
}

const styles = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

export const IRRIGATION_METHODS = [
  'Hand water',
  'Sprinkler system operated manually',
  'Sprinkler system operated by irrigation controller'
]

const IrrigationTypesSelect = ({
  field,
  form,
  classes,
  fullWidth = true,
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

  // Don't wait for onBlur event to trigger touched/validation errors. Using setFieldTouched() to immediately show validation errors if invalid option is selected.
  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      setFieldTouched(name, true, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      disabled={isSubmitting}
      error={currentError && fieldTouched}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel
        htmlFor="irrigation-method-select"
        classes={{
          root: classes.inputLabel
        }}
      >
        Irrigation Method
      </InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="irrigation-method-select"
            name={name}
            labelWidth={140}
            error={currentError && fieldTouched}
          />
        }
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 50}}}
      >
        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
        {IRRIGATION_METHODS.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default withStyles(styles)(IrrigationTypesSelect)
