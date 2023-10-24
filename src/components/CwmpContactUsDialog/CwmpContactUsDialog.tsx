import React, {useCallback, useState, useMemo} from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material'
import {Formik, Form, FormikHelpers} from 'formik'
import {object, string} from 'yup'
import FormTextField from '@components/formFields/FormTextField'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import {
  CwmpContactUsFormData,
  CwmpContactUsRequestBody,
  postForm
} from '@lib/services/formService'
import Spacing from '@components/boxes/Spacing'

const SERVICE_URI_PATH = 'cwmp-contact-us'

type Props = {
  open?: boolean
  onCloseDialog?: () => void
}

const initialFormValues: CwmpContactUsFormData = {
  name: '',
  email: '',
  message: ''
}

const schema = object()
  .camelCase()
  .strict(true)
  .shape({
    name: string().required('Please provide us your name').label('Name'),
    email: string()
      .email('Invalid email address')
      .required('Your email address is required')
      .label('Email'),
    message: string().required('Please provide us a message').label('Message')
  })

const generalErrorStr =
  'An unknown error occurred. Please try again later and reach out to our Customer Services Department to report this issue if it persists.'

const CwmpContactUsDialog = ({open = false, onCloseDialog}: Props) => {
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEnter = useCallback(() => {
    setSubmittedSuccess(false)
    setError(null)
  }, [])

  const submitFormHandler = useCallback(
    async (
      values: CwmpContactUsFormData,
      actions: FormikHelpers<CwmpContactUsFormData>
    ) => {
      try {
        // console.log(values, actions)
        const body: CwmpContactUsRequestBody = {
          formData: {...values}
        }
        await postForm(SERVICE_URI_PATH, body)
        actions.setSubmitting(false)
        // Set success status
        setSubmittedSuccess(true)
        // Reset Form
        actions.resetForm() // Strictly Formik
        // setFormSubmitDialogOpen(true)
      } catch (error) {
        console.warn('An error occurred submitting form.', error)
        // setFormSubmitDialogErrorOpen(true)
        actions.setSubmitting(false)
      }
    },
    []
  )

  const hasError = useMemo(
    () => (error && Object.keys(error).length > 0 ? true : false),
    [error]
  )

  const submittedWithoutError = submittedSuccess && !hasError

  return (
    <Dialog
      // maxWidth="xs"
      // fullWidth
      open={open}
      onClose={(_event, _reason) => {
        // if (reason !== 'backdropClick') {
        // onClose?.(event, reason)
        onCloseDialog?.()
        // }
      }}
      aria-labelledby="form-dialog-title"
      keepMounted
      TransitionProps={{
        onEnter: handleEnter
      }}
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={schema}
        onSubmit={submitFormHandler}
      >
        {({touched, isSubmitting, isValid, dirty}) => {
          const formTouched = Object.keys(touched).length > 0

          return (
            // translate prop fixes typescript error.
            <Form translate="yes">
              <DialogTitle id="form-dialog-title">
                {!hasError ? 'Contact Us' : 'Whoops! There was an Error'}
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText>Subscribe to PCWA E-News</DialogContentText> */}
                <WaitToGrow isIn={hasError}>
                  <DialogContentText>{generalErrorStr}</DialogContentText>
                </WaitToGrow>
                <WaitToGrow isIn={submittedWithoutError}>
                  <DialogContentText>
                    You're message was sent! Thank you for reaching out to us.
                    We will be in contact with you regarding any questions you
                    may have included in your message.
                  </DialogContentText>
                </WaitToGrow>
                <WaitToGrow isIn={!submittedWithoutError}>
                  <Box>
                    <FormTextField
                      id="name"
                      name="name"
                      // autoFocus
                      label="Name"
                      type="text"
                      autoComplete="name"
                      fullWidth
                      variant="standard"
                    />
                    <FormTextField
                      id="email"
                      name="email"
                      // autoFocus
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                    <Spacing />
                    <FormTextField
                      id="message"
                      name="message"
                      // autoFocus
                      label="Message"
                      type="text"
                      fullWidth
                      variant="outlined"
                      multiline
                      minRows={3}
                    />
                  </Box>
                </WaitToGrow>
              </DialogContent>
              <DialogActions>
                {submittedSuccess || hasError ? (
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
                    aria-label="Send us a message via email"
                    disabled={
                      isSubmitting || !isValid || (!formTouched && !dirty)
                    }
                  >
                    Send Message
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
