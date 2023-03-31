import React, {useEffect, useState} from 'react'
import {useField, useFormikContext} from 'formik'
import {DateTimePicker} from '@mui/x-date-pickers-pro'
import {TextField, TextFieldProps, useMediaQuery, useTheme} from '@mui/material'

type Props = Partial<React.ComponentProps<typeof DateTimePicker>>

const FormDateTimeField = ({disabled, ...other}: Props) => {
  const {isSubmitting, setFieldValue} = useFormikContext<any>()
  const [field, meta] = useField(other as any) // [HACK] Fix type.
  // const {name, value, onBlur, onChange} = field
  const {name, value, onBlur} = field
  const {touched, error} = meta
  const [open, setOpen] = useState(false)
  const fieldHasError = Boolean(error)
  const fieldIsTouchedWithError = fieldHasError && touched && !open // don't immediately show error message
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
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
    <DateTimePicker
      renderInput={(props: TextFieldProps) => (
        <TextField
          fullWidth={isXs}
          name={name}
          helperText={fieldIsTouchedWithError ? error : null}
          error={fieldIsTouchedWithError}
          onBlur={onBlur}
          {...props}
        />
      )}
      disabled={disabled || isSubmitting}
      value={value || null}
      onChange={(date) => setFieldValue(name, date, false)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...other}
    />
  )
}

export default FormDateTimeField
