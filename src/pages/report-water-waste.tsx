// cspell:ignore cc'd
import React, {useState, useCallback, useMemo} from 'react'
import {
  Typography as Type,
  Box,
  InputAdornment,
  IconButton,
  Hidden
} from '@mui/material'
import EditLocIcon from '@mui/icons-material/Spellcheck'
import {Formik, Field} from 'formik'
import {string, object, array, date} from 'yup'
import {
  postForm,
  WaterWasteFormData as FormData,
  WaterWasteRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox, RowBox, ChildBox} from '@components/MuiSleazebox'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import AttachmentField from '@components/formFields/AttachmentField'
import FormTextField from '@components/formFields/FormTextField'
import FormDateTimeField from '@components/formFields/FormDateTimeField'
import CalendarIcon from '@mui/icons-material/Event'
import WtrWasteSelectField from '@components/formFields/WtrWasteSelectField'
import WaterWasteGeolocator from '@components/WaterWasteGeolocator/WaterWasteGeolocator'
import {Alert} from '@mui/material'

const SERVICE_URI_PATH = 'water-waste'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string().email().required().label('Please provide an email address'),
    phone: string().min(10).label('Phone Number'),
    incidentDateTime: date()
      .nullable() // prevent error msg from displaying
      .required('Please specify a date and time for this incident')
      .label('Incident Date/Time'),
    incidentAddress: string()
      .required(
        'Approximate street address the location of where you observed this incident is a required field'
      )
      .label('Incident Address'),
    incidentCity: string()
      .required('City where you observed this incident in a required field')
      .label('Incident City'),
    incidentReason: string()
      .required(
        'Please choose a reason from this dropdown list that best describes the type of water waste observed'
      )
      .label('Type of Water Waste'),
    description: string()
      .required('Please enter a description of the observed incident')
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
  incidentDateTime: null,
  incidentAddress: '',
  incidentCity: '',
  incidentReason: '',
  description: '',
  captcha: '',
  photos: []
}

const ReportWaterWastePage = () => {
  // const theme = useTheme()

  const [photosAreUploading, setPhotosAreUploading] = useState<boolean>(false)
  const photosAreUploadingHandler = useCallback((isUploading) => {
    setPhotosAreUploading(isUploading)
  }, [])

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const [showAddressConfirmAlert, setShowAddressConfirmAlert] = useState(false)
  const useMyLocationSuccessHandler = useCallback(
    () => setShowAddressConfirmAlert(true),
    []
  )

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
                waste. At PCWA, we appreciate your help in identifying water
                losses. With your help we will continue to work to educate
                residents and businesses about how to use water wisely and
                efficiently.
              </Type>
            </ChildBox>
          </RowBox>

          <Spacing size="large" />
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
                    addition to the Google Captcha checkbox. Your email is
                    required in the event we need more information on the
                    reported water waste. Please include photos, cross-streets,
                    and landmarks with water waste reports whenever possible.
                    Please allow staff time to investigate the water waste prior
                    to submitting multiple water waste reports for the same
                    location and be as detailed as possible. If the specific
                    location of the water waste is not included, we may not be
                    able to address your reported water waste.
                  </Type>
                  <Spacing size="x-small" />
                  {/* flex prop is an IE11 fix. */}
                  <Type variant="h4" color="textSecondary">
                    Contact Information
                  </Type>
                  <Spacing size="small" />
                  <ColumnBox flexSpacing={5} flex="0 0 auto">
                    <ChildBox>
                      <Field
                        name="name"
                        component={NameField}
                        label="Name"
                        required={false}
                      />
                    </ChildBox>

                    <ChildBox>
                      <RowBox responsive flexSpacing={5}>
                        <ChildBox flex="60%">
                          <Field
                            name="email"
                            component={EmailField}
                            required
                            margin="none"
                          />
                        </ChildBox>
                        <ChildBox flex="40%">
                          <Field
                            name="phone"
                            component={PhoneNoField}
                            label="Phone Number"
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                      </RowBox>
                    </ChildBox>
                  </ColumnBox>
                  <Spacing size="small" />
                  <Type variant="h4" color="textSecondary">
                    Incident Details
                  </Type>
                  <Spacing size="small" />
                  <ColumnBox flexSpacing={5}>
                    <ChildBox>
                      <FormDateTimeField
                        name="incidentDateTime"
                        label="Date/Time"
                        placeholder="Date and time of incident"
                        required
                        disableFuture
                        margin="none"
                        showTodayButton
                        inputVariant="outlined"
                        format="M/dd/yyyy',' h:mm aaa"
                        // show icon
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="large">
                                <CalendarIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </ChildBox>
                    {/* SM mobile & non-mobile address inputs   */}
                    <Hidden only="xs">
                      {showAddressConfirmAlert ? (
                        <ChildBox mb={-3}>
                          <Alert severity="info" icon={<EditLocIcon />}>
                            Please verify that the address below is correct
                            before submitting
                          </Alert>
                        </ChildBox>
                      ) : null}
                      <RowBox child flexSpacing={3} alignItems="center">
                        <ChildBox flex="60%">
                          <FormTextField
                            name="incidentAddress"
                            label="Street Address"
                            placeholder="Street address of water waste incident"
                            required
                            margin="none"
                          />
                        </ChildBox>
                        <ChildBox flex="40%">
                          <FormTextField
                            name="incidentCity"
                            label="City"
                            placeholder="City where incident occurred"
                            required
                            margin="none"
                          />
                        </ChildBox>
                        {/* just show on sm devices (tablets) */}
                        <Hidden mdUp>
                          <ChildBox>
                            <WaterWasteGeolocator
                              onSuccess={useMyLocationSuccessHandler}
                            />
                          </ChildBox>
                        </Hidden>
                      </RowBox>
                    </Hidden>
                    {/* XS mobile address inputs   */}
                    <Hidden smUp>
                      {/* [todo] - Need to figure out why flexSpacing is adding a top margin to the first item with <ColumBox/>. The workaround here is to use mt with 2nd element below. */}
                      <ColumnBox
                        child
                        // flexSpacing={5}
                      >
                        {showAddressConfirmAlert ? (
                          <ChildBox mb={2}>
                            <Alert severity="info" icon={<EditLocIcon />}>
                              Please verify that the address below is correct
                              before submitting
                            </Alert>
                          </ChildBox>
                        ) : null}
                        <RowBox child flex="60%" flexSpacing={3}>
                          <ChildBox flex>
                            <FormTextField
                              name="incidentAddress"
                              label="Street Address"
                              placeholder="Street address of water waste incident"
                              required
                              margin="none"
                            />
                          </ChildBox>
                          <ChildBox>
                            <WaterWasteGeolocator
                              onSuccess={useMyLocationSuccessHandler}
                            />
                          </ChildBox>
                        </RowBox>
                        {/* see comment/todo above regard flexSpacing */}
                        <ChildBox flex="40%" mt={5}>
                          <FormTextField
                            name="incidentCity"
                            label="City"
                            placeholder="City where incident occurred"
                            required
                            margin="none"
                          />
                        </ChildBox>
                      </ColumnBox>
                    </Hidden>
                    <ChildBox>
                      <Field
                        name="incidentReason"
                        margin="none"
                        component={WtrWasteSelectField}
                        required
                        fullWidth
                      />
                    </ChildBox>
                    <ChildBox>
                      <Field
                        name="description"
                        placeholder="Describe the water waste incident in detail (Examples, cross-streets, landmark, nearest address, backyard, front yard, near fence, on driveway, left of walkway, etc.)."
                        label="Description"
                        component={ContactUsMessageField}
                        margin="none"
                      />
                    </ChildBox>
                  </ColumnBox>
                  <Spacing size="small" />
                  <Type variant="h4" color="textSecondary">
                    Provide Photo Attachment(s)
                  </Type>
                  {/* flex="0 0 auto" is an IE11 fix. */}
                  <Box flex="0 0 auto">
                    <Type variant="caption" color="textSecondary">
                      <em>
                        Note - Only Image file formats can be uploaded (eg.
                        .jpg, .png). PDF files <em>cannot</em> be uploaded.
                      </em>
                    </Type>

                    <ColumnBox
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      mb={3}
                      mt={1}
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
    [
      photosAreUploading,
      photosAreUploadingHandler,
      useMyLocationSuccessHandler,
      showAddressConfirmAlert
    ]
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
