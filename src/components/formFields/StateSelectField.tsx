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

const STATE_LIST = [
  'Alabama - AL',
  'Alaska - AK',
  'Arizona - AZ',
  'Arkansas - AR',
  'California - CA',
  'Colorado - CO',
  'Connecticut - CT',
  'Delaware - DE',
  'Florida - FL',
  'Georgia - GA',
  'Hawaii - HI',
  'Idaho - ID',
  'Illinois - IL',
  'Indiana - IN',
  'Iowa - IA',
  'Kansas - KS',
  'Kentucky - KY',
  'Louisiana - LA',
  'Maine - ME',
  'Maryland - MD',
  'Massachusetts - MA',
  'Michigan - MI',
  'Minnesota - MN',
  'Mississippi - MS',
  'Missouri - MO',
  'Montana - MT',
  'Nebraska - NE',
  'Nevada - NV',
  'New Hampshire - NH',
  'New Jersey - NJ',
  'New Mexico - NM',
  'New York - NY',
  'North Carolina - NC',
  'North Dakota - ND',
  'Ohio - OH',
  'Oklahoma - OK',
  'Oregon - OR',
  'Pennsylvania - PA',
  'Rhode Island - RI',
  'South Carolina - SC',
  'South Dakota - SD',
  'Tennessee - TN',
  'Texas - TX',
  'Utah - UT',
  'Vermont - VT',
  'Virginia - VA',
  'Washington - WA',
  'West Virginia - WV',
  'Wisconsin - WI',
  'Wyoming - WY'
]

const StateSelectField = ({
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
    (
      e: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      handleChange(e)
      onChange && onChange(e)
    },
    [handleChange, onChange]
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
      <InputLabel htmlFor="state-select">State</InputLabel>
      <Select
        required={required}
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="state-select"
            name={name}
            autoComplete="address-level1"
            labelWidth={36}
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
        {STATE_LIST.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
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

export default StateSelectField
