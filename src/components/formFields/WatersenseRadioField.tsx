// cspell:ignore watersense
import React, {useMemo, useCallback} from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Typography as Type
} from '@mui/material'

import {FieldProps} from 'formik'
import useTheme from '@hooks/useTheme'

type Props = {
  // onChange?: (Array<any>) => void,
  fullWidth?: boolean
  caption: string
  disabled?: boolean
} & FieldProps<any>

const WatersenseRadioField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  caption,
  ...other
}: Props) => {
  const theme = useTheme()
  const style = useMemo(
    () => ({
      group: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
      },
      formLabel: {
        lineHeight: 1.25 // Default is 1 and it appears to cramped.
      }
    }),
    [theme]
  )
  const {name, value} = field
  const {
    errors,
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

  // RadioGroup is not setting touched on handleChange or setFieldValue. Touched will be triggered explicitly using this custom change handler which additionally calls setFieldTouched.
  const changeHandler = useCallback(
    (_evt: React.ChangeEvent<HTMLInputElement>, value: string) => {
      const newValue = value
      setFieldValue(name, newValue, true)
      setFieldTouched(name, true)
    },
    [name, setFieldTouched, setFieldValue]
  )

  const radioValues = [
    {
      key: 1,
      label: 'Yes',
      value: 'Yes'
    },
    {
      key: 2,
      label: 'No',
      value: 'No'
    },
    {
      key: 3,
      label: 'Not Sure',
      value: 'Not Sure'
    }
  ]

  const formLabelEl = useMemo(
    () => (
      <FormLabel component="span" sx={{...style.formLabel}}>
        <Type variant="body1" component="span">
          {caption}
        </Type>
        <Link
          href="https://www.epa.gov/watersense/product-search"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          https://www.epa.gov/watersense/product-search
        </Link>
      </FormLabel>
    ),
    [style, caption]
  )

  return (
    <FormControl
      required
      variant="outlined"
      error={fieldIsTouchedWithError}
      disabled={disabled || isSubmitting}
      component="fieldset"
      fullWidth={fullWidth}
      {...other}
    >
      {formLabelEl}
      <RadioGroup
        aria-label="CEE Tier 3 Water Factor"
        name={name}
        sx={{...style.group}}
        value={value}
        onChange={changeHandler}
      >
        {radioValues.map((radio) => (
          <FormControlLabel
            key={radio.key}
            label={radio.label}
            value={radio.value}
            control={<Radio onBlur={handleBlur} />}
          />
        ))}
      </RadioGroup>

      {fieldIsTouchedWithError ? (
        <FormHelperText error={fieldIsTouchedWithError}>
          <>{currentError}</>
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default WatersenseRadioField
