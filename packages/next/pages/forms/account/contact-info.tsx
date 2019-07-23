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
import {string, object, StringSchema} from 'yup'
import {
  postRebateForm,
  ContactInfoFormData as FormData,
  ContactInfoRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import SignatureField from '@components/formFields/SignatureField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import NarrowContainer from '@components/containers/NarrowContainer'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'contact-info'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    name: string()
      .required()
      .max(30, 'Name must be less than 30 characters.')
      .label('Legal Name'),
    spouseName: string()
      .max(27, 'Name must be less than 27 characters.')
      .label("Spouse's Name"),
    email: string()
      .email()
      .required()
      .label('Email'),
    accountNo: string()
      .matches(
        /^\d+-\d+$/,
        'Account Number must contain a dash ("-") character and should not include any letters or spaces'
      )
      .required('An Account Number is required (leading zeros are optional)')
      .label('Account Number'),
    address: string()
      .required()
      .max(60, 'Service address must be less than 200 characters.')
      .label('Service Address'),
    city: string()
      .required()
      .label('City'),
    otherCity: string()
      .label('City')
      .when('city', (city: string | null, schema: StringSchema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string()
      .length(10)
      .label('Main Phone Number'),
    cellPhone: string()
      .length(10)
      .label('Cell Phone Number'),
    workPhone: string()
      .length(10)
      .label('Work Phone Number'),
    spousePhone: string()
      .length(10)
      .label("Spouse's Phone Number"),
    signature: string()
      .required()
      .label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox')
  })

const initialFormValues: FormData = {
  name: '',
  spouseName: '',
  address: '',
  email: '',
  accountNo: '',
  city: '',
  otherCity: '',
  phone: '',
  cellPhone: '',
  workPhone: '',
  spousePhone: '',
  signature: '',
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
    }
  })
)

const ContactInfo = () => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormData>(initialFormValues)
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
        <NarrowContainer>
          <MainBox>
            <Type variant="h1" color="primary" gutterBottom>
              Update Contact Information Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Customer Account
            </Type>

            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: FormData, actions) => {
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
                  // isValid,
                  // errors,
                  setFieldValue
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
                const otherCitySelected = Boolean(
                  values.city && values.city.toLowerCase() === 'other'
                )

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = () => {
                  setFieldValue('otherCity', '')
                }

                return (
                  <React.Fragment>
                    <FormBox className={classes.form}>
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
                              autoComplete="name"
                              name="name"
                              component={FormTextField}
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
                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <Field
                              name="city"
                              onChange={cityChangeHandler}
                              component={CitySelectField}
                            />
                          </Grid>
                        </Grid>
                        <WaitToGrow isIn={otherCitySelected}>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                name="otherCity"
                                disabled={!otherCitySelected}
                                component={OtherCityField}
                              />
                            </Grid>
                          </Grid>
                        </WaitToGrow>
                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <Field
                              name="phone"
                              component={PhoneNoField}
                              label="Main Phone"
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field name="email" component={EmailField} />
                          </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <Field
                              name="cellPhone"
                              component={PhoneNoField}
                              label="Cell Phone"
                              required={false}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field
                              name="workPhone"
                              component={PhoneNoField}
                              label="Work Phone"
                              required={false}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <Field
                              name="address"
                              multiline
                              rows={2}
                              label="Service Address"
                              component={FormTextField}
                              autoComplete="street-address"
                            />
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
                            {/* TODO - Need new wording from Cassandra. */}
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
                              the installation of water efficient landscape. By
                              signing this form I agree that I have read,
                              understand, and agree to the Terms and Conditions
                              of this rebate program.
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
                            <Field
                              name="signature"
                              component={SignatureField}
                            />
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

                      <div className={classes.buttonWrapper}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            // !isValid ||
                            (!formTouched && !dirty)
                          }
                        >
                          Submit Application
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </FormBox>
                  </React.Fragment>
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
  const lawnReplacementEl = useMemo(
    () =>
      !isDev ? (
        <React.Fragment>
          <Head>
            <title>Rebate Form</title>
            <meta name="description" content="Update Contact Info Form" />
          </Head>
          <div className={classes.logoContainer}>
            <PcwaLogo
              height="70%"
              style={{
                maxHeight: 48,
                maxWidth: 200
              }}
              missionStatementFill="rgba(0,0,0,0)"
            />
          </div>
          {mainEl}
        </React.Fragment>
      ) : (
        // <React.Fragment>
        <PageLayout title="Update Contact Info Form">{mainEl}</PageLayout>
      ),
    [mainEl, classes]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {lawnReplacementEl}

      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Lawn Replacement Rebate Application"
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

export default ContactInfo
