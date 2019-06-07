import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'
import {isDate, parse, format} from 'date-fns'

// Format HTML input type="date" uses using date-fns format. See https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md for more info and common pitfalls. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for info regarding HTML <input type="date"/>
const HTML_DATE_INPUT_FORMAT = 'yyyy-MM-dd'

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

const PurchaseDateNativeField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const classes = useStyles()
  const {name, value} = field
  const {errors, setFieldValue, touched, isSubmitting, handleBlur} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Save date as string in form (may be null).
  const changeHandler = useCallback(
    (evt: React.ChangeEvent<any>) => {
      const {value} = evt.target
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
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={changeHandler}
      onBlur={handleBlur}
      disabled={disabled || isSubmitting}
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

export default PurchaseDateNativeField
