import React, {useCallback, useMemo} from 'react'
import {useFormikContext} from 'formik'
import {
  Button,
  ButtonProps,
  Box,
  BoxProps,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

type Props = {boxProps?: BoxProps} & Omit<ButtonProps, 'onClick' | 'type'>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }
  })
)

const SubmitFormButton = ({children, boxProps, disabled, ...rest}: Props) => {
  const classes = useStyles()
  const {setFieldTouched, values, isSubmitting, dirty, touched} =
    useFormikContext<any>()
  // When the user clicks the submit button we want to show all the form error helper messages. Touching all the form values will trigger this.
  const clickHandler = useCallback(() => {
    Object.keys(values).map((key) => {
      setFieldTouched(key, true)
    })
  }, [setFieldTouched, values])

  // Use state to save a boolean version of 'touched'.
  const formTouched = useMemo(
    () => Object.keys(touched ?? {}).length > 0,
    [touched]
  )

  return (
    <Box position="relative" {...boxProps}>
      <Button
        type="submit"
        onClick={clickHandler}
        disabled={
          isSubmitting ||
          // || !isValid
          (!formTouched && !dirty) ||
          disabled
        }
        {...rest}
      >
        {children}
      </Button>
      {isSubmitting && (
        <CircularProgress size={24} className={classes.progress} />
      )}
    </Box>
  )
}

export default SubmitFormButton
