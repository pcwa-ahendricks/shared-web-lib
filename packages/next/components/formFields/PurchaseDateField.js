// @flow
import React, {useCallback} from 'react'
import {DatePicker} from 'material-ui-pickers'
import {FormControl} from '@material-ui/core'
import {type Form, type Field} from 'formik'
import {isDate} from 'date-fns'

type Props = {
  field: Field,
  form: Form,
  fullWidth: boolean
}

const PurchaseDateField = ({field, form, fullWidth, ...other}: Props) => {
  const {name, value} = field
  const {
    errors,
    setFieldError,
    setFieldValue,
    touched,
    isSubmitting,
    handleBlur
  } = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  // Save date as string in form (may be null).
  const changeHandler = useCallback(
    (date) => setFieldValue(name, isDate(date) ? date.toJSON() : null, true),
    [name, setFieldValue]
  )

  const disabled = Boolean(isSubmitting)
  return (
    // TODO - It would be nice if there was a way to automatically validate the field when the correct input is finally entered with keyboard. Currently, the user has to hit enter or blur the field in order to trigger the validation.
    <FormControl
      required
      margin="normal"
      disabled={disabled}
      // Since we are not using FormHelperText error prop is not required.
      // error={currentError && fieldTouched}
      fullWidth={fullWidth}
    >
      <DatePicker
        keyboard
        // clearable
        disableFuture
        name={name}
        disabled={disabled}
        value={value}
        format="MM/dd/yyyy"
        variant="outlined"
        label="Purchase Date"
        helperText={currentError && fieldTouched ? currentError : null}
        error={currentError && fieldTouched}
        onError={(_, error) => setFieldError(name, error)}
        onChange={changeHandler}
        onInputChange={changeHandler}
        disableOpenOnEnter
        onBlur={handleBlur}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        {...other}
      />
      {/* <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText> */}
    </FormControl>
  )
}

PurchaseDateField.defaultProps = {
  fullWidth: true
}

export default PurchaseDateField
