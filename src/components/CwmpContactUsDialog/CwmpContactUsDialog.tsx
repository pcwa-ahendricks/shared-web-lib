import React, {useCallback, useState, useMemo} from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import {Formik, Form, FormikHelpers} from 'formik'
import {object, string} from 'yup'
import FormTextField from '@components/formFields/FormTextField'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import {
  subscribeToEnews,
  MailchimpSubscribePostBody,
  MailchimpSubscribeResponseBody
} from '@lib/services/mailchimpService'

type Props = {
  open?: boolean
  onCloseDialog?: () => void
}

interface FormData {
  email: string
}

const schema = object().shape({
  email: string().email('Invalid email address').required('Required')
})

const generalErrorStr =
  'An unknown error occurred. Please try again later and reach out to our Customer Services Department to report this issue if it persists.'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)

const CwmpContactUsDialog = ({open = false, onCloseDialog}: Props) => {
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [mailchimpError, setMailchimpError] =
    useState<Partial<MailchimpSubscribeResponseBody> | null>(null)
  const classes = useStyles()

  const handleEnter = useCallback(() => {
    setSubmittedSuccess(false)
    setMailchimpError(null)
  }, [])

  const submitFormHandler = useCallback(
    async ({email}: FormData, actions: FormikHelpers<FormData>) => {
      try {
        const body: MailchimpSubscribePostBody = {
          email_address: email,
          status: 'subscribed'
        }
        const res = await subscribeToEnews(body)
        if (!res.ok) {
          try {
            const data: MailchimpSubscribeResponseBody = await res.json()
            setMailchimpError({...data, email_address: email})
          } catch (err) {
            const text = await res.text()
            const errorTitle = text || res.statusText
            setMailchimpError({title: errorTitle, email_address: email})
            const error = new Error(errorTitle)
            console.warn(error)
          }
        } else {
          setSubmittedSuccess(true)
          setMailchimpError(null)
          actions.resetForm() // Likely not necessary with this form since it will reset once the modal re-opens, but why not.
        }
      } catch (error) {
        setMailchimpError({title: generalErrorStr}) // Need to set at least one property so that error becomes truthy below.
        console.warn(error)
      }
    },
    []
  )

  const ErrorDialogContentText = useCallback(() => {
    const errorMessage = mailchimpError?.title
      ? mailchimpError?.title
      : generalErrorStr
    return <DialogContentText>{errorMessage}</DialogContentText>
  }, [mailchimpError?.title])

  const hasMailchimpError = useMemo(
    () =>
      mailchimpError && Object.keys(mailchimpError).length > 0 ? true : false,
    [mailchimpError]
  )

  const submittedWithoutError = submittedSuccess && !hasMailchimpError

  return (
    <Dialog
      // maxWidth="xs"
      // fullWidth
      open={open}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          // onClose?.(event, reason)
          onCloseDialog?.()
        }
      }}
      aria-labelledby="form-dialog-title"
      keepMounted={false} // Be explicit about this even though it is the default behavior. We want the form to reset each time the modal opens.
      TransitionProps={{
        onEnter: handleEnter
      }}
    >
      <Formik
        // Always run validation. Ie. don't use validateOnBlur prop cause when a valid email is actually entered the form will remain invalid until field is blurred.
        // Instead, we control the displaying of the error message below in the field to ensure the field was touched before showing errors, which will start propagating as soon as the first character is entered in the input.
        initialValues={{email: ''}}
        validationSchema={schema}
        onSubmit={submitFormHandler}
      >
        {({touched, isSubmitting, isValid, dirty}) => {
          const formTouched = Object.keys(touched).length > 0

          return (
            // translate prop fixes typescript error.
            <Form translate="yes">
              <DialogTitle id="form-dialog-title">
                {!hasMailchimpError
                  ? 'Contact Us'
                  : 'Whoops! There was an Error'}
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText>Subscribe to PCWA E-News</DialogContentText> */}
                <WaitToGrow isIn={hasMailchimpError}>
                  <ErrorDialogContentText />
                </WaitToGrow>
                <WaitToGrow isIn={submittedWithoutError}>
                  <DialogContentText>
                    Great. You've successfully subscribed to PCWA's E-News!
                    Thank you for joining.
                  </DialogContentText>
                </WaitToGrow>
                <WaitToGrow isIn={!submittedWithoutError}>
                  <FormTextField
                    name="email"
                    // autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                  />
                </WaitToGrow>
              </DialogContent>
              <DialogActions>
                {submittedSuccess || hasMailchimpError ? (
                  <Button onClick={onCloseDialog} color="primary">
                    Close
                  </Button>
                ) : (
                  <Button onClick={onCloseDialog}>Cancel</Button>
                )}

                {!submittedWithoutError ? (
                  <SubmitFormButton
                    color="secondary"
                    variant="contained"
                    disabled={
                      isSubmitting || !isValid || (!formTouched && !dirty)
                    }
                  >
                    Subscribe
                  </SubmitFormButton>
                ) : null}
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

export default CwmpContactUsDialog
