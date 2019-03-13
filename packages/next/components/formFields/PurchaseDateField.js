// @flow
import React, {useCallback} from 'react'
import {DatePicker} from 'material-ui-pickers'
import {FormControl} from '@material-ui/core'
import {type Form, type Field} from 'formik'
import {isDate} from 'date-fns'

type Props = {
  field: Field,
  form: Form
}

const PurchaseDateField = ({field, form, ...other}: Props) => {
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

  return (
    <FormControl
      required
      margin="normal"
      disabled={isSubmitting}
      // error={currentError && fieldTouched}
    >
      <DatePicker
        keyboard
        clearable
        disableFuture
        name={name}
        disabled={isSubmitting}
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

export default PurchaseDateField
