import React from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, createStyles} from '@material-ui/core/styles'
import {FieldProps} from 'formik'

type Props = {
  classes: any
  disabled?: boolean
  fullWidth?: boolean
} & FieldProps<any>

const styles = createStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const OtherCityField = ({
  field,
  form,
  classes,
  disabled,
  fullWidth = true,
  ...other
}: Props) => {
  const {name, value} = field
  // const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const {errors, handleChange, isSubmitting, handleBlur} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  // const fieldWasTouched = Boolean(touched[name])
  // const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="City (other)"
      autoComplete="billing address-level2"
      variant="outlined"
      margin="normal"
      // helperText={fieldIsTouchedWithError ? currentError : null}
      helperText={fieldHasError ? currentError : null}
      // error={fieldIsTouchedWithError}
      error={fieldHasError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
      InputLabelProps={{
        classes: {
          root: classes.inputLabel
        }
      }}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default withStyles(styles)(OtherCityField)
