import React, {useState} from 'react'
import {useField, useFormikContext} from 'formik'
import {DateTimePicker, DateTimePickerProps} from '@material-ui/pickers'

type Props = Omit<DateTimePickerProps, 'onChange' | 'value'>

/*
See https://material-ui-pickers.dev/guides/form-integration for more info on Formik integration
*/

const FormDateTimeField = ({disabled, ...other}: Props) => {
  const {isSubmitting, setFieldValue} = useFormikContext<any>()
  const [field, meta] = useField(other as any) // [HACK] Fix type.
  // const {name, value, onBlur, onChange} = field
  const {name, value, onBlur} = field
  const {touched, error} = meta
  const [open, setOpen] = useState(false)
  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched && !open // don't immediately show error message

  return (
    <DateTimePicker
      // type={type}
      // variant={variant}
      disabled={disabled || isSubmitting}
      // fullWidth={fullWidth}
      name={name}
      value={value || null}
      helperText={fieldIsTouchedWithError ? error : null}
      error={fieldIsTouchedWithError}
      onChange={(date) => setFieldValue(name, date, false)}
      onBlur={onBlur}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...other}
    />
  )
}

export default FormDateTimeField
