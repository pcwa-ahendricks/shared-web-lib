// cspell:ignore addtl mnfg watersense Formik's
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
import {createStyles, makeStyles} from '@material-ui/styles'
import Head from 'next/head'
import {Formik, Field, FieldArray} from 'formik'
import {string, object, array, StringSchema, number} from 'yup'
import clsx from 'clsx'
import {
  postRebateForm,
  ToiletRebateFormData as RebateFormData,
  ToiletRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import ToiletEffEligibilityDialog from '@components/formFields/ToiletEffEligibilityDialog'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import delay from 'then-sleep'
import ToiletWatersenseRadioField from '@components/formFields/ToiletWatersenseRadioField'
import ToiletMfgModelsField from '@components/formFields/ToiletMfgModelsField'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import WaterSenseLogo from '@components/WaterSenseLogo/WaterSenseLogo'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'toilet-rebate'
const MAX_TOILETS = 25
const MIN_TOILETS = 1

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
      .when('city', (city: string | null, schema: StringSchema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string()
      .required()
      .min(10)
      .label('Phone Number'),
    propertyType: string()
      .required()
      .label('Property Type'),
    noOfToilets: number()
      .required(
        'Number of toilets/urinals installed must be a number that is greater than 0.'
      )
      .moreThan(0)
      .label('Number of toilets/urinals installed'),
    treatedCustomer: string()
      .required()
      .label('Treated Customer')
      .oneOf(
        ['Yes'], // "Yes", "No"
        'You must be a current Placer County Water Agency treated water customer'
      ),
    builtPriorCutoff: string()
      .required()
      .label('House Built prior to 1994')
      .oneOf(
        ['Yes'], // "Yes", "No"
        'Old toilets replaced must be rated at 3.0 (GPF) or more'
      ),
    manufacturerModel: array()
      .required()
      .label('Manufacturer and Model')
      .min(MIN_TOILETS)
      .max(MAX_TOILETS)
      .of(
        object({
          manufacturer: string()
            .required()
            .label('Toilet/Urinal Manufacturer'),
          model: string()
            .required()
            .label('Toilet/Urinal Model')
        })
      ),
    watersenseApproved: string()
      .required()
      .label('Watersense Approved'),
    // .oneOf(
    //   [''], // "Yes", "No"
    //   ''
    // ),
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
    comments: string()
      .max(200, 'Comments must be less than 200 characters.')
      .label('Comments'),
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
      .required('Must provide photo(s) of installed toilet')
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
  noOfToilets: 1,
  treatedCustomer: '',
  builtPriorCutoff: '',
  manufacturerModel: [{manufacturer: '', model: ''}],
  watersenseApproved: '',
  termsAgree: '',
  signature: '',
  captcha: '',
  comments: '',
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
const Toilet = () => {
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

  // Wasn't able to get this to work with React Hooks API. Likely due to use of Formik's use of render props function.
  // const getRows = (values: RebateFormData) => {
  //   if (!values || !(values.noOfToilets > 0)) {
  //     return []
  //   }
  //   const tempX: {key: number}[] = [],
  //     endInt = values.noOfToilets,
  //     maxInt = MAX_TOILETS
  //   let i = 1
  //   while (i <= endInt && i <= maxInt) {
  //     tempX.push({key: i})
  //     i++
  //   }
  //   return [...tempX]
  // }

  const mainEl = useMemo(
    () => (
      <React.Fragment>
        <WaterSurfaceImg />
        <Grid container justify="space-around" direction="row">
          <Grid item xs={11} sm={12}>
            <MainBox className={classes.main}>
              <Type variant="h1" color="primary" gutterBottom>
                Water Efficiency Rebate Form
              </Type>

              <Type variant="h3" color="primary" gutterBottom>
                High Efficiency Toilet/Urinal
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
                    errors['builtPriorCutoff']
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
                            <Grid item xs={12} sm={6}>
                              <Field
                                required
                                disabled={ineligible}
                                name="firstName"
                                label="First Name"
                                autoComplete="billing given-name"
                                component={FormTextField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                required
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
                            <Grid item xs={12} sm={7}>
                              <Field
                                disabled={ineligible}
                                required
                                name="noOfToilets"
                                label="Number of Toilets/Urinals Installed"
                                component={FormTextField}
                                type="number"
                                inputProps={{
                                  min: MIN_TOILETS,
                                  max: MAX_TOILETS
                                }}
                              />
                            </Grid>
                          </Grid>
                          <FieldArray
                            name="manufacturerModel"
                            render={(arrayHelpers) => (
                              <ToiletMfgModelsField {...arrayHelpers} />
                            )}
                          />

                          <Grid container spacing={5} justify="space-between">
                            <Grid item xs={12} sm={8}>
                              <Field
                                disabled={ineligible}
                                name="watersenseApproved"
                                toiletCount={
                                  formValues.manufacturerModel.length
                                }
                                component={ToiletWatersenseRadioField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <WaterSenseLogo />
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
                                name="builtPriorCutoff"
                                inputLabel="Was House Built Prior to 1994"
                                inputId="house-built-prior-select"
                                labelWidth={255}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                name="comments"
                                multiline
                                rows={3} // That's about 200 characters
                                label="Optionally, you can provide us any comments"
                                // disabled={ineligible}
                                component={FormTextField}
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
                              uploadFolder="toilet"
                              onIsUploadingChange={receiptIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <div className={clsx(classes.dropzoneContainer)}>
                            <Field
                              disabled={ineligible}
                              name="installPhotos"
                              attachmentTitle="Water-Efficient Toilet installed photo"
                              uploadFolder="toilet"
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
                                fileName="Toilet-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://cosmic-s3.imgix.net/310eda20-921b-11e9-b0fd-bf44dce96b6c-Toilet-program-requirements-3-3-17.pdf"
                              />
                              <Type
                                variant="body1"
                                paragraph
                                className={classes.reserveRight}
                              >
                                <em>
                                  I have read, understand, and agree to the{' '}
                                  {/* <Link
                                    variant="inherit"
                                    href="https://cdn.cosmicjs.com/310eda20-921b-11e9-b0fd-bf44dce96b6c-Toilet-program-requirements-3-3-17.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  > */}
                                  Placer County Water Agency High Efficiency
                                  Toilet and Waterless Urinal Retrofit Rebate
                                  Terms and Conditions.
                                  {/* </Link> */}
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
                      </FormBox>

                      <ToiletEffEligibilityDialog
                        open={eligibilityDialogOpen}
                        onClose={() => setEligibilityDialogOpen(false)}
                      />
                    </React.Fragment>
                  )
                }}
              </Formik>
            </MainBox>
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
  const toiletEl = useMemo(
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
        <PageLayout title="Toilet Rebate Form">{mainEl}</PageLayout>
      ),
    [mainEl, classes]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {toiletEl}
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="High Efficiency Toilet and Waterless Urinal Retrofit Rebate Application"
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

export default Toilet
