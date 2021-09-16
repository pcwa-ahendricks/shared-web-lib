// cspell:ignore addtl assis
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {
  Divider,
  Grid,
  Theme,
  Typography as Type,
  makeStyles,
  createStyles,
  Button
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object, StringSchema} from 'yup'
import {
  postForm,
  Sb998SelfCertFormData,
  Sb998SelfCertRequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import FormTextField from '@components/formFields/FormTextField'
import YesNoSelectField, {
  YesNoSelectFieldProps
} from '@components/formFields/YesNoSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from 'then-sleep'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import Sb998SelfCertEligibilityDialog from '@components/formFields/Sb998SelfCertEligibilityDialog'
import OwnerTenantRadioField from '@components/formFields/OwnerTenantRadioField'
import {ChildBox, RowBox} from 'mui-sleazebox'
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const SERVICE_URI_PATH = 'sb998-application'

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
    svcAddress: string().required().label('Service Address'),
    ownerTenant: string().required().label('Owner or Tenant'),
    city: string().required().label('City'),
    otherCity: string()
      .label('City')
      .when('city', (city: string | null, schema: StringSchema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string().required().min(10).label('Phone Number'),
    treatedCustomer: string().required().label('Treated Customer').oneOf(
      ['Yes'], // "Yes", "No"
      'You must be a current Placer County Water Agency treated water customer'
    ),
    householdAssist: string().required().label('Household Assistance Program'),
    householdIncome: string()
      .label('Household Annual Income')
      .when(
        'householdAssist',
        (householdAssist: string | null, schema: StringSchema) =>
          householdAssist && householdAssist.toLowerCase() === 'no'
            ? schema.oneOf(
                ['Yes'],
                'Specific income conditions must be met to qualify for Water Shutoff Protection under SB998'
              )
            : schema
      ),
    primaryCareCert: string()
      .required()
      .label('Certification of a Primary Care Provider'),
    paymentPlan: string()
      .label('Payment Plan')
      .when(
        'primaryCareCert',
        (primaryCareCert: string | null, schema: StringSchema) =>
          primaryCareCert && primaryCareCert.toLowerCase() === 'yes'
            ? schema.oneOf(
                ['Yes'],
                'Senate Bill 998 requires a customer be willing to enter an amortization agreement, alternative payment schedule, or plan for a deferred or reduced payment'
              )
            : schema
      ),
    signature: string().required().label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox')
  })

const initialFormValues: Sb998SelfCertFormData = {
  firstName: '',
  lastName: '',
  email: '',
  accountNo: '',
  ownerTenant: '',
  address: '',
  svcAddress: '',
  city: '',
  otherCity: '',
  phone: '',
  treatedCustomer: '',
  primaryCareCert: '',
  householdAssist: '',
  householdIncome: '',
  paymentPlan: '',
  reducedCnctChrgCondition: '',
  paymentPlanCondition: '',
  signature: '',
  captcha: ''
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
export default function Sb998SelfCertification() {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] =
    useState<Sb998SelfCertFormData>(initialFormValues)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [eligibilityDialogOpen, setEligibilityDialogOpen] =
    useState<boolean>(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)

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

  const OptYesNoSelectField = useCallback(
    ({...props}: YesNoSelectFieldProps) => {
      return <YesNoSelectField required={false} {...props} />
    },
    []
  )

  const reducedCnctChrgCondition = useMemo(
    () => formValues.primaryCareCert === 'No',
    [formValues]
  )
  const paymentPlanCondition = useMemo(
    () => formValues.paymentPlan === 'Yes',
    [formValues]
  )
  const householdAssisCondition = useMemo(
    () => formValues.householdAssist === 'Yes',
    [formValues]
  )

  const mainEl = useMemo(
    () => (
      <>
        <NarrowContainer>
          <MainBox>
            <Type variant="h1" color="primary" gutterBottom>
              SB998 Self Certification Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Water Shutoff Protection Act
            </Type>

            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: Sb998SelfCertFormData, actions) => {
                try {
                  // console.log(values, actions)
                  setProvidedEmail(values.email)
                  const body: Sb998SelfCertRequestBody = {
                    formData: {
                      ...values,
                      reducedCnctChrgCondition:
                        reducedCnctChrgCondition === true ? 'true' : 'false',
                      paymentPlanCondition:
                        paymentPlanCondition === true ? 'true' : 'false'
                    }
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

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = (evt: any) => {
                  // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
                  if (evt.target.value.toLowerCase() !== 'other') {
                    setFieldValue('otherCity', '')
                  }
                }

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
                            Customer Account Information
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
                                required
                                component={OwnerTenantRadioField}
                                disabled={ineligible}
                                name="ownerTenant"
                                label="Owner Tenant"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={8}>
                              <FormTextField
                                required
                                disabled={ineligible}
                                name="svcAddress"
                                label="Service Address"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            spacing={5}
                            justifyContent="space-between"
                          >
                            <Grid item xs={12} sm={12}>
                              <Field
                                disabled={ineligible}
                                name="address"
                                component={StreetAddressField}
                                label="Billing Address"
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
                            Qualification Information
                          </Type>

                          <Grid
                            container
                            spacing={5}
                            justifyContent="space-between"
                          >
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
                                name="householdAssist"
                                inputLabel="Household Assistance"
                                inputId="household-assistance-select"
                                labelWidth={180}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            {householdAssisCondition ? null : (
                              <Grid item xs={12} sm={6}>
                                <Field
                                  disabled
                                  name="householdIncome"
                                  inputLabel="Household Income Requirement"
                                  inputId="household-income-requirement-select"
                                  labelWidth={255}
                                  component={OptYesNoSelectField}
                                />
                              </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                              <Field
                                disabled
                                name="primaryCareCert"
                                inputLabel="Primary Care Certification"
                                inputId="primary-care-certification-select"
                                labelWidth={215}
                                component={YesNoSelectField}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            {reducedCnctChrgCondition ? null : (
                              <Grid item xs={12} sm={6}>
                                <Field
                                  disabled
                                  name="paymentPlan"
                                  inputLabel="Payment Plan Agreement"
                                  inputId="payment-plan-agreement-select"
                                  labelWidth={205}
                                  component={OptYesNoSelectField}
                                />
                              </Grid>
                            )}
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
                            Policy on Discontinuation of Residential Water
                            Service for Nonpayment
                          </Type>
                          <Grid container direction="column" spacing={1}>
                            <Grid
                              item
                              xs={12}
                              className={classes.ieFixFlexColumnDirection}
                            >
                              {/* <Type
                                variant="body1"
                                paragraph
                                className={classes.reserveRight}
                              >
                                <em>
                                  Review Policy on Discontinuation of
                                  Residential Water Service for Nonpayment
                                </em>
                              </Type> */}
                              <RowBox justifyContent="space-around">
                                <ChildBox>
                                  <ReviewTermsConditions
                                    caption="Review Policy"
                                    pageCount={1}
                                    fileName="Policy_on_Discontinuation_of_Residential_Water_Service_for_Nonpayment.pdf"
                                    termsConditionsUrl="https://imgix.cosmicjs.com/3455f5c0-171a-11ec-80c4-d562efc15827-PolicyonDiscontinuationofResidentialWaterServiceforNonpayment.pdf"
                                  />
                                </ChildBox>
                                <ChildBox>
                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://cdn.cosmicjs.com/191c0250-1719-11ec-80c4-d562efc15827-WSPA-Form.pdf"
                                  >
                                    Water Shutoff Protection Act Form
                                  </Button>
                                </ChildBox>
                              </RowBox>
                              {/* <Type
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
                              /> */}
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
                            Declare Understanding & Agreement
                          </Type>

                          <Grid container direction="column" spacing={1}>
                            <Grid
                              item
                              xs={12}
                              className={classes.ieFixFlexColumnDirection}
                            >
                              {reducedCnctChrgCondition ? (
                                <>
                                  <Type
                                    variant="body1"
                                    paragraph
                                    color="primary"
                                  >
                                    Per Senate Bill 998 (SB998) if a residential
                                    customer demonstrates, to the Agency, that
                                    the customer’s household income is below
                                    200% of the federal poverty line, the Agency
                                    shall charge no more than $50 for
                                    reconnection of service during business
                                    hours or no more than $150 for after-hours
                                    reconnection. Health & Safety code 116910.
                                  </Type>
                                  <Type
                                    variant="body1"
                                    paragraph
                                    color="primary"
                                  >
                                    As a condition and requirement for receiving
                                    a reduced reconnection fee from PCWA, I
                                    hereby declare that my household income is
                                    below 200 percent of the federal poverty
                                    line. This form is valid for 12 months from
                                    date of signature. I understand that by
                                    signing this form I agree that the
                                    information listed is true and correct. I
                                    declare that I meet the above requirements
                                    of the Water Shutoff Protection Act.
                                  </Type>
                                </>
                              ) : null}

                              {paymentPlanCondition ? (
                                <>
                                  <Type
                                    variant="body1"
                                    paragraph
                                    color="primary"
                                  >
                                    Pursuant to Section 116900 of the Health and
                                    Safety Code, Placer County Water Agency
                                    (PCWA) will not terminate residential
                                    service for nonpayment as long as all 3
                                    specific conditions are met.
                                  </Type>
                                  <Type
                                    variant="body1"
                                    paragraph
                                    color="primary"
                                  >
                                    Completion of this form does not guarantee a
                                    payment arrangement. I understand by meeting
                                    the above conditions, my service may still
                                    be terminated if I fail to comply with a
                                    payment arrangement. The Agency shall charge
                                    no more than $50 for reconnection of service
                                    during business hours or no more than $150
                                    for after-hours reconnection. Documentation
                                    may need to be provided upon request by
                                    PCWA. This form is valid for 12 months from
                                    date of signature. I understand that by
                                    signing this form I agree that the
                                    information listed is true and correct. I
                                    declare that I meet the above requirements
                                    of the Water Shutoff Protection Act.
                                  </Type>
                                </>
                              ) : null}
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
                            (!formTouched && !dirty)
                          }
                        >
                          Submit Application
                        </SubmitFormButton>
                      </FormBox>

                      <Sb998SelfCertEligibilityDialog
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
      OptYesNoSelectField,
      reducedCnctChrgCondition,
      paymentPlanCondition,
      householdAssisCondition
    ]
  )

  return (
    <>
      <PageLayout title="SB998 Self Certification Form" waterSurface>
        {mainEl}
      </PageLayout>
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="PCWA SB998 Self Certification Form"
        dialogTitle="Your Form Has Been Submitted"
      />
      <FormSubmissionDialogError
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}
