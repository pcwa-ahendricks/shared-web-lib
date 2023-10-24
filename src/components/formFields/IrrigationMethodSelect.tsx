import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

export const IRRIGATION_METHODS = [
  'Hand water',
  'In-ground sprinkler system operated manually',
  'In-ground sprinkler system operated by irrigation controller'
]

const IrrigationTypesSelect = ({
  field,
  form,
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
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Don't wait for onBlur event to trigger touched/validation errors. Using setFieldTouched() to immediately show validation errors if invalid option is selected.
  const changeHandler = useCallback(
    (evt: SelectChangeEvent) => {
      handleChange(evt)
      setFieldTouched(name, true, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel id="irrigation-method-select-label">
        Irrigation Method
      </InputLabel>
      <Select
        labelId="irrigation-method-select-label"
        label="Irrigation Method"
        id="irrigation-method-select"
        required
        value={value}
        autoWidth
        variant="outlined"
        inputProps={{
          name,
          error: fieldIsTouchedWithError
        }}
        onChange={changeHandler}
        onBlur={handleBlur}
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
      <WaitToGrow isIn={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? (
          <FormHelperText error={fieldIsTouchedWithError}>
            <>{currentError}</>
          </FormHelperText>
        ) : (
          <></>
        )}
      </WaitToGrow>
    </FormControl>
  )
}

export default IrrigationTypesSelect
