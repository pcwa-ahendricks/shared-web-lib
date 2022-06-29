// cspell:ignore cc'd
import React, {useState, useCallback, useMemo} from 'react'
import {
  Divider,
  Typography as Type,
  Box,
  useTheme,
  Hidden,
  useMediaQuery
} from '@material-ui/core'
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postForm,
  ContactUsFormData as FormData,
  ContactUsRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import MultilineTextField from '@components/formFields/MultilineTextField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import ReasonForContactSelectField from '@components/formFields/ReasonForContactSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {FlexBox, ColumnBox, ChildBox, RowBox} from 'mui-sleazebox'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import MainPhone from '@components/links/MainPhone'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import PageTitle from '@components/PageTitle/PageTitle'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import {Alert} from '@material-ui/lab'
import FormTextField from '@components/formFields/FormTextField'
import EditLocIcon from '@material-ui/icons/Spellcheck'
import ContactUsGeolocator from '@components/ContactUsGeolocator/ContactUsGeolocator'

const SERVICE_URI_PATH = 'contact-us'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    reason: string().required().label('Reason for contacting PCWA'),
    message: string().required().label('Message'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string().email().label('Email'),
    phone: string().min(10).label('Phone Number'),
    serviceAddress: string().label('Service Street Address'),
    serviceCity: string().label('City'),
    subject: string().required().label('Subject')
  })

const initialFormValues: FormData = {
  reason: '',
  name: '',
  email: '',
  phone: '',
  serviceAddress: '',
  serviceCity: '',
  subject: '',
  message: '',
  captcha: ''
}

const ContactUsPage = () => {
  const theme = useTheme()

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

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
          <PageTitle title="Contact Us" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="65%">
              <Type paragraph>
                The PCWA Business Center is open Monday – Friday from 8:00 a.m.
                to 5:00 p.m. except major holidays. Customer Services is
                available by phone at <MainPhone /> or <EightHundredPhone />{' '}
                weekdays from 8:00 a.m. to 5:00 p.m. except major holidays or by
                email at <CustomerServicesEmail /> (please allow two business
                days for a response to your email inquiry).
              </Type>
              <Type paragraph>
                If you have an after-hours emergency, please call <MainPhone />{' '}
                and our answering service will relay your call to standby
                personnel who can assist you.
              </Type>
              <Type paragraph>
                If you are wanting to report water waste, please do so at{' '}
                <MuiNextLink href="/report-water-waste">
                  Report Water Waste
                </MuiNextLink>
                .
              </Type>
            </ChildBox>
            <ChildBox flex="35%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  src="a5afe2e0-6b51-11e7-b267-0b654f5c65d5-contact-customer-service.jpg"
                  alt="Customer Service Representative at Workstation"
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 35vw"
                  width={700}
                  height={790}
                />
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing />
          <Box
            bgcolor={theme.palette.grey['100']}
            border={1}
            borderColor={theme.palette.grey['300']}
          >
            <RowBox justifyContent="space-around">
              <ChildBox p={3}>
                <Type>
                  <em>Business Center Located At</em>
                </Type>
                <MuiNextLink href="/about-pcwa/directions">
                  Placer County Water Agency
                  <br />
                  144 Ferguson Road
                  <br />
                  Auburn, CA 95603
                </MuiNextLink>
              </ChildBox>
              <ChildBox>
                <FlexBox
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Box
                    position="absolute"
                    bgcolor={theme.palette.grey['100']}
                    p={0.25}
                  >
                    <Type variant="h6">or</Type>
                  </Box>
                  <Divider orientation="vertical" />
                </FlexBox>
              </ChildBox>
              <ChildBox p={3}>
                <Type>
                  <em>Mailing Address</em>
                  <br />
                  P.O. Box 6570
                  <br />
                  Auburn, CA 95604-6570
                  <br />
                </Type>
              </ChildBox>
            </RowBox>
          </Box>

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
                    Contact Us by Email
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
                        name="reason"
                        component={ReasonForContactSelectField}
                        required={true}
                        margin="none"
                      />
                    </ChildBox>

                    <ChildBox>
                      <Field
                        name="name"
                        label="Name"
                        component={NameField}
                        required={false}
                        margin="none"
                      />
                    </ChildBox>

                    <RowBox child responsive>
                      <ChildBox flex="60%">
                        <Field
                          name="email"
                          component={EmailField}
                          required={false}
                          margin="none"
                        />
                      </ChildBox>
                      <ChildBox flex="40%" mt={5}>
                        <Field
                          name="phone"
                          component={PhoneNoField}
                          required={false}
                          margin="none"
                        />
                      </ChildBox>
                    </RowBox>

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
                            name="serviceAddress"
                            label="Service Street Address"
                            // placeholder="Street address for service"
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                        <ChildBox flex="40%">
                          <FormTextField
                            name="serviceCity"
                            label="City"
                            // placeholder="City"
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                        {/* just show on sm devices (tablets) */}
                        <Hidden mdUp>
                          <ChildBox>
                            <ContactUsGeolocator
                              onSuccess={useMyLocationSuccessHandler}
                              addressFieldName="serviceAddress"
                              cityFieldName="serviceCity"
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
                              name="serviceAddress"
                              label="Service Street Address"
                              // placeholder="Street address for service"
                              required={false}
                              margin="none"
                            />
                          </ChildBox>
                          <ChildBox>
                            <ContactUsGeolocator
                              onSuccess={useMyLocationSuccessHandler}
                              addressFieldName="serviceAddress"
                              cityFieldName="serviceCity"
                            />
                          </ChildBox>
                        </RowBox>
                        {/* see comment/todo above regard flexSpacing */}
                        <ChildBox flex="40%" mt={5}>
                          <FormTextField
                            name="serviceCity"
                            label="City"
                            // placeholder="City"
                            required={false}
                            margin="none"
                          />
                        </ChildBox>
                      </ColumnBox>
                    </Hidden>

                    <ChildBox>
                      <Field
                        name="subject"
                        component={MultilineTextField}
                        label="Subject"
                      />
                    </ChildBox>

                    <ChildBox>
                      <Field name="message" component={ContactUsMessageField} />
                    </ChildBox>

                    <ChildBox>
                      <Field name="captcha" component={RecaptchaField} />
                    </ChildBox>
                  </ColumnBox>
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

          <Spacing size="x-large" factor={2}>
            <Divider />
          </Spacing>

          <Box
            bgcolor={theme.palette.grey['100']}
            border={1}
            borderColor={theme.palette.grey['300']}
          >
            <Box p={3}>
              <Type variant="h4" gutterBottom color="textSecondary">
                Trouble Contacting Us By Phone?
              </Type>
              <Type variant="body1" paragraph color="textSecondary">
                In the event you are unable to get through our main phone number
                feel free to email us at <CustomerServicesEmail />.
              </Type>
              <Spacing size="large" />
              <Type variant="h4" gutterBottom color="textSecondary">
                Connecting With Us On Social Media?
              </Type>
              <Type variant="body1" paragraph color="textSecondary">
                Please read our Social Media Comment Policy{' '}
                <OpenInNewLink
                  href="https://docs.pcwa.net/social-media-comment-policy"
                  showIconAlways
                  pdf
                >
                  here
                </OpenInNewLink>
                .
              </Type>
            </Box>
          </Box>
        </NarrowContainer>
      </MainBox>
    ),
    [theme, showAddressConfirmAlert, useMyLocationSuccessHandler]
  )

  return (
    <>
      <PageLayout title="Contact Us" waterSurface>
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

export default ContactUsPage
