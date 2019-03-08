// @flow
import React, {useState, useCallback, useRef} from 'react'
import {
  Button,
  CircularProgress,
  InputLabel,
  Fade,
  OutlinedInput,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography as Type
} from '@material-ui/core'
import PageLayout from '../../../components/PageLayout/PageLayout'
import DropzoneUploader from '../../../components/DropzoneUploader/DropzoneUploader'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form} from 'formik'
import {string, object} from 'yup'
import {type UploadedFile} from '../../../components/DropzoneUploader/DropzoneUploader'
import {
  postIrrigCntrlRebateForm,
  type RequestBody,
  type RebateFormData
} from '../../../lib/services/formService'
import Recaptcha from 'react-recaptcha'
import classNames from 'classnames'

const RECAPTCHA_SITE_KEY = process.env.NEXT_RECAPTCHA_SITE_KEY || ''
const UPLOAD_MB_LIMIT = 15
const UPLOAD_FILE_LIMIT = 5
const CITY_LIST = [
  'Alta',
  'Applegate',
  'Auburn',
  'Baxter',
  'Colfax',
  'Dutch Flat',
  'Gold Run',
  'Granite Bay',
  'Lincoln',
  'Loomis',
  'Meadow Vista',
  'Newcastle',
  'Penryn',
  'Rocklin',
  'Roseville',
  'Weimar'
]

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
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
      .required()
      .label('Account Number'),
    address: string()
      .required()
      .label('Billing Address'),
    city: string()
      .required()
      .label('City')
  })

const initialFormValues: RebateFormData = {
  firstName: '',
  lastName: '',
  email: '',
  accountNo: '',
  address: '',
  city: ''
}

const styles = (theme) => ({
  formikContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  textField: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 4,
    '&:not(:first-child)': {
      marginLeft: theme.spacing.unit * 4
    }
  },
  formControl: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 4,
    minWidth: 150,
    '&:not(:first-child)': {
      marginLeft: theme.spacing.unit * 4
    }
  },
  formControlRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: {
      bottom: theme.spacing.unit * 1,
      top: theme.spacing.unit * 1
    },
    '&$dropzoneContainer': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.unit * 3
    }
  },
  dropzoneContainer: {},
  formControlsContainer: {
    margin: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
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
  // Don't let <TextField/> label cover <Header/>.
  inputLabel: {
    zIndex: 0
  },
  grow: {
    flexGrow: 1
  }
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
  const [recaptchaKey, setRecaptchaKey] = useState<string>('')
  const recaptchaRef = useRef(null)

  const uploadedHandler = useCallback((files: Array<UploadedFile>) => {
    // onUploaded files parameter always includes all uploads, regardless of their upload status so there is no need to distribute the files parameter and append the incoming to existing uploads. Simply filter and map for the relevant uploads.
    const successfulAttachments = files
      .filter((file) => file.serverResponse.status === 'success')
      .map((file) => file.serverResponse.filePath)
    setAttachments([...successfulAttachments])
    const newUnsuccessfulAttachments = files.filter(
      (file) => file.serverResponse.status !== 'success'
    )
    setUnsuccessfulAttachments([...newUnsuccessfulAttachments])
  }, [])

  const recaptchaVerifyHandler = useCallback((response) => {
    setRecaptchaKey(response)
  }, [])
  // const recaptchaLoadHandler = useCallback(() => {
  //   console.log('Done')
  // }, [])
  const recaptchaExpiredHandler = useCallback(() => {
    setRecaptchaKey('')
  }, [])

  const resetForm = () => {
    const recaptchaInstance = recaptchaRef.current
    recaptchaInstance && recaptchaInstance.reset()
  }

  const hasBadAttachments = Boolean(unsuccessfulAttachments.length > 0)
  const hasValidAttachments = Boolean(
    attachments.length > 0 && !hasBadAttachments
  )
  const hasRecaptchaKey = Boolean(recaptchaKey)
  return (
    // <React.Fragment>
    <PageLayout title="Irrigation Controller Rebate Form">
      <Head>
        <title>Rebate Form</title>
        <meta name="description" content="PCWA Water Efficiency Rebate Form" />
      </Head>
      <main>
        <Type variant="h3">Rebate Form</Type>

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
                  recaptchaKey
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
              errors = {},
              handleChange,
              handleBlur,
              isSubmitting,
              isValid
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

              return (
                <div>
                  <Form>
                    <div className={classes.formControlsContainer}>
                      <Type variant="h4" color="primary" gutterBottom>
                        Form
                      </Type>

                      <div className={classes.formControlRow}>
                        <TextField
                          name="firstName"
                          type="text"
                          required
                          value={values.firstName}
                          label="First Name"
                          className={classes.textField}
                          autoComplete="given-name"
                          autoFocus
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.firstName && touched.firstName
                              ? errors.firstName
                              : null
                          }
                          error={errors.firstName && touched.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel
                            }
                          }}
                        />
                        <TextField
                          name="lastName"
                          type="text"
                          required
                          value={values.lastName}
                          label="Last Name"
                          className={classes.textField}
                          autoComplete="family-name"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.lastName && touched.lastName
                              ? errors.lastName
                              : null
                          }
                          error={errors.lastName && touched.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel
                            }
                          }}
                        />
                      </div>

                      <div className={classes.formControlRow}>
                        <TextField
                          name="email"
                          type="email"
                          required
                          value={values.email}
                          label="Email"
                          // placeholder="jane.doe@pcwa.net"
                          className={classes.textField}
                          autoComplete="email"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.email && touched.email ? errors.email : null
                          }
                          error={errors.email && touched.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel
                            }
                          }}
                        />

                        <TextField
                          name="accountNo"
                          type="text"
                          required
                          value={values.accountNo}
                          label="Account Number"
                          // placeholder="XXXX-XXXXX"
                          className={classes.textField}
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.accountNo && touched.accountNo
                              ? errors.accountNo
                              : null
                          }
                          error={errors.accountNo && touched.accountNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={classes.formControlRow}>
                        <TextField
                          name="address"
                          type="text"
                          required
                          value={values.address}
                          label="Address (as it appears on bill)"
                          className={classNames(
                            classes.textField,
                            classes.grow
                          )}
                          autoComplete="street-address"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.address && touched.address
                              ? errors.address
                              : null
                          }
                          error={errors.address && touched.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel
                            }
                          }}
                        />

                        <FormControl
                          className={classes.formControl}
                          required
                          variant="outlined"
                          margin="normal"
                          disabled={isSubmitting}
                        >
                          <InputLabel
                            htmlFor="city-select"
                            error={errors.city && touched.city}
                          >
                            City
                          </InputLabel>
                          <Select
                            value={values.city || ''}
                            autoWidth={true}
                            variant="outlined"
                            input={
                              <OutlinedInput
                                id="city-select"
                                name="city"
                                autoComplete="address-level2"
                                labelWidth={40}
                                error={errors.city && touched.city}
                              />
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                            {CITY_LIST.map((city) => (
                              <MenuItem key={city} value={city}>
                                {city}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText error={errors.city && touched.city}>
                            {errors.city && touched.city ? errors.city : null}
                          </FormHelperText>
                        </FormControl>
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
                            !hasRecaptchaKey
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
    </PageLayout>
    // </React.Fragment>
  )
}

export default withStyles(styles)(Rebate)
