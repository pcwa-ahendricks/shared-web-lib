// @flow
import React, {useState, useCallback} from 'react'
import {
  Button,
  CircularProgress,
  Fade,
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

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
  .shape({
    // attachments: array().of(string()),
    email: string()
      .email()
      .required()
      .label('Email'),
    accountNo: string()
      .required()
      .label('Account Number')
  })

const initialFormValues: RebateFormData = {
  email: '',
  accountNo: ''
}

const recipients: $PropertyType<RequestBody, 'recipients'> = [
  {Name: 'Abe', Email: 'ahendricks@pcwa.net'}
]

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
  // formControl: {
  //   marginTop: theme.spacing.unit * 1,
  //   marginBottom: theme.spacing.unit * 4,
  //   minWidth: 150,
  //   '&:not(:first-child)': {
  //     marginLeft: theme.spacing.unit * 4
  //   }
  // },
  formControlRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  formControlsContainer: {
    margin: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  buttonWrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const Rebate = ({classes}: Props) => {
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(null)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<Array<string>>([])
  const [unsuccessfulAttachments, setUnsuccessfulAttachments] = useState<
    Array<UploadedFile>
  >([])

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

  const hasBadAttachments = Boolean(unsuccessfulAttachments.length > 0)
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
                  recipients
                }
                const data = await postIrrigCntrlRebateForm(body)
                actions.setSubmitting(false)
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
                          name="email"
                          type="email"
                          required
                          value={values.email}
                          label="Email"
                          // placeholder="jane.doe@pcwa.net"
                          className={classes.textField}
                          autoComplete="email"
                          autoFocus
                          variant="outlined"
                          margin="normal"
                          helperText={
                            errors.email && touched.email ? errors.email : null
                          }
                          error={errors.email && touched.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
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

                      <DropzoneUploader
                        uploadFolder="irrigation-controller"
                        onUploaded={uploadedHandler}
                        height={200}
                      />
                      <Fade in={hasBadAttachments}>
                        <Type variant="caption" color="error" gutterBottom>
                          Remove and/or retry un-successful uploads.
                        </Type>
                      </Fade>

                      <div className={classes.buttonWrapper}>
                        <Button
                          variant="outlined"
                          type="submit"
                          disabled={
                            isSubmitting || !isValid || (!formTouched && !dirty)
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
