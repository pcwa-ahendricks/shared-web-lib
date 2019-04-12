// @flow
// cspell:ignore addtl
import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form,
  classes: any,
  onChange?: (Array<any>) => void,
  fullWidth: boolean
}

const styles: StyleRulesCallback = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

const IrrigCntrlAddtlField = ({
  field,
  form,
  classes,
  fullWidth,
  onChange,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  const changeHandler = useCallback(
    (...args) => {
      handleChange(...args)
      onChange && onChange(...args)
    },
    [handleChange, onChange]
  )

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="Additional Sensor / Outdoor Cover"
      variant="outlined"
      margin="normal"
      helperText={currentError && fieldTouched ? currentError : null}
      error={currentError && fieldTouched}
      onChange={changeHandler}
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

IrrigCntrlAddtlField.defaultProps = {
  fullWidth: true
}

export default withStyles(styles)(IrrigCntrlAddtlField)
