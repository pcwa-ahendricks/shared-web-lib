import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Theme
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  fullWidth?: boolean
  disabled?: boolean
} & FieldProps<any>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Don't let <TextField/> label cover <Header/>.
    inputLabel: {
      zIndex: 0
    },
    menuItem: {
      minWidth: theme.spacing(8)
    }
  })
)

export const ANSWERS = [
  {caption: 'Yes', value: true},
  {caption: 'No', value: false}
]

const AlreadyStartedSelect = ({
  field,
  form,
  fullWidth = true,
  disabled = false,
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
    (e: React.ChangeEvent<any>) => {
      handleChange(e)
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
        htmlFor="irrigation-method-select"
        classes={{
          root: classes.inputLabel
        }}
      >
        Already Started Lawn Replacement
      </InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="irrigation-method-select"
            name={name}
            labelWidth={268}
            error={fieldIsTouchedWithError}
          />
        }
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 100}}}
      >
        {ANSWERS.map(({caption, value}) => (
          <MenuItem
            key={caption}
            value={value}
            classes={{root: classes.menuItem}}
          >
            {caption}
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

export default AlreadyStartedSelect
