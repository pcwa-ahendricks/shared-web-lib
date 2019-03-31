// @flow
import React, {useState, useCallback} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Grow,
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
import SignatureCheckbox from '@components/formFields/SignatureCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import IrrigEffTermsConditions from '@components/IrrigEffTermsConditions/IrrigEffTermsConditions'
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
      .when('city', (city, passSchema) =>
        city && city.toLowerCase() === 'other'
          ? passSchema.required()
          : passSchema
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
    signature: boolean()
      .required()
      .oneOf([true], 'Must provide signature by checking this box')
      .label('Signature Check'),
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
  signature: false,
  captcha: '',
  receipts: [],
  cntrlPhotos: []
}

const styles = (theme) => ({
  main: {
    maxWidth: 600,
    margin: {
      // left: '20vw',
      // right: '20vw',
      left: 'auto',
      right: 'auto',
      top: theme.spacing.unit * 5,
      bottom: theme.spacing.unit * 5
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
  const [showOtherCityTextField, setShowOtherCityTextField] = useState<boolean>(
    false
  )

  const enteringOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(true)
  }, [])

  const exitedOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(false)
  }, [])

  const receiptIsUploadingHandler = useCallback((isUploading) => {
    setReceiptIsUploading(isUploading)
  }, [])

  const cntrlPhotosIsUploadingHandler = useCallback((isUploading) => {
    setCntrlPhotosIsUploading(isUploading)
  }, [])

  const mainEl = (
    <Grid container justify="space-around" direction="row">
      <Grid item xs={11} sm={12}>
        <main className={classes.main}>
          <Type variant="h1" color="primary" gutterBottom>
            Water Efficiency Rebates
          </Type>

          <Type variant="h3" color="primary" gutterBottom>
            Weather Based Irrigation Controller Rebate Form
          </Type>

          <Formik
            initialValues={initialFormValues}
            validationSchema={formSchema}
            onSubmit={async (values: RebateFormData, actions) => {
              try {
                // Dispatch submit
                console.log(values, actions)
                const body: RequestBody = {
                  formData: {...values}
                }
                const data = await postIrrigCntrlRebateForm(body)
                actions.setSubmitting(false)
                // resetForm()
                actions.resetForm() // Strictly Formik
                alert(JSON.stringify(data, null, 2))
              } catch (error) {
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
              setFieldValue,
              handleReset
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
              const otherCitySelected =
                values.city && values.city.toLowerCase() === 'other'

              // If city field is updated clear out otherCity field.
              const cityChangeHandler = () => {
                setFieldValue('otherCity', '')
              }

              return (
                <Form className={classes.form}>
                  <div>
                    {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}

                    <div className={classes.formGroup}>
                      <Type color="textSecondary" variant="h4" gutterBottom>
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

                      {showOtherCityTextField || otherCitySelected ? (
                        <Grow
                          in={otherCitySelected}
                          onEntering={enteringOtherCityTransHandler}
                          onExited={exitedOtherCityTransHandler}
                        >
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
                        </Grow>
                      ) : null}

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
                      <Type variant="h4" color="textSecondary" gutterBottom>
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
                      <Type variant="h4" color="textSecondary" gutterBottom>
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
                    </div>

                    <Grid container spacing={40}>
                      <Grid item xs={12}>
                        <Field name="signature" component={SignatureCheckbox} />
                      </Grid>
                    </Grid>

                    <Grid container spacing={40}>
                      <Grid item xs={12}>
                        <IrrigEffTermsConditions />
                      </Grid>
                    </Grid>

                    <Grid container spacing={40}>
                      <Grid item xs={12}>
                        <Field name="captcha" component={RecaptchaField} />
                      </Grid>
                    </Grid>

                    <Button
                      variant="outlined"
                      type="submit"
                      onClick={handleReset}
                    >
                      Reset Form
                    </Button>
                    <div className={classes.buttonWrapper}>
                      <Button
                        variant="outlined"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !isValid ||
                          (!formTouched && !dirty) ||
                          receiptIsUploading ||
                          cntrlPhotosIsUploading
                        }
                      >
                        Submit Form
                      </Button>
                      {isSubmitting && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
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
  )

  return !isDev ? (
    <React.Fragment>
      <Head>
        <title>Rebate Form</title>
        <meta name="description" content="PCWA Water Efficiency Rebate Form" />
      </Head>
      {mainEl}
    </React.Fragment>
  ) : (
    // <React.Fragment>
    <PageLayout title="Irrigation Controller Rebate Form">{mainEl}</PageLayout>
  )
}

export default withStyles(styles)(IrrigationController)
