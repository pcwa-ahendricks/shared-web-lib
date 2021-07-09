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
  Theme,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import {FieldProps} from 'formik'

type Props = {
  // onChange?: (Array<any>) => void,
  fullWidth?: boolean
  caption: string
  disabled?: boolean
} & FieldProps<any>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    group: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    formLabel: {
      lineHeight: 1.25 // Default is 1 and it appears to cramped.
    }
  })
)

const WatersenseRadioField = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  caption,
  ...other
}: Props) => {
  const classes = useStyles()
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
      <FormLabel component="span" classes={{root: classes.formLabel}}>
        <Type variant="body1" component="span">
          {caption}
        </Type>
        <Link
          href="https://www.epa.gov/watersense/product-search"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.epa.gov/watersense/product-search
        </Link>
      </FormLabel>
    ),
    [classes, caption]
  )

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
      {formLabelEl}
      <RadioGroup
        aria-label="CEE Tier 3 Water Factor"
        name={name}
        className={classes.group}
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

      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default WatersenseRadioField
