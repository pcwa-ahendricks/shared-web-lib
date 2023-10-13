import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Divider, Grid, Typography as Type, Box, useTheme} from '@mui/material'
import {Formik, Field} from 'formik'
import {string, object, StringSchema, ArraySchema, SchemaOf, array} from 'yup'
import {
  postForm,
  LawnReplacementRequestBody as RequestBody,
  LawnReplacementRebateFormData as RebateFormData
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import AgreeInspectionCheckbox from '@components/formFields/AgreeInspectionCheckbox'
import FirstNameField from '@components/formFields/FirstNameField'
import LastNameField from '@components/formFields/LastNameField'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import IrrigationMethodSelect from '@components/formFields/IrrigationMethodSelect'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import LawnReplEligibilityDialog from '@components/formFields/LawnReplEligibilityDialog'
import LawnApproxSqFootField from '@components/formFields/LawnApproxSqFootField'
import ArtTurfSelect from '@components/formFields/ArtTurfSelect'
import AlreadyStartedSelect from '@components/formFields/AlreadyStartedSelect'
import isNumber from 'is-number'
import delay from 'then-sleep'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import NarrowContainer from '@components/containers/NarrowContainer'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import Spacing from '@components/boxes/Spacing'
import IrrigUpgradeLocationCheckboxes, {
  formControlItems as initialIrrigUpgradeLocationOpts
} from '@components/formFields/IrrigUpgradeLocationCheckboxes'
import HowDidYouHearSelectField from '@components/formFields/HowDidYouHearSelectField'
import OtherHowDidYouHearField from '@components/formFields/OtherHowDidYouHearField'
import RebatesEmail from '@components/links/RebatesEmail'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import {BooleanAsString} from '@lib/safeCastBoolean'
import AttachmentField from '@components/formFields/AttachmentField'
import {Theme} from '@lib/material-theme'

const SERVICE_URI_PATH = 'lawn-replacement-rebate'

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
    termsAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to Terms and Conditions by checking this box'
      )
      .label('Agree to Terms'),
    emailAttachments: string().label('Email Attachments'),
    preConvPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema
                .required('Must provide 5 photos of your pre-converted lawn')
                .min(5, 'Must provide 5 photos of your pre-converted lawn')
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
      .label('This checkbox'),
    describe: string()
      .max(300, 'Description must be less than 300 characters.')
      .label('Description'),
    useArtTurf: string()
      .required()
      .oneOf(
        ['false'],
        'Artificial grass is not allowed in the rebated portion of the converted landscape'
      )
      .label('Replace lawn with artificial turf'),
    alreadyStarted: string().required().label('Project Status'),
    // .oneOf(
    //   ['false'],
    //   "Conversions that are initiated prior to PCWA's approval are ineligible"
    // )
    // .label('Already started replacement of lawn'),
    approxSqFeet: string()
      .required()
      .test(
        'min-sq-feet',
        'A minimum of 300 square feet of lawn must be converted',
        (val) => {
          const stripped = (val && val.replace(/[^0-9.]/, '')) ?? ''
          if (isNumber(stripped)) {
            const valAsNo = Math.round(parseFloat(stripped))
            return valAsNo >= 300
          }
          return false
        }
      )
      .label('Approximate Square Feet of Existing Lawn'),
    irrigMethod: string().required().label('Irrigation Method').notOneOf(
      ['Hand water'], // Case sensitive
      'The Lawn Replacement Rebates are only available to improve existing in-ground irrigation systems'
    ),
    upgradeLocations: object()
      .required()
      .test(
        'has-one-location-option',
        'You must select at least one location option',
        hasTrueValue
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
  termsAgree: '',
  inspectAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  describe: '',
  irrigMethod: '',
  approxSqFeet: '',
  useArtTurf: '',
  alreadyStarted: '',
  upgradeLocations: {...initialIrrigUpgradeLocationOpts},
  preConvPhotos: []
}

const LawnReplacement = () => {
  const theme = useTheme<Theme>()
  const style = useMemo(
    () => ({
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
        marginBottom: '2px'
      }
    }),
    [theme]
  )
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

  const photoIsUploadingHandler = useCallback((isUploading: boolean) => {
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
            <Type variant="h1" color="primary" gutterBottom>
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Lawn Replacement
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
                  // isValid,
                  errors,
                  setFieldValue
                } = formik

                if (dirty !== formIsDirty) {
                  setFormIsDirty(dirty)
                }

                if (values !== formValues) {
                  // prevent max depth error with setTimeout()
                  setTimeout(() => setFormValues(values), 10)
                }

                // Check if user is in-eligible for rebate and disable all form controls if so.
                const rebateIneligibility = [
                  errors['treatedCustomer'],
                  errors['useArtTurf'],
                  errors['approxSqFeet'],
                  errors['irrigMethod']
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
                const otherHowDidYouHearSelected = Boolean(
                  values.howDidYouHear &&
                    values.howDidYouHear.toLowerCase() === 'other'
                )

                const emailAttachments = Boolean(
                  values.emailAttachments === 'true'
                )

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = () => {
                  setFieldValue('otherCity', '')
                }
                // If howDidYouHear field is updated clear out otherHowDidYouHear field.
                const howDidYouHearChangeHandler = (evt: any) => {
                  // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                  if (evt.target.value.toLowerCase() !== 'other') {
                    setFieldValue('otherHowDidYouHear', '')
                  }
                }
                const attachmentsAreUploading = photoIsUploading

                return (
                  <ProtectRouteChange>
                    <FormValidate>
                      <FormBox
                        sx={{
                          ...style.form
                        }}
                      >
                        <Box sx={{...style.formGroup}}>
                          <Type
                            color="textSecondary"
                            variant="h4"
                            gutterBottom
                            sx={{...style.formGroupTitle}}
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
                        </Box>

                        <Divider variant="middle" />

                        <Box sx={{...style.formGroup}}>
                          <Type
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                            sx={{...style.formGroupTitle}}
                          >
                            Rebate Information
                          </Type>

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                name="alreadyStarted"
                                disabled={ineligible}
                                component={AlreadyStartedSelect}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Type
                                variant="subtitle1"
                                color="textSecondary"
                                gutterBottom
                              >
                                Location of the irrigation equipment you plan to
                                upgrade
                              </Type>

                              <Field
                                name="upgradeLocations"
                                disabled={ineligible}
                                component={IrrigUpgradeLocationCheckboxes}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <FormTextField
                                required
                                name="describe"
                                multiline
                                minRows={3} // That's about 200 characters
                                label="Briefly describe your project plans"
                                disabled={ineligible}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="treatedCustomer"
                                inputLabel="PCWA Treated Customer"
                                inputId="treated-water-select"
                                component={YesNoSelectField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="useArtTurf"
                                component={ArtTurfSelect}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={8}>
                              <LawnApproxSqFootField
                                disabled
                                name="approxSqFeet"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <Field
                                disabled
                                name="irrigMethod"
                                component={IrrigationMethodSelect}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Divider variant="middle" />

                        <Box sx={{...style.formGroup}}>
                          <Type
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                            sx={{...style.formGroupTitle}}
                          >
                            Pre-Conversion Photograph Attachments
                          </Type>
                          <Type>Photo Attachment Requirements:</Type>
                          <Box component="ul">
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Submit <strong>Five</strong> photographs
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              All photographs must be in color.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              No up-close photographs of grass.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Stand far back enough to include your home,
                              street, driveway, or fence as a reference point.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Street number or address must be visible in{' '}
                              <strong>at least one</strong> photograph.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Photographs cannot be online images{' '}
                              <em>(i.e Google, Bing, etc.)</em>.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Photographs must be current representation of the
                              conversion areas current state.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Altered photographs will result in application
                              being ineligible for rebate{' '}
                              <em>(see II. D. on page 1)</em>.
                            </Type>
                            <Type
                              component="li"
                              variant="body1"
                              sx={{...style.liItem}}
                            >
                              Conversation area must{' '}
                              <strong>include at least</strong> one picture of
                              irrigation system operating.
                            </Type>
                          </Box>
                          <Spacing size="small" />
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
                                Optionally, check here to email photos instead.
                                Send email with attachments to <RebatesEmail />{' '}
                                with your name and account number in the subject
                                line. Failure to do so may result in a delay or
                                rejected application.
                              </span>
                            }
                            disabled={ineligible}
                          />

                          <Box sx={{...style.dropzoneContainer}}>
                            <Field
                              disabled={ineligible || emailAttachments}
                              name="preConvPhotos"
                              attachmentTitle="(5) Photos"
                              uploadRoute="lawn-replacement"
                              onIsUploadingChange={photoIsUploadingHandler}
                              component={AttachmentField}
                            />
                          </Box>
                        </Box>

                        <Divider variant="middle" />

                        <Box sx={{...style.formGroup}}>
                          <Type
                            color="textSecondary"
                            variant="h4"
                            gutterBottom
                            sx={{...style.formGroupTitle}}
                          >
                            Acknowledge Terms & Conditions
                          </Type>
                          <Grid container direction="column" spacing={1}>
                            {/* <Grid
                            item
                            xs={12}
                            sx={{...style.ieFixFlexColumnDirection}}
                          >
                          </Grid> */}
                            <Grid
                              item
                              xs={12}
                              sx={{...style.ieFixFlexColumnDirection}}
                            >
                              <ReviewTermsConditions
                                pageCount={3}
                                fileName="Lawn-Replacement-Terms-and-Conditions.pdf"
                                termsConditionsUrl="https://imgix.cosmicjs.com/3ee0a600-5897-11ee-a06d-a31b04d2d095-Lawn-Replacement-Rebate-Terms-and-Conditions-09212023.pdf.pdf"
                              />
                              <Field
                                name="termsAgree"
                                disabled={ineligible}
                                component={AgreeTermsCheckbox}
                                fullWidth={false}
                              />
                              <Type variant="body1">
                                You must agree to participate in a
                                pre-conversion site inspection conducted by PCWA
                                prior to the removal of any lawn. You may not be
                                required to be present; arrangements will be
                                made by a PCWA Water Efficiency Specialist.
                              </Type>
                              <Field
                                name="inspectAgree"
                                disabled={ineligible}
                                component={AgreeInspectionCheckbox}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Divider variant="middle" />

                        <Box sx={{...style.formGroup}}>
                          <Type
                            color="textSecondary"
                            variant="h4"
                            gutterBottom
                            sx={{...style.formGroupTitle}}
                          >
                            Release of Liability & Signature
                          </Type>

                          <Grid container direction="column" spacing={1}>
                            <Grid
                              item
                              xs={12}
                              sx={{...style.ieFixFlexColumnDirection}}
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
                              sx={{...style.ieFixFlexColumnDirection}}
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
                              sx={{...style.ieFixFlexColumnDirection}}
                            >
                              <Field
                                name="captcha"
                                disabled={ineligible}
                                component={RecaptchaField}
                              />
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

                      <LawnReplEligibilityDialog
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
      style,
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
      <PageLayout title="Lawn Replacement Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>

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
    </>
  )
}

export default LawnReplacement

function hasTrueValue(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    Object.keys(value).some((chkBoxVal) => value[chkBoxVal] === true)
  )
}
