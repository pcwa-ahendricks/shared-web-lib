import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
  {caption: 'Yes', value: 'true'},
  {caption: 'No', value: 'false'}
]

const ArtTurfSelect = ({
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
    (
      e: SelectChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      handleChange(e)
      setFieldTouched(name, true, true)
    },
    [handleChange, setFieldTouched, name]
  )

  return (
    <FormControl
      required
      variant="outlined"
      disabled={disabled || isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel id="artificial-turf-select-label">
        Converting to Artificial Turf
      </InputLabel>
      <Select
        labelId="artificial-turf-select-label"
        label="Converting to Artificial Turf"
        id="irrigation-method-select"
        required
        value={value}
        autoWidth
        variant="outlined"
        inputProps={{
          name,
          error: fieldIsTouchedWithError
        }}
        onChange={changeHandler}
        onBlur={handleBlur}
      >
        {ANSWERS.map(({caption, value}) => (
          <MenuItem
            key={caption}
            value={value}
            sx={{
              ...style.menuItem
            }}
          >
            {caption}
          </MenuItem>
        ))}
      </Select>
      <WaitToGrow isIn={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? (
          <FormHelperText error={fieldIsTouchedWithError}>
            <>{currentError}</>
          </FormHelperText>
        ) : (
          <></>
        )}
      </WaitToGrow>
    </FormControl>
  )
}

export default ArtTurfSelect
