// @flow
import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'
import InputAdornment from '@material-ui/core/InputAdornment'
import ShowMeAccountInfo from '@components/ShowMeAccountInfo/ShowMeAccountInfo'

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

const AccountNoField = ({field, form, classes, fullWidth, ...other}: Props) => {
  const {name, value} = field
  const {
    errors,
    // handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldValue
  } = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  // Trim whitespace.
  const changeHandler = useCallback(
    (evt) => {
      const {value = ''} = evt.target || {}
      setFieldValue(name, value.trim())
    },
    [name, setFieldValue]
  )

  return (
    <TextField
      type="text"
      required
      name={name}
      value={value}
      label="Account Number"
      // placeholder="XXXX-XXXXX"
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ShowMeAccountInfo />
          </InputAdornment>
        )
      }}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

AccountNoField.defaultProps = {
  fullWidth: true
}

export default withStyles(styles)(AccountNoField)
