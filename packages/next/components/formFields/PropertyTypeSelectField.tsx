import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (event: React.FormEvent<HTMLDivElement>) => void
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const PROPERTY_TYPE_LIST = [
  'Single Family Residential',
  'Multi-family Residential',
  'Dedicated Landscape',
  'Commercial',
  'Industrial',
  'Institutional',
  'Tenant Occupied'
]

const PropertyTypeSelectField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
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
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel htmlFor="property-type-select">Property Type</InputLabel>
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
      <WaitToGrow isIn={fieldIsTouchedWithError}>
        <FormHelperText error={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? currentError : null}
        </FormHelperText>
      </WaitToGrow>
    </FormControl>
  )
}

export default PropertyTypeSelectField
