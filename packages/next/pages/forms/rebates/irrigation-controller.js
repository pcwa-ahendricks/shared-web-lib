// @flow
import React, {useState, useCallback} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  FormHelperText,
  Grid,
  Grow,
  Typography as Type
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik'
import {string, object, boolean} from 'yup'
import classNames from 'classnames'
import {
  postIrrigCntrlRebateForm,
  type RequestBody,
  type RebateFormData
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import DropzoneUploader, {
  type UploadedFile
} from '@components/DropzoneUploader/DropzoneUploader'
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
// Loading Recaptcha with Next dynamic isn't necessary.
// import Recaptcha from '@components/DynamicRecaptcha/DynamicRecaptcha'

const isDev = process.env.NODE_ENV === 'development'

const UPLOAD_MB_LIMIT = 15 // Now lambda functions must be less than 5MB, but we are resizing dropped files using Jimp to roughly 3MB.
const UPLOAD_FILE_LIMIT = 5

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
  .strict()
  .shape({
    // receipts: array().of(string()),
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
  manufacturer: '',
  model: '',
  additional: '',
  purchaseDate: '',
  signature: false,
  captcha: ''
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
  formikContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%'
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
  const [receipts, setReceipts] = useState<Array<string>>([])
  const [installedPhotos, setInstalledPhotos] = useState<Array<string>>([])
  const [unsuccessfulReceipts, setUnsuccessfulReceipts] = useState<
    Array<UploadedFile>
  >([])
  const [
    unsuccessfulInstalledPhotos,
    setUnsuccessfulInstalledPhotos
  ] = useState<Array<UploadedFile>>([])
  const [showOtherCityTextField, setShowOtherCityTextField] = useState<boolean>(
    false
  )

  const uploadedReceiptsHandler = useCallback((files: Array<UploadedFile>) => {
    // onUploaded files parameter always includes all uploads, regardless of their upload status so there is no need to distribute the files parameter and append the incoming to existing uploads. Simply filter and map for the relevant uploads.
    const successfulAttachments = files
      .filter((file) => file.serverResponse.status === 'success')
      .map((file) =>
        file.serverResponse.media ? file.serverResponse.media.imgix_url : null
      )
      .filter(Boolean)
    setReceipts([...successfulAttachments])
    const newUnsuccessfulAttachments = files.filter(
      (file) => file.serverResponse.status !== 'success'
    )
    setUnsuccessfulReceipts([...newUnsuccessfulAttachments])
  }, [])

  const uploadedPhotosHandler = useCallback((files: Array<UploadedFile>) => {
    // onUploaded files parameter always includes all uploads, regardless of their upload status so there is no need to distribute the files parameter and append the incoming to existing uploads. Simply filter and map for the relevant uploads.
    const successfulAttachments = files
      .filter((file) => file.serverResponse.status === 'success')
      .map((file) =>
        file.serverResponse.media ? file.serverResponse.media.imgix_url : null
      )
      .filter(Boolean)
    setInstalledPhotos([...successfulAttachments])
    const newUnsuccessfulAttachments = files.filter(
      (file) => file.serverResponse.status !== 'success'
    )
    setUnsuccessfulInstalledPhotos([...newUnsuccessfulAttachments])
  }, [])

  const enteringOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(true)
  }, [])

  const exitedOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(false)
  }, [])

  const hasBadReceipts = Boolean(unsuccessfulReceipts.length > 0)
  const hasValidReceipts = Boolean(receipts.length > 0 && !hasBadReceipts)
  const hasBadInstalledPhotos = Boolean(unsuccessfulInstalledPhotos.length > 0)
  const hasValidInstalledPhotos = Boolean(
    installedPhotos.length > 0 && !hasBadInstalledPhotos
  )

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

          <div className={classes.formikContainer}>
            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: RebateFormData, actions) => {
                try {
                  // Dispatch submit
                  console.log(values, actions)
                  const body: RequestBody = {
                    formData: {...values},
                    receipts
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
                const otherCitySelected =
                  values.city && values.city.toLowerCase() === 'other'

                // If city field is updated clear out otherCity field.
                const cityChangeHandler = () => {
                  setFieldValue('otherCity', '')
                }

                return (
                  <div>
                    <Form>
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

                          <Grid container spacing={40}>
                            <Grid item xs={12} sm={7}>
                              <Field
                                name="accountNo"
                                component={AccountNoField}
                              />
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
                                  <StreetAddressField
                                    form={form}
                                    field={field}
                                  />
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

                          <div
                            className={classNames(classes.dropzoneContainer)}
                          >
                            <Type
                              variant="caption"
                              color="textSecondary"
                              gutterBottom
                            >
                              Attach Receipt(s)
                            </Type>
                            <DropzoneUploader
                              subtitle="your receipt(s) here or click to browse"
                              uploadFolder="irrigation-controller"
                              onUploaded={uploadedReceiptsHandler}
                              height={200}
                              width="100%"
                              accept="image/*, application/pdf"
                              disabled={receipts.length >= UPLOAD_FILE_LIMIT}
                              maxSize={1 * 1024 * 1024 * UPLOAD_MB_LIMIT}
                            />
                            <FormHelperText error={!hasValidReceipts}>
                              {!hasValidReceipts
                                ? 'Must provide receipt(s) or proof of purchase'
                                : ''}
                            </FormHelperText>
                            <Fade in={hasBadReceipts}>
                              <Type
                                variant="caption"
                                color="error"
                                gutterBottom
                              >
                                Remove and/or retry un-successful uploads.
                              </Type>
                            </Fade>
                          </div>

                          <div
                            className={classNames(classes.dropzoneContainer)}
                          >
                            <Type
                              variant="caption"
                              color="textSecondary"
                              gutterBottom
                            >
                              Attach Installed Irrigation Controller Photo(s)
                            </Type>
                            <DropzoneUploader
                              subtitle="your photo(s) here or click to browse"
                              uploadFolder="irrigation-controller"
                              onUploaded={uploadedPhotosHandler}
                              height={200}
                              width="100%"
                              accept="image/*, application/pdf"
                              disabled={receipts.length >= UPLOAD_FILE_LIMIT}
                              maxSize={1 * 1024 * 1024 * UPLOAD_MB_LIMIT}
                            />
                            <FormHelperText error={!hasValidInstalledPhotos}>
                              {!hasValidInstalledPhotos
                                ? 'Must provide photo(s) of installed irrigation controller(s)'
                                : ''}
                            </FormHelperText>
                            <Fade in={hasBadInstalledPhotos}>
                              <Type
                                variant="caption"
                                color="error"
                                gutterBottom
                              >
                                Remove and/or retry un-successful uploads.
                              </Type>
                            </Fade>
                          </div>
                        </div>

                        <Grid container spacing={40}>
                          <Grid item xs={12}>
                            <Field
                              name="signature"
                              component={SignatureCheckbox}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={40}>
                          <Grid item xs={12}>
                            <Field name="captcha" component={RecaptchaField} />
                          </Grid>
                        </Grid>

                        {/* <Button
                          variant="outlined"
                          type="submit"
                          onClick={handleReset}
                        >
                          Reset Form
                        </Button> */}
                        <div className={classes.buttonWrapper}>
                          <Button
                            variant="outlined"
                            type="submit"
                            disabled={
                              isSubmitting ||
                              !isValid ||
                              (!formTouched && !dirty) ||
                              !hasValidReceipts ||
                              !hasValidInstalledPhotos
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
                  </div>
                )
              }}
            </Formik>
          </div>

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
