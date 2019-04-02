// @flow
// cspell:ignore addtl mnfg
import React, {useState, useCallback, useMemo} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography as Type
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik'
import {string, object, boolean, array} from 'yup'
import classNames from 'classnames'
import {
  postIrrigCntrlRebateForm,
  type RequestBody,
  type RebateFormData
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import PurchaseDateField from '@components/formFields/PurchaseDateField'
// import PurchaseDateNativeField from '@components/formFields/PurchaseDateNativeField'
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
import IrrigCntrlModelField from '@components/formFields/IrrigCntrlModelField'
import IrrigCntrlMnfgField from '@components/formFields/IrrigCntrlMnfgField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import IrrigEffTermsConditions from '@components/IrrigEffTermsConditions/IrrigEffTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const isDev = process.env.NODE_ENV === 'development'

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
  .strict()
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
      .when('city', (city, schema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string()
      .required()
      .min(10)
      .label('Phone Number'),
    propertyType: string()
      .required()
      .label('Property Type'),
    manufacturer: string()
      .required()
      .label('Irrigation Controller Manufacturer'),
    model: string()
      .required()
      .label('Irrigation Controller Model'),
    additional: string().label('Additional Sensor or Outdoor Cover'),
    purchaseDate: string()
      .required('A valid purchase date is required')
      .typeError('A valid purchase date is required'),
    termsAgree: boolean()
      .required()
      .oneOf([true], 'Must agree to terms and conditions by checking this box')
      .label('Agree to Terms Check'),
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
    cntrlPhotos: array()
      .required('Must provide photo(s) of installed irrigation controller')
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
    addtlSensorPhotos: array()
      .when('additional', (additional, schema) =>
        additional
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
  manufacturer: '',
  model: '',
  additional: '',
  purchaseDate: '',
  termsAgree: false,
  signature: '',
  captcha: '',
  receipts: [],
  cntrlPhotos: [],
  addtlSensorPhotos: []
}

const styles = (theme) => ({
  main: {
    maxWidth: 650,
    margin: {
      // left: '20vw',
      // right: '20vw',
      left: 'auto',
      right: 'auto',
      top: theme.spacing.unit * 5,
      bottom: theme.spacing.unit * 5
    }
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
  // textField: {
  //   marginTop: theme.spacing.unit * 1,
  //   marginBottom: theme.spacing.unit * 4,
  //   '&:not(:first-child)': {
  //     marginLeft: theme.spacing.unit * 4
  //   }
  // },
  // formControl: {
  //   marginTop: theme.spacing.unit * 1,
  //   marginBottom: theme.spacing.unit * 4,
  //   minWidth: 150,
  //   '&:not(:first-child)': {
  //     marginLeft: theme.spacing.unit * 4
  //   }
  // },
  // formControlRow: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: '100%',
  //   margin: {
  //     bottom: theme.spacing.unit * 1,
  //     top: theme.spacing.unit * 1
  //   },
  //   '&$dropzoneContainer': {
  //     flexDirection: 'column',
  //     justifyContent: 'flex-start',
  //     alignItems: 'flex-start',
  //     marginBottom: theme.spacing.unit * 3
  //   }
  // },
  dropzoneContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  },
  // formControlsContainer: {
  //   margin: theme.spacing.unit * 8,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start'
  // },
  buttonWrapper: {
    position: 'relative',
    margin: {
      top: theme.spacing.unit * 3,
      bottom: theme.spacing.unit * 3
    }
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
    margin: {
      top: theme.spacing.unit * 5,
      bottom: theme.spacing.unit * 5
    }
  },
  formGroupTitle: {
    marginBottom: theme.spacing.unit * 3
  }
  // grow: {
  //   flexGrow: 1
  // }
  // dropzoneUploader: {
  //   marginBottom: theme.spacing.unit * 2
  // }
})

const IrrigationController = ({classes}: Props) => {
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(null)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [cntrlPhotosIsUploading, setCntrlPhotosIsUploading] = useState<boolean>(
    false
  )
  const [
    addtlSensorPhotosIsUploading,
    setAddtlSensorPhotosIsUploading
  ] = useState<boolean>(false)
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [providedEmail, setProvidedEmail] = useState<string>('')

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

  const mainEl = useMemo(
    () => (
      <Grid container justify="space-around" direction="row">
        <Grid item xs={11} sm={12}>
          <main className={classes.main}>
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
                  // Dispatch submit
                  // console.log(values, actions)
                  setProvidedEmail(values.email)
                  const body: RequestBody = {
                    formData: {...values}
                  }
                  await postIrrigCntrlRebateForm(body)
                  actions.setSubmitting(false)
                  // resetForm()
                  actions.resetForm() // Strictly Formik
                  // alert(JSON.stringify(data, null, 2))
                  setFormSubmitDialogOpen(true)
                } catch (error) {
                  // TODO - form error dialog here
                  console.log('An error occurred submitting form.', error)
                  actions.setSubmitting(false)
                }
              }}
            >
              {({
                values,
                touched = {},
                dirty,
                isSubmitting,
                isValid,
                setFieldValue
                // handleReset
              }) => {
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

                const hasAddtlSensor = Boolean(values.additional)

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = () => {
                  setFieldValue('otherCity', '')
                }

                const attachmentsAreUploading =
                  receiptIsUploading ||
                  cntrlPhotosIsUploading ||
                  addtlSensorPhotosIsUploading
                return (
                  <Form className={classes.form}>
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
                      <Grid container spacing={40}>
                        <Grid item xs={12} sm={6}>
                          <Field name="firstName" component={FirstNameField} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field name="lastName" component={LastNameField} />
                        </Grid>
                      </Grid>

                      <Grid container spacing={40}>
                        <Grid item xs={12} sm={7}>
                          <Field name="accountNo" component={AccountNoField} />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <Field
                            name="propertyType"
                            component={PropertyTypeSelectField}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={40} justify="space-between">
                        <Grid item xs={12} sm={8}>
                          <Field
                            name="address"
                            render={({field, form}) => (
                              <StreetAddressField form={form} field={field} />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <Field
                            name="city"
                            render={({field, form}) => (
                              <CitySelectField
                                form={form}
                                field={field}
                                onChange={cityChangeHandler}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <WaitToGrow isIn={otherCitySelected}>
                        <Grid container spacing={40}>
                          <Grid item xs={12}>
                            <Field
                              name="otherCity"
                              render={({field, form}) => (
                                <OtherCityField
                                  form={form}
                                  field={field}
                                  disabled={!otherCitySelected}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </WaitToGrow>

                      <Grid container spacing={40}>
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

                      <Grid container spacing={40}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="manufacturer"
                            component={IrrigCntrlMnfgField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="model"
                            component={IrrigCntrlModelField}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={40}>
                        <Grid item xs={12} sm={7}>
                          <Field
                            name="additional"
                            component={IrrigCntrlAddtlField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          {/* <Hidden only="xs" implementation="css"> */}
                          <Field
                            name="purchaseDate"
                            render={({field, form}) => (
                              <PurchaseDateField
                                form={form}
                                field={field}
                                // required={width !== 'xs'}
                                required={true}
                              />
                            )}
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

                      <div className={classNames(classes.dropzoneContainer)}>
                        <Field
                          name="receipts"
                          render={({field, form}) => (
                            <AttachmentField
                              form={form}
                              field={field}
                              attachmentTitle="Receipt"
                              uploadFolder="irrigation-controller"
                              onIsUploadingChange={receiptIsUploadingHandler}
                            />
                          )}
                        />
                      </div>

                      <div className={classNames(classes.dropzoneContainer)}>
                        <Field
                          name="cntrlPhotos"
                          render={({field, form}) => (
                            <AttachmentField
                              form={form}
                              field={field}
                              attachmentTitle="Installed Irrigation Controller Photo"
                              uploadFolder="irrigation-controller"
                              onIsUploadingChange={
                                cntrlPhotosIsUploadingHandler
                              }
                            />
                          )}
                        />
                      </div>

                      <WaitToGrow isIn={hasAddtlSensor}>
                        <div className={classNames(classes.dropzoneContainer)}>
                          <Field
                            name="addtlSensorPhotos"
                            render={({field, form}) => (
                              <AttachmentField
                                form={form}
                                field={field}
                                attachmentTitle="Additional Sensor/Outdoor Cover Photo"
                                uploadFolder="irrigation-controller"
                                onIsUploadingChange={
                                  addtlSensorPhotosIsUploadingHandler
                                }
                              />
                            )}
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
                      <Grid container direction="column" spacing={32}>
                        <Grid item xs={12}>
                          <IrrigEffTermsConditions />
                        </Grid>
                        <Grid item xs={12}>
                          <Type variant="body1" paragraph>
                            <em>
                              PCWA reserves the right to verify the installation
                              of the product(s) at the service address on the
                              application. You will be contacted by a Water
                              Efficiency Specialist to schedule an appointment
                              if you are selected for an installation
                              verification.
                            </em>
                          </Type>
                          <Field
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

                      <Grid container direction="column" spacing={32}>
                        <Grid item xs={12}>
                          <Type variant="body1" paragraph color="primary">
                            PCWA may deny any application that does not meet all
                            of the Program requirements. PCWA reserves the right
                            to alter the Program at any time. PCWA does not
                            warrant or guarantee lower water bills as a result
                            of participating in the Program. PCWA is not
                            responsible for any damage that may occur to
                            participants' property as a result of this Program.
                            The undersigned agrees to hold harmless PCWA, its
                            directors, officers, and employees from and against
                            all loss, damage, expense and liability resulting
                            from or otherwise relating to the installation of
                            the Weather Based Irrigation Controller. By signing
                            this form I agree that I have read, understand, and
                            agree to the Terms and Conditions of this rebate
                            program.
                          </Type>
                        </Grid>

                        <Grid item xs={12}>
                          <Type variant="caption">
                            You must sign this form by typing your name
                          </Type>
                          <Field name="signature" component={SignatureField} />
                        </Grid>

                        <Grid item xs={12}>
                          <Field name="captcha" component={RecaptchaField} />
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
                          !isValid ||
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
                )
              }}
            </Formik>

            {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}
          </main>
        </Grid>
      </Grid>
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

  const irrigControllerEl = useMemo(
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
          {mainEl}
        </React.Fragment>
      ) : (
        // <React.Fragment>
        <PageLayout title="Irrigation Controller Rebate Form">
          {mainEl}
        </PageLayout>
      ),
    [mainEl]
  )

  return (
    <React.Fragment>
      {irrigControllerEl}
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Weather Based Irrigation Controller Rebate Application"
        dialogTitle="Your Rebate Application Has Been Submitted"
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(IrrigationController)
