import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import {OutlinedInputProps} from '@mui/material/OutlinedInput'
import {SelectChangeEvent, SelectProps} from '@mui/material/Select'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  inputLabel: string
  fullWidth?: boolean
  disabled?: boolean
  inputId?: OutlinedInputProps['id']
  SelectDisplayProps?: SelectProps['SelectDisplayProps']
  required?: boolean
  onChange?: (e: SelectChangeEvent) => void
} & FieldProps<any>
export type {Props as YesNoSelectFieldProps}

export const ANSWERS = ['Yes', 'No']

const YesNoSelectField = ({
  field,
  form,
  required = true,
  inputLabel,
  fullWidth = true,
  disabled = false,
  inputId = 'form-select-id',
  SelectDisplayProps = {style: {minWidth: 50}}, // Adequate minimum.
  onChange,
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
      onChange?.(evt)
    },
    [handleChange, setFieldTouched, name, onChange]
  )

  return (
    <FormControl
      required={required}
      variant="outlined"
      margin="normal"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel id={`${inputId}-label`}>{inputLabel}</InputLabel>
      <Select
        labelId={`${inputId}-label`}
        label={inputLabel}
        id={inputId}
        value={value}
        required={required}
        autoWidth
        variant="outlined"
        inputProps={{name, error: fieldIsTouchedWithError}}
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={SelectDisplayProps}
      >
        {ANSWERS.map((method) => (
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

export default YesNoSelectField
