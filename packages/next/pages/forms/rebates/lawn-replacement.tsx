import React, {useState, useCallback, useMemo, useEffect} from 'react'
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
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import LawnReplEligibilityDialog from '@components/formFields/LawnReplEligibilityDialog'
import LawnApproxSqFootField from '@components/formFields/LawnApproxSqFootField'
import ArtTurfSelect from '@components/formFields/ArtTurfSelect'
import AlreadyStartedSelect from '@components/formFields/AlreadyStartedSelect'
import isNumber from 'is-number'
import delay from 'then-sleep'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox} from '@components/boxes/FlexBox'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'lawn-replacement-rebate'

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
    treatedCustomer: string()
      .required()
      .label('Treated Customer')
      .oneOf(
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
    inspectAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to a scheduled site inspection by checking this box'
      )
      .label('Agree to Site Inspection'),
    signature: string()
      .required()
      .label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    comments: string()
      .max(200, 'Comments must be less than 200 characters.')
      .label('Comments'),
    useArtTurf: string()
      .required()
      .oneOf(
        ['false'],
        'Artificial grass is not allowed in the rebated portion of the converted landscape'
      )
      .label('Replace lawn with artificial turf'),
    alreadyStarted: string()
      .required()
      .label('Project Status'),
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
        (val: string): boolean => {
          const stripped = val && val.replace(/[^0-9.]/, '')
          if (isNumber(stripped)) {
            const valAsNo = Math.round(parseFloat(stripped))
            return valAsNo >= 300
          }
          return false
        }
      )
      .label('Approximate Square Feet of Existing Lawn'),
    irrigMethod: string()
      .required()
      .label('Irrigation Method')
      .notOneOf(
        ['Hand water'], // Case sensitive
        'The Lawn Replacement Rebates are only available to improve existing in-ground irrigation systems'
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
  termsAgree: '',
  inspectAgree: '',
  signature: '',
  captcha: '',
  comments: '',
  irrigMethod: '',
  approxSqFeet: '',
  useArtTurf: '',
  alreadyStarted: ''
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
    }
  })
)

const LawnReplacement = () => {
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
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState<boolean>(
    false
  )
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)
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
                  // isValid,
                  errors,
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
                          <Grid item xs={12}>
                            <Field
                              name="alreadyStarted"
                              disabled={ineligible}
                              component={AlreadyStartedSelect}
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
                              labelWidth={200}
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
                            <Field
                              disabled
                              name="approxSqFeet"
                              component={LawnApproxSqFootField}
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

                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <Field
                              name="comments"
                              multiline
                              rows={3} // That's about 200 characters
                              label="Optionally, you can provide us any comments"
                              disabled={ineligible}
                              component={FormTextField}
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
                              termsConditionsUrl="https://cosmic-s3.imgix.net/cedb8680-943d-11e9-85db-d593262c2934-Lawn-Replacement-Terms-and-Conditions.pdf"
                            />
                            <Field
                              name="termsAgree"
                              disabled={ineligible}
                              component={AgreeTermsCheckbox}
                              fullWidth={false}
                            />
                            <Type variant="body1">
                              You must agree to participate in a pre-conversion
                              site inspection conducted by PCWA prior to the
                              removal of any lawn. You may not be required to be
                              present; arrangements will be made by a PCWA Water
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

                      <div className={classes.buttonWrapper}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            // !isValid ||
                            ineligible ||
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

                    <LawnReplEligibilityDialog
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
          </MainBox>
        </NarrowContainer>
      </React.Fragment>
    ),
    [
      classes,
      formIsDirty,
      formValues,
      formIsTouched,
      eligibilityDialogOpen,
      ineligible
    ]
  )

  // GO-LIVE - Won't need this ternary or logo after GO LIVE date.
  const lawnReplacementEl = useMemo(
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
        <PageLayout title="Lawn Replacement Rebate Form">{mainEl}</PageLayout>
      ),
    [mainEl]
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

export default LawnReplacement
