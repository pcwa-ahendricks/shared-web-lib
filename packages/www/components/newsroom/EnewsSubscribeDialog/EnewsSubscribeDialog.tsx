import React, {useContext, useCallback, useState, useMemo} from 'react'
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
import {
  NewsroomContext,
  setEnewsDialogOpen
} from '@components/newsroom/NewsroomStore'
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

interface FormData {
  email: string
}

const schema = object().shape({
  email: string()
    .email('Invalid email address')
    .required('Required')
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

const EnewsSubscribeDialog = () => {
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const newsroomContext = useContext(NewsroomContext)
  const [mailchimpError, setMailchimpError] = useState<Partial<
    MailchimpSubscribeResponseBody
  > | null>(null)
  const newsroomDispatch = newsroomContext.dispatch
  const {enewsDialogOpen} = newsroomContext.state
  const classes = useStyles()

  const handleClose = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(false))
  }, [newsroomDispatch])

  const handleEnter = useCallback(() => {
    setSubmittedSuccess(false)
    setMailchimpError(null)
  }, [])

  const submitFormHandler = useCallback(
    async ({email}: FormData, actions: FormikHelpers<FormData>) => {
      try {
        const body: MailchimpSubscribePostBody = {
          // eslint-disable-next-line @typescript-eslint/camelcase
          email_address: email,
          status: 'subscribed'
        }
        const res = await subscribeToEnews(body)
        if (!res.ok) {
          try {
            const data: MailchimpSubscribeResponseBody = await res.json()
            // eslint-disable-next-line @typescript-eslint/camelcase
            setMailchimpError({...data, email_address: email})
          } catch (err) {
            const text = await res.text()
            const errorTitle = text || res.statusText
            // eslint-disable-next-line @typescript-eslint/camelcase
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
    const errorMessage = /member exists/gi.test(mailchimpError?.title ?? '')
      ? `The email address "${mailchimpError?.email_address}" is already subscribed with PCWA's E-News. You can close this window or enter another email address.`
      : mailchimpError?.title
      ? mailchimpError.title
      : generalErrorStr
    return <DialogContentText>{errorMessage}</DialogContentText>
  }, [mailchimpError])

  const hasMailchimpError = useMemo(
    () =>
      mailchimpError && Object.keys(mailchimpError).length > 0 ? true : false,
    [mailchimpError]
  )

  const submittedWithoutError = submittedSuccess && !hasMailchimpError

  return (
    <Dialog
      // Using both maxWidth and fullWidth prevents the width from changing while child elements are added/subtracted from the dialog content.
      maxWidth="xs"
      fullWidth
      open={enewsDialogOpen}
      onClose={handleClose}
      onEnter={handleEnter}
      aria-labelledby="form-dialog-title"
      keepMounted={false} // Be explicit about this even though it is the default behavior. We want the form to reset each time the modal opens.
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
                  ? 'Subscribe to PCWA E-News'
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
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    className={classes.textField}
                  />
                </WaitToGrow>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
                {submittedSuccess || hasMailchimpError ? (
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                ) : null}

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

export default EnewsSubscribeDialog
