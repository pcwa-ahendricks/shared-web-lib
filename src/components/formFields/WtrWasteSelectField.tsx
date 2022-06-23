import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {FormControlProps} from '@material-ui/core/FormControl'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  FormControlProps

const REASONS = [
  'Watering on wrong days or time of day',
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
  console.log(value)

  const changeHandler = useCallback(
    (
      e: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
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
      <InputLabel htmlFor="reason-select">Type of Water Waste</InputLabel>
      <Select
        required={required}
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="reason-select"
            name={name}
            // autoComplete=""
            labelWidth={165}
            error={fieldIsTouchedWithError}
          />
        }
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
        <FormHelperText error={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? currentError : null}
        </FormHelperText>
      </WaitToGrow>
    </FormControl>
  )
}

export default WtrWasteSelectField
