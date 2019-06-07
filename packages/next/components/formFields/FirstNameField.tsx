import React from 'react'
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const useStyles = makeStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const FirstNameField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
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
    <TextField
      type="text"
      required
      name={name}
      value={value}
      label="First Name"
      autoComplete="billing given-name"
      // autoFocus
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
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

export default FirstNameField
