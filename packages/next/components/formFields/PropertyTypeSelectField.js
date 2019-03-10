// @flow
import React from 'react'
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

const PROPERTY_TYPE_LIST = [
  'Single Family Residential',
  'Multi-family Residential',
  'Dedicated Landscape',
  'Commercial',
  'Industrial',
  'Institutional'
]

const CitySelectField = ({field, form, classes, ...other}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      disabled={isSubmitting}
      {...other}
    >
      <InputLabel
        htmlFor="property-type-select"
        error={currentError && fieldTouched}
        classes={{
          root: classes.inputLabel
        }}
      >
        Property Type
      </InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="property-type-select"
            name={name}
            labelWidth={110}
            error={currentError && fieldTouched}
          />
        }
        onChange={handleChange}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 120}}}
      >
        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
        {PROPERTY_TYPE_LIST.map((propertyType) => (
          <MenuItem key={propertyType} value={propertyType}>
            {propertyType}
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
