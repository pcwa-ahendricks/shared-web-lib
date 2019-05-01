// cspell:ignore addtl
import React, {useCallback} from 'react'
import {TextField} from '@material-ui/core'
import {withStyles, createStyles} from '@material-ui/core/styles'
import {FieldProps} from 'formik'

type Props = {
  classes: any
  onChange?: (e: React.ChangeEvent<any>) => void
  fullWidth?: boolean
} & FieldProps<any>

const styles = createStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const IrrigCntrlAddtlField = ({
  field,
  form,
  classes,
  fullWidth = true,
  onChange,
  ...other
}: Props) => {
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const changeHandler = useCallback(
    (evt: React.ChangeEvent) => {
      handleChange(evt)
      onChange && onChange(evt)
    },
    [handleChange, onChange]
  )

  return (
    <TextField
      type="text"
      name={name}
      value={value}
      label="Additional Sensor / Outdoor Cover"
      variant="outlined"
      margin="normal"
      helperText={fieldIsTouchedWithError ? currentError : null}
      error={fieldIsTouchedWithError}
      onChange={changeHandler}
      onBlur={handleBlur}
      disabled={isSubmitting}
      InputLabelProps={{
        classes: {
          root: classes.inputLabel
        }
      }}
      fullWidth={fullWidth}
      {...other}
    />
  )
}

export default withStyles(styles)(IrrigCntrlAddtlField)
