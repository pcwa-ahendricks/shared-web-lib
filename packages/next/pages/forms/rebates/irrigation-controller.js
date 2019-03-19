// @flow
import React, {useState, useCallback, useRef} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Grow,
  Typography as Type
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik'
import {string, object, boolean} from 'yup'
import Recaptcha from 'react-recaptcha'
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
import FirstNameField from '@components/formFields/FirstNameField'
import LastNameField from '@components/formFields/LastNameField'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import SignatureCheckbox from '@components/formFields/SignatureCheckbox'
const isDev = process.env.NODE_ENV === 'development'

const RECAPTCHA_SITE_KEY = process.env.NEXT_RECAPTCHA_SITE_KEY || ''
const UPLOAD_MB_LIMIT = 15
const UPLOAD_FILE_LIMIT = 5 // 15MB limit (bytes to MB). This is a hard limit imposed by Mailjet API. TODO - Will Mailjet accept multiple files totaling over 15MB? Can server resize images and pdfs to a certain file size limit?

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
  .strict()
  .shape({
    // attachments: array().of(string()),
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
    purchaseDate: string()
      .required('A valid purchase date is required')
      .typeError('A valid purchase date is required'),
    signature: boolean()
      .required()
      .oneOf([true], 'Must provide signature by checking this box')
      .label('Signature Check')
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
  purchaseDate: '',
  signature: false
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
    marginBottom: theme.spacing.unit * 3
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

const Rebate = ({classes}: Props) => {
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(null)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<Array<string>>([])
  const [unsuccessfulAttachments, setUnsuccessfulAttachments] = useState<
    Array<UploadedFile>
  >([])
  const [captcha, setCaptcha] = useState<string>('')
  const [showOtherCityTextField, setShowOtherCityTextField] = useState<boolean>(
    false
  )
  const recaptchaRef = useRef(null)

  const uploadedHandler = useCallback((files: Array<UploadedFile>) => {
    // onUploaded files parameter always includes all uploads, regardless of their upload status so there is no need to distribute the files parameter and append the incoming to existing uploads. Simply filter and map for the relevant uploads.
    const successfulAttachments = files
      .filter((file) => file.serverResponse.status === 'success')
      .map((file) =>
        file.serverResponse.media ? file.serverResponse.media.imgix_url : null
      )
      .filter(Boolean)
    setAttachments([...successfulAttachments])
    const newUnsuccessfulAttachments = files.filter(
      (file) => file.serverResponse.status !== 'success'
    )
    setUnsuccessfulAttachments([...newUnsuccessfulAttachments])
  }, [])

  const recaptchaVerifyHandler = useCallback((response) => {
    setCaptcha(response)
  }, [])
  // const recaptchaLoadHandler = useCallback(() => {
  //   console.log('Done')
  // }, [])
  const recaptchaExpiredHandler = useCallback(() => {
    setCaptcha('')
  }, [])

  const resetForm = useCallback(() => {
    const recaptchaInstance = recaptchaRef.current
    recaptchaInstance && recaptchaInstance.reset()
    setCaptcha('') // Need to reset state too to disable submit button.
  }, [recaptchaRef])

  const enteringOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(true)
  }, [])

  const exitedOtherCityTransHandler = useCallback(() => {
    setShowOtherCityTextField(false)
  }, [])

  const hasBadAttachments = Boolean(unsuccessfulAttachments.length > 0)
  const hasValidAttachments = Boolean(
    attachments.length > 0 && !hasBadAttachments
  )
  const hasCaptcha = Boolean(captcha)
  const mainEl = (
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
                attachments,
                captcha
              }
              const data = await postIrrigCntrlRebateForm(body)
              actions.setSubmitting(false)
              resetForm()
              alert(JSON.stringify(data, null, 2))
            } catch (error) {
              console.log('An error occurred submitting form.')
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
            setFieldTouched,
            setFieldValue
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
            const otherCitySelected = values.city.toLowerCase() === 'other'

            // Checkbox is not setting touched on handleChange. Touched will be triggered explicitly using this custom change handler which additionally calls handleChange.
            const checkboxChangeHandler = () => {
              setFieldTouched('signature', true)
            }

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
                          <div className={classes.formControlRow}>
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
                          </div>
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
                        <Grid item xs={12} sm={5}>
                          <Field
                            name="purchaseDate"
                            component={PurchaseDateField}
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}> */}
                        {/* <Field name="email" component={EmailField} /> */}
                        {/* </Grid> */}
                      </Grid>
                    </div>

                    <div
                      className={classNames(
                        classes.formControlRow,
                        classes.dropzoneContainer
                      )}
                    >
                      <DropzoneUploader
                        uploadFolder="irrigation-controller"
                        onUploaded={uploadedHandler}
                        height={200}
                        width="100%"
                        accept="image/*, application/pdf"
                        maxSize={1 * 1024 * 1024 * UPLOAD_MB_LIMIT} // 15MB limit (bytes to MB). Note - Will accept multiple files totaling over 15MB.
                        disabled={attachments.length >= UPLOAD_FILE_LIMIT}
                      />
                      <Fade in={hasBadAttachments}>
                        <Type variant="caption" color="error" gutterBottom>
                          Remove and/or retry un-successful uploads.
                        </Type>
                      </Fade>
                    </div>

                    <div className={classes.formControlRow}>
                      <Field
                        name="signature"
                        render={({field, form}) => (
                          <SignatureCheckbox
                            form={form}
                            field={field}
                            onChange={checkboxChangeHandler}
                          />
                        )}
                      />
                    </div>

                    <div className={classes.formControlRow}>
                      <Recaptcha
                        sitekey={RECAPTCHA_SITE_KEY}
                        verifyCallback={recaptchaVerifyHandler}
                        // onloadCallback={recaptchaLoadHandler}
                        expiredCallback={recaptchaExpiredHandler}
                        ref={recaptchaRef}
                      />
                    </div>
                    <div className={classes.buttonWrapper}>
                      <Button
                        variant="outlined"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !isValid ||
                          (!formTouched && !dirty) ||
                          !hasValidAttachments ||
                          !hasCaptcha
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

      {attachments.map((attach, idx) => (
        <div key={idx}>{attach}</div>
      ))}
    </main>
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

export default withStyles(styles)(Rebate)
