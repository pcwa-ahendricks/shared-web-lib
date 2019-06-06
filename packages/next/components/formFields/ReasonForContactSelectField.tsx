import React, {useCallback} from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core'
import {FormControlProps} from '@material-ui/core/FormControl'
import {makeStyles} from '@material-ui/styles'
import {FieldProps} from 'formik'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'

type Props = {
  onChange?: (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  fullWidth?: boolean
} & FieldProps<any> &
  FormControlProps

const useStyles = makeStyles({
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  }
})

const REASON_LIST = [
  'Billing',
  'Water service',
  'Water quality',
  'Water efficiency',
  'Employment',
  'Clerk to the Board',
  'Purchasing',
  'Engineering',
  'Rebate',
  'Website',
  'Other'
]

const ReasonForContactSelectField = ({
  field,
  form,
  onChange,
  fullWidth = true,
  required = true,
  ...other
}: Props) => {
  const classes = useStyles()
  const {name, value} = field
  const {errors, handleChange, isSubmitting, handleBlur, touched} = form
  const currentError = errors[name]
  const fieldHasError = Boolean(currentError)
  const fieldWasTouched = Boolean(touched[name])
  const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

  const changeHandler = useCallback(
    (
      e: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) => {
      handleChange(e)
      onChange && onChange(e)
    },
    [handleChange, onChange]
  )

  return (
    <FormControl
      required={required}
      variant="outlined"
      margin="normal"
      disabled={isSubmitting}
      error={fieldIsTouchedWithError}
      fullWidth={fullWidth}
      {...other}
    >
      <InputLabel
        htmlFor="reason-select"
        classes={{
          root: classes.inputLabel
        }}
      >
        Reason for Contacting PCWA
      </InputLabel>
      <Select
        required={required}
        value={value}
        autoWidth={true}
        variant="outlined"
        input={
          <OutlinedInput
            id="reason-select"
            name={name}
            labelWidth={228}
            error={fieldIsTouchedWithError}
          />
        }
        onChange={changeHandler}
        onBlur={handleBlur}
        SelectDisplayProps={{style: {minWidth: 70}}}
      >
        {REASON_LIST.map((reason) => (
          <MenuItem key={reason} value={reason}>
            {reason}
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

export default ReasonForContactSelectField
