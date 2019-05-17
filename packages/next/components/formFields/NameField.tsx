import React from 'react'
import {TextField} from '@material-ui/core'
import {OutlinedTextFieldProps} from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
} & FieldProps<any> &
  OutlinedTextFieldProps

const useStyles = makeStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const LastNameField = ({
  field,
  form,
  required = false,
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
    <TextField
      type="text"
      required={required}
      name={name}
      value={value}
      label="Name (optional)"
      autoComplete="name"
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

export default LastNameField
