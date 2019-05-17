// cspell:ignore
import React, {useState, useCallback, useMemo} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Theme,
  Typography as Type
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik'
import {string, object} from 'yup'
import {
  postRebateForm,
  ContactUsRebateFormData as RebateFormData,
  ContactUsRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import AccountNoField from '@components/formFields/AccountNoField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'

const isDev = process.env.NODE_ENV === 'development'
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
    subject: string().label('City')
  })

const initialFormValues: RebateFormData = {
  name: '',
  email: '',
  message: '',
  subject: '',
  phone: '',
  reason: '',
  captcha: ''
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      maxWidth: 650,
      display: 'block', // IE fix
      // left: '20vw',
      // right: '20vw',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    '@media screen and (min-width: 600px) and (max-width: 725px)': {
      main: {
        maxWidth: '90%'
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content'
    },
    buttonWrapper: {
      flex: '0 0 auto', // IE fix
      position: 'relative',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    },
    formGroup: {
      flex: '0 0 auto', // IE fix
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    formGroupTitle: {
      marginBottom: theme.spacing(3)
    },
    // GO-LIVE remove logoContainer.
    logoContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    // IE fix - IE will shrink Flex Column layouts. Need to override any defaults.
    ieFixFlexColumnDirection: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0
    },
    reserveRight: {
      marginTop: theme.spacing(3)
    }
  })
)

const ContactUs = () => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<RebateFormData>(
    initialFormValues
  )
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] = useState<
    boolean
  >(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [shouldConfirmRouteChange, setShouldConfirmRouteChange] = useState<
    boolean
  >(false)

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
    setProvidedEmail('')
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const mainEl = useMemo(
    () => (
      <React.Fragment>
        <WaterSurfaceImg />
        <Grid container justify="space-around" direction="row">
          <Grid item xs={11} sm={12}>
            <main className={classes.main}>
              <Type variant="h1" color="primary" gutterBottom>
                Contact Us Form
              </Type>

              {/* <Type variant="h3" color="primary" gutterBottom>
                React out to us via email
              </Type> */}

              <Formik
                initialValues={initialFormValues}
                validationSchema={formSchema}
                onSubmit={async (values: RebateFormData, actions) => {
                  try {
                    // console.log(values, actions)
                    setProvidedEmail(values.email)
                    const body: RequestBody = {
                      formData: {...values}
                    }
                    await postRebateForm(SERVICE_URI_PATH, body)
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
                {(formik) => {
                  const {
                    values,
                    touched = {},
                    dirty,
                    isSubmitting,
                    isValid
                  } = formik

                  if (dirty !== formIsDirty) {
                    setFormIsDirty(dirty)
                    setShouldConfirmRouteChange(Boolean(dirty))
                  }
                  if (values !== formValues) {
                    setFormValues(values)
                  }
                  // Use state to save a boolean version of 'touched'.
                  const formTouched = Object.keys(touched).length > 0
                  if (formTouched !== formIsTouched) {
                    setFormIsTouched(formTouched)
                  }

                  return (
                    <Form className={classes.form}>
                      {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}

                      <div className={classes.formGroup}>
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
                              name="name"
                              component={NameField}
                              required={false}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={7}>
                            <Field
                              name="accountNo"
                              component={AccountNoField}
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <Field
                              name="propertyType"
                              component={PropertyTypeSelectField}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={5} justify="space-between">
                          <Grid item xs={12} sm={8}>
                            <Field
                              name="address"
                              component={StreetAddressField}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <Field name="phone" component={PhoneNoField} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field name="email" component={EmailField} />
                          </Grid>
                        </Grid>
                      </div>

                      <Divider variant="middle" />

                      <div className={classes.formGroup}>
                        <Type
                          color="textSecondary"
                          variant="h4"
                          gutterBottom
                          className={classes.formGroupTitle}
                        >
                          Acknowledge Terms & Conditions
                        </Type>
                        <Grid container direction="column" spacing={1}>
                          <Grid
                            item
                            xs={12}
                            className={classes.ieFixFlexColumnDirection}
                          >
                            <Type
                              variant="body1"
                              paragraph
                              className={classes.reserveRight}
                            >
                              <em>
                                PCWA reserves the right to verify the
                                installation of the product(s) at the service
                                address on the application. You will be
                                contacted by a Water Efficiency Specialist to
                                schedule an appointment if you are selected for
                                an installation verification.
                              </em>
                            </Type>
                          </Grid>
                        </Grid>
                      </div>

                      <Divider variant="middle" />

                      <div className={classes.formGroup}>
                        <Type
                          color="textSecondary"
                          variant="h4"
                          gutterBottom
                          className={classes.formGroupTitle}
                        >
                          Release of Liability & Signature
                        </Type>

                        <Grid container direction="column" spacing={1}>
                          <Grid
                            item
                            xs={12}
                            className={classes.ieFixFlexColumnDirection}
                          >
                            <Type variant="body1" paragraph color="primary">
                              PCWA may deny any application that does not meet
                              all of the Program requirements. PCWA reserves the
                              right to alter the Program at any time. PCWA does
                              not warrant or guarantee lower water bills as a
                              result of participating in the Program. PCWA is
                              not responsible for any damage that may occur to
                              participants' property as a result of this
                              Program. The undersigned agrees to hold harmless
                              PCWA, its directors, officers, and employees from
                              and against all loss, damage, expense and
                              liability resulting from or otherwise relating to
                              the installation of the Weather Based Irrigation
                              Controller. By signing this form I agree that I
                              have read, understand, and agree to the Terms and
                              Conditions of this rebate program.
                            </Type>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={classes.ieFixFlexColumnDirection}
                          >
                            <Type variant="caption">
                              You must sign this form by typing your name
                            </Type>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={classes.ieFixFlexColumnDirection}
                          >
                            <Field name="captcha" component={RecaptchaField} />
                          </Grid>
                        </Grid>
                      </div>

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

                      <div className={classes.buttonWrapper}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={
                            isSubmitting || !isValid || (!formTouched && !dirty)
                          }
                        >
                          Submit
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </Form>
                  )
                }}
              </Formik>

              {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}
            </main>
          </Grid>
        </Grid>
      </React.Fragment>
    ),
    [classes, formIsDirty, formValues, formIsTouched]
  )

  // GO-LIVE - Won't need this ternary or logo after GO LIVE date.
  const contactUsEl = useMemo(
    () =>
      !isDev ? (
        <React.Fragment>
          <Head>
            <title>Rebate Form</title>
            <meta
              name="description"
              content="PCWA Water Efficiency Rebate Form"
            />
          </Head>
          <div className={classes.logoContainer}>
            <PcwaLogo
              height="70%"
              maxHeight={48}
              maxWidth={200}
              missionStatementFill="rgba(0,0,0,0)"
            />
          </div>
          {mainEl}
        </React.Fragment>
      ) : (
        // <React.Fragment>
        <PageLayout title="Irrigation Controller Rebate Form">
          {mainEl}
        </PageLayout>
      ),
    [mainEl, classes]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {contactUsEl}
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Weather Based Irrigation Controller Rebate Application"
        dialogTitle="Your Rebate Application Has Been Submitted"
      />
      <FormSubmissionDialogError
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </ConfirmPageLeaveLayout>
  )
}

export default ContactUs
