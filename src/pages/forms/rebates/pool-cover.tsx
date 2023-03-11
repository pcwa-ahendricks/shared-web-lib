// cspell:ignore addtl mnfg USBR
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {
  Divider,
  Grid,
  Theme,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object, array, StringSchema, ArraySchema, SchemaOf} from 'yup'
import {
  postForm,
  PoolCoverRebateFormData as RebateFormData,
  PoolCoverRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import FormTextField from '@components/formFields/FormTextField'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from 'then-sleep'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import {BooleanAsString} from '@lib/safeCastBoolean'
import RebatesEmail from '@components/links/RebatesEmail'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import HowDidYouHearSelectField from '@components/formFields/HowDidYouHearSelectField'
import OtherHowDidYouHearField from '@components/formFields/OtherHowDidYouHearField'
import PoolCoverEligibilityDialog from '@components/formFields/PoolCoverEligibilityDialog'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const SERVICE_URI_PATH = 'pool-cover-rebate'

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
    howDidYouHear: string()
      .required()
      .label('How Did You Hear About this Rebate Program'),
    otherHowDidYouHear: string()
      .label('How Did You Hear About this Rebate Program')
      .when(
        'howDidYouHear',
        (howDidYouHear: string | null, schema: StringSchema) =>
          howDidYouHear && howDidYouHear.toLowerCase() === 'other'
            ? schema.required()
            : schema
      ),
    propertyType: string().required().label('Property Type'),
    treatedCustomer: string().required().label('Treated Customer').oneOf(
      ['Yes'], // "Yes", "No"
      'You must be a current Placer County Water Agency treated water customer'
    ),
    sizeSqFt: string().required().label('Size of pool (square feet)'),
    manufacturer: string().required().label('Pool Cover Manufacturer'),
    model: string().required().label('Pool Cover Model'),
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
    comments: string()
      .max(200, 'Comments must be less than 200 characters.')
      .label('Comments'),
    receipts: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
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
    installPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide photo(s) of installed pool cover')
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
  howDidYouHear: '',
  otherHowDidYouHear: '',
  propertyType: '',
  treatedCustomer: '',
  sizeSqFt: '',
  manufacturer: '',
  model: '',
  termsAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  comments: '',
  receipts: [],
  installPhotos: []
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
    dropzoneContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
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
export default function PoolCover() {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] =
    useState<RebateFormData>(initialFormValues)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [installPhotosIsUploading, setInstallPhotosIsUploading] =
    useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [eligibilityDialogOpen, setEligibilityDialogOpen] =
    useState<boolean>(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)

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
      <>
        <NarrowContainer>
          <MainBox>
            <Type variant="h1" color="primary" gutterBottom>
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Pool Cover
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
                }
                if (values !== formValues) {
                  setFormValues(values)
                }

                // Check if user is in-eligible for rebate and disable all form controls if so.
                const rebateIneligibility = [errors['treatedCustomer']].some(
                  Boolean
                )
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
                const otherHowDidYouHearSelected = Boolean(
                  values.howDidYouHear &&
                    values.howDidYouHear.toLowerCase() === 'other'
                )

                const emailAttachments = Boolean(
                  values.emailAttachments === 'true'
                )

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = (evt: any) => {
                  // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                  if (evt.target.value.toLowerCase() !== 'other') {
                    setFieldValue('otherCity', '')
                  }
                }
                // If howDidYouHear field is updated clear out otherHowDidYouHear field.
                const howDidYouHearChangeHandler = (evt: any) => {
                  // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                  if (evt.target.value.toLowerCase() !== 'other') {
                    setFieldValue('otherHowDidYouHear', '')
                  }
                }

                const attachmentsAreUploading =
                  receiptIsUploading || installPhotosIsUploading

                return (
                  <ProtectRouteChange>
                    <FormValidate>
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
                              <FormTextField
                                required
                                disabled={ineligible}
                                name="firstName"
                                label="First Name"
                                autoComplete="billing given-name"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                required
                                disabled={ineligible}
                                name="lastName"
                                label="Last Name"
                                autoComplete="billing family-name"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={7}>
                              <AccountNoField
                                disabled={ineligible}
                                name="accountNo"
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

                          <Grid
                            container
                            spacing={5}
                            justifyContent="space-between"
                          >
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

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                name="howDidYouHear"
                                disabled={ineligible}
                                onChange={howDidYouHearChangeHandler}
                                component={HowDidYouHearSelectField}
                              />
                            </Grid>
                          </Grid>

                          <WaitToGrow isIn={otherHowDidYouHearSelected}>
                            <Grid container spacing={5}>
                              <Grid item xs={12}>
                                <Field
                                  disabled={
                                    !otherHowDidYouHearSelected || ineligible
                                  }
                                  name="otherHowDidYouHear"
                                  component={OtherHowDidYouHearField}
                                />
                              </Grid>
                            </Grid>
                          </WaitToGrow>
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
                                disabled={ineligible}
                                name="manufacturer"
                                label="Pool Cover Manufacturer"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                disabled={ineligible}
                                name="model"
                                label="Pool Cover Model"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            spacing={5}
                            justifyContent="space-between"
                          >
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                required
                                disabled={ineligible}
                                name="sizeSqFt"
                                label="Size of Pool (in square feet)"
                              />
                            </Grid>
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
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <FormTextField
                                name="comments"
                                multiline
                                minRows={3} // That's about 200 characters
                                label="Optionally, you can provide us any comments"
                                disabled={ineligible}
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
                                <RebatesEmail /> with your name and account
                                number in the subject line. Failure to do so may
                                result in a delay or rejected application.
                              </span>
                            }
                            disabled={ineligible}
                          />

                          <div className={classes.dropzoneContainer}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="receipts"
                              attachmentTitle="Receipt(s)"
                              uploadRoute="pool-cover"
                              onIsUploadingChange={receiptIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <div className={classes.dropzoneContainer}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="installPhotos"
                              attachmentTitle="Pool Cover installed photo(s)"
                              uploadRoute="pool-cover"
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
                                fileName="Pool-Cover-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://imgix.cosmicjs.com/f48eb8f0-e3fc-11eb-be9a-bfe30c7c12b9-POOL-COVER-REBATE-REQUIREMENTS.pdf"
                              />
                              <Type
                                variant="body1"
                                paragraph
                                className={classes.reserveRight}
                              >
                                <em>
                                  I have read, understand, and agree to the Pool
                                  Cover Rebate Terms and Conditions.
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

                        <Spacing />
                        <SubmitFormButton
                          boxProps={{
                            flex: '0 0 auto'
                          }}
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled={
                            ineligible ||
                            isSubmitting ||
                            // !isValid ||
                            (!formTouched && !dirty) ||
                            attachmentsAreUploading
                          }
                        >
                          Submit Application
                        </SubmitFormButton>
                      </FormBox>

                      <PoolCoverEligibilityDialog
                        open={eligibilityDialogOpen}
                        onClose={() => setEligibilityDialogOpen(false)}
                      />
                    </FormValidate>
                  </ProtectRouteChange>
                )
              }}
            </Formik>
          </MainBox>
        </NarrowContainer>
      </>
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

  return (
    <>
      <PageLayout title="Pool Cover Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="PCWA Pool Cover Rebate Application"
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
