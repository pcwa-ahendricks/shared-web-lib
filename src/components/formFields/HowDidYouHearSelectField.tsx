import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  FormControlProps,
  SelectChangeEvent
} from '@mui/material'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (e: SelectChangeEvent) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any> &
  FormControlProps

const ANSWER_LIST = [
  'Radio',
  'TV Commercial',
  'Facebook/Twitter',
  'News',
  'Newspaper',
  'PCWA Staff',
  'Website'
]
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()))
  .concat('Other')

const HowDidYouHearSelectField = ({
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
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel id="how-did-you-hear-select-label">
        How Did You Hear About this Rebate Program?
      </InputLabel>
      <Select
        labelId="how-did-you-hear-select-label"
        label="How Did You Hear About this Rebate Program?"
        id="how-did-you-hear-select"
        required={required}
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
        {ANSWER_LIST.map((answer) => (
          <MenuItem key={answer} value={answer}>
            {answer}
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

export default HowDidYouHearSelectField
