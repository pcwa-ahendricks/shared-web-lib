import React from 'react'
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
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (event: React.FormEvent<HTMLDivElement>) => void
  fullWidth?: boolean
} & FieldProps<any>

const useStyles = makeStyles({
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
      <WaitToGrow isIn={fieldIsTouchedWithError}>
        <FormHelperText error={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? currentError : null}
        </FormHelperText>
      </WaitToGrow>
    </FormControl>
  )
}

export default PropertyTypeSelectField
