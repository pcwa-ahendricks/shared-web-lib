// cspell:ignore cust
import React, {useState, useCallback, useMemo} from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Theme,
  Typography as Type
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postForm,
  ContactInfoFormData as FormData,
  ContactInfoRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import SignatureField from '@components/formFields/SignatureField'
// import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import NarrowContainer from '@components/containers/NarrowContainer'
import StateSelectField from '@components/formFields/StateSelectField'
import {ColumnBox} from '@components/boxes/FlexBox'
import FormSubmissionDialogCustAcctInfo from '@components/FormSubmissionDialogCustAcctInfo/FormSubmissionDialogCustAcctInfo'
import FormSubmissionDialogErrorCustAcctInfo from '@components/FormSubmissionDialogErrorCustAcctInfo/FormSubmissionDialogErrorCustAcctInfo'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'account-contact-info'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    name: string()
      .required()
      .max(30, 'Name must be no more than 30 characters.')
      .label('Legal Name'),
    spouseName: string()
      .max(27, "Spouse's Name must be no more than 27 characters.")
      .label("Spouse's Name"),
    email: string()
      .email()
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
      .max(30, 'Mailing address must be no more than 30 characters.')
      .label('Mailing Address'),
    previousAddress: string()
      .max(
        60,
        'Previous service address(es) must be no more than 60 characters.'
      )
      .label('Previous Services Address'),
    city: string()
      .required()
      .label('City'),
    state: string()
      .required()
      .label('State'),
    zipCode: string()
      .required()
      .label('Zip Code'),
    // otherCity: string()
    //   .label('City')
    //   .when('city', (city: string | null, schema: StringSchema) =>
    //     city && city.toLowerCase() === 'other' ? schema.required() : schema
    //   ),
    phone: string()
      .min(10)
      .label('Main Phone Number'),
    cellPhone: string()
      .min(10)
      .label('Cell Phone Number'),
    workPhone: string()
      .min(10)
      .label('Work Phone Number'),
    spousePhone: string()
      .min(10)
      .label("Spouse's Phone Number"),
    lastFourSS: string()
      .min(4)
      .label('Last Four Digits of Social Security'),
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
  previousAddress: '',
  email: '',
  accountNo: '',
  city: '',
  state: 'California - CA',
  zipCode: '',
  phone: '',
  cellPhone: '',
  workPhone: '',
  spousePhone: '',
  lastFourSS: '',
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
    buttonProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
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

const ContactInfo = () => {
  const classes = useStyles()
  const [formValues, setFormValues] = useState<FormData>(initialFormValues)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] = useState<
    boolean
  >(false)
  // const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
    // setProvidedEmail('')
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
                  // setProvidedEmail(values.email)
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
                  isSubmitting
                  // isValid,
                  // errors,
                  // setFieldValue
                } = formik

                if (values !== formValues) {
                  setFormValues(values)
                }

                // Use state to save a boolean version of 'touched'.
                const formTouched = Object.keys(touched).length > 0
                if (formTouched !== formIsTouched) {
                  setFormIsTouched(formTouched)
                }

                return (
                  <ProtectRouteChange>
                    <FormValidate>
                      <FormBox className={classes.form}>
                        <Box flex="0 0 auto" mt={5} mb={5}>
                          <Type
                            color="textSecondary"
                            variant="h4"
                            gutterBottom
                            className={classes.formGroupTitle}
                          >
                            Updated Contact Information
                          </Type>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <FormTextField
                                name="address"
                                multiline
                                rows={1}
                                label="Mailing Address"
                                autoComplete="street-address"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                              <FormTextField
                                autoComplete="address-level2"
                                name="city"
                                label="City"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                name="state"
                                component={StateSelectField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormTextField
                                autoComplete="postal-code"
                                name="zipCode"
                                label="Zip Code"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={7}>
                              <AccountNoField name="accountNo" />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <FormTextField
                                name="lastFourSS"
                                label="Last 4 Digits Social Security"
                                required={false}
                              />
                            </Grid>
                            {/* <Grid item xs={12} sm={5}>
                            <Field
                              name="propertyType"
                              component={PropertyTypeSelectField}
                            />
                          </Grid> */}
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <FormTextField
                                autoComplete="name"
                                name="name"
                                label="Name (legal name)"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                              <Field
                                name="phone"
                                component={PhoneNoField}
                                label="Main Phone"
                                required={false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                name="cellPhone"
                                component={PhoneNoField}
                                label="Cell Phone"
                                required={false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                name="workPhone"
                                component={PhoneNoField}
                                label="Work Phone"
                                required={false}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="email"
                                component={EmailField}
                                required={false}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <FormTextField
                                name="spouseName"
                                label="Spouse's Name (if applicable)"
                                required={false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="spousePhone"
                                component={PhoneNoField}
                                label="Spouse's Phone"
                                required={false}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <ColumnBox>
                                <Type variant="caption">
                                  If you had previous service with PCWA, please
                                  list all service addresses below:
                                </Type>
                                <FormTextField
                                  name="previousAddress"
                                  multiline
                                  rows={2}
                                  label="Previous Address(es)"
                                />
                              </ColumnBox>
                            </Grid>
                          </Grid>
                        </Box>

                        <Divider variant="middle" />

                        <Box flex="0 0 auto" mt={5} mb={5}>
                          <Type
                            color="textSecondary"
                            variant="h4"
                            gutterBottom
                            className={classes.formGroupTitle}
                          >
                            E-Signature
                          </Type>

                          <Grid container direction="column" spacing={1}>
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
                        </Box>

                        <Box flex="0 0 auto" position="relative" mt={3} mb={3}>
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
                            Submit Updated Contact Information
                          </Button>
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Box>
                      </FormBox>
                    </FormValidate>
                  </ProtectRouteChange>
                )
              }}
            </Formik>

            {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}
          </NarrowContainer>
        </MainBox>
      </>
    ),
    [classes, formValues, formIsTouched]
  )

  // GO-LIVE - Won't need this ternary or logo after GO LIVE date.
  const contactInfoEl = useMemo(
    () =>
      !isDev ? (
        <>
          <Head>
            <title>Rebate Form</title>
            <meta name="description" content="Update Contact Info Form" />
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
          <WaterSurfaceImg />
          {mainEl}
        </>
      ) : (
        <PageLayout title="Update Contact Info Form" waterSurface>
          {mainEl}
        </PageLayout>
      ),
    [mainEl]
  )

  return (
    <>
      {contactInfoEl}

      <FormSubmissionDialogCustAcctInfo
        // providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Account Contact Information Update request"
        dialogTitle="Contact Information Update Has Been Submitted"
      />
      <FormSubmissionDialogErrorCustAcctInfo
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default ContactInfo
