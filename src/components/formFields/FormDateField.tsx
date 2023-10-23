import React, {useEffect, useState} from 'react'
import {FieldProps, useField, useFormikContext} from 'formik'
import {DatePicker, DatePickerProps} from '@mui/x-date-pickers-pro'
import {TextFieldProps, useMediaQuery, useTheme} from '@mui/material'

const FormDateField = ({
  disabled,
  placeholder,
  ...other
}: Partial<DatePickerProps<any>> &
  Partial<FieldProps<any>> &
  Partial<TextFieldProps>) => {
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

  const {slotProps, ...rest} = other
  const {textField: textFieldProps = {}, ...restSlotProps} = slotProps || {}
  return (
    <DatePicker
      slotProps={{
        textField: {
          name,
          helperText: fieldIsTouchedWithError ? error : null,
          error: fieldIsTouchedWithError,
          onBlur,
          placeholder,
          ...textFieldProps
        },
        ...restSlotProps
      }}
      // type={type}
      // variant={variant}
      disabled={disabled || isSubmitting}
      // fullWidth={fullWidth}
      value={value || null}
      onChange={(date) => setFieldValue(name, date, false)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...rest}
    />
  )
}

export default FormDateField
