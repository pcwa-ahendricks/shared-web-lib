import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {
  Divider,
  Grid,
  Theme,
  Typography as Type,
  makeStyles,
  createStyles,
  Box
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object, StringSchema, ArraySchema, SchemaOf, array} from 'yup'
import {
  postForm,
  PostConvLawnReplacementRequestBody as RequestBody,
  PostConvLawnReplacementFormData as RebateFormData
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import AgreeInspectionCheckbox from '@components/formFields/AgreeInspectionCheckbox'
import FirstNameField from '@components/formFields/FirstNameField'
import LastNameField from '@components/formFields/LastNameField'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import FormTextField from '@components/formFields/FormTextField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from 'then-sleep'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import Spacing from '@components/boxes/Spacing'
import RebatesEmail from '@components/links/RebatesEmail'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import {BooleanAsString} from '@lib/safeCastBoolean'
import AttachmentField from '@components/formFields/AttachmentField'
import PostConvLawnReplEligibilityDialog from '@components/formFields/PostConvLawnReplEligibilityDialog'

const SERVICE_URI_PATH = 'lawn-replacement-post-conversion-app'

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
    rebateCustomer: string()
      .required()
      .oneOf(
        ['Yes'],
        'You must be currently participating in the Lawn Replacement Rebate Program'
      )
      .label('Lawn Replacement Rebate Applicant'),
    projectCompleted: string()
      .required()
      .oneOf(['Yes'], 'Project must be completed')
      .label('Project Completion'),
    worksheetCompleted: string()
      .required()
      .oneOf(
        ['Yes'],
        'Plant Coverage Worksheet is required in order to submit application'
      )
      .label('Worksheet Completion'),
    photosTaken: string()
      .required()
      .oneOf(
        ['Yes'],
        'Post Conversion photographs (5) are required in order to submit application'
      )
      .label('Post Conversion photographs Taken'),
    artTurfInstalled: string().required().label('Artificial Turf Installed'),
    approxSqFeet: string().label(
      'Approximate Square Feet of Installed Artificial Turf'
    ),
    partsReceipts: string()
      .required()
      .label('Itemized Receipts for Irrigation Parts Installed'),
    termsAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to Terms and Conditions by checking this box'
      )
      .label('Agree to Terms'),
    emailAttachments: string().label('Email Attachments'),
    postConvPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema
                .required('You must provide 5 photos')
                .min(5, 'You must provide 5 photos')
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
    worksheetUploads: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema
                .required('You must provide Plant Coverage Worksheet')
                .min(1, 'You must provide Plant Coverage Worksheet')
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
    checklistUploads: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema
                .required('You must provide Customer Check List')
                .min(1, 'You must provide Customer Check List')
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
    itemizedReceipts: array()
      .when(
        'partsReceipts',
        (partsReceipts: string, schema: ArraySchema<SchemaOf<string>>) =>
          partsReceipts?.toLowerCase() === 'yes'
            ? schema
            : schema
                .required('Please provide itemized receipt(s)')
                .min(1, 'Please provide itemized receipt(s)')
      )
      .of(
        object({
          status: string()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
        })
      ),
    inspectAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to a scheduled site inspection by checking this box'
      )
      .label('Agree to Site Inspection'),
    signature: string().required().label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox')
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
  rebateCustomer: '',
  projectCompleted: '',
  worksheetCompleted: '',
  photosTaken: '',
  artTurfInstalled: '',
  approxSqFeet: '',
  partsReceipts: '',
  termsAgree: '',
  inspectAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  postConvPhotos: [],
  worksheetUploads: [],
  checklistUploads: [],
  itemizedReceipts: []
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
    },
    dropzoneContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
    },
    liItem: {
      listStyleType: 'disc',
      marginBottom: 2
    }
  })
)
const LawnReplacementPostConversion = () => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] =
    useState<RebateFormData>(initialFormValues)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [photoIsUploading, setPhotoIsUploading] = useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [eligibilityDialogOpen, setEligibilityDialogOpen] =
    useState<boolean>(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)

  const photoIsUploadingHandler = useCallback((isUploading) => {
    setPhotoIsUploading(isUploading)
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
            <Type variant="h2" color="primary" gutterBottom>
              Lawn Replacement Post-Conversion Application
            </Type>

            {/* <Type variant="h3" color="primary" gutterBottom>
              Water Efficiency Rebate Form
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
                  // isValid,
                  errors,
                  setFieldValue
                } = formik

                if (dirty !== formIsDirty) {
                  setFormIsDirty(dirty)
                }

                if (values !== formValues) {
                  setFormValues(values)
                }

                // Check if user is in-eligible for rebate and disable all form controls if so.
                const rebateIneligibility = [
                  errors['rebateCustomer'],
                  errors['projectCompleted'],
                  errors['worksheetCompleted'],
                  errors['photosTaken']
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
                const cityChangeHandler = () => {
                  setFieldValue('otherCity', '')
                }
                const emailAttachments = Boolean(
                  values.emailAttachments === 'true'
                )
                const artTurfSelected = Boolean(
                  values.artTurfInstalled?.toLowerCase() === 'yes'
                )
                // If artTurfInstalled is updated clear out approxSqFeet field.
                const artTurfHandler = () => {
                  setFieldValue('approxSqFeet', '')
                }

                const shouldUploadReceipts = Boolean(
                  values.partsReceipts?.toLowerCase() === 'yes'
                )

                const attachmentsAreUploading = photoIsUploading

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
                              <Field
                                disabled={ineligible}
                                name="firstName"
                                component={FirstNameField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled={ineligible}
                                name="lastName"
                                component={LastNameField}
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
                                name="address"
                                disabled={ineligible}
                                component={StreetAddressField}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Field
                                name="city"
                                disabled={ineligible}
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
                                  disabled={!otherCitySelected || ineligible}
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
                                disabled={ineligible}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="email"
                                component={EmailField}
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
                            Rebate Information
                          </Type>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="artTurfInstalled"
                                inputLabel="Artificial Turf Installed?"
                                inputId="art-turf-installed-select"
                                labelWidth={190}
                                component={YesNoSelectField}
                                disabled={ineligible}
                                onChange={artTurfHandler}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <WaitToGrow isIn={artTurfSelected}>
                                <FormTextField
                                  disabled={!artTurfSelected || ineligible}
                                  name="approxSqFeet"
                                  label="Installed Artificial Turf, Approx. Sq. Ft."
                                />
                              </WaitToGrow>
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                disabled
                                name="partsReceipts"
                                inputLabel="Have receipts for Irrigation Efficiencies Rebate?"
                                inputId="parts-receipts-select"
                                labelWidth={365}
                                component={YesNoSelectField}
                                // onChange={partsReceipts}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="rebateCustomer"
                                inputLabel="Participating in Lawn Replacement Rebate Program"
                                inputId="rebate-customer-select"
                                labelWidth={315}
                                component={YesNoSelectField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="projectCompleted"
                                inputLabel="Lawn Conversion Project Completed"
                                inputId="project-completed-select"
                                labelWidth={280}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="worksheetCompleted"
                                inputLabel="Plant Coverage Worksheet Completed"
                                inputId="plant-coverage-completed-select"
                                labelWidth={290}
                                component={YesNoSelectField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="photosTaken"
                                inputLabel="Have Taken Photos"
                                inputId="have-taken-photos-select"
                                labelWidth={155}
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
                            Post-Conversion Attachments
                          </Type>
                          <Type>Photo Attachment Requirements:</Type>
                          <Box component="ul">
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Submit <strong>Five</strong> photographs
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              All photographs must be in color.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              No up-close photographs of grass.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Stand far back enough to include your home,
                              street, driveway, or fence as a reference point.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Street number or address must be visible in{' '}
                              <strong>at least one</strong> photograph.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Photographs cannot be online images{' '}
                              <em>(i.e Google, Bing, etc.)</em>.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Photographs must be current representation of the
                              conversion areas current state.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Altered photographs will result in application
                              being ineligible for rebate{' '}
                              <em>(see II. D. on page 1)</em>.
                            </Type>
                            {/* <Type
                              component="li"
                              variant="body1"
                              className={classes.liItem}
                            >
                              Conversation area must{' '}
                              <strong>include at least</strong> one picture of
                              irrigation system operating.
                            </Type> */}
                          </Box>
                          <Spacing size="small" />
                          <Type variant="caption" color="textSecondary">
                            Note - Image file formats are preferred (eg. .jpg,
                            .png) for uploads. PDF files and Word Documents can
                            be uploaded too but they <em>must be less than</em>{' '}
                            4 MB in size. If you are unable to attach the
                            correct file type, or if any other issues with the
                            attachments arise, you may select the box below and
                            submit the files in an email.
                          </Type>
                          <Field
                            name="emailAttachments"
                            component={EmailAttachmentsSwitch}
                            fullWidth={false}
                            label={
                              <span>
                                Optionally, check here to email photos instead.
                                Send email with attachments to <RebatesEmail />{' '}
                                with your name and account number in the subject
                                line. Failure to do so may result in a delay or
                                rejected application.
                              </span>
                            }
                            disabled={ineligible}
                          />

                          <div className={classes.dropzoneContainer}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="postConvPhotos"
                              attachmentTitle="(5) Post Conversion Photos"
                              uploadRoute="post-conv-lawn-replacement-photos"
                              onIsUploadingChange={photoIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <div className={classes.dropzoneContainer}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="worksheetUploads"
                              attachmentTitle="Plant Coverage Worksheet"
                              uploadRoute="post-conv-lawn-replacement-worksheet"
                              onIsUploadingChange={photoIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <div className={classes.dropzoneContainer}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="checklistUploads"
                              attachmentTitle="Customer Check List"
                              uploadRoute="post-conv-lawn-replacement-checklist"
                              onIsUploadingChange={photoIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </div>

                          <WaitToGrow isIn={shouldUploadReceipts}>
                            <div className={classes.dropzoneContainer}>
                              <Field
                                disabled={ineligible || emailAttachments}
                                name="itemizedReceipts"
                                attachmentTitle="Itemized Receipts"
                                uploadRoute="post-conv-lawn-replacement-receipts"
                                onIsUploadingChange={photoIsUploadingHandler}
                                component={AttachmentField}
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
                            {/* <Grid
                            item
                            xs={12}
                            className={classes.ieFixFlexColumnDirection}
                          >
                          </Grid> */}
                            <Grid
                              item
                              xs={12}
                              className={classes.ieFixFlexColumnDirection}
                            >
                              <ReviewTermsConditions
                                pageCount={3}
                                fileName="Lawn-Replacement-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://imgix.cosmicjs.com/6d6fb250-a8bf-11ed-a8ba-dd2d9e563519-Lawn-Replacement-Rebate-Terms-and-Conditions-2023.pdf"
                              />
                              <Field
                                name="termsAgree"
                                disabled={ineligible}
                                component={AgreeTermsCheckbox}
                                fullWidth={false}
                              />
                              <Type variant="body1">
                                You must agree to participate in a
                                post-conversion site inspection conducted by
                                PCWA. You may not be required to be present;
                                arrangements will be made by a PCWA Water
                                Efficiency Specialist.
                              </Type>
                              <Field
                                name="inspectAgree"
                                disabled={ineligible}
                                component={AgreeInspectionCheckbox}
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
                              {/* [TODO] Need new wording from Cassandra. */}
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
                                otherwise relating to the installation of water
                                efficient landscape. By signing this form I
                                agree that I have read, understand, and agree to
                                the Terms and Conditions of this rebate program.
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
                                disabled={ineligible}
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
                                disabled={ineligible}
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
                            ineligible ||
                            (!formTouched && !dirty) ||
                            attachmentsAreUploading
                          }
                        >
                          Submit Application
                        </SubmitFormButton>
                      </FormBox>

                      <PostConvLawnReplEligibilityDialog
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
      eligibilityDialogOpen,
      ineligible,
      photoIsUploading,
      photoIsUploadingHandler
    ]
  )

  return (
    <>
      <PageLayout title="Lawn Replacement Post Conversion Form" waterSurface>
        {mainEl}
      </PageLayout>

      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Lawn Replacement Post Conversion Application"
        dialogTitle="Your Application Has Been Submitted"
      />
      <FormSubmissionDialogError
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default LawnReplacementPostConversion
