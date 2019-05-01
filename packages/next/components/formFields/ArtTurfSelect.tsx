import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {FieldProps} from 'formik'

type Props = {
  classes: any
  fullWidth?: boolean
} & FieldProps<any>

const styles = (theme: Theme) =>
  createStyles({
    // Don't let <TextField/> label cover <Header/>.
    inputLabel: {
      zIndex: 0
    },
    menuItem: {
      minWidth: theme.spacing.unit * 8
    }
  })

export const ANSWERS = [
  {caption: 'Yes', value: true},
  {caption: 'No', value: false}
]

const ArtTurfSelect = ({
  field,
  form,
  classes,
  fullWidth = true,
  ...other
}: Props) => {
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
    (e: React.ChangeEvent) => {
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
      disabled={isSubmitting}
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
        Converting to Artificial Turf
      </InputLabel>
      <Select
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="irrigation-method-select"
            name={name}
            labelWidth={209}
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
      <FormHelperText error={fieldIsTouchedWithError}>
        {fieldIsTouchedWithError ? currentError : null}
      </FormHelperText>
    </FormControl>
  )
}

export default withStyles(styles)(ArtTurfSelect)
