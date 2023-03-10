import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import {SelectProps} from '@material-ui/core/Select'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  inputLabel: string
  fullWidth?: boolean
  disabled?: boolean
  inputId?: OutlinedInputProps['id']
  labelWidth?: number
  SelectDisplayProps?: SelectProps['SelectDisplayProps']
  required?: boolean
  onChange?: (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
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
  labelWidth = 0, // Material-UI default.
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
    (evt: React.ChangeEvent<any>) => {
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
      <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id={inputId}
            name={name}
            labelWidth={labelWidth}
            error={fieldIsTouchedWithError}
          />
        }
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
        <FormHelperText error={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? currentError : null}
        </FormHelperText>
      </WaitToGrow>
    </FormControl>
  )
}

export default YesNoSelectField
