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
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postRebateForm,
  ContactUsRebateFormData as RebateFormData,
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
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox} from '@components/boxes/FlexBox'

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
    subject: string()
      .required()
      .label('Subject')
  })

const initialFormValues: RebateFormData = {
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
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [shouldConfirmRouteChange, setShouldConfirmRouteChange] = useState<
    boolean
  >(false)

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const mainEl = useMemo(
    () => (
      <React.Fragment>
        <WaterSurfaceImg />
        <NarrowContainer>
          <MainBox>
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
                const {values, touched = {}, dirty, isSubmitting} = formik

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
                  <FormBox className={classes.form}>
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
                    </div>

                    <Divider variant="middle" />

                    <div className={classes.formGroup}>
                      <Grid container direction="column" spacing={1}>
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
                          isSubmitting ||
                          // || !isValid
                          (!formTouched && !dirty)
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
                  </FormBox>
                )
              }}
            </Formik>

            {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}
          </MainBox>
        </NarrowContainer>
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
            <title>Contact Us Form</title>
            <meta name="description" content="PCWA Contact Form" />
          </Head>
          <ColumnBox
            justifyContent="center"
            alignItems="flex-start"
            mt={2}
            ml={2}
            mr={2}
          >
            <PcwaLogo
              height="70%"
              style={{
                maxHeight: 48,
                maxWidth: 200
              }}
              missionStatementFill="rgba(0,0,0,0)"
            />
          </ColumnBox>
          {mainEl}
        </React.Fragment>
      ) : (
        // <React.Fragment>
        <PageLayout title="Contact Us">{mainEl}</PageLayout>
      ),
    [mainEl]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {contactUsEl}
      <ContactUsSubmitDialog
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
      />
      <ContactUsErrorDialog
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </ConfirmPageLeaveLayout>
  )
}

export default ContactUs
