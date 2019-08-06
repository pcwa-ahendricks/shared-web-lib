// cspell:ignore waterefficiency
import React, {useCallback} from 'react'
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'
import {safeCastBooleanToStr, safeCastStrToBoolean} from '@lib/safeCastBoolean'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
  label: React.ReactNode
} & FieldProps<any>

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      maxWidth: '100%' // IE11 fix.
    }
  })
)

const EmailAttachmentsSwitch = ({
  field,
  form,
  // onChange,
  fullWidth = true,
  disabled = false,
  label,
  ...other
}: Props) => {
  const {name, value} = field
  const {
    errors,
    // handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldTouched,
    setFieldValue
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const classes = useStyles()

  // Checkbox is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched.
  const changeHandler = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      // const checked: boolean = e.target.checked
      const checkedStr = safeCastBooleanToStr(checked)
      setFieldValue(name, checkedStr, true)
      setFieldTouched(name, true)
    },
    [setFieldValue, setFieldTouched, name]
  )

  // Don't allow value to be undefined since that will cause an error message in the console. Indeterminate checkboxes use a different field if that functionality is needed.
  const isChecked = safeCastStrToBoolean(value) || false
  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      error={fieldIsTouchedWithError}
      disabled={disabled || isSubmitting}
      component="fieldset"
      fullWidth={fullWidth}
      {...other}
    >
      <FormControlLabel
        classes={{root: classes.label}}
        label={label}
        control={
          <Switch
            checked={isChecked}
            value="emailAttachments"
            color="secondary"
            inputProps={{
              name
            }}
            onChange={changeHandler}
            onBlur={handleBlur}
          />
        }
      />
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default EmailAttachmentsSwitch
