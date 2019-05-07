import React, {useCallback} from 'react'
import {DatePicker} from 'material-ui-pickers'
import {FormControl} from '@material-ui/core'
import {FieldProps} from 'formik'
import {isDate} from 'date-fns'

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
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Save date as string in form (may be null).
  const changeHandler = useCallback(
    (date) => setFieldValue(name, isDate(date) ? date.toJSON() : null, true),
    [name, setFieldValue]
  )

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
    >
      <DatePicker
        // Don't let label cover <Header/>.
        style={{zIndex: 0}}
        required={required}
        keyboard
        // clearable
        disableFuture
        name={name}
        disabled={disabled}
        value={value}
        format="MM/dd/yyyy"
        placeholder="mm/dd/yyyy"
        variant="outlined"
        label="Purchase Date"
        helperText={fieldIsTouchedWithError ? currentError : null}
        error={fieldIsTouchedWithError}
        onError={() => setFieldError(name, 'Error with Start Date')}
        onChange={changeHandler}
        onInputChange={changeHandler}
        disableOpenOnEnter
        onBlur={handleBlur}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        {...other}
      />
      {/* <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText> */}
    </FormControl>
  )
}

export default PurchaseDateField
