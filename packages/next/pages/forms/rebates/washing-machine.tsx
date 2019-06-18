// cspell:ignore addtl mnfg USBR
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Theme,
  Typography as Type
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik'
import {string, object, array, Schema} from 'yup'
import clsx from 'clsx'
import {
  postRebateForm,
  WashingMachineRebateFormData as RebateFormData,
  WashingMachineRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import WashMachineCeeRadioField from '@components/formFields/WashMachineCeeRadioField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import FormTextField from '@components/formFields/FormTextField'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import WashEffEligibilityDialog from '@components/formFields/WashEffEligibilityDialog'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionWashingMachineDialog from '@components/FormSubmissionWashingMachineDialog/FormSubmissionWashingMachineDialog'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import delay from 'then-sleep'
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'washing-machine-rebate'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    firstName: string()
      .required()
      .label('First Name'),
    lastName: string()
      .required()
      .label('Last Name'),
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
      .label('Billing Address'),
    city: string()
      .required()
      .label('City'),
    otherCity: string()
      .label('City')
      .when('city', (city: string | null, schema: Schema<string>) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string()
      .required()
      .min(10)
      .label('Phone Number'),
    propertyType: string()
      .required()
      .label('Property Type'),
    treatedCustomer: string()
      .required()
      .label('Treated Customer')
      .oneOf(
        ['Yes'], // "Yes", "No"
        'You must be a current Placer County Water Agency treated water customer'
      ),
    existingHigh: string()
      .required()
      .label('Replacing Existing High-Efficiency Washer')
      .oneOf(
        ['No'], // "Yes", "No"
        'Replacement of an existing high efficiency washer is not covered by rebate'
      ),
    newConstruction: string()
      .required()
      .label('New Construction')
      .oneOf(
        ['No'], // "Yes", "No"
        'New constructions are not eligible for rebate'
      ),
    manufacturer: string()
      .required()
      .label('Washing Machine Manufacturer'),
    model: string()
      .required()
      .label('Washing Machine Model'),
    ceeQualify: string()
      .required()
      .label('CEE Tier 3 Water Factor'),
    termsAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to Terms and Conditions by checking this box'
      )
      .label('Agree to Terms'),
    signature: string()
      .required()
      .label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    receipts: array()
      .required('Must provide receipt(s) or proof of purchase')
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string()
            .required('Attachment URL is not available')
            .url()
        })
      ),
    installPhotos: array()
      .required('Must provide photo(s) of installed washing machine')
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string()
            .required('Attachment URL is not available')
            .url()
        })
      )
  })

const initialFormValues: RebateFormData = {
  firstName: '',
  lastName: '',
  email: '',
  accountNo: '',
  address: '',
  city: '',
  otherCity: '',
  phone: '',
  propertyType: '',
  treatedCustomer: '',
  existingHigh: '',
  newConstruction: '',
  manufacturer: '',
  model: '',
  ceeQualify: '',
  termsAgree: '',
  signature: '',
  captcha: '',
  receipts: [],
  installPhotos: []
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
    // formikContainer: {
    //   height: '100%',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   width: '100%'
    // },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content' // IE doesn't support
      // width: '100%'
    },
    dropzoneContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
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
const WashingMachine = () => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<RebateFormData>(
    initialFormValues
  )
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [installPhotosIsUploading, setInstallPhotosIsUploading] = useState<
    boolean
  >(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] = useState<
    boolean
  >(false)
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState<boolean>(
    false
  )
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)
  const [shouldConfirmRouteChange, setShouldConfirmRouteChange] = useState<
    boolean
  >(false)

  const receiptIsUploadingHandler = useCallback((isUploading) => {
    setReceiptIsUploading(isUploading)
  }, [])

  const installPhotosIsUploadingHandler = useCallback((isUploading) => {
    setInstallPhotosIsUploading(isUploading)
  }, [])

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
    setProvidedEmail('')
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  useEffect(() => {
    const fn = async () => {
      await delay(800)
      setEligibilityDialogOpen(true)
    }
    fn()
  }, [])

  const mainEl = useMemo(
    () => (
      <React.Fragment>
        <WaterSurfaceImg />
        <Grid container justify="space-around" direction="row">
          <Grid item xs={11} sm={12}>
            <main className={classes.main}>
              <Type variant="h1" color="primary" gutterBottom>
                Water Efficiency Rebate Form
              </Type>

              <Type variant="h3" color="primary" gutterBottom>
                PCWA/USBR Energy Star® Residential/Multi-Family Water-Efficient
                Clothes Washing Machine
              </Type>

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
                    setIneligible(false)
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
                    errors,
                    // isValid,
                    setFieldValue
                  } = formik

                  if (dirty !== formIsDirty) {
                    setFormIsDirty(dirty)
                    setShouldConfirmRouteChange(Boolean(dirty))
                  }
                  if (values !== formValues) {
                    setFormValues(values)
                  }

                  // Check if user is in-eligible for rebate and disable all form controls if so.
                  const rebateIneligibility = [
                    errors['treatedCustomer'],
                    errors['existingHigh'],
                    errors['newConstruction']
                  ].some(Boolean)
                  if (rebateIneligibility !== ineligible) {
                    setIneligible(rebateIneligibility)
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
                  const cityChangeHandler = (evt: any) => {
                    // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                    if (evt.target.value.toLowerCase() !== 'other') {
                      setFieldValue('otherCity', '')
                    }
                  }

                  const attachmentsAreUploading =
                    receiptIsUploading || installPhotosIsUploading

                  return (
                    <React.Fragment>
                      <Form className={classes.form}>
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
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled={ineligible}
                                name="firstName"
                                label="First Name"
                                autoComplete="billing given-name"
                                component={FormTextField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled={ineligible}
                                name="lastName"
                                label="Last Name"
                                autoComplete="billing family-name"
                                component={FormTextField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={7}>
                              <Field
                                disabled={ineligible}
                                name="accountNo"
                                component={AccountNoField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Field
                                disabled={ineligible}
                                name="propertyType"
                                component={PropertyTypeSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5} justify="space-between">
                            <Grid item xs={12} sm={8}>
                              <Field
                                disabled={ineligible}
                                name="address"
                                component={StreetAddressField}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Field
                                disabled={ineligible}
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
                                  disabled={!otherCitySelected || ineligible}
                                  name="otherCity"
                                  component={OtherCityField}
                                />
                              </Grid>
                            </Grid>
                          </WaitToGrow>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="phone"
                                disabled={ineligible}
                                component={PhoneNoField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="email"
                                disabled={ineligible}
                                component={EmailField}
                              />
                            </Grid>
                          </Grid>
                        </div>

                        <Divider variant="middle" />

                        <div className={classes.formGroup}>
                          <Type
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                            className={classes.formGroupTitle}
                          >
                            Rebate Information
                          </Type>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled={ineligible}
                                name="manufacturer"
                                label="Washing Machine Manufacturer"
                                component={FormTextField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled={ineligible}
                                name="model"
                                label="Washing Machine Model"
                                component={FormTextField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5} justify="space-between">
                            <Grid item xs={12}>
                              <Field
                                disabled={ineligible}
                                name="ceeQualify"
                                component={WashMachineCeeRadioField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5} justify="space-between">
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="treatedCustomer"
                                inputLabel="PCWA Treated Customer"
                                inputId="treated-water-select"
                                labelWidth={200}
                                component={YesNoSelectField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="existingHigh"
                                inputLabel="Existing High Efficiency Washer"
                                inputId="existing-high-efficiency-washer-select"
                                labelWidth={255}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5} justify="space-between">
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="newConstruction"
                                inputLabel="For New Construction"
                                inputId="for-new-construction-select"
                                labelWidth={178}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>
                        </div>

                        <Divider variant="middle" />

                        <div className={classes.formGroup}>
                          <Type
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                            className={classes.formGroupTitle}
                          >
                            Provide Attachments
                          </Type>

                          <div className={clsx(classes.dropzoneContainer)}>
                            <Field
                              disabled={ineligible}
                              name="receipts"
                              attachmentTitle="Receipt"
                              uploadFolder="washing-machine"
                              onIsUploadingChange={receiptIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <div className={clsx(classes.dropzoneContainer)}>
                            <Field
                              disabled={ineligible}
                              name="installPhotos"
                              attachmentTitle="Water-Efficient Clothes Washing Machine installed photo"
                              uploadFolder="washing-machine"
                              onIsUploadingChange={
                                installPhotosIsUploadingHandler
                              }
                              component={AttachmentField}
                            />
                          </div>
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
                              <ReviewTermsConditions
                                pageCount={2}
                                fileName="Washing-Machine-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://cosmic-s3.imgix.net/bb528510-911c-11e9-bc00-5fc34b01c111-washer-requirements-terms-and-conditions.pdf"
                              />
                              <Type
                                variant="body1"
                                paragraph
                                className={classes.reserveRight}
                              >
                                <em>
                                  I have read, understand, and agree to the{' '}
                                  <Link
                                    variant="inherit"
                                    href="https://cdn.cosmicjs.com/bb528510-911c-11e9-bc00-5fc34b01c111-washer-requirements-terms-and-conditions.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    PCWA/USBR Energy Star® Residential/Multi
                                    Family Water-Efficient Clothes Washing
                                    Machine Rebate Terms and Conditions.
                                  </Link>
                                </em>
                              </Type>
                              <Type
                                variant="body1"
                                paragraph
                                className={classes.reserveRight}
                              >
                                <em>
                                  I understand that PCWA reserves the right to
                                  have an Agency representative verify the
                                  installation of the product(s) at the service
                                  address on the application.
                                </em>
                              </Type>
                              <Field
                                disabled={ineligible}
                                name="termsAgree"
                                component={AgreeTermsCheckbox}
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
                              <Type
                                variant="body1"
                                paragraph
                                color="primary"
                              ></Type>
                              <Type variant="body1" paragraph color="primary">
                                Placer County Water Agency (PCWA) reserves the
                                right to deny an application of any participant
                                who does not meet all requirements as outlined.
                                PCWA reserves the right to change the terms of
                                this program at their discretion. PCWA cannot
                                guarantee that the installation of the
                                product(s) will result in lower water utility
                                costs. The number of rebates is dependent upon
                                the availability of program funds. Applications
                                will be processed when all required information
                                is provided by the applicant on a first-come,
                                first-served basis.
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
                                disabled={ineligible}
                                name="signature"
                                component={SignatureField}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              className={classes.ieFixFlexColumnDirection}
                            >
                              <Field
                                disabled={ineligible}
                                name="captcha"
                                component={RecaptchaField}
                              />
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
                              ineligible ||
                              isSubmitting ||
                              // !isValid ||
                              (!formTouched && !dirty) ||
                              attachmentsAreUploading
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
                      </Form>

                      <WashEffEligibilityDialog
                        open={eligibilityDialogOpen}
                        onClose={() => setEligibilityDialogOpen(false)}
                      />
                    </React.Fragment>
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
    [
      classes,
      formIsDirty,
      formValues,
      formIsTouched,
      receiptIsUploading,
      receiptIsUploadingHandler,
      installPhotosIsUploading,
      installPhotosIsUploadingHandler,
      eligibilityDialogOpen,
      ineligible
    ]
  )

  // GO-LIVE - Won't need this ternary or logo after GO LIVE date.
  const washingMachineEl = useMemo(
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
        <PageLayout title="Washing Machine Rebate Form">{mainEl}</PageLayout>
      ),
    [mainEl, classes]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {washingMachineEl}
      <FormSubmissionWashingMachineDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="PCWA/USBR Energy Star® Residential/Multi-Family Water-Efficient Clothes Washing Machine Rebate Application"
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

export default WashingMachine
