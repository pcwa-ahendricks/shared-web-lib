// @flow
import React from 'react'
import {DatePicker} from 'material-ui-pickers'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form
}

const PurchaseDateField = ({field, form, ...other}: Props) => {
  const currentError = form.errors[field.name]
  return (
    <DatePicker
      keyboard
      clearable
      disableFuture
      name={field.name}
      value={field.value}
      format="MM/dd/yyyy"
      variant="outlined"
      label="Purchase Date"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={(date) => form.setFieldValue(field.name, date, true)}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      {...other}
    />
  )
}

export default PurchaseDateField
