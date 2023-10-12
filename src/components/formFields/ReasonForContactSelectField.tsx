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

const REASON_LIST = [
  'Billing',
  'Water service',
  'Water quality',
  'Water efficiency',
  'Employment',
  'Clerk to the Board',
  'Purchasing',
  'Engineering',
  'Rebate',
  'Website',
  'Other'
]

const ReasonForContactSelectField = ({
  field,
  form,
  onChange,
  fullWidth = true,
  required = true,
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
      onChange && onChange(e)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required={required}
      variant="outlined"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel id="reason-select-label">
        Reason for Contacting PCWA
      </InputLabel>
      <Select
        labelId="reason-select-label"
        label="Reason for Contacting PCWA"
        id="reason-select"
        value={value}
        required={required}
        autoWidth
        variant="outlined"
        inputProps={{name, error: fieldIsTouchedWithError}}
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 70}}}
      >
        {REASON_LIST.map((reason) => (
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

export default ReasonForContactSelectField
