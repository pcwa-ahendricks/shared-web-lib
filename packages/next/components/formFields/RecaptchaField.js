// @flow
import React, {useCallback, useRef, useEffect} from 'react'
import {FormControl, FormHelperText} from '@material-ui/core'
import {type Form, type Field} from 'formik'
import Recaptcha from 'react-google-recaptcha'

type Props = {
  field: Field,
  form: Form,
  fullWidth: boolean,
  required: boolean
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_RECAPTCHA_SITE_KEY || ''

const RecaptchaField = ({
  field,
  form,
  fullWidth,
  required,
  ...other
}: Props) => {
  const recaptchaRef = useRef()
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
  // const fieldTouched = touched[name]

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
  const isError = Boolean(currentError)
  return (
    <FormControl
      required={required}
      margin="normal"
      // Since we are using FormHelperText error prop is required.
      error={isError}
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

      <FormHelperText error={isError}>
        {isError ? currentError : ''}
      </FormHelperText>
    </FormControl>
  )
}

RecaptchaField.defaultProps = {
  fullWidth: true,
  required: true
}

export default RecaptchaField
