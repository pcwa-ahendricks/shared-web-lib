// @flow
import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import {type Form, type Field} from 'formik'
import {isDate, parse, format} from 'date-fns'

// Format HTML input type="date" uses using date-fns format. See https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md for more info and common pitfalls. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for info regarding HTML <input type="date"/>
const HTML_DATE_INPUT_FORMAT = 'yyyy-MM-dd'

type Props = {
  classes: any,
  field: Field,
  form: Form,
  fullWidth: boolean
}

const styles: StyleRulesCallback = {
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
}

const PurchaseDateNativeField = ({
  classes,
  field,
  form,
  fullWidth,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, setFieldValue, touched, isSubmitting, handleBlur} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  // Save date as string in form (may be null).
  const changeHandler = useCallback(
    (evt) => {
      const {value} = evt.target || {}
      const date = value
        ? parse(value, HTML_DATE_INPUT_FORMAT, new Date())
        : null
      // Allow native input form field to be cleared by setting value to null when date is invalid or non-existent.
      setFieldValue(name, date && isDate(date) ? date.toJSON() : null, true)
    },
    [name, setFieldValue]
  )

  const maskedValue =
    value && isDate(new Date(value))
      ? format(new Date(value), HTML_DATE_INPUT_FORMAT)
      : ''
  return (
    <TextField
      type="date"
      required
      name={name}
      value={maskedValue}
      label="Purchase Date"
      variant="outlined"
      margin="normal"
      placeholder="mm/dd/yyyy"
      helperText={currentError && fieldTouched ? currentError : null}
      error={currentError && fieldTouched}
      onChange={changeHandler}
      onBlur={handleBlur}
      disabled={isSubmitting}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.inputLabel
        }
      }}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

PurchaseDateNativeField.defaultProps = {
  fullWidth: true
}

export default withStyles(styles)(PurchaseDateNativeField)
