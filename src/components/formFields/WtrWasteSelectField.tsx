import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import {FormControlProps} from '@mui/material/FormControl'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (e: SelectChangeEvent) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  FormControlProps

const REASONS = [
  'Broken Sprinkler or Drip',
  'Water running onto adjacent properties, sidewalks, and/or streets',
  'Other; please provide us a detailed description'
]

const WtrWasteSelectField = ({
  field,
  form,
  onChange,
  required,
  disabled = false,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const changeHandler = useCallback(
    (e: SelectChangeEvent) => {
      handleChange(e)
      onChange?.(e)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required={required}
      variant="outlined"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      {...other}
    >
      <InputLabel id="water-waste-reason-select-label">
        Type of Water Waste
      </InputLabel>
      <Select
        labelId="water-waste-reason-select-label"
        label="Type of Water Waste"
        id="water-waste-reason-select"
        required={required}
        value={value}
        autoWidth
        variant="outlined"
        inputProps={{
          name,
          // autoComplete=""
          error: fieldIsTouchedWithError
        }}
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 50}}}
      >
        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
        {REASONS.map((reason) => (
          <MenuItem key={reason} value={reason}>
            {reason}
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

export default WtrWasteSelectField
