// @flow
import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  classes: any,
  onChange?: (Array<any>) => void
}

const styles = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

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

const CitySelectField = ({field, form, classes, onChange, ...other}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      onChange && onChange(...args)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      disabled={isSubmitting}
      {...other}
    >
      <InputLabel
        htmlFor="city-select"
        error={currentError && fieldTouched}
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
            name="city"
            autoComplete="billing address-level2"
            labelWidth={36}
            error={currentError && fieldTouched}
          />
        }
        onChange={changeHandler}
        onBlur={handleBlur}
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
      <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default withStyles(styles)(CitySelectField)
