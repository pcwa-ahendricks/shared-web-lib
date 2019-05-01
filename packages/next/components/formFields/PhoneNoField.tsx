import React from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, createStyles} from '@material-ui/core/styles'
import {FieldProps} from 'formik'

type Props = {
  classes: any
  fullWidth?: boolean
} & FieldProps<any>

const styles = createStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const PhoneNoField = ({
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
    <TextField
      type="tel"
      required
      name={name}
      value={value}
      label="Phone Number"
      // placeholder="jane.doe@pcwa.net"
      autoComplete="tel-national"
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
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

export default withStyles(styles)(PhoneNoField)
