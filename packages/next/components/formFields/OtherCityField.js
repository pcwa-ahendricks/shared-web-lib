// @flow
import React from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  classes: any,
  disabled?: boolean,
  fullWidth: boolean
}

const styles: StyleRulesCallback = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

const OtherCityField = ({
  field,
  form,
  classes,
  disabled,
  fullWidth,
  ...other
}: Props) => {
  const {name, value} = field
  // const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const {errors, handleChange, isSubmitting, handleBlur} = form
  const currentError = errors[name]
  // const fieldTouched = touched[name]

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="City (other)"
      autoComplete="billing address-level2"
      variant="outlined"
      margin="normal"
      // helperText={currentError && fieldTouched ? currentError : null}
      helperText={currentError ? currentError : null}
      // error={currentError && fieldTouched}
      error={Boolean(currentError)}
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

OtherCityField.defaultProps = {
  fullWidth: true
}

export default withStyles(styles)(OtherCityField)
