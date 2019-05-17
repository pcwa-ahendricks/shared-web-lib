import React, {useCallback, useState, useEffect, useRef} from 'react'
import {DatePicker} from '@material-ui/pickers'
import {FormControl} from '@material-ui/core'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  required?: boolean
} & FieldProps<any>

const PurchaseDateField = ({
  field,
  form,
  fullWidth = true,
  required = true,
  ...other
}: Props) => {
  const {name, value} = field as {value: string; name: string}
  const {
    errors,
    setFieldError,
    setFieldValue,
    touched,
    isSubmitting,
    handleBlur
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Save date as Date in form (not null).
  const changeHandler = useCallback((date) => setFieldValue(name, date, true), [
    name,
    setFieldValue
  ])

  // To prevent onError from calling a bunch and halting the execution of the app due to infinite re-renders we are using a ref to store the previous error, then comparing the incoming error to the previous, and only calling setFieldError() when error changes. This may not be necessary with future versions of @material-ui/pickers.
  const prevDatePickerErrorRef = useRef<any>()
  const [datePickerError, setDatePickerError] = useState<any>()
  const errorHandler = useCallback((e) => {
    setDatePickerError(e)
  }, [])
  useEffect(() => {
    if (prevDatePickerErrorRef.current !== datePickerError) {
      console.log('Setting field error', datePickerError)
      setFieldError(name, 'Error with Start Date')
    }
    prevDatePickerErrorRef.current = datePickerError
  }, [datePickerError, name, setFieldError])

  const disabled = Boolean(isSubmitting)
  return (
    // TODO - It would be nice if there was a way to automatically validate the field when the correct input is finally entered with keyboard. Currently, the user has to hit enter or blur the field in order to trigger the validation.
    <FormControl
      required={required}
      margin="normal"
      disabled={disabled}
      // Since we are not using FormHelperText error prop is not required.
      // error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      variant="outlined"
      error={fieldIsTouchedWithError}
    >
      <DatePicker
        // Don't let label cover <Header/>.
        style={{zIndex: 0}}
        inputVariant="outlined"
        required={required}
        // Deprecated - keyboard
        // clearable
        disableFuture
        name={name}
        disabled={disabled}
        value={value}
        format="MM/dd/yyyy"
        placeholder="mm/dd/yyyy"
        variant="dialog"
        label="Purchase Date"
        helperText={fieldIsTouchedWithError ? currentError : null}
        error={fieldIsTouchedWithError}
        onError={errorHandler}
        onChange={changeHandler}
        // Deprecated - onInputChange={changeHandler}
        // Deprecated - disableOpenOnEnter
        onBlur={handleBlur}
        // Deprecated - mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        {...other}
      />
      {/* <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText> */}
    </FormControl>
  )
}

export default PurchaseDateField
