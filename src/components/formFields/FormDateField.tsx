import React, {useEffect, useState} from 'react'
import {useField, useFormikContext} from 'formik'
import {DatePicker, DatePickerProps} from '@material-ui/pickers'
import {useMediaQuery, useTheme} from '@material-ui/core'

type Props = Omit<DatePickerProps, 'onChange' | 'value'>

/*
See https://material-ui-pickers.dev/guides/form-integration for more info on Formik integration
*/

const FormDateField = ({disabled, ...other}: Props) => {
  const {isSubmitting, setFieldValue} = useFormikContext<any>()
  const [field, meta] = useField(other as any) // [HACK] Fix type.
  // const {name, value, onBlur, onChange} = field
  const {name, value, onBlur} = field
  const {touched, error} = meta
  const [open, setOpen] = useState(false)
  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched && !open // don't immediately show error message
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 2000) // prevent route change protection dialog from popping up
    return () => {
      clearInterval(t)
    }
  }, [])

  useEffect(() => {
    if (!value && isMobile && isReady) {
      setFieldValue(name, new Date(), false)
    }
  }, [isMobile, value, setFieldValue, name, isReady])

  return (
    <DatePicker
      fullWidth={isXs}
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

export default FormDateField
