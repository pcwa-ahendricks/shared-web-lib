// cspell:ignore cc'd
import React, {useState, useCallback, useMemo} from 'react'
import {
  Typography as Type,
  createStyles,
  makeStyles,
  Theme,
  Box
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object, array} from 'yup'
import {
  postForm,
  WaterWasteFormData as FormData,
  WaterWasteRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import MultilineTextField from '@components/formFields/MultilineTextField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox, RowBox, ChildBox} from 'mui-sleazebox'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import AttachmentField from '@components/formFields/AttachmentField'

const SERVICE_URI_PATH = 'water-waste'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string().email().label('Email'),
    phone: string().min(10).label('Phone Number'),
    location: string()
      .required('Please describe the location of where you observed the issue')
      .label('Location'),
    description: string()
      .required('Please enter a description of the observed issue')
      .label('Description'),
    photos: array().of(
      object({
        status: string()
          .required()
          .lowercase()
          .matches(/success/, 'Remove and/or retry un-successful uploads'),
        url: string().required('Attachment URL is not available').url()
      })
    )
  })

const initialFormValues: FormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  description: '',
  captcha: '',
  photos: []
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroupTitle: {
      marginBottom: theme.spacing(3)
    }
  })
)

const ReportWaterWastePage = () => {
  // const theme = useTheme()
  const classes = useStyles()

  const [photosAreUploading, setPhotosAreUploading] = useState<boolean>(false)
  const photosAreUploadingHandler = useCallback((isUploading) => {
    setPhotosAreUploading(isUploading)
  }, [])

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [
    formSubmitDialogErrorOpen,
    setFormSubmitDialogErrorOpen
  ] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const mainEl = useMemo(
    () => (
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Report Water Waste" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="65%">
              <Type paragraph>
                Water conservation is always important. Everyone can do their
                part. Use the form below to help us identify outdoor water
                waste. At PCWA, We appreciate your help in identifying water
                losses. And with your help we will continue to work to educate
                residents and businesses about how to use water wisely and
                efficiently and make the necessary repairs to our own water
                supply system as needed.
              </Type>
            </ChildBox>
          </RowBox>

          <Spacing size="large" factor={2} />
          {/* <Type variant="h3" color="primary" gutterBottom>
                React out to us via email
              </Type> */}
          <Formik
            initialValues={initialFormValues}
            validationSchema={formSchema}
            onSubmit={async (values: FormData, actions) => {
              try {
                // console.log(values, actions)
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
            <ProtectRouteChange>
              <FormValidate>
                {/* width: 'fit-content' // Doesn't seem to fit responsively in XS media layout. */}
                <FormBox
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  m="auto"
                >
                  {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}
                  <Type color="textSecondary" variant="h3" gutterBottom>
                    Report Water Waste by Email
                  </Type>
                  <Type paragraph>
                    Reach out to us via email today by filling out the following
                    form online. Fields marked with an asterisk are required, in
                    addition to the Google Captcha checkbox. If you would like
                    to be CC'd on this email and/or contacted by PCWA please
                    include your email address in the provided field.
                  </Type>
                  <Spacing size="x-small" />
                  {/* flex prop is an IE11 fix. */}
                  <ColumnBox flexSpacing={5} flex="0 0 auto">
                    <ChildBox>
                      <Field
                        name="name"
                        component={NameField}
                        required={false}
                      />
                    </ChildBox>
                    {/* <Grid container>
                        </Grid>

                        <Grid container>
                        </Grid> */}

                    <ChildBox>
                      <RowBox responsive flexSpacing={5}>
                        <ChildBox flex="60%">
                          <Field
                            name="email"
                            component={EmailField}
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                        <ChildBox flex="40%">
                          <Field
                            name="phone"
                            component={PhoneNoField}
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                      </RowBox>
                    </ChildBox>

                    <ChildBox>
                      <Field
                        name="location"
                        component={MultilineTextField}
                        label="Location"
                        placeholder="Approximate location and cross street of water waste incident"
                      />
                    </ChildBox>

                    <ChildBox>
                      <Field
                        name="description"
                        placeholder="Describe the problem and location of the problem as best as you can"
                        label="Description"
                        component={ContactUsMessageField}
                      />
                    </ChildBox>
                  </ColumnBox>
                  <Spacing />
                  {/* flex="0 0 auto" is an IE11 fix. */}
                  <Box flex="0 0 auto">
                    <Type
                      variant="h4"
                      color="textSecondary"
                      gutterBottom
                      className={classes.formGroupTitle}
                    >
                      Provide Photo Attachment(s)
                    </Type>
                    <Type variant="caption" color="textSecondary">
                      Note - Only Image file formats can be uploaded (eg. .jpg,
                      .png). PDF files <em>cannot</em> be uploaded.
                    </Type>

                    <ColumnBox
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      my={3}
                    >
                      <Field
                        // disabled={ineligible}
                        name="photos"
                        attachmentTitle="Photos"
                        uploadRoute="water-waste"
                        onIsUploadingChange={photosAreUploadingHandler}
                        component={AttachmentField}
                      />
                    </ColumnBox>
                  </Box>
                  <Box>
                    <Field name="captcha" component={RecaptchaField} />
                  </Box>
                  <Spacing />
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
                  {/* flex prop is an IE11 fix. */}
                  <SubmitFormButton
                    boxProps={{
                      flex: '0 0 auto'
                    }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={photosAreUploading}
                  >
                    Submit
                  </SubmitFormButton>
                </FormBox>
              </FormValidate>
            </ProtectRouteChange>
          </Formik>
          {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}

          {/* <Spacing size="x-large" factor={2}>
            <Divider />
          </Spacing>

          <Box
            bgcolor={theme.palette.grey['100']}
            border={1}
            borderColor={theme.palette.grey['300']}
          >
            <Box p={3}>
              <Type variant="h3" gutterBottom color="textSecondary">
                Trouble Contacting Us By Phone?
              </Type>
              <Type variant="body1" paragraph color="textSecondary">
                In the event you are unable to get through on our main phone
                number, please call our answering service directly at{' '}
                <AnswerServicePhone />, or email us at <CustomerServicesEmail />
                .
              </Type>
            </Box>
          </Box> */}
        </NarrowContainer>
      </MainBox>
    ),
    [photosAreUploading, photosAreUploadingHandler, classes]
  )

  return (
    <>
      <PageLayout title="Report Water Waste" waterSurface>
        {mainEl}
      </PageLayout>
      <ContactUsSubmitDialog
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
      />
      <ContactUsErrorDialog
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default ReportWaterWastePage
