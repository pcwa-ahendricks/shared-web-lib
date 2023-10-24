import React, {useMemo} from 'react'
import {TextField, Autocomplete} from '@mui/material'
import {FieldProps} from 'formik'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const options = [
  {title: 'Radio'},
  {title: 'TV Commercial'},
  {title: 'Facebook/Twitter'},
  {title: 'News'},
  {title: 'Newspaper'},
  {title: 'PCWA Staff'},
  {title: 'Website'}
]

export default function HowDidYouHearAutocomplete({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) {
  const sortedOpt = useMemo(
    () =>
      options.sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      ),
    []
  )
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  return (
    <Autocomplete
      id="free-solo-how-did-you-hear"
      freeSolo
      options={sortedOpt.map((option) => option.title)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            required
            name={name}
            onChange={handleChange}
            value={value}
            label="How Did You Hear About this Rebate Program"
            variant="outlined"
            helperText={fieldIsTouchedWithError ? <>{currentError}</> : null}
            error={fieldIsTouchedWithError}
            onBlur={handleBlur}
            disabled={disabled || isSubmitting}
            fullWidth={fullWidth}
            {...other}
          />
        )
      }}
    />
  )
}
