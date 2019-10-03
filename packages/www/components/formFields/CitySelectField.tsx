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

const CITY_LIST = [
  'Alta',
  'Applegate',
  'Auburn',
  'Baxter',
  'Colfax',
  'Dutch Flat',
  'Gold Run',
  'Granite Bay',
  'Lincoln',
  'Loomis',
  'Meadow Vista',
  'Newcastle',
  'Penryn',
  'Rocklin',
  'Roseville',
  'Weimar',
  'Other'
]

const CitySelectField = ({
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
      <InputLabel htmlFor="city-select">City</InputLabel>
      <Select
        required={required}
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="city-select"
            name={name}
            autoComplete="billing address-level2"
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
        {CITY_LIST.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
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

export default CitySelectField
