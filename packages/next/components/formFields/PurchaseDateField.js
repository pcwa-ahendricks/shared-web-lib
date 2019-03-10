// @flow
import React from 'react'
import {DatePicker} from 'material-ui-pickers'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form
}

const PurchaseDateField = ({field, form, ...other}: Props) => {
  const {name, value} = field
  const {errors, setFieldError, setFieldValue} = form
  const currentError = errors[name]
  return (
    <DatePicker
      keyboard
      clearable
      disableFuture
      name={name}
      value={value}
      format="MM/dd/yyyy"
      variant="outlined"
      label="Purchase Date"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => setFieldError(name, error)}
      onChange={(date) => setFieldValue(name, date, true)}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      {...other}
    />
  )
}

export default PurchaseDateField
