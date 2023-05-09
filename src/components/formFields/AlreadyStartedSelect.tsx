import React, {useCallback} from 'react'
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography as Type,
  useTheme
} from '@mui/material'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import {Theme} from '@lib/material-theme'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

export const ANSWERS = [
  'I have not started my project yet',
  'I have started my project but have not completed it',
  'I have completed my project'
]

const AlreadyStartedSelect = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
  ...other
}: Props) => {
  const theme = useTheme<Theme>()
  const style = {
    menuItem: {
      minWidth: theme.spacing(8)
    }
  }
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
    (e: SelectChangeEvent) => {
      handleChange(e)
      setFieldTouched(name, true, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <Box>
      <Type variant="body1" paragraph>
        Projects that are initiated prior to PCWA's approval will be assessed on
        a case by case basis. You will contacted by a Water Efficiency
        Specialist to schedule an appointment to determine your eligibility.
      </Type>
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
          htmlFor="already-started-select"
          sx={{bgcolor: 'background.default', paddingX: 1}}
        >
          What is the status of your Lawn Replacement project?
        </InputLabel>
        <Select
          value={value}
          autoWidth={true}
          variant="outlined"
          input={
            <OutlinedInput
              id="already-started-select"
              name={name}
              error={fieldIsTouchedWithError}
            />
          }
          onChange={changeHandler}
          onBlur={handleBlur}
          SelectDisplayProps={{style: {minWidth: 100}}}
        >
          {ANSWERS.map((answer) => (
            <MenuItem key={answer} value={answer} sx={{...style.menuItem}}>
              {answer}
            </MenuItem>
          ))}
        </Select>
        <WaitToGrow isIn={fieldIsTouchedWithError}>
          {fieldIsTouchedWithError ? (
            <FormHelperText error={fieldIsTouchedWithError}>
              currentError
            </FormHelperText>
          ) : (
            <></>
          )}
        </WaitToGrow>
      </FormControl>
    </Box>
  )
}

export default AlreadyStartedSelect
