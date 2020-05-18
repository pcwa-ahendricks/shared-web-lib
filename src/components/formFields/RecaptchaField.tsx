import React, {useCallback, useRef, useEffect, useMemo} from 'react'
import {FormControl, FormHelperText} from '@material-ui/core'
import Recaptcha from 'react-google-recaptcha'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
  required?: boolean
} & FieldProps<any>

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

const RecaptchaField = ({
  field,
  form,
  fullWidth = true,
  required = true,
  disabled = false,
  ...other
}: Props) => {
  const recaptchaRef = useRef<Recaptcha>(null)
  const prevCaptchaRef = useRef<string>('')

  const {name, value} = field
  const {
    errors,
    setFieldValue
    // touched
    // setFieldError,
    // isSubmitting,
    // handleBlur
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)

  const resetCaptcha = useCallback(() => {
    const recaptchaInstance = recaptchaRef.current
    recaptchaInstance && recaptchaInstance.reset()
    setFieldValue(name, '') // Need to reset form value too to disable submit button.
  }, [name, setFieldValue])

  // Seems like there would be a way to accomplish this with Formik (w/out useEffect) but nothing I've tried has worked.
  useEffect(() => {
    // Don't need to reset the captcha on initial render or redundantly, hence use of useRef hook.
    if (!value && prevCaptchaRef.current !== value) {
      resetCaptcha()
    }
    prevCaptchaRef.current = value
  }, [value, resetCaptcha])

  const recaptchaChangeHandler = useCallback(
    (response) => {
      setFieldValue(name, response)
    },
    [name, setFieldValue]
  )

  const recaptchaExpiredHandler = useCallback(() => {
    setFieldValue(name, '')
  }, [name, setFieldValue])

  // const disabled = Boolean(isSubmitting)
  // Can't disable Recaptcha control. So hide it instead when form control is disabled.
  const mainEl = useMemo(
    () =>
      disabled ? null : (
        <FormControl
          required={required}
          margin="normal"
          // Since we are using FormHelperText error prop is required.
          error={fieldHasError}
          fullWidth={fullWidth}
        >
          <Recaptcha
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={recaptchaChangeHandler}
            onExpired={recaptchaExpiredHandler}
            size="normal"
            ref={recaptchaRef}
            // Doesn't appear onBlur is fired.
            // onBlur={handleBlur}
            {...other}
          />

          <FormHelperText error={fieldHasError}>
            {fieldHasError ? currentError : ''}
          </FormHelperText>
        </FormControl>
      ),
    [
      fieldHasError,
      currentError,
      disabled,
      fullWidth,
      other,
      recaptchaExpiredHandler,
      required,
      recaptchaChangeHandler
    ]
  )

  return <>{mainEl}</>
}

export default RecaptchaField
