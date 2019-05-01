import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {withStyles, createStyles} from '@material-ui/core/styles'
import {FieldProps} from 'formik'

type Props = {
  classes: any
  onChange?: (event: React.FormEvent<HTMLDivElement>) => void
  fullWidth?: boolean
} & FieldProps<any>

const styles = createStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const PROPERTY_TYPE_LIST = [
  'Single Family Residential',
  'Multi-family Residential',
  'Dedicated Landscape',
  'Commercial',
  'Industrial',
  'Institutional'
]

const PropertyTypeSelectField = ({
  field,
  form,
  classes,
  fullWidth = true,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

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
        htmlFor="property-type-select"
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
            error={fieldIsTouchedWithError}
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
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default withStyles(styles)(PropertyTypeSelectField)
