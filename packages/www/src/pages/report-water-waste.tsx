// cspell:ignore
import React, {useState, useCallback, useMemo} from 'react'
import {Divider, Grid, Theme, Typography as Type, Box} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postForm,
  ContactUsFormData as FormData,
  ContactUsRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import ContactUsSubjectField from '@components/formFields/ContactUsSubjectField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import ReasonForContactSelectField from '@components/formFields/ReasonForContactSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import Spacing from '@components/boxes/Spacing'

const SERVICE_URI_PATH = 'contact-us'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    reason: string()
      .required()
      .label('Reason for contacting PCWA'),
    message: string()
      .required()
      .label('Message'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string()
      .email()
      .label('Email'),
    phone: string()
      .min(10)
      .label('Phone Number'),
    subject: string()
      .required()
      .label('Subject')
  })

const initialFormValues: FormData = {
  reason: '',
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  captcha: ''
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      // width: 'fit-content' // Doesn't seem to fit responsively in XS media layout.
      width: '100%'
    },
    formGroup: {
      flex: '0 0 auto', // IE fix
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    formGroupTitle: {
      marginBottom: theme.spacing(3)
    },
    // IE fix - IE will shrink Flex Column layouts. Need to override any defaults.
    ieFixFlexColumnDirection: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0
    }
  })
)

const ReportWaterWastePage = () => {
  const classes = useStyles()

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] = useState<
    boolean
  >(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const mainEl = useMemo(
    () => (
      <>
        <MainBox>
          <NarrowContainer>
            <Type variant="h1" color="primary" gutterBottom>
              Contact Us Form
            </Type>

            {/* <Type variant="h3" color="primary" gutterBottom>
                React out to us via email
              </Type> */}

            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: FormData, actions) => {
                try {
                  // console.log(values, actions)
                  const body: RequestBody = {
                    formData: {...values}
                  }
                  await postForm(SERVICE_URI_PATH, body)
                  actions.setSubmitting(false)
                  // Reset Form
                  actions.resetForm() // Strictly Formik
                  setFormSubmitDialogOpen(true)
                } catch (error) {
                  console.warn('An error occurred submitting form.', error)
                  setErrorMessage(error.message)
                  setFormSubmitDialogErrorOpen(true)
                  actions.setSubmitting(false)
                }
              }}
            >
              <ProtectRouteChange>
                <FormValidate>
                  <FormBox className={classes.form}>
                    {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}

                    <Box className={classes.formGroup}>
                      <Type
                        color="textSecondary"
                        variant="h4"
                        gutterBottom
                        className={classes.formGroupTitle}
                      >
                        Contact Information
                      </Type>

                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <Field
                            name="reason"
                            component={ReasonForContactSelectField}
                            required={true}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <Field
                            name="name"
                            component={NameField}
                            required={false}
                          />
                        </Grid>
                      </Grid>
                      {/* <Grid container>
                        </Grid>

                        <Grid container>
                        </Grid> */}

                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={7}>
                          <Field
                            name="email"
                            component={EmailField}
                            required={false}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <Field
                            name="phone"
                            component={PhoneNoField}
                            required={false}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <Field
                            name="subject"
                            component={ContactUsSubjectField}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <Field
                            name="message"
                            component={ContactUsMessageField}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider variant="middle" />

                    <Box className={classes.formGroup}>
                      <Grid container direction="column" spacing={1}>
                        <Grid
                          item
                          xs={12}
                          className={classes.ieFixFlexColumnDirection}
                        >
                          <Field name="captcha" component={RecaptchaField} />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* For debugging form reset */}
                    {/* <Button
                      variant="outlined"
                      type="submit"
                      onClick={handleReset}
                    >
                      Reset Form
                    </Button> */}

                    {/* For debugging dialog */}
                    {/* <Button
                        variant="outlined"
                        type="submit"
                        onClick={() => {
                          setProvidedEmail(values.email)
                          setFormSubmitDialogOpen(true)
                        }}
                      >
                        Show Dialog
                      </Button> */}

                    <Spacing />
                    <SubmitFormButton
                      boxProps={{
                        flex: '0 0 auto'
                      }}
                      fullWidth
                      variant="outlined"
                      color="primary"
                    >
                      Submit
                    </SubmitFormButton>
                  </FormBox>
                </FormValidate>
              </ProtectRouteChange>
            </Formik>
          </NarrowContainer>
        </MainBox>
      </>
    ),
    [classes]
  )

  return (
    <>
      <PageLayout title="Report Water Waste" waterSurface>
        {mainEl}
      </PageLayout>
      <ContactUsSubmitDialog
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
      />
      <ContactUsErrorDialog
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default ReportWaterWastePage
