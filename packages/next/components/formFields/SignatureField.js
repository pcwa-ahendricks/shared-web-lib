// @flow
import React from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  classes: any,
  fullWidth: boolean
}

const styles: StyleRulesCallback = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

const SignatureField = ({field, form, classes, fullWidth, ...other}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  return (
    <TextField
      type="text"
      required
      name={name}
      value={value}
      label="Name"
      // autoComplete="name" // Seems that user should type this explicitly
      // autoFocus
      variant="filled"
      margin="normal"
      helperText={currentError && fieldTouched ? currentError : null}
      error={currentError && fieldTouched}
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

SignatureField.defaultProps = {
  fullWidth: true
}

export default withStyles(styles)(SignatureField)
