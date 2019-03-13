// @flow
import React from 'react'
import {DatePicker} from 'material-ui-pickers'
import {FormControl, FormHelperText} from '@material-ui/core'
import {type Form, type Field} from 'formik'

type Props = {
  field: Field,
  form: Form
}

const PurchaseDateField = ({field, form, ...other}: Props) => {
  const {name, value} = field
  const {errors, setFieldError, setFieldValue, touched, isSubmitting} = form
  const currentError = errors[name]
  const fieldTouched = touched[name]

  return (
    <FormControl
      required
      margin="normal"
      disabled={isSubmitting}
      error={Boolean(currentError)}
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
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(_, error) => setFieldError(name, error)}
        onChange={(date) => setFieldValue(name, date, true)}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        {...other}
      />
      <FormHelperText error={currentError && fieldTouched}>
        {currentError && fieldTouched ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default PurchaseDateField
