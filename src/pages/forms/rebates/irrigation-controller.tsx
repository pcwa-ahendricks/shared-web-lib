// cspell:ignore addtl mnfg
import React, {useState, useCallback, useMemo} from 'react'
import {
  Divider,
  Grid,
  Theme,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object, array, ArraySchema, date, StringSchema} from 'yup'
import {
  postForm,
  IrrigationControllerRebateFormData as RebateFormData,
  IrrigationControllerRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import PurchaseDateField from '@components/formFields/PurchaseDateField'
import FirstNameField from '@components/formFields/FirstNameField'
import LastNameField from '@components/formFields/LastNameField'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import IrrigCntrlAddtlField from '@components/formFields/IrrigCntrlAddtlField'
import FormTextField from '@components/formFields/FormTextField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {BooleanAsString} from '@lib/safeCastBoolean'
import WaterEfficiencyEmail from '@components/links/WaterEfficiencyEmail'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import Spacing from '@components/boxes/Spacing'
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const SERVICE_URI_PATH = 'irrigation-controller-rebate'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    firstName: string().required().label('First Name'),
    lastName: string().required().label('Last Name'),
    email: string().email().required().label('Email'),
    accountNo: string()
      .matches(
        /^\d+-\d+$/,
        'Account Number must contain a dash ("-") character and should not include any letters or spaces'
      )
      .required('An Account Number is required (leading zeros are optional)')
      .label('Account Number'),
    address: string().required().label('Billing Address'),
    city: string().required().label('City'),
    otherCity: string()
      .label('City')
      .when('city', (city: string | null, schema: StringSchema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string().required().min(10).label('Phone Number'),
    propertyType: string().required().label('Property Type'),
    manufacturer: string()
      .required()
      .label('Irrigation Controller Manufacturer'),
    model: string().required().label('Irrigation Controller Model'),
    additional: string().label('Additional Sensor or Outdoor Cover'),
    purchaseDate: date()
      .required('A valid purchase date is required')
      .typeError('A valid purchase date is required'),
    termsAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to Terms and Conditions by checking this box'
      )
      .label('Agree to Terms'),
    emailAttachments: string().label('Email Attachments'),
    signature: string().required().label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    receipts: array()
      .when(
        'emailAttachments',
        (emailAttachments: BooleanAsString, schema: StringSchema) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide receipt(s) or proof of purchase')
      )
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
        })
      ),
    cntrlPhotos: array()
      .when(
        'emailAttachments',
        (emailAttachments: BooleanAsString, schema: StringSchema) =>
          emailAttachments === 'true'
            ? schema
            : schema.required(
                'Must provide photo(s) of installed irrigation controller'
              )
      )
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
        })
      ),
    addtlSensorPhotos: array()
      .when(
        ['additional', 'emailAttachments'],
        (
          additional: string[] | undefined,
          emailAttachments: BooleanAsString,
          schema: ArraySchema<string>
        ) =>
          additional && emailAttachments !== 'true'
            ? schema.required(
                'Must provide photo(s) of installed sensor/outdoor cover'
              )
            : schema
      )
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
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
  manufacturer: '',
  model: '',
  additional: '',
  purchaseDate: new Date(),
  termsAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  receipts: [],
  cntrlPhotos: [],
  addtlSensorPhotos: []
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      // width: 'fit-content' // Doesn't seem to fit responsively in XS media layout.
      width: '100%'
    },
    // textField: {
    //   marginTop: theme.spacing(1),
    //   marginBottom: theme.spacing(4),
    //   '&:not(:first-child)': {
    //     marginLeft: theme.spacing(4)
    //   }
    // },
    // formControl: {
    //   marginTop: theme.spacing(1),
    //   marginBottom: theme.spacing(4),
    //   minWidth: 150,
    //   '&:not(:first-child)': {
    //     marginLeft: theme.spacing(4)
    //   }
    // },
    // formControlRow: {
    //   display: 'flex',
    //   flexDirection: 'row',
    //   width: '100%',
    //   margin: {
    //     bottom: theme.spacing(1),
    //     top: theme.spacing(1)
    //   },
    //   '&$dropzoneContainer': {
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     alignItems: 'flex-start',
    //     marginBottom: theme.spacing(3)
    //   }
    // },
    dropzoneContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
    },
    // formControlsContainer: {
    //   margin: theme.spacing( 8),
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'flex-start'
    // },
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
    // grow: {
    //   flexGrow: 1
    // }
    // dropzoneUploader: {
    //   marginBottom: theme.spacing(2)
    // }
  })
)
const IrrigationController = () => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] =
    useState<RebateFormData>(initialFormValues)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [cntrlPhotosIsUploading, setCntrlPhotosIsUploading] =
    useState<boolean>(false)
  const [addtlSensorPhotosIsUploading, setAddtlSensorPhotosIsUploading] =
    useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const receiptIsUploadingHandler = useCallback((isUploading) => {
    setReceiptIsUploading(isUploading)
  }, [])

  const cntrlPhotosIsUploadingHandler = useCallback((isUploading) => {
    setCntrlPhotosIsUploading(isUploading)
  }, [])

  const addtlSensorPhotosIsUploadingHandler = useCallback((isUploading) => {
    setAddtlSensorPhotosIsUploading(isUploading)
  }, [])

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
    setProvidedEmail('')
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
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Weather Based Irrigation Controller
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
              {(formik) => {
                const {
                  values,
                  touched = {},
                  dirty,
                  isSubmitting,
                  // isValid,
                  setFieldValue
                } = formik

                if (dirty !== formIsDirty) {
                  setFormIsDirty(dirty)
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

                const emailAttachments = Boolean(
                  values.emailAttachments === 'true'
                )

                const hasAddtlSensor = Boolean(values.additional)

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = (evt: any) => {
                  // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                  if (evt.target.value.toLowerCase() !== 'other') {
                    setFieldValue('otherCity', '')
                  }
                }

                // If additional field is updated and is blank clear out additional photos.
                const additionalChangeHandler = (evt: any) => {
                  if (evt.target.value?.length === 0) {
                    setFieldValue('addtlSensorPhotos', [])
                  }
                }

                const attachmentsAreUploading =
                  receiptIsUploading ||
                  cntrlPhotosIsUploading ||
                  addtlSensorPhotosIsUploading
                return (
                  <ProtectRouteChange>
                    <FormValidate>
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
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="firstName"
                                component={FirstNameField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="lastName"
                                component={LastNameField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={7}>
                              <AccountNoField name="accountNo" />
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

                            <Grid item xs={12} sm={4}>
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
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                            className={classes.formGroupTitle}
                          >
                            Rebate Information
                          </Type>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                required
                                name="manufacturer"
                                label="Controller Manufacturer"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                required
                                name="model"
                                label="Controller Model"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={7}>
                              <Field
                                name="additional"
                                onChange={additionalChangeHandler}
                                component={IrrigCntrlAddtlField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              {/* <Hidden only="xs" implementation="css"> */}
                              <Field
                                name="purchaseDate"
                                component={PurchaseDateField}
                              />
                              {/* </Hidden> */}
                              {/* <Hidden smUp implementation="css">
                                <Field
                                  name="purchaseDate"
                                  render={({field, form}) => (
                                    <PurchaseDateNativeField
                                      form={form}
                                      field={field}
                                      required={width === 'xs'}
                                    />
                                  )}
                                />
                              </Hidden> */}
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
                          <Type variant="caption" color="textSecondary">
                            Note - Only Image file formats can be uploaded (eg.
                            .jpg, .png). PDF files <em>cannot</em> be uploaded
                            here. If you are unable to attach the correct file
                            type, or if any other issues with the attachments
                            arise, you may select the box below and submit the
                            files in an email.
                          </Type>
                          <Field
                            name="emailAttachments"
                            component={EmailAttachmentsSwitch}
                            fullWidth={false}
                            label={
                              <span>
                                Optionally, check here to email receipts and
                                photos instead. Send email with attachments to{' '}
                                <WaterEfficiencyEmail /> with your name and
                                account number in the subject line. Failure to
                                do so may result in a delay or rejected
                                application.
                              </span>
                            }
                          />

                          <div className={classes.dropzoneContainer}>
                            <Field
                              name="receipts"
                              attachmentTitle="Receipt"
                              uploadRoute="irrigation-controller"
                              onIsUploadingChange={receiptIsUploadingHandler}
                              component={AttachmentField}
                              disabled={emailAttachments}
                            />
                          </div>

                          <div className={classes.dropzoneContainer}>
                            <Field
                              name="cntrlPhotos"
                              attachmentTitle="Installed Irrigation Controller Photo"
                              uploadRoute="irrigation-controller"
                              onIsUploadingChange={
                                cntrlPhotosIsUploadingHandler
                              }
                              component={AttachmentField}
                              disabled={emailAttachments}
                            />
                          </div>

                          <WaitToGrow isIn={hasAddtlSensor}>
                            <div className={classes.dropzoneContainer}>
                              <Field
                                name="addtlSensorPhotos"
                                attachmentTitle="Additional Sensor/Outdoor Cover Photo"
                                uploadRoute="irrigation-controller"
                                onIsUploadingChange={
                                  addtlSensorPhotosIsUploadingHandler
                                }
                                component={AttachmentField}
                                disabled={emailAttachments}
                              />
                            </div>
                          </WaitToGrow>
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
                                pageCount={3}
                                fileName="Irrigation-Efficiency-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://imgix.cosmicjs.com/04619250-943d-11e9-9403-e5c0f69b7f31-Irrigation-Efficiency-Terms-and-Conditions.pdf"
                              />
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
                                  schedule an appointment if you are selected
                                  for an installation verification.
                                </em>
                              </Type>
                              <Field
                                name="termsAgree"
                                component={AgreeTermsCheckbox}
                                fullWidth={false}
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
                              <Type variant="body1" paragraph color="primary">
                                PCWA may deny any application that does not meet
                                all of the Program requirements. PCWA reserves
                                the right to alter the Program at any time. PCWA
                                does not warrant or guarantee lower water bills
                                as a result of participating in the Program.
                                PCWA is not responsible for any damage that may
                                occur to participants' property as a result of
                                this Program. The undersigned agrees to hold
                                harmless PCWA, its directors, officers, and
                                employees from and against all loss, damage,
                                expense and liability resulting from or
                                otherwise relating to the installation of the
                                Weather Based Irrigation Controller. By signing
                                this form I agree that I have read, understand,
                                and agree to the Terms and Conditions of this
                                rebate program.
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
                              <Field
                                name="captcha"
                                component={RecaptchaField}
                              />
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

                        <Spacing />
                        <SubmitFormButton
                          boxProps={{
                            flex: '0 0 auto'
                          }}
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled={
                            isSubmitting ||
                            // !isValid ||
                            (!formTouched && !dirty) ||
                            attachmentsAreUploading
                          }
                        >
                          Submit Application
                        </SubmitFormButton>
                      </FormBox>
                    </FormValidate>
                  </ProtectRouteChange>
                )
              }}
            </Formik>
          </NarrowContainer>
        </MainBox>
      </>
    ),
    [
      classes,
      formIsDirty,
      formValues,
      formIsTouched,
      receiptIsUploading,
      receiptIsUploadingHandler,
      cntrlPhotosIsUploading,
      cntrlPhotosIsUploadingHandler,
      addtlSensorPhotosIsUploading,
      addtlSensorPhotosIsUploadingHandler
    ]
  )

  return (
    <>
      <PageLayout title="Irrigation Controller Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>
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
    </>
  )
}

export default IrrigationController
