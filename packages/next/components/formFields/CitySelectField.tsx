import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'

type Props = {
  onChange?: (e: React.ChangeEvent) => void
  fullWidth?: boolean
} & FieldProps<any>

const useStyles = makeStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

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
  ...other
}: Props) => {
  const classes = useStyles()
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const changeHandler = useCallback(
    (e: React.ChangeEvent) => {
      handleChange(e)
      onChange && onChange(e)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      disabled={isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel
        htmlFor="city-select"
        classes={{
          root: classes.inputLabel
        }}
      >
        City
      </InputLabel>
      <Select
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
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default CitySelectField
