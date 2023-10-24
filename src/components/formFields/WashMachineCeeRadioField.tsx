import React, {useCallback} from 'react'
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
  disabled?: boolean
} & FieldProps<any>

const WashMachineCeeRadioField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const theme = useTheme()
  const style = {
    group: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    formLabel: {
      lineHeight: 1.25 // Default is 1 and it appears to cramped.
    }
  }
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
      <FormLabel component="span" sx={{...style.formLabel}}>
        <Type variant="body1" component="span">
          Does the new Washing Machine have a CEE Advanced tier, tier 1 or tier
          2 water factor? Check here:{' '}
        </Type>
        <Link
          href="https://www.cee1.org/content/cee-program-resources"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          https://www.cee1.org/content/cee-program-resources
        </Link>
      </FormLabel>
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

export default WashMachineCeeRadioField
