import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import {SelectProps} from '@material-ui/core/Select'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  inputLabel: string
  fullWidth?: boolean
  disabled?: boolean
  inputId?: OutlinedInputProps['id']
  labelWidth?: number
  SelectDisplayProps?: SelectProps['SelectDisplayProps']
} & FieldProps<any>

const useStyles = makeStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

export const ANSWERS = ['Yes', 'No']

const YesNoSelectField = ({
  field,
  form,
  inputLabel,
  fullWidth = true,
  disabled = false,
  inputId = 'form-select-id',
  labelWidth = 0, // Material-UI default.
  SelectDisplayProps = {style: {minWidth: 50}}, // Adequate minimum.
  ...other
}: Props) => {
  const classes = useStyles()
  const {name, value} = field
  const {
    errors,
    handleChange,
    isSubmitting,
    handleBlur,
    touched,
    setFieldTouched
  } = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  // Don't wait for onBlur event to trigger touched/validation errors. Using setFieldTouched() to immediately show validation errors if invalid option is selected.
  const changeHandler = useCallback(
    (evt: React.ChangeEvent<any>) => {
      handleChange(evt)
      setFieldTouched(name, true, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      margin="normal"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel
        htmlFor={inputId}
        classes={{
          root: classes.inputLabel
        }}
      >
        {inputLabel}
      </InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id={inputId}
            name={name}
            labelWidth={labelWidth}
            error={fieldIsTouchedWithError}
          />
        }
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={SelectDisplayProps}
      >
        {ANSWERS.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
      <WaitToGrow isIn={fieldIsTouchedWithError}>
        <FormHelperText error={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? currentError : null}
        </FormHelperText>
      </WaitToGrow>
    </FormControl>
  )
}

export default YesNoSelectField
